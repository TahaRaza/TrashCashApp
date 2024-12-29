import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { buttonStyles } from '../styles/theme';

const CustomButton = ({ title, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyles.button,
                pressed || isPressed ? buttonStyles.buttonPressed : null,
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <Text style={buttonStyles.buttonText}>{title}</Text>
        </Pressable>
    );
};

export default CustomButton;
