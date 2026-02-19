import { createUpdateProduct } from "@/core/products/actions/create-update-product.action";
import { Product } from "@/core/products/interfaces/product.interface";
import FormProduct from "@/presentation/components/FormProduct";
import useProductStore from "@/store/useProductStore";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";

export default function updateProduct() {
    const queryClient = useQueryClient();

    const product = useProductStore((state) => state.selectedProduct);

    const onSubmit = async (data: Product) => {
        const response = await createUpdateProduct(data, false);
        if (response && response.data) {
            Alert.alert("Exito", "Producto actualizado exitosamente", [
                {
                    text: "Aceptar",
                    onPress: () => {
                        queryClient.invalidateQueries({ queryKey: ["products"] });
                        router.dismissAll();
                    },
                },
            ]);
        } else {
            Alert.alert("Error", "Error al actualizar el producto");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <FormProduct onSubmit={onSubmit} initialState={product || undefined} isUpdate={true} />
        </View>
    );
}
