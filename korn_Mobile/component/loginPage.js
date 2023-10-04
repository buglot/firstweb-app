import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import bg from "../assets/w2.jpg";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export default function LoginBox({navigation}) {
    return (
        <View style={style.maincontrainner}>
            <StatusBar style="auto" />

            {/* <Text style={style.textTitle}>Login</Text> */}


            <View style={style.contrainerLogin}>
                <ImageBackground source={bg} resizeMode="repeat" >


                    <View style={style.contrainerInnerBox}>
                        <Text style={style.TextInnerBox}>
                            Email:
                        </Text>
                        <TextInput style={style.inputText} placeholder="ป้อนที่อยู่อีเมลของคุณ" />
                        <Text style={style.TextInnerBox}>
                            Password:
                        </Text>
                        <TextInput style={style.inputText} placeholder="ป้อนที่รหัสของคุณ" secureTextEntry={true} />
                        <BouncyCheckbox text="จดจำการเข้าระบบไว้" textStyle={{ textDecorationLine: "none" }} />
                        <Button title="ล็อกอิน" onPress={(e) => {navigation.navigate('main')}} />


                    </View>
                </ImageBackground>
            </View>
            <Text style={{color:"rgb(150,0,0)",fontSize:20,textDecorationLine: 'underline'}} onPress={(e) => {navigation.navigate('REGISTOR')}}>สมัครสมาชิก</Text>
        </View>
    );
}
const style = StyleSheet.create({
    maincontrainner: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#000",
        gap:30
    },
    contrainerLogin: {
        padding: 10,
        width: "100%",
        borderRadius: 20,
        
        backgroundColor: "#000"
    },
    textTitle: {
        fontSize: 38,
        justifyContent: "flex-start",
        fontWeight: "800",
        color: "rgb(255, 190, 242)"
    },
    contrainerInnerBox: {
        padding: 10,
        gap: 30
    },
    TextInnerBox: {
        color: "rgb(33, 213, 228)",
        fontSize: 20
    },
    inputText: {
        borderRadius: 5,
        width: "100%",
        backgroundColor: "rgba(200,230,255,0.9)",
        padding: 5,
        fontSize: 16
    },

});