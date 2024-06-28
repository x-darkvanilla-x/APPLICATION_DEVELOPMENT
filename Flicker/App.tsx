import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import HomePage from "./src/Flicker/Homepage";
import Favourite from "./src/Flicker/Favourite";
import Images from "./src/Flicker/Images";
import Search from "./src/Flicker/Search";
import OpenImage from "./src/Flicker/OpenImage";
import { TouchableOpacity } from "react-native";
import SideNavigation from "./src/Flicker/SideNavigation";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {navigation.navigate("SideNavigation")}} style={{ marginHorizontal: 10 }}>
              <Icon name="menu-outline" size={30} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Images"
        component={Images}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="image-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          title: "Image",
          headerBackTitleVisible: false,
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
            };
          },
        }}
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen
          name="OpenImage"
          component={OpenImage}
        />
        <Stack.Screen
          name="SideNavigation"
          component={SideNavigation}
          options={{
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
