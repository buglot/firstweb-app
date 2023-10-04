import { TouchableOpacity, View, Text, TextInput, Alert, StyleSheet, Image } from "react-native";
import eyeIcon from "../assets/eye.png";
import eyeCloseIcon from "../assets/close-eye1.png";
import { useState } from "react";
function PageRegitor(props) {
    const [showpass1, setShowPass1] = useState(false);
    const [showpass2, setShowPass2] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessenge, setErrorMessenge] = useState("");
    let imaeSource1 = showpass1 ? eyeIcon : eyeCloseIcon;
    let imaeSource2 = showpass2 ? eyeIcon : eyeCloseIcon;
    const registorChack = () => {
        if ((password1 !== "") || (password2 !== "") || (email !== "")) {
            if (password1 === password2) {
                Alert.alert("Sess");
            } else {
                Alert.alert("Password not sameting");
                setErrorMessenge("กรุณาใส่รหัสให้เหมือนกันใหม่อีกครั้ง");
            }
        } else {
            Alert.alert("กรอกให้ครบด้วยครับ");
            setErrorMessenge("กรอกให้ครบด้วยครับ");
        }
    }
    return (
        <View style={style.mainContrainner}>

            <View style={style.box}>

                <Text style={style.textLabel}>Email:</Text>
                <View style={style.box_show_pass}>
                    <TextInput style={style.password_input} placeholder="ป้อนที่อีเมล์ของคุณ" onChangeText={(e) => setEmail(e)} />
                </View>
                <Text style={style.textLabel}>Password:</Text>
                <View style={style.box_show_pass}>
                    <TextInput style={style.password_input} placeholder="ป้อนที่รหัสของคุณ" secureTextEntry={!showpass1} underlineColorAndroid="transparent" onChangeText={(e) => setPassword1(e)} />
                    <TouchableOpacity style={{ backgroundColor: "rgba(51,157,241,1)", borderRadius: 50 }} onPress={() => { setShowPass1(!showpass1) }}>
                        <Image source={imaeSource1} style={style.buttonImageIconStyle} />
                    </TouchableOpacity>
                </View>
                <Text style={style.textLabel}>re-Password:</Text>
                <View style={style.box_show_pass}>
                    <TextInput style={style.password_input} placeholder="ป้อนที่รหัสของคุณอีกครั้ง" secureTextEntry={!showpass2} underlineColorAndroid="transparent" onChangeText={(e) => setPassword2(e)} />
                    < TouchableOpacity style={{ backgroundColor: "rgba(51,157,241,1)", borderRadius: 50 }} onPress={() => { setShowPass2(!showpass2) }}>
                        <Image source={imaeSource2} style={style.buttonImageIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={
                    {
                        flex: 6, flexDirection: "row", justifyContent: "flex-end", marginTop: 30, alignItems: "center",
                        gap: 10
                    }}>
                    < TouchableOpacity style={{ backgroundColor: "rgb(0,200,255)", borderRadius: 10, width: "40%", height: 50, justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            registorChack();
                        }}>
                        <Text>สมัครสมาชิก</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <Text style={{ color: "rgb(255,50,50)", fontSize: 16, textDecorationLine: 'underline' ,marginTop:40}}>{errorMessenge}</Text>
        </View>
    );
}
const style = StyleSheet.create({
    mainContrainner: {
        flex: 1,
        backgroundColor: "rgb(0,0,40)",
        alignItems: "center",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        width: "100%",
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