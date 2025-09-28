import React, { useState } from "react";
import {Alert, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Config";
import { ref, set } from "firebase/database";

export default function RegistroScreen({ navigation }: any) {
    const [email, setemail] = useState("");
    const [contrasenia, setcontrasenia] = useState("");
    const [nombre, setnombre] = useState("");
    const [edad, setedad] = useState(0);

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

    function registro() {
        if (!validarCampos()) return;

        createUserWithEmailAndPassword(auth, email, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                guardar(user.uid);
                navigation.navigate("Login");
            })
            .catch((error) => {
                Alert.alert(error.code, error.message);
            });
    }

    function guardar(uid: String) {
        set(ref(db, "Players/" + uid), {
            nombre: nombre,
            email: email,
            edad: edad,
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>📝 Registro</Text>

                <TextInput
                    placeholder="Nombre"
                    onChangeText={setnombre}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Edad"
                    keyboardType="numeric"
                    onChangeText={(texto) => setedad(+texto)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setemail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={setcontrasenia}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={registro}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                >
                    ¿Ya tienes cuenta? Inicia sesión aquí
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
