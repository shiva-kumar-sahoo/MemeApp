import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import ViewSavedMeme from "./screens/ViewSavedMeme";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function SavedMeme() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
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
        component={Home}
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
export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
