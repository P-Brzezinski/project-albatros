import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";

const PlayerGridTile = ({ label, icon, onPress }) => {
  return (
    <Card style={styles.gridStyle}>
      <Button onPress={onPress} icon={icon}>{label}</Button>
    </Card>
  );
};

export default PlayerGridTile;

const styles = StyleSheet.create({
  gridStyle: {
    margin: 8
  }
});
