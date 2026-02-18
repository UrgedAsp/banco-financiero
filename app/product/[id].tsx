import { Colors } from "@/constants/theme";
import CustomButton from "@/presentation/components/CustomButton";
import { SafeImage } from "@/presentation/components/SafeImage";
import useProductStore from "@/store/useProductStore";
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetail() {

    const product = useProductStore((state) => state.selectedProduct);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ID: {product.id}</Text>
            <Text style={styles.subheader}>Información extra</Text>
            <View style={styles.content}>
                <Row label="Nombre" value={product.name} />
                <Row label="Descripción" value={product.description} />
                <View>
                    <Text>Logo</Text>
                    <SafeImage uri={product.logo} style={styles.logo} />
                </View>
                <Row label="Fecha de lanzamiento" value={product?.date_release} />
                <Row label="Fecha de revisión" value={product?.date_revision} />
            </View>
            <View style={styles.actions}>
                <CustomButton title="Editar" type="primary" onPress={() => { }} />
                <CustomButton title="Eliminar" type="tertiary" onPress={() => { }} />
            </View>
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
