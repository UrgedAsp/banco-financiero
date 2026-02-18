import { Colors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface InputTextProps {
    placeholder: string;
    label?: string;
    labelColor?: string;
    error?: string;
    isError?: boolean;
    regex?: RegExp;
    onlyRead?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

const InputText = ({
    placeholder,
    label,
    labelColor = Colors.primaryText,
    error = "",
    isError = false,
    regex = /.*/,
    onlyRead = false,
    value,
    onChangeText
}: InputTextProps) => {

    const handleTextChange = (text: string) => {
        if (regex.test(text)) {
            onChangeText(text);
        }
    }
    return (
        <View>
            {label && <Text style={{ color: labelColor }}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={handleTextChange}
                style={[styles.input, isError && styles.inputError, onlyRead && styles.inputRead]}
                editable={!onlyRead}
            />
            {isError && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        backgroundColor: Colors.background,
        borderRadius: 8,
        padding: 16,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
    },
    inputRead: {
        backgroundColor: "#d7d4d4ff",
    }
})
