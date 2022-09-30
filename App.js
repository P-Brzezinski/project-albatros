import { StatusBar } from "expo-status-bar";
import PlayersScreen from "./screens/PlayersScreen";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
        <PlayersScreen />
    </>
  );
}