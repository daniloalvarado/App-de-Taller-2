import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PlantCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  habito?: string;
  familia?: string;
}

export function PlantCard({ id, title, habito = "Planta", familia = "TBD", imageUrl }: PlantCardProps) {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  return (
    <View style={{ width: "48%", marginBottom: 16 }}>
      <Link href={`/plant/${id}`} asChild>
        <Pressable style={[styles.card, { backgroundColor: colorScheme === "dark" ? "#1A2F22" : "#E8F5E9" }]}>
          {/* Image container */}
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%', borderRadius: 12 }} resizeMode="cover" />
            ) : (
              <MaterialCommunityIcons name="leaf" size={60} color="#1FC451" />
            )}
          </View>
          
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{title}</Text>
          
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="sprout" size={14} color="#1FC451" />
              <Text style={[styles.badgeText, { color: theme.text }]} numberOfLines={1}>{habito}</Text>
            </View>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="file-tree" size={14} color="#f59e0b" />
              <Text style={[styles.badgeText, { color: theme.text }]} numberOfLines={1}>{familia}</Text>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  badgeText: {
    fontSize: 10,
    opacity: 0.8,
  },
});
