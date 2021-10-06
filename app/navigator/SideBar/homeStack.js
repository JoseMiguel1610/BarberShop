import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/sidebar/home/Home';
import TabsNavigation from "../Home/tabsNavigation"
import EditProfile from '../../screens/sidebar/editProfile';
import Shops from '../../screens/sidebar/products';
import Estilitas from '../../screens/sidebar/products/estilistas';
import InfoEstilista from '../../screens/sidebar/products/estilistas/info';
import Citas from '../../screens/sidebar/citas';
import EditProfileAdmin from '../../screens/sidebar/business/editUser/index2';
import Backup from '../../screens/sidebar/business/backup';
import HistorialCitas from '../../screens/sidebar/historial';
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
            <Stack.Screen name='HistorialCitas' options={{ headerShown: false }} component={HistorialCitas} />
            <Stack.Screen name='ProfileAdmin' options={{ headerShown: false }} component={EditProfileAdmin} />
            <Stack.Screen name='Backup' options={{ headerShown: false }} component={Backup} />
        </Stack.Navigator>
    )
}

export default HomeStack
