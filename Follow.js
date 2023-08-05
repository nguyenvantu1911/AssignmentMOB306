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
import { useRoute } from "@react-navigation/native";

const Follow = () => {
  const [User, setUser] = useState("");
  const [Data, setData] = useState("");
  const [IDarticle, setIDarticle] = useState([]);
  const route = useRoute();
  console.log(route);
  const userId = route.params.userID;

  fetch("http://10.24.9.145:3000/users/"+userId)
    .then((response) => response.json())
    .then((data) => {
      if (JSON.stringify(data) !== JSON.stringify(User)) {
        setUser(data);
        
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
    
  
    const LayID =()=>{
      setIDarticle(User.followedArticles);
      
    }
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
    console.log("Data",User.followedArticles);
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        renderItem={({ item }) => (
          <View>
          {User.followedArticles&&User.followedArticles.includes(item.id)? (
            <View>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.Image} />
            <Text>{item.content}</Text>
            </View>
            ):(null)}
            
          </View>
          
        )}
        
      />
    </View>
  );
};

export default Follow;

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
