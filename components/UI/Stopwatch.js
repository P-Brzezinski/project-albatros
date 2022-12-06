import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { NewGameContext } from "../../store/new-game-context";
import { padToTwo } from "../../util/TimeHelper";
import Button from "./Button";

const Stopwatch = ({ stopTimer }) => {
  const [timer, setTimer] = useState({ h: 0, min: 0, sec: 0 });
  const [pauseTimer, setPauseTimer] = useState(false);
  const newGameCtx = useContext(NewGameContext);

  const handleStartStop = () => {
    setPauseTimer((prevState) => !prevState);
  };

  const noticeCurrentTimeAndHandleStartStop = () => {
    if (!pauseTimer) {
      handleStartStop();
    }
    newGameCtx.noticeTime(timer);
  };

  useEffect(() => {
    if (stopTimer) {
      noticeCurrentTimeAndHandleStartStop();
    }
  }, [stopTimer]);

  useEffect(() => {
    if (!pauseTimer) {
      const interval = setInterval(() => {
        if (timer.sec !== 59) {
          setTimer({ ...timer, sec: ++timer.sec });
        } else if (timer.min !== 59) {
          setTimer({ ...timer, min: ++timer.min, sec: 0 });
        } else {
          setTimer({ h: ++timer.h, min: 0, sec: 0 });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, pauseTimer]);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.digits}>{padToTwo(timer.h) + " : "}</Text>
        <Text style={styles.digits}>{padToTwo(timer.min) + " : "}</Text>
        <Text style={styles.digits}>{padToTwo(timer.sec)}</Text>
      </View>
      <View style={styles.buttonParent}>
        {!stopTimer && (
          <Button onPress={handleStartStop}>
            {!pauseTimer === true ? "Stop" : "Start"}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    margin: 32,
    alignItems: "center",
  },
  timer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 80,
    borderColor: GlobalStyles.colors.primaryMedium,
    backgroundColor: GlobalStyles.colors.primaryLight,
    paddingLeft: "8%",
    paddingRight: "8%",
    paddingTop: ".5%",
    paddingBottom: ".5%",
  },
  digits: {
    fontSize: 40,
    color: GlobalStyles.colors.primaryMedium,
  },
  buttonParent: {
    flexDirection: "row",
    marginTop: "12%",
  },
  button: {
    backgroundColor: GlobalStyles.colors.primaryLight,
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primaryMedium,
    height: 60,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: GlobalStyles.colors.primaryMedium,
    fontSize: 20,
    alignSelf: "center",
  },
});
