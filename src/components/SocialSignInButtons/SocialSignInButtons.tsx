import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton';
const SocialSignInButtons = () => {

    const onSignInFacebook = () => {
        console.warn('facebook');
    };

    const onSignInGoogle = () => {
        console.warn('Google');
    };

    const onSignInApple = () => {
        console.warn('Apple');
    };
    
  return (
    <>
      <CustomButton
                    text="Facebook登入"
                    onPress={onSignInFacebook}
                    bgColor="#E7EAF4"
                    fgColor="#4765A9"
                />
                <CustomButton
                    text="Google登入"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    text="Apple登入"
                    onPress={onSignInApple}
                    bgColor="#e3e3e3"
                    fgColor="#363636"
                />
    </>
  )
}

export default SocialSignInButtons