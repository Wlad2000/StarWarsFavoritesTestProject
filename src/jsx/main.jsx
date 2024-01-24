/****************************************************************************
**
**
**
**
****************************************************************************/
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { Pages } from './items/Pages';


const App = () => {

    return (
        <NavigationContainer>
            <Pages />
        </NavigationContainer >
    );
};

export default App;
