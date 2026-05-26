import { PlantCard } from "@/components/PlantCard";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client, urlFor } from "@/lib/sanity";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Text, View } from "tamagui";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const [plantas, setPlantas] = useState<any[]>([]);
  const [misPlantas, setMisPlantas] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHabit, setActiveHabit] = useState("Todo");
  const router = useRouter();

  // Filter States
  const [modalVisible, setModalVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [filterFlower, setFilterFlower] = useState("");
  const [filterFruit, setFilterFruit] = useState("");
  const [filterSemilla, setFilterSemilla] = useState("");
  const [filterInflorescencia, setFilterInflorescencia] = useState("");

  const fetchData = async () => {
    try {
      const data = await client.fetch(`*[_type == "planta" && !(_id in path("drafts.**")) && estado_revision == "Validado"]{
        _id,
        nombre_cientifico,
        nombres_comunes,
        habito,
        reproductivo,
        familia,
        galeria
      }`);
      setPlantas(data);
    } catch (e) { console.error(e); }

    if (user?.id) {
      try {
        const misAportes = await client.fetch(`*[_type == "planta" && autor == $userId] | order(_createdAt desc) {
          _id,
          nombre_cientifico,
          estado_revision
        }`, { userId: user.id });
        setMisPlantas(misAportes);

        // Check if there are new updates
        const storedSignature = await AsyncStorage.getItem(`notifs_sig_${user.id}`);
        // Create a signature representing the current state of all records
        const currentSignature = JSON.stringify(misAportes.map((p: any) => p._id + p.estado_revision));
        
        if (storedSignature !== currentSignature && misAportes.length > 0) {
          setHasUnread(true);
        }
      } catch (e) { console.error(e); }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const userName = user?.firstName || "Explorador";
  const isAdmin = user?.publicMetadata?.role === "admin";

  // Filter Logic
  const filteredPlantas = plantas.filter((p) => {
    const matchesSearch =
      ((p.nombre_cientifico || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nombres_comunes || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHabit = activeHabit === "Todo" || p.habito === activeHabit;

    // Modal Advanced Filters (Using new reproductivo schema)
    const matchesFlower = !filterFlower || (p.reproductivo?.flor_color === filterFlower);
    const matchesFruit = !filterFruit || (p.reproductivo?.fruto_tipo === filterFruit || p.reproductivo?.fruto_textura === filterFruit);
    const matchesSemilla = !filterSemilla || (p.reproductivo?.semilla_presencia === filterSemilla);
    const matchesInflorescencia = !filterInflorescencia || (p.reproductivo?.flor_agrupacion === filterInflorescencia);

    return matchesSearch && matchesHabit && matchesFlower && matchesFruit && matchesSemilla && matchesInflorescencia;
  });

  // Dynamic Options merged with static values from PLANT-OR document
  const habitsList = ["Todo", "Árbol", "Palmera", "Arbusto", "Liana", "Hierba"];
  
  // Static lists from PLANT-OR document (always available, even if DB is empty)
  const FLOWER_COLORS = ['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Crema', 'Otro'];
  const FLOWER_GROUPS = ['Solitaria', 'En racimo', 'En manojo', 'En espiga', 'En cabezuela', 'Otro'];
  const FRUIT_TYPES = ['Baya', 'Drupa', 'Cápsula', 'Vaina', 'Sámara', 'Nuez', 'Aquenio', 'Otro'];
  const SEMILLA_OPTIONS = ['Con semillas visibles', 'Sin semillas visibles'];

  // Merge static + dynamic values from DB (unique)
  const dbFlowerColors = plantas.map(p => p.reproductivo?.flor_color).filter(Boolean) as string[];
  const dbFruitTypes = plantas.map(p => p.reproductivo?.fruto_tipo || p.reproductivo?.fruto_textura).filter(Boolean) as string[];
  const dbGroups = plantas.map(p => p.reproductivo?.flor_agrupacion).filter(Boolean) as string[];
  
  const flowerList = [...new Set([...FLOWER_COLORS, ...dbFlowerColors])];
  const inflorescenciaList = [...new Set([...FLOWER_GROUPS, ...dbGroups])];
  const fruitList = [...new Set([...FRUIT_TYPES, ...dbFruitTypes])];
  const semillaList = SEMILLA_OPTIONS;

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView
        style={[styles.content, { paddingTop: 20 }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1FC451" colors={['#1FC451']} />
        }
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
          <Pressable 
            onPress={async () => {
              setNotifVisible(true);
              setHasUnread(false);
              if (user?.id) {
                const currentSignature = JSON.stringify(misPlantas.map((p: any) => p._id + p.estado_revision));
                await AsyncStorage.setItem(`notifs_sig_${user.id}`, currentSignature);
              }
            }} 
            style={[styles.bellContainer, { backgroundColor: "rgba(255,255,255,0.05)" }]}
          >
            <MaterialCommunityIcons name="bell" size={20} color={theme.text} />
            {hasUnread && (
              <View style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#ff4444', width: 10, height: 10, borderRadius: 5 }} />
            )}
          </Pressable>
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
            <View style={{ width: '100%', padding: 40, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="leaf-off" size={48} color={theme.icon} style={{ opacity: 0.5, marginBottom: 16 }} />
              <Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center', fontSize: 16 }}>
                No se encontraron especies con esa combinación de caracteres morfológicos.
              </Text>
            </View>
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
              <Text style={[styles.filterLabel, { color: theme.icon }]}>Color de Flor</Text>
              <View style={styles.filterChipContainer}>
                {flowerList.map(color => (
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
                ))}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Inflorescencia</Text>
              <View style={styles.filterChipContainer}>
                {inflorescenciaList.map(tipo => (
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
                ))}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Fruto</Text>
              <View style={styles.filterChipContainer}>
                {fruitList.map(tipo => (
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
                ))}
              </View>

              <Text style={[styles.filterLabel, { color: theme.icon }]}>Tipo de Semilla</Text>
              <View style={styles.filterChipContainer}>
                {semillaList.map(tipo => (
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
                ))}
              </View>

            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
              <Pressable
                onPress={() => {
                  setFilterFruit("");
                  setFilterFlower("");
                  setFilterSemilla("");
                  setFilterInflorescencia("");
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

      {/* Notifications Modal (Mis Aportes) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notifVisible}
        onRequestClose={() => setNotifVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#12221A' : '#fff' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Mis Aportes</Text>
              <Pressable onPress={() => setNotifVisible(false)} style={styles.closeModalButton}>
                <MaterialCommunityIcons name="close" size={20} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {misPlantas.length > 0 ? misPlantas.map(planta => (
                <Pressable 
                  key={planta._id} 
                  onPress={() => {
                    if (planta.estado_revision === 'Observado') {
                      setNotifVisible(false);
                      router.push({ pathname: '/registro', params: { editId: planta._id } } as any);
                    }
                  }}
                  style={({ pressed }) => [
                    { 
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                      backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, marginBottom: 12 
                    },
                    pressed && planta.estado_revision === 'Observado' ? { opacity: 0.7 } : {}
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: 'bold' }}>{planta.nombre_cientifico || 'Planta sin nombre'}</Text>
                    {planta.estado_revision === 'Observado' ? (
                       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
                         <Text style={{ color: "#FFA500", fontSize: 12, fontWeight: 'bold' }}>
                           ¡Toca para corregir!
                         </Text>
                         <MaterialCommunityIcons name="pencil" size={14} color="#FFA500" />
                       </View>
                    ) : (
                       <Text style={{ color: theme.icon, fontSize: 12, marginTop: 4 }}>
                         Estado actual
                       </Text>
                    )}
                  </View>
                  <View style={{ 
                    backgroundColor: planta.estado_revision === 'Validado' ? 'rgba(31,196,81,0.2)' : 
                                    planta.estado_revision === 'Observado' ? 'rgba(255,165,0,0.2)' : 
                                    planta.estado_revision === 'Rechazado' ? 'rgba(255,68,68,0.2)' : 
                                    'rgba(255,255,255,0.1)', 
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 
                  }}>
                    <Text style={{ 
                      color: planta.estado_revision === 'Validado' ? '#1FC451' : 
                             planta.estado_revision === 'Observado' ? '#FFA500' : 
                             planta.estado_revision === 'Rechazado' ? '#FF4444' : 
                             '#ffffff', 
                      fontSize: 12, fontWeight: 'bold' 
                    }}>
                      {planta.estado_revision === 'en_revision' ? 'En revisión' : planta.estado_revision || 'En revisión'}
                    </Text>
                  </View>
                </Pressable>
              )) : (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <MaterialCommunityIcons name="leaf" size={48} color={theme.icon} style={{ opacity: 0.5, marginBottom: 16 }} />
                  <Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center' }}>Aún no has registrado ninguna planta.</Text>
                </View>
              )}
            </ScrollView>
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