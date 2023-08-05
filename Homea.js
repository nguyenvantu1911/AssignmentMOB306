import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { FlatList } from "react-native";
  
  
  const Homea = () => {
    const [Data, setData] = useState("");
   
    
    fetch("http://10.24.9.145:3000/article")
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(Data)) {
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  
    return (
      <View style={styles.container}>
        <FlatList
          data={Data}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={{ uri: item.image }} style={styles.Image} />
              <Text>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  
  export default Homea;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    Image: {
      width: "100%",
      height: 250,
      borderRadius: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
    },
  });
  