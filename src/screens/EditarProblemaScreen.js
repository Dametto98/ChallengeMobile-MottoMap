import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from 'react-i18next';

export default function EditarProblemaScreen({ route, navigation }) {
    const { problema, motoId } = route.params;
    const { colors, theme } = useTheme();
    const { t } = useTranslation();
    const styles = getStyles(colors);

    const tiposProblemaItems = [
        { label: t('problemTypeMechanical'), value: 'MECANICO' },
        { label: t('problemTypeElectrical'), value: 'ELETRICO' },
        { label: t('problemTypeBodywork'), value: 'CARROCERIA' },
        { label: t('problemTypeSecurity'), value: 'SEGURANCA' },
        { label: t('problemTypeLegal'), value: 'LEGAL' },
        { label: t('problemTypeOther'), value: 'OUTRO' },
    ];

    
    const [open, setOpen] = useState(false);
    const [tipoProblema, setTipoProblema] = useState(problema.tipoProblema);
    const [items, setItems] = useState(tiposProblemaItems); 
    const [descricao, setDescricao] = useState(problema.descricao);
    const [resolvido, setResolvido] = useState(problema.resolvido);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!tipoProblema) newErrors.tipo = t('errorRequired');
        if (!descricao) {
            newErrors.descricao = t('errorRequired');
        } else if (descricao.length < 10) {
            newErrors.descricao = t('errorDescriptionLength');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validate()) return;
        
        setLoading(true);
        const problemaData = {
            tipoProblema: tipoProblema,
            descricao: descricao,
            dataRegistro: problema.dataRegistro,
            resolvido: resolvido,
            idMoto: motoId,
            idUsuario: problema.usuario.id,
        };

        try {
            await apiJava.put(`/problema/${problema.id}`, problemaData);
            Alert.alert(t('alertSuccess'), t('alertSuccessProblemaUpdated'));
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao atualizar problema:", error.response?.data || error);
            if (error.response && error.response.status === 400 && Array.isArray(error.response.data)) {
                const backendErrors = error.response.data.map(err => err.message).join('\n');
                Alert.alert(t('alertError'), backendErrors);
            } else {
                Alert.alert(t('alertError'), t('alertErrorProblemaUpdated'));
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
            <Text style={styles.label}>{t('labelTipoProblema')}</Text>
            <DropDownPicker
                open={open}
                value={tipoProblema}
                items={items}
                setOpen={setOpen}
                setValue={setTipoProblema}
                setItems={setItems}
                listMode="MODAL"
                theme={theme.toUpperCase()}
                placeholder={t('placeholderSelectProblemType')}
                placeholderStyle={{ color: colors.textSecondary }}
                style={styles.dropdown}
                dropDownContainerStyle={{ backgroundColor: colors.card, borderColor: colors.border }}
                listItemLabelStyle={{ color: colors.text }}
                selectedItemLabelStyle={{ fontWeight: "bold" }}
                zIndex={1000}
            />
            {errors.tipo && <Text style={styles.errorText}>{errors.tipo}</Text>}

            <Text style={styles.label}>{t('labelDescricao')}</Text>
            <TextInput
                style={styles.inputDescricao}
                value={descricao}
                onChangeText={setDescricao}
                placeholder={t('placeholderDescricao')}
                placeholderTextColor={colors.textSecondary}
                multiline={true}
                numberOfLines={4}
            />
            {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

            <View style={styles.switchContainer}>
                <Text style={styles.labelSwitch}>{t('labelResolvido')}</Text>
                <Switch
                    trackColor={{ false: colors.textSecondary, true: colors.primary }}
                    thumbColor={colors.white}
                    onValueChange={setResolvido}
                    value={resolvido}
                />
            </View>
            
            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title={t('updateButton')} onPress={handleUpdate} color={colors.primary} />
                </View>
            )}
        </ScrollView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    label: { fontSize: 16, color: colors.text, marginBottom: 5, marginTop: 15, fontWeight: 'bold' },
    labelSwitch: { fontSize: 16, color: colors.text, fontWeight: 'bold' }, 
    inputDescricao: {
        backgroundColor: colors.card,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    errorText: { color: colors.danger, fontSize: 12, marginTop: 5, marginLeft: 5 },
    buttonContainer: { marginTop: 30, marginBottom: 40 },
    dropdown: {
        backgroundColor: colors.card,
        borderColor: colors.border,
        marginBottom: 15,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: colors.card,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
});