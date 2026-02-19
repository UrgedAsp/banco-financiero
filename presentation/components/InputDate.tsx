import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface InputDateProps {
    placeholder: string;
    label?: string;
    labelColor?: string;
    error?: string;
    isError?: boolean;
    value: string;
    onChange: (date: string) => void;
}

const InputDate = ({
    placeholder,
    label,
    labelColor = Colors.primaryText,
    error = "",
    isError = false,
    value,
    onChange
}: InputDateProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    /**
     * Convierte un objeto Date a string "YYYY-MM-DD"
     */
    const formatDateToString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleConfirm = (date: Date) => {
        const formattedDate = formatDateToString(date);
        onChange(formattedDate);
        setDatePickerVisibility(false);
    };

    return (
        <View>
            {label && <Text style={[styles.label, { color: labelColor }]}>{label}</Text>}

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setDatePickerVisibility(true)}
                style={[styles.input, isError && styles.inputError]}
            >
                <Text style={[styles.text, !value && styles.placeholder]}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>

            {isError && <Text style={styles.errorText}>{error}</Text>}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                minimumDate={new Date()}
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
                date={value ? new Date(value + 'T12:00:00') : new Date()}
            />
        </View>
    );
};

export default InputDate;

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 16,
        minHeight: 55,
        justifyContent: 'center',
    },
    inputError: {
        borderColor: Colors.error,
    },
    text: {
        fontSize: 15,
        color: Colors.primaryText,
    },
    placeholder: {
        color: '#999',
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 5,
        marginLeft: 4,
    },
});