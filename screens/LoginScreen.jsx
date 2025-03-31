import React, { useContext, useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { loginService } from "../services/authServices";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginService(email, password);
      if (response.success) {
        console.log("Login successful");
        setIsLoggedIn(true);
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Logo and Header Section */}
          <View className="items-center mt-10 mb-8">
            {/* <Image
              source={require("../assets/logo-placeholder.png")}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            /> */}
            <Text className="text-3xl font-bold text-indigo-700">
              Welcome Back
            </Text>
            <Text className="text-gray-500 mt-2">Sign in to continue</Text>
          </View>

          {/* Form Section */}
          <View className="px-6 py-4">
            {/* Email Input */}
            <View className="mb-5">
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
            <View className="mb-5">
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color="#6366F1"
                />
                <TextInput
                  className="flex-1 ml-2 text-base py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-indigo-600 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className={`py-3 rounded-lg bg-indigo-600 items-center ${
                isLoading ? "opacity-70" : ""
              }`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white font-bold text-lg">
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Section */}
          <View className="flex-row justify-center items-center mt-auto mb-8">
            <Text className="text-gray-600">Don't have an account?</Text>
            <TouchableOpacity
              className="ml-2"
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text className="text-indigo-700 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
