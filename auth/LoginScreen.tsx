import React, { useState } from "react";
import {Alert, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Config";

export default function LoginScreen({ navigation }: any) {
    const [email, setemail] = useState("");
    const [contrasenia, setcontrasenia] = useState("");

    function validarCampos() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "El email no tiene un formato válido");
            return false;
        }

        if (contrasenia.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        return true;
    }

    function login() {
        if (!validarCampos()) return;

        signInWithEmailAndPassword(auth, email, contrasenia)
            .then(() => {
                navigation.navigate("Drawer");
            })
            .catch((error) => {
                Alert.alert(error.code, error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>🔐 Iniciar Sesión</Text>

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setemail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={contrasenia}
                    onChangeText={setcontrasenia}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Registro")}
                >
                    ¿No tienes cuenta? Regístrate aquí
                </Text>
            </View>
        </View>
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
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#476bb8",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 15,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        fontSize: 14,
        color: "#476bb8",
        textDecorationLine: "underline",
    },
});
