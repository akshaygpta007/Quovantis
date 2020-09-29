import React, {useState} from 'react';
import {Pressable} from 'react-native';

const Accordian = ({mainContent, childContent}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(!visible)}>{mainContent}</Pressable>
      {visible && childContent}
    </>
  );
};

export default Accordian;
