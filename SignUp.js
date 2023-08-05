import { View, Text, TextInput, Image, ImageBackground } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";
const SignUp = ({navigation}) => {
  const [Acc, setAcc] = useState();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [checkp, setcheckp] = useState("");
  fetch('http://10.24.9.145:3000/users')
    .then(response => response.json())
    .then(data => {
      if (JSON.stringify(data) !== JSON.stringify(Acc)) {
        setAcc(data);
      }
    })
    .catch(error => {
      console.log(error);
    });
    console.log("Data: ",Acc);
  const check =()=> {
    if(password !=checkp){
      alert("Hai mật khẩu không trùng khớp !");
      return;
    }
    const arrayLength = Acc.length;
    console.log("Số lượng phần tử: ", arrayLength);
    for( var i=0 ; i<arrayLength; i++){
      if(Acc[i].username == username){
        alert("Tài khoản đã tồn tại");
        return navigation.navigate('SignUp');
      }
    }
    handleSubmit();
  }
  const handleSubmit = () => {
    const newUser = { username, password };
    
    console.log(newUser);
    
      fetch('http://10.24.9.145:3000/users',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        .then(data => {
          console.log('New user added:', data);
          alert("Tạo tài khoản thành công !");
        })
        .catch(error => {
          console.log(error);
        });
        navigation.navigate("Login")
  };
  
  const [getPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={require("./image/backgroung.png")}
      resizeMode="stretch"
    >
      <View style={styles.SignUp_container}>
        <View style={styles.SignUp_box}>
          <Text style={styles.ChangePass_Text}>Đăng Kí</Text>

          <View style={styles.ChangePass_password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Tên đăng nhập"
              placeholderTextColor="#fff"
              onChangeText={setusername}
              
            ></TextInput>

            <TouchableOpacity
              style={styles.ChangePass_T}
              onPress={() => {
                setPasswordVisible(!getPasswordVisible);
              }}
            ></TouchableOpacity>
          </View>
          

          <View style={styles.ChangePass_password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Nhập mật khẩu "
              placeholderTextColor="#fff"
              onChangeText={setpassword}
              secureTextEntry={getPasswordVisible ? false : true}
            ></TextInput>

            <TouchableOpacity
              style={styles.ChangePass_T}
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
          <View style={styles.ChangePass_password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Nhập lại mật khẩu "
              placeholderTextColor="#fff"
              onChangeText={setcheckp}
              secureTextEntry={getPasswordVisible ? false : true}
            ></TextInput>

            <TouchableOpacity
              style={styles.ChangePass_T}
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
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.ChangePass_bottom}
            onPress={() => {
              check();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ChangePass_cancel}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default SignUp;
