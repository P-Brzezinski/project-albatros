import { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import GridTile from "../components/Player/GridTile";
import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { NewGameContext } from "../store/new-game-context";
import Player from "../models/player";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import LoginModal from "../components/Auth/LoginModal";

const PlayersOverview = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const newGameCtx = useContext(NewGameContext);
  const authCtx = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const showModal = () => setShowLoginModal(true);
  const hideModal = () => setShowLoginModal(false);

  useEffect(() => {
    if (authCtx.nickname != null) {
      const firstPlayer = new Player(
        authCtx.id,
        authCtx.nickname
      );
      newGameCtx.pickPlayer(firstPlayer);
    }
    setIsLoading(false);
  }, []);

  const renderAddPlayerTile = () => {
    return <GridTile icon="account-plus" onPress={showModal} />;
  };

  const renderPlayerTile = (playerData) => {
    const pressPlayerItem = () => {
      navigation.navigate("PlayerDetails", { player: playerData.item });
    };
    return <GridTile label={playerData.item.name} onPress={pressPlayerItem} />;
  };

  const newGame = () => {
    newGameCtx.newGame();
    navigation.navigate("NewGame");
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading players..." />;
  }

  return (
    <>
      <LoginModal showModal={showLoginModal} onDismiss={hideModal}>
        <FlatList
          data={newGameCtx.players}
          keyExtractor={(item) => item.id}
          renderItem={renderPlayerTile}
          numColumns={2}
          style={styles.list}
          ListFooterComponent={renderAddPlayerTile}
        />
        <View style={styles.newGameButtonContainer}>
          <Button
            icon="sword-cross"
            mode="contained"
            buttonColor={GlobalStyles.colors.primaryMedium}
            onPress={newGame}
          >
            New Game
          </Button>
        </View>
      </LoginModal>
    </>
  );
};

export default PlayersOverview;

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    margin: 5,
    flexDirection: "column",
  },
  newGameButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
  },
});
