import { PlantCard } from "@/components/PlantCard";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client, urlFor } from "@/lib/sanity";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Text, View } from "tamagui";

export default function HomeScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const [plantas, setPlantas] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHabit, setActiveHabit] = useState("Todo");

  // Filter States
  const [modalVisible, setModalVisible] = useState(false);
  const [filterFlower, setFilterFlower] = useState("");
  const [filterFruit, setFilterFruit] = useState("");
  const [filterSemilla, setFilterSemilla] = useState("");
  const [filterInflorescencia, setFilterInflorescencia] = useState("");
  const [filterExudado, setFilterExudado] = useState("");

  useEffect(() => {
    client.fetch(`*[_type == "planta"]{
      _id,
      nombre_cientifico,
      nombres_comunes,
      habito,
      color_flor,
      tipo_fruto,
      tipo_semilla,
      tipo_inflorescencia,
      exudado,
      familia,
      galeria
    }`).then((data) => {
      setPlantas(data);
    }).catch(console.error);
  }, []);

  const userName = user?.firstName || "Explorador";
  const isAdmin = user?.publicMetadata?.role === "admin";

  // Filter Logic
  const filteredPlantas = plantas.filter((p) => {
    const matchesSearch =
      ((p.nombre_cientifico || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nombres_comunes || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHabit = activeHabit === "Todo" || p.habito === activeHabit;

    // Modal Advanced Filters
    const matchesFlower = !filterFlower || (p.color_flor && p.color_flor.toLowerCase().includes(filterFlower.toLowerCase()));
    const matchesFruit = !filterFruit || (p.tipo_fruto && p.tipo_fruto.toLowerCase().includes(filterFruit.toLowerCase()));
    const matchesSemilla = !filterSemilla || (p.tipo_semilla && p.tipo_semilla.toLowerCase().includes(filterSemilla.toLowerCase()));
    const matchesInflorescencia = !filterInflorescencia || (p.tipo_inflorescencia && p.tipo_inflorescencia.toLowerCase().includes(filterInflorescencia.toLowerCase()));
    const matchesExudado = !filterExudado || (p.exudado && p.exudado.toLowerCase().includes(filterExudado.toLowerCase()));

    return matchesSearch && matchesHabit && matchesFlower && matchesFruit && matchesSemilla && matchesInflorescencia && matchesExudado;
  });

  // Dynamic Options (Extraídas en vivo de la base de datos)
  const habitsList = ["Todo", ...Array.from(new Set(plantas.map(p => p.habito).filter(Boolean)))];
  const flowerList = Array.from(new Set(plantas.map(p => p.color_flor).filter(Boolean)));
  const inflorescenciaList = Array.from(new Set(plantas.map(p => p.tipo_inflorescencia).filter(Boolean)));
  const fruitList = Array.from(new Set(plantas.map(p => p.tipo_fruto).filter(Boolean)));
  const semillaList = Array.from(new Set(plantas.map(p => p.tipo_semilla).filter(Boolean)));
  const exudadoList = Array.from(new Set(plantas.map(p => p.exudado).filter(Boolean)));

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView
        style={[styles.content, { paddingTop: 20 }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar circular size="$4">
              <Avatar.Image src={user?.imageUrl || "https://i.pravatar.cc/150"} />
              <Avatar.Fallback backgroundColor="#1FC451" />
            </Avatar>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={[styles.greeting, { color: '#ffffff' }]}>Hola, {userName}!</Text>
                {isAdmin && (
                  <View style={{ backgroundColor: '#1FC451', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#08130D' }}>ADMIN</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.subtitle, { color: theme.icon }]}>¡Descubre la flora amazónica hoy!</Text>
            </View>
          </View>
          <View style={[styles.bellContainer, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
            <MaterialCommunityIcons name="bell" size={20} color={theme.text} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
          <MaterialCommunityIcons name="magnify" size={20} color={theme.icon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Por nombre científico o común..."
            placeholderTextColor={theme.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={() => setModalVisible(true)}
            style={[styles.filterButton, { backgroundColor: "rgba(255,255,255,0.1)" }]}
          >
            <MaterialCommunityIcons name="filter-variant" size={20} color={theme.text} />
          </Pressable>
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Descubre por Hábito</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {habitsList.map((habit) => (
            <Pressable
              key={habit}
              onPress={() => setActiveHabit(habit)}
              style={[
                styles.categoryBadge,
                activeHabit === habit ? styles.activeCategoryBadge : { backgroundColor: "rgba(255,255,255,0.05)" }
              ]}
            >
              <Text style={activeHabit === habit ? styles.activeCategoryText : { color: theme.icon }}>
                {habit}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Grid of Plants */}
        <View style={styles.gridContainer}>
          {filteredPlantas.length > 0 ? (
            filteredPlantas.map((planta) => {
              const imageUrl = planta.galeria && planta.galeria.length > 0
                ? urlFor(planta.galeria[0]).width(400).url()
                : null;

              return (
                <PlantCard
                  key={planta._id}
                  id={planta._id}
                  title={planta.nombre_cientifico || planta.nombres_comunes || "Planta"}
                  habito={planta.habito || "Planta"}
                  familia={planta.familia || "-"}
                  imageUrl={imageUrl || undefined}
                />
              );
            })
          ) : (
            <>
              {/* Fallback Estático si Sanity está vacío */}
              <PlantCard id="mock-1" title="Heliconia psittacorum" habito="Hierba" familia="Heliconiaceae" />
              <PlantCard id="mock-2" title="Victoria amazonica" habito="Acuática" familia="Nymphaeaceae" />
              <PlantCard id="mock-3" title="Calathea lutea" habito="Hierba" familia="Marantaceae" />
              <PlantCard id="mock-4" title="Costus speciosus" habito="Arbusto" familia="Costaceae" />
            </>
          )}
        </View>
      </ScrollView>

      {/* Advanced Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#12221A' : '#fff' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Filtros Morfológicos</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                <MaterialCommunityIcons name="close" size={20} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              <Text style={[styles.filterLabel, { color: theme.icon }]}>Color de Flor / Inflorescencia</Text>
              <View style={styles.filterChipContainer}>
                {flowerList.length > 0 ? flowerList.map(color => (
                  <Pressable
                    key={color}
                    onPress={() => setFilterFlower(filterFlower === color ? "" : color)}
                    style={[
                      styles.filterChip,
                      filterFlower === color ? { backgroundColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                  >
                    <Text style={{ color: filterFlower === color ? "#08130D" : theme.text, fontWeight: filterFlower === color ? "bold" : "normal" }}>{color}</Text>
                  </Pressable>
                )) : <Text style={{ color: theme.icon, fontSize: 13 }}>Sin registros en BD</Text>}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Inflorescencia</Text>
              <View style={styles.filterChipContainer}>
                {inflorescenciaList.length > 0 ? inflorescenciaList.map(tipo => (
                  <Pressable
                    key={tipo}
                    onPress={() => setFilterInflorescencia(filterInflorescencia === tipo ? "" : tipo)}
                    style={[
                      styles.filterChip,
                      filterInflorescencia === tipo ? { backgroundColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                  >
                    <Text style={{ color: filterInflorescencia === tipo ? "#08130D" : theme.text, fontWeight: filterInflorescencia === tipo ? "bold" : "normal" }}>{tipo}</Text>
                  </Pressable>
                )) : <Text style={{ color: theme.icon, fontSize: 13 }}>Sin registros en BD</Text>}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Fruto</Text>
              <View style={styles.filterChipContainer}>
                {fruitList.length > 0 ? fruitList.map(tipo => (
                  <Pressable
                    key={tipo}
                    onPress={() => setFilterFruit(filterFruit === tipo ? "" : tipo)}
                    style={[
                      styles.filterChip,
                      filterFruit === tipo ? { backgroundColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                  >
                    <Text style={{ color: filterFruit === tipo ? "#08130D" : theme.text, fontWeight: filterFruit === tipo ? "bold" : "normal" }}>{tipo}</Text>
                  </Pressable>
                )) : <Text style={{ color: theme.icon, fontSize: 13 }}>Sin registros en BD</Text>}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Semilla</Text>
              <View style={styles.filterChipContainer}>
                {semillaList.length > 0 ? semillaList.map(tipo => (
                  <Pressable
                    key={tipo}
                    onPress={() => setFilterSemilla(filterSemilla === tipo ? "" : tipo)}
                    style={[
                      styles.filterChip,
                      filterSemilla === tipo ? { backgroundColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                  >
                    <Text style={{ color: filterSemilla === tipo ? "#08130D" : theme.text, fontWeight: filterSemilla === tipo ? "bold" : "normal" }}>{tipo}</Text>
                  </Pressable>
                )) : <Text style={{ color: theme.icon, fontSize: 13 }}>Sin registros en BD</Text>}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Exudado / Látex</Text>
              <View style={styles.filterChipContainer}>
                {exudadoList.length > 0 ? exudadoList.map(tipo => (
                  <Pressable
                    key={tipo}
                    onPress={() => setFilterExudado(filterExudado === tipo ? "" : tipo)}
                    style={[
                      styles.filterChip,
                      filterExudado === tipo ? { backgroundColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                  >
                    <Text style={{ color: filterExudado === tipo ? "#08130D" : theme.text, fontWeight: filterExudado === tipo ? "bold" : "normal" }}>{tipo}</Text>
                  </Pressable>
                )) : <Text style={{ color: theme.icon, fontSize: 13 }}>Sin registros en BD</Text>}
              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
              <Pressable
                onPress={() => {
                  setFilterFruit("");
                  setFilterFlower("");
                  setFilterSemilla("");
                  setFilterInflorescencia("");
                  setFilterExudado("");
                  setActiveHabit("Todo");
                  setModalVisible(false);
                }}
                style={[styles.modalButton, { flex: 1, backgroundColor: "rgba(255,255,255,0.05)" }]}
              >
                <Text style={{ color: theme.text, textAlign: 'center', fontWeight: 'bold' }}>Limpiar</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { flex: 2, backgroundColor: "#1FC451" }]}
              >
                <Text style={{ color: "#08130D", textAlign: 'center', fontWeight: 'bold' }}>Aplicar Filtros</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  bellContainer: {
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryBadge: {
    backgroundColor: "#1FC451",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  closeModalButton: {
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalButton: {
    paddingVertical: 16,
    borderRadius: 12,
  }
});