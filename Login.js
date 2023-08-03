import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";

const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [getPasswordVisible, setPasswordVisible] = useState(false);
  const [Acc, setAcc] = useState();
  
    fetch('http://10.24.10.65:3000/users')
      .then(response => response.json())
      .then(data => {
        if (JSON.stringify(data) !== JSON.stringify(Acc)) {
          setAcc(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  
  const doLogin = () => {
    
  };
  const Login = () => {
    const user = Acc.find((u) => u.username === username && u.password === password);
    console.log("Kiểm tra", user);
    if(user.username =="admin"){
      navigation.navigate("TabMenuadmin");
    } else
    if (user) {
      navigation.navigate("TabMenu");
    } else {
      alert("Thông tin đăng nhập không chính xác");
      return;
    }
  };
  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={require("./image/backgroung.png")}
      resizeMode="stretch"
    >
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={{ width: "60%", height: "20%" }}
            source={require("./image/logo.png")}
          />
          <Text style={styles.title}>XIN CHÀO</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Tên đăng nhập"
              placeholderTextColor="#fff"
              onChangeText={(txt) => {
                setusername(txt);
              }}
            ></TextInput>
          </View>

          <View style={styles.password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Mật khẩu"
              placeholderTextColor="#fff"
              secureTextEntry={getPasswordVisible ? false : true}
              onChangeText={(txt) => {
                setpassword(txt);
              }}
            ></TextInput>

            <TouchableOpacity
              style={{
                height: "100%",
                aspectRatio: 1,
                position: "absolute",
                right: 0,
                width: 40,
                padding: 4,
                margin: 7,
              }}
              onPress={() => {
                setPasswordVisible(!getPasswordVisible);
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={require("./image/key.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={Login}>
            <Text style={{ fontWeight: "bold", color: "gray", fontSize: 18 }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={{ color: "#fff" }}>
              Bạn chưa có tài khoản?
              <Text
                style={styles.singup}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Đăng Ký
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "70%",
    height: 50,
    marginBottom: 20,
    color: "#fff",
    fontSize: 50,
    justifyContent: "center",
  },
  password: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "70%",
    height: 50,
    marginBottom: 20,
    fontSize: 100,
    color: "#fff",
    paddingRight: 45,
    justifyContent: "center",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#fff",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  singup: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },
});
