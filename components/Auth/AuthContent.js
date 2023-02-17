import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";
import { GlobalStyles } from "../../constants/styles";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  const submitHandler = (credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  };

  return (
    <Card style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button
          onPress={switchAuthModeHandler}
          textColor={GlobalStyles.colors.primaryText}
        >
          {isLogin ? "Create a new user" : "Log in instead"}
        </Button>
      </View>
    </Card>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 128,
    marginHorizontal: 32,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primaryLight,
  },
  buttons: {
    marginTop: 8,
  },
});