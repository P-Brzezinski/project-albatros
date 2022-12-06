import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";
import { NewGameContext } from "../../store/new-game-context";
import { padToTwo } from "../../util/TimeHelper";

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
        {!stopTimer && (
          <Button
            onPress={handleStartStop}
            icon="av-timer"
            mode="outlined"
            textColor={GlobalStyles.colors.primaryMedium}
            buttonColor={GlobalStyles.colors.primaryLight}
            style={{borderColor: GlobalStyles.colors.primaryMedium, marginTop: 32}}
          >
            {!pauseTimer === true ? "Stop" : "Start"}
          </Button>
        )}
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
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
  }
});
