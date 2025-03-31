import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import ViewSavedMeme from "./screens/ViewSavedMeme";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import { ActivityIndicator, View } from "react-native";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

function SavedMeme() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ViewSavedMeme" component={ViewSavedMeme} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SavedMeme}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const AuthCheck = () => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={60} color="#e01246" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const Navigation = () => {
  return (
    <AuthProvider>
      <AuthCheck />
    </AuthProvider>
  );
};

export default Navigation;
