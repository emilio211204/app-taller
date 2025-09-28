import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform,} from "react-native";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebase/Config";

export default function AddStatScoreScreen() {
    const [game, setGame] = useState("");
    const [score, setScore] = useState("");
    const [date, setDate] = useState("");

    const limpiarCampos = () => {
        setGame("");
        setScore("");
        setDate("");
    };

    const guardarPuntaje = () => {
        if (!game || !score || !date) {
            Alert.alert("Error", "Completa todos los campos");
            return;
        }

        const userId = auth.currentUser?.uid;
        if (!userId) return;

        push(ref(db, "users/" + userId + "/scores"), {
            game,
            score: Number(score),
            date,
        })
            .then(() => {
                Alert.alert("Éxito", "Puntaje guardado");
                limpiarCampos();
            })
            .catch(() => {
                Alert.alert("Error", "No se pudo guardar el puntaje");
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.card}>
                <Text style={styles.header}>➕ Nuevo Puntaje</Text>

                <TextInput
                    placeholder="🎮 Juego"
                    style={styles.input}
                    value={game}
                    onChangeText={setGame}
                />
                <TextInput
                    placeholder="⭐ Puntaje"
                    style={styles.input}
                    keyboardType="numeric"
                    value={score}
                    onChangeText={setScore}
                />
                <TextInput
                    placeholder="📅 Fecha (YYYY-MM-DD)"
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity style={styles.button} onPress={guardarPuntaje}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f4f7",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginVertical: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#476bb8",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
