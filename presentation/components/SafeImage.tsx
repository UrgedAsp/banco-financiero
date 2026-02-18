import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

interface CustomImageProps {
    uri: string;
    style?: any;
}

export const SafeImage = ({ uri, style }: CustomImageProps) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Si no hay URI o hubo un error, mostramos el icono
    if (!uri || error) {
        return (
            <View style={[styles.fallbackContainer, style]}>
                <MaterialCommunityIcons name="image-off-outline" size={40} color="#ccc" />
            </View>
        );
    }

    return (
        <View style={style}>
            <Image
                source={{ uri }}
                style={[StyleSheet.absoluteFill, style]}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={() => setError(true)}
            />

            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator color="#000" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    fallbackContainer: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});