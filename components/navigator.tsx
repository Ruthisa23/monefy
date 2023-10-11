import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'; 

import SavingScreen from "../features/savings/application/screens/savingScreen"; 
import IncomesScreen from "../features/income/application/screens/incomesScreen";
import CategorysScreen from "../features/category/application/screens/categorysScreen";


const Tab = createBottomTabNavigator();

const NavigationSavi = () => {
    return (
        <Tab.Navigator
        initialRouteName="CategoryScreen"
        screenOptions={{
            tabBarActiveTintColor: 'purple',
            tabBarStyle: {
                height: 80,
            }
        }}
        >
            <Tab.Screen 
                name="Category"
                component={CategorysScreen}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 15,
                    },
                    tabBarIcon: () => (
                        <AntDesign name="login" size={28} color="gray" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Saving"
                component={SavingScreen}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 15
                    },
                    tabBarIcon: () => (
                        <AntDesign name="wallet" size={28} color="gray" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Income"
                component={IncomesScreen}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 15,
                    },
                    tabBarIcon: () => (
                        <AntDesign name="pay-circle-o1" size={28} color="gray" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default NavigationSavi;