import { StyleSheet } from "react-native";
import { Provider, Portal, Modal, Text } from "react-native-paper";
import AuthContent from "./AuthContent";

const LoginModal = ({ showModal, onDismiss, children }) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          contentContainerStyle={styles.containerStyle}
          onDismiss={onDismiss}
        >
          <AuthContent isLogin />
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
