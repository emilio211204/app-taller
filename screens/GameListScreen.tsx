import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import GameCard from "../components/GameCard";

export default function GameListScreen() {
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jritsqmet.github.io/web-api/videojuegos.json")
            .then((res) => res.json())
            .then((data) => {
                setGames(data.videojuegos);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#000" />;

    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
            {games.map((game, index) => (
                <GameCard
                    key={index}
                    titulo={game.titulo || "Sin título"}
                    imagen={game.imagen || ""}
                    precio={game.precio || 0}
                    plataformas={Array.isArray(game.plataformas) ? game.plataformas : ["No disponible"]}
                />
            ))}
        </ScrollView>
    );
}
