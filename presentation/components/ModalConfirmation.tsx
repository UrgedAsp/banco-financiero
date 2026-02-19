import { Colors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';


interface ModalConfirmationProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ModalConfirmation({ visible, message, onConfirm, onCancel }: ModalConfirmationProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
                        <MaterialCommunityIcons name="close" size={24} color={Colors.secondaryText} />
                    </TouchableOpacity>

                    <Text style={styles.modalText}>{message}</Text>

                    <View style={styles.divider} />

                    <View style={styles.buttonContainer}>
                        <CustomButton type="primary" title="Confirmar" onPress={onConfirm} />
                        <CustomButton type="secondary" title="Cancelar" onPress={onCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '30%',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalText: {
        marginTop: 40,
        width: '100%',
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
        borderTopWidth: 1,
        borderTopColor: Colors.inputBorder,
        paddingTop: 25,
        paddingHorizontal: 20,
        color: Colors.primaryText,
    },
    divider: {
        borderBottomColor: Colors.inputBorder,
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 15,
    },
    buttonContainer: {
        width: '100%',
        gap: 10,
    },
});