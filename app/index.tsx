import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function OpeningScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/by-date");
    }, 2500); 

    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/homepage.png")}
        style={styles.full}
        contentFit="cover"  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  full: {
    width: "100%",
    height: "100%",
  },
});
