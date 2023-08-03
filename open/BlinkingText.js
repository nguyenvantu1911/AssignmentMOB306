import React, { useState, useEffect } from 'react';
import { Text, Animated } from 'react-native';

const BlinkingText = (props) => {
  const [opacityValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    }, props.interval);

    return () => clearInterval(interval);
  }, [opacityValue, props.interval]);

  return (
    <Animated.Text style={{ opacity: opacityValue , fontWeight:'bold', color:'#008080'}}>
      {props.text}
    </Animated.Text>
  );
};

export default BlinkingText;