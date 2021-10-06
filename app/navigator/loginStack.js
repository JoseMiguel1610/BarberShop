import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Login from '../screens/login/login';
import Registro from '../screens/login/components/register';
import ForgetPassword from '../screens/login/components/forgetpassword';

const Stack = createStackNavigator();
export default function LoginStack() {

    return (
        
        
          <Stack.Navigator initialRouteName={"HomeLogin"}>
         {/* <Stack.Navigator initialRouteName={register ? "verification" : recovery ? "recovery" : "wallethome"}>    */}

            <Stack.Screen
                name='HomeLogin'
                component={Login}
                options={{ headerShown: false }}>
            </Stack.Screen>

            <Stack.Screen
                name='Registro'
                component={Registro}
                options={{ headerShown: false }}>
            </Stack.Screen>

            <Stack.Screen
                name='Password'
                component={ForgetPassword}
                options={{ headerShown: false }}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}