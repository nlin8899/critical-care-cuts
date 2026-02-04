import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function TopHeader() {
  return (
    <View style={styles.wrap}>
      <Image
        source={require("../assets/images/header.png")}
        style={styles.image}
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    height: 90,  
    backgroundColor: "#d9e3f4",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
