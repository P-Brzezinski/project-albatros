import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoadingOverlay from "./components/UI/LoadingOverlay";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PlayersOverview from "./screens/PlayersOverview";
import PlayerDetails from "./screens/PlayerDetails";
import NewGame from "./screens/NewGame";
import Statistics from "./screens/Statistics";
import { GlobalStyles } from "./constants/styles";
import AddPlayer from "./screens/AddPlayer";
import NewGameContextProvider from "./store/new-game-context";
import { init } from "./util/database";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function ManageGames() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primaryMedium },
        headerTintColor: GlobalStyles.colors.primaryWhite,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primaryMedium },
        tabBarActiveTintColor: GlobalStyles.colors.primaryLight,
        headerRight: ({ tintColor }) => (
          <IconButton
            onPress={authCtx.logout}
            icon="logout"
            iconColor={tintColor}
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

function AuthenticatedStack() {
  return (
    <NewGameContextProvider>
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
            headerTitle: "New Game Screen ",
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                labelVisible={true}
                label="Back"
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
    </NewGameContextProvider>
  );
}

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storedId = await AsyncStorage.getItem("id");
      const storedNickname = await AsyncStorage.getItem("nickname");
      const storedToken = await AsyncStorage.getItem("token");

      if (storedId && storedNickname && storedToken) {
        authCtx.authenticate({
          id: storedId,
          nickname: storedNickname,
          token: storedToken,
        });
      }

      setIsTryingLogin(false);
    };

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="App is loading..." />;
  }

  return <Navigation />;
};

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
    return <LoadingOverlay message="Loading app..." />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
