import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/sidebar/home/Home';
import TabsNavigation from "../Home/tabsNavigation"
import EditProfile from '../../screens/sidebar/editProfile';
import Shops from '../../screens/sidebar/products';
import Estilitas from '../../screens/sidebar/products/estilistas';
import InfoEstilista from '../../screens/sidebar/products/estilistas/info';
import Citas from '../../screens/sidebar/citas';
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeTabs' component={TabsNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' options={{ headerShown: false }} component={EditProfile} />
            <Stack.Screen name='Servicios' options={{ headerShown: false }} component={Shops} />
            <Stack.Screen name='Estilistas' options={{ headerShown: false }} component={Estilitas} />
            <Stack.Screen name='InfoEstilistas' options={{ headerShown: false }} component={InfoEstilista} />
            <Stack.Screen name='Citas' options={{ headerShown: false }} component={Citas} />
        </Stack.Navigator>
    )
}

export default HomeStack
