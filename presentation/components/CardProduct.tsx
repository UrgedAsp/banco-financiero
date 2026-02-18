import { Product } from '@/core/products/interfaces/product.interface';
import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CardProductProps {
    product: Product;
    onPress: () => void;
}

export default function CardProduct({ product, onPress }: CardProductProps) {
    return (
        <Pressable style={styles.container} onPress={() => onPress()}>
            <View>
                <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>{product.name}</Text>
                <Text style={styles.description} adjustsFontSizeToFit numberOfLines={1}>ID: {product.id}</Text>
            </View>
            <AntDesign name="right" size={14} color="black" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
    }
})