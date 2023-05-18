import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Provider, Portal, Modal } from "react-native-paper";
import { NewGameContext } from "../../store/new-game-context";
import { login } from "../../util/auth";
import Player from "../../models/player";
import LoadingOverlay from "../UI/LoadingOverlay";
import AuthContent from "./AuthContent";

const LoginModal = ({ showModal, onDismiss, children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const newGameCtx = useContext(NewGameContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const responseData = await login(email, password);
      const pickedPlayer = new Player(
        responseData.nickname,
        responseData.nickname
      );
      newGameCtx.pickPlayer(pickedPlayer);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later"
      );
    }
    onDismiss();
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          contentContainerStyle={styles.containerStyle}
          onDismiss={onDismiss}
        >
          <AuthContent onAuthenticate={loginHandler} isLogin />
        </Modal>
      </Portal>
      {children}
    </Provider>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 24,
    margin: 16,
  },
});
