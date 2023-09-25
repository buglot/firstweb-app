import {  TouchableOpacity, View, Text, TextInput, Alert, StyleSheet, Image } from "react-native";
import eyeIcon from "../assets/eye.png";
function PageRegitor(props) {
    return (
        <View style={style.mainContrainner}>
            <View style={style.box}>
                <Text style={style.textLabel}>Email:</Text>
                <TextInput style={style.text_input} placeholder="ป้อนที่อีเมล์ของคุณ" />
                <Text style={style.textLabel}>Password:</Text>
                <View style={style.box_show_pass}>
                    <TextInput style={style.password_input} placeholder="ป้อนที่รหัสของคุณ" secureTextEntry={true} underlineColorAndroid="transparent" />
                    <Image source={eyeIcon} style={style.buttonImageIconStyle} />
                </View>
                <Text style={style.textLabel}>re-Password:</Text>
                <View style={style.box_show_pass}>
                    <TextInput style={style.password_input} placeholder="ป้อนที่รหัสของคุณอีกครั้ง" secureTextEntry={true} underlineColorAndroid="transparent" />
                    <Image source={eyeIcon} style={style.buttonImageIconStyle} />
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",marginTop:10}}>
                    < TouchableOpacity style={{backgroundColor:"rgb(0,200,255)",padding:20,borderRadius:10}}><Text>สมัครสมาชิก</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    mainContrainner: {
        flex: 1,
        gap: 20,
        backgroundColor: "rgb(0,0,40)",
        alignItems: "center",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        width: "100%",
        position: "absolute",
        gap: 20
    },
    textLabel: {
        color: "rgb(150,160,230)",
        fontSize: 18,
        fontWeight: "700"
    },
    text_input: {
        height: 50,
        padding: 10,
        color: "white",
        fontSize: 18,
        borderColor: "rgba(255,255,255,0.3)",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        flex: 1
    },
    box_show_pass: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "rgba(255,255,255,0.3)",
        backgroundColor: "rgba(255,255,255,0.3)",
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 10,

    },
    buttonImageIconStyle: {
        width: 30, height: 30,
        resizeMode: 'stretch',
        alignItems: 'center',

    },
    password_input: {
        height: 50,
        padding: 10,
        color: "white",
        fontSize: 18,
        flex: 1
    }
});
export default PageRegitor;