import { StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

const GridTile = ({ label, icon, onPress }) => {
  return (
    <Card style={styles.gridItem}>
      <Button icon={icon} onPress={onPress}>
        {label}
      </Button>
    </Card>
  );
};

export default GridTile;

const styles = StyleSheet.create({
  gridItem: {
    // flex: 1,
    margin: 5,
    backgroundColor: GlobalStyles.colors.primaryWhite,
    // height: 100,
    // width: 200
  },
});
