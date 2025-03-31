import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { registerService } from "../services/authServices";

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const handleSignup = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters with uppercase, lowercase, and numbers"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the Terms and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerService(fullName, email, password);
      if (response.success) {
        ToastAndroid.show("Signup successful", ToastAndroid.SHORT);
        navigation.navigate("LoginScreen");
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      Alert.alert(
        "Signup Failed",
        "An error occurred during signup. Please try again."
      );
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-6 mb-6">
            <Text className="text-3xl font-bold text-gray-800">
              Create Account
            </Text>
            <Text className="text-gray-500 mt-2">Sign up to get started</Text>
          </View>

          {/* Form Section */}
          <View className="px-6">
            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Ionicons name="person-outline" size={22} color="#6366F1" />
                <TextInput
                  className="flex-1 ml-2 text-base py-2"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Ionicons name="mail-outline" size={22} color="#6366F1" />
                <TextInput
                  className="flex-1 ml-2 text-base py-2"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#6366F1"
                />
                <TextInput
                  className="flex-1 ml-2 text-base py-2"
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase &
                numbers
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">
                Confirm Password
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#6366F1"
                />
                <TextInput
                  className="flex-1 ml-2 text-base py-2"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <View className="flex-row items-start mb-6">
              <TouchableOpacity
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                className="pt-1"
              >
                <Ionicons
                  name={agreeToTerms ? "checkbox" : "square-outline"}
                  size={20}
                  color={agreeToTerms ? "#6366F1" : "#9CA3AF"}
                />
              </TouchableOpacity>
              <Text className="flex-1 ml-2 text-gray-600">
                I agree to the{" "}
                <Text className="text-indigo-600 font-medium">
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text className="text-indigo-600 font-medium">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              className={`py-4 rounded-lg bg-indigo-600 items-center ${
                isLoading ? "opacity-70" : ""
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white font-bold text-lg">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Section */}
          <View className="flex-row justify-center items-center mt-auto mb-8">
            <Text className="text-gray-600">Already have an account?</Text>
            <TouchableOpacity
              className="ml-2"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-indigo-700 font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
