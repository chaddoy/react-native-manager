import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
  <View style={styles.containerStyle}>
    {props.children}
  </View>
);

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

export { Card };
