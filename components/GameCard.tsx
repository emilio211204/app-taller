import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type GameProps = {
    titulo: string;
    imagen: string;
    precio: number;
    plataformas: string[];
};

export default function GameCard({ titulo, imagen, precio, plataformas }: GameProps) {
    return (
        <View style={styles.card}>
            {/* Imagen del juego */}
            {imagen ? (
                <Image source={{ uri: imagen }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                    <Text style={styles.placeholderText}>No hay imagen</Text>
                </View>
            )}

            {/* Información del juego */}
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.price}>💲 {precio}</Text>
            <Text style={styles.platforms}>
                🎮 {plataformas.join(", ")}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
    },
    placeholder: {
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: "#555",
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: "#009985",
        marginBottom: 5,
    },
    platforms: {
        fontSize: 14,
        color: "#555",
    },
});
