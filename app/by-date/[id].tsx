import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const FAKE_DETAIL: Record<string, { title: string; body: string }> = {
  "1": {
    title: "Primary Survey: ABCs Intro",
    body:
      "When assessing the undifferentiated critically ill patient...\n\nAlways start by thinking through your A-B-C's and vital signs.\n\n(Placeholder content)",
  },
  "2": {
    title: "Primary Survey: Airway",
    body:
      "A is for Airway.\n\nIs your patient protecting their airway?\n\n(Placeholder content)",
  },
  "3": {
    title: "Primary Survey: Breathing",
    body:
      "B is for Breathing.\n\nAssess RR, work of breathing, SpO2...\n\n(Placeholder content)",
  },
};

export default function CutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = (id && FAKE_DETAIL[id]) || {
    title: "Not Found",
    body: "No content for this item.",
  };

  return (
    <>
      <Stack.Screen options={{ title: "Cut" }} />
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
            {data.title}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, whiteSpace: "pre-wrap" as any }}>
            {data.body}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
