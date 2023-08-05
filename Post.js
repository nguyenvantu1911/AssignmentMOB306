import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";


const Post = ({ navigation }) => {
  const [Data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://i1-thethao.vnecdn.net/2023/08/04/quang-liem-jpeg-1691160667-7531-1691160718.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=pd8nuRcV4bYdqa_Y9J3wqg"
  );
  const [content, setContent] = useState("");

  const Post = () => {
    const newPost = { title, image, content };
    fetch("http://10.24.9.145:3000/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(() => {
        navigation.navigate("TabMenu");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={require("./image/backgroung.png")}
      resizeMode="stretch"
    >
      <View style={styles.SignUp_container}>
        <View style={styles.SignUp_box}>
          <Text style={styles.ChangePass_Text}>POST</Text>

          <View style={styles.ChangePass_password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Title"
              placeholderTextColor="#fff"
              onChangeText={setTitle}
            ></TextInput>
          </View>

          <View style={styles.ChangePass_password}>
            <TextInput
              style={{ color: "#fff", fontSize: 18 }}
              placeholder="Content "
              placeholderTextColor="#fff"
              onChangeText={setContent}
            ></TextInput>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.ChangePass_bottom}
            onPress={() => {
              Post();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Post;
