import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/Config";
import { ref, get } from "firebase/database";

export default function InformacionScreen({ navigation }: any) {
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(db, "Players/" + user.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setInfo(snapshot.val());
                }
            });
        }
    }, []);

    const logout = () => {
        auth.signOut();
        navigation.replace("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ℹ️ Información del Usuario</Text>

            {info ? (
                <View style={styles.card}>
                    <Text style={styles.label}>👤 Nombre</Text>
                    <Text style={styles.value}>{info.nombre}</Text>

                    <Text style={styles.label}>📧 Email</Text>
                    <Text style={styles.value}>{info.email}</Text>

                    <Text style={styles.label}>🎂 Edad</Text>
                    <Text style={styles.value}>{info.edad}</Text>
                </View>
            ) : (
                <Text style={styles.error}>No se pudo cargar la información</Text>
            )}

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
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
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    card: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        color: "#222",
        marginBottom: 5,
    },
    error: {
        fontSize: 16,
        color: "red",
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
