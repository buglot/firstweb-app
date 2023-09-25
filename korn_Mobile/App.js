
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginBox from './component/loginPage';
import PageRegitor from './component/registorPage';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LOGIN' >
          <Stack.Screen name="LOGIN" component={LoginBox} options={{headerStyle:{backgroundColor:"black"},headerTitleStyle:{color:"white",fontWeight:"900",fontSize:25}}} />
          <Stack.Screen name="REGISTOR" component={PageRegitor} options={{headerStyle:{backgroundColor:"rgb(0,0,50)"},headerTitleStyle:{color:"rgb(150,170,200)",fontWeight:"900"},headerTintColor:"rgb(200,150,200)"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
