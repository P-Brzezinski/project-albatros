import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlayersScreen from "./screens/PlayersScreen";
import PlayerDetails from "./components/player/PlayerDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PlayersScreen" component={PlayersScreen} />
          <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}