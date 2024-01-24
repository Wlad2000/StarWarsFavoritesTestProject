/****************************************************************************
**
**
**
**
****************************************************************************/

import React, { useEffect } from "react";

import CharactersList from '../pages/CharactersList';
import CharacterDetails from '../pages/CharacterDetails';
import { createStackNavigator } from "@react-navigation/stack";


const Pages = (props) => {
    const Stack = createStackNavigator();

    useEffect(() => {
        //console.log('start')
    }, []);

    const headerBar = {
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black' }
    };

    return (
        <Stack.Navigator initialRouteName="CharactersList">
            <Stack.Screen name="CharactersList" component={CharactersList} options={headerBar} />
            <Stack.Screen name="CharacterDetails" component={CharacterDetails} options={headerBar} />
        </Stack.Navigator>
    )


};

export { Pages };