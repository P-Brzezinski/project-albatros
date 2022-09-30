import { Pressable, Text, View } from "react-native"

const PlayerGridTile = ({name}) => {
    return (
      <View>
        <Pressable>
          <View>
            <Text>{name}</Text>
          </View>
        </Pressable>
      </View>
    );
}

export default PlayerGridTile