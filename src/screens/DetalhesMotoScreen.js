import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { apiJava } from '../services/api';

export default function DetalhesMotoScreen({ route, navigation }) {
    const { motoId } = route.params;
    const [moto, setMoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme(); 
    const styles = getStyles(colors); 

    const carregarDetalhes = async () => {
        setLoading(true);
        try {
            const response = await apiJava.get(`/moto/${motoId}`);
            setMoto(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da moto:", error);
            Alert.alert("Erro", "Não foi possível carregar os detalhes da moto.");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            carregarDetalhes();
        }, [motoId])
    );

    const handleDelete = async () => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja apagar a moto de placa ${moto.placa}?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sim, Apagar", 
                    style: "destructive", 
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await apiJava.delete(`/moto/${moto.id}`);
                            Alert.alert("Sucesso", "Moto apagada do sistema.");
                            navigation.goBack();
                        } catch (error) {
                            console.error("Erro ao apagar moto:", error);
                            Alert.alert("Erro", "Não foi possível apagar a moto.");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    if (loading || !moto) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Detalhes da Moto</Text>
            <View style={styles.detailsCard}>
                <Text style={styles.detailItem}>ID: {moto.id}</Text>
                <Text style={styles.detailItem}>Placa: {moto.placa}</Text>
                <Text style={styles.detailItem}>Chassi: {moto.chassi}</Text>
                <Text style={styles.detailItem}>Modelo: {moto.modeloMoto}</Text>
                <Text style={styles.detailItem}>Ano: {moto.ano}</Text>
                <Text style={styles.detailItem}>Status: {moto.statusMoto}</Text>
                <Text style={styles.detailItem}>Filial: {moto.filial.nome}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Editar Moto" 
                    onPress={() => navigation.navigate('EditarMoto', { moto: moto })} 
                    color={colors.primary} // ALTERADO: de theme.primary para colors.primary
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Apagar Moto" 
                    onPress={handleDelete} 
                    color={colors.danger} // ALTERADO: de theme.danger para colors.danger
                />
            </View>
        </ScrollView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: colors.text },
    detailsCard: { backgroundColor: colors.card, padding: 20, borderRadius: 10, marginBottom: 20 },
    detailItem: { fontSize: 18, marginBottom: 10, color: colors.text },
    buttonContainer: { marginVertical: 10 }
});