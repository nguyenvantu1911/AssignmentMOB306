import { View, Text, Image } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native";


const Profile = ({navigation}) => {
  return (
    <View style= {{flex: 1 , flexDirection:'column', top: 150 }}>
     <View style={{ alignItems: 'center', justifyContent: "center"}}>
        <Image
          style={{ width: 130, height: 130 , marginBottom: 10 }}
          source={require("./image/user.png")}
        />
      </View>
      <TouchableOpacity style={styles.Profile_button}>
        <Text style={styles.Profile_buttonText}>Thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Profile_button}>
        <Text style={styles.Profile_buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Profile_button} onPress={()=> navigation.navigate('ChangePass')}>
        <Text style={styles.Profile_buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Profile_button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.Profile_buttonText}>Đăng xuất</Text>
      </TouchableOpacity>

    </View>
  );
};
export default Profile;
