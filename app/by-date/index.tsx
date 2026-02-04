import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TopHeader from "../../components/TopHeader";


type Cut = { id: string; dateLabel: string; title: string; preview: string };

const FAKE_CUTS: Cut[] = [
  {
    id: "1",
    dateLabel: "Today's Cut: Feb 3, 2026",
    title: "US Assisted Pulse Checks",
    preview:
      "The accuracy of manual pulse check has been reported to be as low as 54%...",
  },
  {
    id: "2",
    dateLabel: "Feb 4, 2026",
    title: "Primary Survey: Airway",
    preview: "A is for Airway. Is your patient protecting their airway? ...",
  },
];

export default function ByDateScreen() {
  return (
  <View style={styles.screen}>
    <TopHeader />

    {/* Segmented control (UI only) */}
    <View style={styles.segmentWrap}>
      <View style={[styles.segment, styles.segmentActive]}>
        <Text style={styles.segmentActiveText}>By Date</Text>
      </View>
      <View style={styles.segment}>
        <Text style={styles.segmentText}>By Topic</Text>
      </View>
    </View>

    {/* Search bar */}
    <View style={styles.searchWrap}>
      <TextInput placeholder="Search" style={styles.searchInput} />
    </View>

    {/* List */}
    <FlatList
      data={FAKE_CUTS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Text style={styles.dateLabel}>{item.dateLabel}</Text>

          {index === 0 && <View style={styles.todayBar} />}

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.preview}>{item.preview}</Text>

          <Link
            href={{ pathname: "/by-date/[id]", params: { id: item.id } }}
            asChild
          >
            <Pressable style={styles.openBtn}>
              <Text style={styles.openBtnText}>Open</Text>
            </Pressable>
          </Link>
        </View>
      )}
    />
  </View>
);}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },

  segmentWrap: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  segment: { flex: 1, paddingVertical: 10, alignItems: "center" },
  segmentActive: { backgroundColor: "white" },
  segmentText: { fontSize: 14, fontWeight: "600", color: "#555" },
  segmentActiveText: { fontSize: 14, fontWeight: "700", color: "#111" },

  searchWrap: { paddingHorizontal: 16, paddingVertical: 10 },
  searchInput: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
  },

  card: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
  },
  dateLabel: { fontSize: 14, fontWeight: "600", color: "#2a5b8f" },
  todayBar: { height: 6, backgroundColor: "#2a5b8f", marginTop: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "800", marginTop: 8 },
  preview: { marginTop: 8, color: "#333", lineHeight: 20 },

  openBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#0b3a82",
  },
  openBtnText: { color: "white", fontWeight: "700" },
});
