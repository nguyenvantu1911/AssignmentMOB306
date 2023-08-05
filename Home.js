import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Modal } from "react-native";

const Home = ({ navigation }) => {
  const [usern, setusern] = useState("");
  const [Data, setData] = useState("");
  const [DataC, setDataC] = useState("");
  const [Comment, setComment] = useState("");
  const [id, setId] = useState(null);
  const route = useRoute();
  const userId = route.params?.userID;
  const [modelVisible, setmodelVisible] = useState(false);
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
  fetch("http://10.24.9.145:3000/users/" + userId)
    .then((response) => response.json())
    .then((data) => {
      if (JSON.stringify(data) !== JSON.stringify(usern)) {
        setusern(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  fetch("http://10.24.9.145:3000/comment")
    .then((response) => response.json())
    .then((data) => {
      if (JSON.stringify(data) !== JSON.stringify(DataC)) {
        setDataC(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  const handleFollow = (user) => {
    fetch("http://10.24.9.145:3000/users/" + userId, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(usern)) {
          setusern(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUnFollow = (user) => {
    console.log("tu", usern.followedArticles);
    fetch("http://10.24.9.145:3000/users/" + userId, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(usern)) {
          setusern(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const AddComment = (id, User) => {
    const newComment = { User, idArticle: id, comment: Comment };
    fetch("http://10.24.9.145:3000/comment", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(DataC)) {
          setDataC(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.Image} />
            <Text>{item.content}</Text>
            <View style={styles.comment}>
              {usern.followedArticles &&
              usern.followedArticles.includes(item.id) ? (
                <TouchableOpacity
                  style={styles.ChangePass_bottom}
                  onPress={() => {
                    const user = {
                      ...usern,
                      followedArticles: usern.followedArticles.filter(
                        (a) => a !== item.id
                      ),
                    };
                    handleUnFollow(user);
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}
                  >
                    UnFollow
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.ChangePass_bottom}
                  onPress={() => {
                    const user = {
                      ...usern,
                      followedArticles: [...usern.followedArticles, item.id],
                    };
                    handleFollow(user);
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}
                  >
                    Follow
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.btncomment}
                onPress={() => {
                  setId(item.id);
                  setmodelVisible(true);
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal animationType="slide" transparent={true} visible={modelVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleC}>Comment</Text>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              placeholder="Comment"
            />

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={styles.nut}
                onPress={() => {
                  const user = usern.username;

                  AddComment(id, user);
                  
                }}
              >
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nutC}
                onPress={() => {
                  setmodelVisible(false);
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={DataC}
              renderItem={({ item }) => (
                <View>
                  {item.idArticle == id ? (
                    <View style={styles.b}>
                      <Text style={{fontWeight: 'bold'}}>{item.User} : </Text>
                      <Text>{item.comment} </Text>
                    </View>
                  ) : null}
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

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
  ChangePass_bottom: {
    width: 100,
    height: 40,
    backgroundColor: "#4287D4",
    borderRadius: 20,
    borderColor: "#4287D4",
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
    marginRight: 20,
  },
  comment: {
    flexDirection: "row",

    alignItems: "center",
  },
  btncomment: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#4287D4",
    width: 250,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    
  },
  modalView: {
    height:"80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nut: {
    backgroundColor: "gray",
    borderRadius: 15,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nutC: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 20,
  },
  titleC: {
    fontSize: 30,
    fontWeight: "bold",
  },
  b: { 
    flexDirection: "row",
    marginTop: 10,
    height: 20,
   },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 10,
  },
});
