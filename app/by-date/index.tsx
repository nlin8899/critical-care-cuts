import { Link } from "expo-router";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TopHeader from "../../components/TopHeader";
import { db } from "../../lib/firebase";
import { parseYMD, sequenceForToday, weekdayIndex } from "../../lib/schedule";


type AppConfig = {
  shipDate: string;
  totalCuts: number;
  holidays?: string[];
};

type Cut = {
  id: string;
  sequence: number;
  title: string;
  body: string;
};

export default function ByDateScreen() {

  const [loading, setLoading] = useState(true);
  const [todayCut, setTodayCut] = useState<Cut | null>(null);
  const [cuts, setCuts] = useState<Cut[]>([]);

  
  useEffect(() => {
    async function load() {
      try {
        const configSnap = await getDoc(doc(db, "config", "app"));
        const cfg = configSnap.data() as AppConfig;

        const ship = parseYMD(cfg.shipDate);
        const today = new Date();
        const dayIdx = weekdayIndex(ship, today);
        const seq = sequenceForToday(dayIdx, cfg.totalCuts);
        
        const q = query(collection(db, "cuts"), where("sequence", "==", seq), limit(1));
        const snap = await getDocs(q);
        const row = snap.docs[0];

        setTodayCut(row ? ({ id: row.id, ...(row.data() as any) } as Cut) : null);

        const listQ = query(collection(db, "cuts"), orderBy("sequence", "asc"));
        const listSnap = await getDocs(listQ);
        setCuts(listSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Cut[]);
      
      } finally {
        setLoading(false);}} 
        
        load();
      }, []);

      
  return (
  <View style={styles.screen}>
    <TopHeader />
    
  {loading ? (
      <Text style={{ padding: 16 }}>Loading…</Text>
    ) : !todayCut ? (
      <Text style={{ padding: 16 }}>No cut found.</Text>
    ) : (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
        {todayCut.title}
        </Text>
        
        <Text style={{ marginTop: 10, lineHeight: 22 }}>
          {todayCut.body}
        </Text>
      </View>
    )}

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
      data={cuts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
        <Text style={styles.dateLabel}>
          {index === 0 ? "Today's Cut" : `Cut #${item.sequence}`}
        </Text>

          {index === 0 && <View style={styles.todayBar} />}

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.preview}>{item.body}</Text>

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
