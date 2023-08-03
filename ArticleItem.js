import React from "react";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";

const ArticleItem = ({ title, image, content }) => (
  <View style={styless.item}>
    <Text style={styless.title}>{title}</Text>
    <View
      style={{
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Image source={image} style={styles.home_ImageTuor} />
    </View>
    <Text style={styless.content}>{content}</Text>
  </View>
);

const styless = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default ArticleItem;
