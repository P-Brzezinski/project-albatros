import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PlayersOverview from "./screens/PlayersOverview";
import PlayerDetails from "./screens/PlayerDetails";
import NewGame from "./screens/NewGame";
import Statistics from "./screens/Statistics";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import AddPlayer from "./screens/AddPlayer";
import NewGameContextProvider from "./store/new-game-context";
import { init } from "./util/database";

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
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err); // TODO Error handling
      });
  }, []);

  if (!dbInitialized) {
    return null; // TODO Loading...
  }

  return (
    <>
      <StatusBar style="dark" />
      <NewGameContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ManageGames"
              component={ManageGames}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewGame"
              component={NewGame}
              options={({ navigation }) => ({
                headerTitle: "Custom title",
                headerBackTitle: "Back",
                headerLeft: (props) => (
                  <HeaderBackButton
                    {...props}
                    title= "bck"
                    label="BCK" // TODO label does not show
                    onPress={() => {
                      Alert.alert(
                        "Discard changes?",
                        "Your game will be lost if you confirm.",
                        [
                          {
                            text: "No, continue playing",
                            onPress: () => {},
                          },
                          {
                            text: "Discard",
                            onPress: () => navigation.goBack(),
                            style: "destructive",
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
            <Stack.Screen name="AddPlayer" component={AddPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </NewGameContextProvider>
    </>
  );
}