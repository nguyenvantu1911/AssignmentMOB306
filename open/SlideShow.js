import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const images = [
  { uri: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
  { uri: 'https://i.pinimg.com/564x/b1/78/32/b17832ed39fd47db601a525e963050a2.jpg' },
  { uri: 'https://duhocchaudaiduong.edu.vn/mot-so-hinh-nen-dep/imager_2_3642_700.jpg' },
];

const SlideShow = () => {
  
    
    const [data, setData] = useState([]);
    const slides = [];
  useEffect(() => {
    let api_url ="https://xuantuan06.000webhostapp.com/php/GetTourFromApi.php"
    fetch(api_url).then(response => response.json())
    .then(data => setData(data))
    .catch(error => {
      console.error(error);
    })}, []);
    console.log("Slide",data);
    
    // for (let i = 0; i < data.length; i++) {
    //   const image = data[i].image;
    //   console.log("imgae",image);
    //   slides.push(
    //     <View key={i} style={{ flex: 1 }}>
    //       <Image source={{ uri: image }} style={{ width: '100%', height: 200, borderRadius:10 }} />
          
    //     </View>
    //   );
    // }

  return (
    <Swiper >
      {data.map((item, index) => (
        <View key={index}>
          <Image source={{uri: item.image}} style={{ width: '100%', height: 200, borderRadius:10 }} />
        </View>
      ))}
      {/* {slides} */}
    </Swiper>
  );
      };

export default SlideShow;