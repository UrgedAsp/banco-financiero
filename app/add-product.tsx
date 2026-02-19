import { createUpdateProduct } from '@/core/products/actions/create-update-product.action';
import { Product } from '@/core/products/interfaces/product.interface';
import FormProduct from '@/presentation/components/FormProduct';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert, View } from 'react-native';

export default function addProduct() {

    const queryClient = useQueryClient();

    const onSubmit = async (data: Product) => {
        const response = await createUpdateProduct(data, true);
        if (response && response.data) {
            Alert.alert('Exito', 'Producto creado exitosamente', [
                {
                    text: 'Aceptar',
                    onPress: () => { queryClient.invalidateQueries({ queryKey: ["products"] }); router.back() }
                }
            ]);
        } else {
            Alert.alert('Error', 'Error al crear el producto');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FormProduct onSubmit={onSubmit} />
        </View>
    )
}