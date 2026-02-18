import { Colors } from '@/constants/theme';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/global-styles';

interface ButtonProps {
    type: 'primary' | 'secondary' | 'tertiary';
    title: string;
    color?: string;
    disabled?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function CustomButton({ type, title, color = Colors.primaryText, disabled = false, onPress, style }: ButtonProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            globalStyles.flexCenter,
            styles.button,
            styles[type],
            pressed && { opacity: 0.7 },
            disabled && { opacity: 0.5 },
            style
        ]} disabled={disabled}>
            <Text style={[styles.text, { color: type === 'tertiary' ? Colors.lightText : Colors.primaryText }]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        height: 48,
        width: '100%',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.primaryText,
        textAlign: 'center',
    },
    primary: {
        backgroundColor: Colors.primaryButton,
    },
    secondary: {
        backgroundColor: Colors.secondaryButton,
    },
    tertiary: {
        backgroundColor: Colors.tertiaryButton,
    },
})
