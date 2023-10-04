import { Button,View,Text,StatusBar,StyleSheet,SafeAreaView } from "react-native";


export default function HomeScreen(props){
    return (
        <SafeAreaView style={styles.container}>
            <View>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
        paddingTop:Platform.OS === 'android' ? 30 : 0,
        flex:1,
        backgroundColor:"rgb(185,185,185)"
    },
    ViewContainer:{

    }
    
});