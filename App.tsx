import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './home/Home';
import { CameraView } from './camera/ui/CameraView';
import {CameraViewContextProvider} from "./camera/state/CameraContextProvider";

const Drawer = createDrawerNavigator();

function App(){
    return (
        <CameraViewContextProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
                    <Drawer.Screen name="Take a Pic" component={CameraView}></Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        </CameraViewContextProvider>
       
    )
}

export default App;
