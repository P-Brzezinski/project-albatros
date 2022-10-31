import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'

import PlayersOverview from "./screens/PlayersOverview";
import PlayerDetails from "./screens/PlayerDetails";
import NewGame from "./screens/NewGame";
import Statistics from "./screens/Statistics";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import AddPlayer from "./screens/AddPlayer";
import PickedPlayersProvider from "./store/picked-players-context";
import EndGame from "./screens/EndGame";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ManageGames() {
return (
  <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primaryMedium },
      headerTintColor: GlobalStyles.colors.primaryWhite,
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primaryMedium },
      tabBarActiveTintColor: GlobalStyles.colors.primaryLight,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="person-add-outline"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("AddPlayer");
          }}
        />
      ),
    })}
  >
    <BottomTabs.Screen
      name="PlayersOverview"
      component={PlayersOverview}
      options={{
        title: "Players Overview",
        tabBarLabel: "Players",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Statistics"
      component={Statistics}
      options={{
        title: "Statistics",
        tabBarLabel: "Statistics",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart-outline" size={size} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <PickedPlayersProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ManageGames"
              component={ManageGames}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="NewGame" component={NewGame} />
            <Stack.Screen name="EndGame" component={EndGame} />
            <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
            <Stack.Screen name="AddPlayer" component={AddPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </PickedPlayersProvider>
    </>
  );
}