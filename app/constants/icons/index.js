import React from 'react';
import colors from '../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const icons = {
  expand: (props) => (
    <FontAwesome name="male" size={30} color={colors.black} {...props} />
  ),
};

export default icons;
