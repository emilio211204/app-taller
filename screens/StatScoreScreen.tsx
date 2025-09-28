import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase/Config";

export default function StatScoreScreen() {
    const [stats, setStats] = useState<any>();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const scoresRef = ref(db, "users/" + userId + "/scores");
        onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const scores = Object.values(data).map((item: any) => item.score);
                const total = scores.reduce((a, b) => a + b, 0);
                const max = Math.max(...scores);
                const promedio = total / scores.length;

                setStats({
                    puntajeTotal: total,
                    puntajeAlto: max,
                    puntajePromedio: promedio,
                    cantidadJuegos: scores.length,
                });
            } else {
                setStats(null);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📊 Estadísticas de Juego</Text>

            {stats ? (
                <View style={styles.cardContainer}>
                    <View style={[styles.card, { backgroundColor: "#4e73df" }]}>
                        <Text style={styles.label}>Puntaje Total</Text>
                        <Text style={styles.value}>{stats.puntajeTotal}</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: "#1cc88a" }]}>
                        <Text style={styles.label}>Puntaje Más Alto</Text>
                        <Text style={styles.value}>{stats.puntajeAlto}</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: "#36b9cc" }]}>
                        <Text style={styles.label}>Promedio</Text>
                        <Text style={styles.value}>{stats.puntajePromedio.toFixed(2)}</Text>
                    </View>

                    <View style={[styles.card, { backgroundColor: "#f6c23e" }]}>
                        <Text style={styles.label}>Juegos Registrados</Text>
                        <Text style={styles.value}>{stats.cantidadJuegos}</Text>
                    </View>
                </View>
            ) : (
                <Text style={styles.noData}>Aún no tienes puntajes registrados</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f4f7",
        padding: 20,
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    cardContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    label: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
    value: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
    },
    noData: {
        fontSize: 16,
        color: "#888",
        marginTop: 20,
    },
});
