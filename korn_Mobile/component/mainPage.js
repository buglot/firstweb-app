import { Button, View, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "./Screen/HomeScreen";
const Tab = createMaterialBottomTabNavigator();

function MainPage() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            
        </Tab.Navigator>
    );
}
export default MainPage;