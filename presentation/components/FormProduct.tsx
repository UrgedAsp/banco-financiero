import { Colors } from '@/constants/theme';
import { validateProductId } from '@/core/products/actions/validate-product-id.action';
import { Product } from '@/core/products/interfaces/product.interface';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from './CustomButton';
import InputDate from './InputDate';
import InputText from './InputText';

interface FormProductProps {
    initialState?: Product;
    isUpdate?: boolean;
    onSubmit: (data: Product) => void;
}

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('ID no válido!')
        .min(3, 'ID no válido!')
        .max(10, 'ID no válido!'),
    name: Yup.string()
        .required('Este campo es requerido!')
        .min(5, 'Mínimo 5 caracteres!')
        .max(100, 'Máximo 100 caracteres!'),
    description: Yup.string()
        .required('Este campo es requerido!')
        .min(10, 'Mínimo 10 caracteres!')
        .max(200, 'Máximo 200 caracteres!'),
    logo: Yup.string()
        .required('Este campo es requerido!'),
    date_release: Yup.date()
        .required('Este campo es requerido!')
        .min(new Date(new Date().setHours(0, 0, 0, 0)), 'La fecha debe ser igual o mayor a la fecha actual!'),
    date_revision: Yup.date()
        .required('Este campo es requerido!')
});


export default function FormProduct({ initialState, isUpdate = false, onSubmit }: FormProductProps) {

    const formik = useFormik<Product>({
        initialValues: {
            id: initialState?.id || '',
            name: initialState?.name || '',
            description: initialState?.description || '',
            logo: initialState?.logo || '',
            date_release: initialState?.date_release || '',
            date_revision: initialState?.date_revision || '',
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            const exists = await validateProductIdForm(values.id);
            if (!exists) {
                onSubmit(values);
            }
        },
    });

    const { handleChange, handleSubmit, values, errors, touched, setFieldValue, resetForm, setFieldError, isSubmitting } = formik;

    useEffect(() => {
        validateProductIdForm(values.id);
    }, [values.id]);

    const validateProductIdForm = async (id: string) => {
        if (!isUpdate && id.length >= 3 && id.length <= 10) {
            const exists = await validateProductId(id);
            if (exists) {
                setFieldError('id', 'ID ya existe!');
                return true;
            }
            return false;
        }
    }

    const handleDateReleaseChange = (text: string) => {
        setFieldValue('date_release', text);
        const releaseDate = new Date(text);
        if (!isNaN(releaseDate.getTime())) {
            const revisionDate = new Date(releaseDate);
            revisionDate.setFullYear(revisionDate.getFullYear() + 1);
            setFieldValue('date_revision', revisionDate.toISOString().split('T')[0]);
        } else {
            setFieldValue('date_revision', '');
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Formulario de {isUpdate ? 'Actualización' : 'Registro'}</Text>

                <View style={styles.formContent}>
                    <InputText
                        label='ID'
                        placeholder='ID'
                        value={values.id}
                        onChangeText={(text) => { setFieldValue('id', text.toUpperCase()) }}
                        isError={touched.id && !!errors.id}
                        error={errors.id}
                        onlyRead={isUpdate}
                    />

                    <InputText
                        label='Nombre'
                        placeholder='Nombre'
                        value={values.name}
                        onChangeText={handleChange('name')}
                        isError={touched.name && !!errors.name}
                        error={errors.name}
                    />

                    <InputText
                        label='Descripción'
                        placeholder='Descripción'
                        value={values.description}
                        onChangeText={handleChange('description')}
                        isError={touched.description && !!errors.description}
                        error={errors.description}
                    />

                    <InputText
                        label='Logo'
                        placeholder='Logo'
                        value={values.logo}
                        onChangeText={handleChange('logo')}
                        isError={touched.logo && !!errors.logo}
                        error={errors.logo}
                    />

                    <InputDate
                        label='Fecha de liberación'
                        placeholder='YYYY-MM-DD'
                        value={values.date_release}
                        onChange={handleDateReleaseChange}
                        isError={touched.date_release && !!errors.date_release}
                        error={errors.date_release as string}
                    />

                    <InputText
                        label='Fecha de revisión'
                        placeholder='YYYY-MM-DD'
                        value={values.date_revision}
                        onChangeText={() => { }}
                        onlyRead={true}
                        isError={touched.date_revision && !!errors.date_revision}
                        error={errors.date_revision as string}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Enviar"
                        type="primary"
                        disabled={isSubmitting}
                        onPress={() => handleSubmit()}
                    />

                    <CustomButton
                        title="Reiniciar"
                        type="secondary"
                        onPress={() => resetForm()}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.primaryText,
    },
    formContent: {
        gap: 15,
        marginBottom: 30,
    },
    buttonContainer: {
        gap: 10,
    }
});
