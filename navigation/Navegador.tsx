import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Auth
import LoginScreen from "../auth/LoginScreen";
import RegistroScreen from "../auth/RegistroScreen";

// Screens
import InformacionScreen from "../screens/InformacionScreen";
import AddStatScoreScreen from "../screens/AddStatScoreScreen";
import StatScoreScreen from "../screens/StatScoreScreen";
import GameListScreen from "../screens/GameListScreen";





const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Información" component={InformacionScreen} />
            <Drawer.Screen name="Registrar Puntaje" component={AddStatScoreScreen} />
            <Drawer.Screen name="Estadísticas" component={StatScoreScreen} />
            <Drawer.Screen name="Lista de Juegos" component={GameListScreen} />
        </Drawer.Navigator>
    );
}

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen
                name="Drawer"
                component={MyDrawer}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
