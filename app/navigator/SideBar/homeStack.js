import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/sidebar/home/Home';
import TabsNavigation from "../Home/tabsNavigation"
import EditProfile from '../../screens/sidebar/editProfile';
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeTabs' component={TabsNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' options={{ headerShown: false/* , unmountOnBlur: true */ }} component={EditProfile} />
        </Stack.Navigator>
    )
}

export default HomeStack
