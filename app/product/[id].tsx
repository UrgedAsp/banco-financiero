import { Colors } from "@/constants/theme";
import { deleteProduct } from "@/core/products/actions/delete-product.action";
import CustomButton from "@/presentation/components/CustomButton";
import ModalConfirmation from "@/presentation/components/ModalConfirmation";
import { SafeImage } from "@/presentation/components/SafeImage";
import useProductStore from "@/store/useProductStore";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ProductDetail() {

    const product = useProductStore((state) => state.selectedProduct);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const queryClient = useQueryClient();

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Producto no encontrado</Text>
            </View>
        );
    }

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id);
            setIsModalVisible(false);
            Alert.alert("Éxito", "Producto eliminado correctamente", [
                {
                    text: "OK",
                    onPress: () => {
                        queryClient.invalidateQueries({ queryKey: ["products"] });
                        router.back();
                    },
                },
            ]);
        } catch (error) {
            console.log(error);
            setIsModalVisible(false);
            Alert.alert("Error", "Ocurrió un error al eliminar el producto, inténtelo de nuevo más tarde");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ID: {product.id}</Text>
            <Text style={styles.subheader}>Información extra</Text>
            <View style={styles.content}>
                <Row label="Nombre" value={product.name} />
                <Row label="Descripción" value={product.description} />
                <View>
                    <Text style={styles.infoLabel}>Logo</Text>
                    <SafeImage uri={product.logo} style={styles.logo} />
                </View>
                <Row label="Fecha de lanzamiento" value={product?.date_release} />
                <Row label="Fecha de revisión" value={product?.date_revision} />
            </View>
            <View style={styles.actions}>
                <CustomButton title="Editar" type="primary" onPress={() => { router.push("/update-product") }} />
                <CustomButton title="Eliminar" type="tertiary" onPress={() => setIsModalVisible(true)} />
            </View>

            <ModalConfirmation
                visible={isModalVisible}
                message={`¿Estás seguro de eliminar el producto "${product.name}"?`}
                onConfirm={handleDeleteProduct}
                onCancel={() => setIsModalVisible(false)}
            />
        </View>
    );
}

const Row = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primaryText,
    },
    subheader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.secondaryText,
    },
    content: {
        padding: 20,
        gap: 10,
        marginTop: 25
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 250,
        height: 150,
    },
    infoLabel: {
        fontSize: 16,
        color: Colors.secondaryText,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        color: Colors.primaryText,
        fontWeight: '600',
    },
    actions: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'column',
        gap: 12,
    },
});
