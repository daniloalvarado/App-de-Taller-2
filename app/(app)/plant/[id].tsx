import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, ScrollView, Pressable, ActivityIndicator, Image, FlatList } from "react-native";
import { View, Text } from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client, urlFor } from "@/lib/sanity";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

function MorphInfo({ icon, label, value }: { icon: any; label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.morphItem}>
      <View style={styles.morphIconContainer}>
        <MaterialCommunityIcons name={icon} size={20} color="#1FC451" />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.morphLabel, { color: "#a0a0a0" }]}>{label}</Text>
        <Text style={[styles.morphValue, { color: "#ffffff" }]}>{value}</Text>
      </View>
    </View>
  );
}

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const [planta, setPlanta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goToNext = () => {
    if (planta?.galeria && activeImageIndex < planta.galeria.length - 1) {
      const nextIndex = activeImageIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveImageIndex(nextIndex);
    }
  };

  const goToPrev = () => {
    if (activeImageIndex > 0) {
      const prevIndex = activeImageIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setActiveImageIndex(prevIndex);
    }
  };

  useEffect(() => {
    if (!id || id.startsWith("mock-")) {
      setLoading(false);
      return;
    }
    client.fetch(`*[_type == "planta" && _id == $id][0]`, { id })
      .then((data) => {
        setPlanta(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1FC451" />
      </View>
    );
  }

  const title = planta?.nombres_comunes || planta?.nombre_cientifico || id || "Planta Desconocida";
  const descripcion = planta?.descripcion || "Esta planta se encuentra en evaluación. No se ha ingresado una descripción morfológica detallada en la base de datos administrada por Sanity.";
  const imageUrl = planta?.galeria?.[0] ? urlFor(planta.galeria[0]).width(800).url() : null;
  const habito = planta?.habito || "Plantas Múltiples";
  const familia = planta?.familia || "Flora Amazónica";

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView bounces={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Top Image Header */}
        <View style={styles.imageHeaderContainer}>
          {planta?.galeria && planta.galeria.length > 0 ? (
            <>
              <FlatList
                ref={flatListRef}
                data={planta.galeria}
                horizontal
                pagingEnabled
                nestedScrollEnabled={true}
                decelerationRate="fast"
                snapToInterval={width}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ width: width, height: 400 }}>
                    <Image 
                      source={{ uri: urlFor(item).width(800).url() }} 
                      style={{ width: '100%', height: '100%' }} 
                      resizeMode="cover" 
                    />
                  </View>
                )}
                onMomentumScrollEnd={(e) => {
                  const index = Math.round(e.nativeEvent.contentOffset.x / width);
                  setActiveImageIndex(index);
                }}
                onScrollToIndexFailed={() => {}}
                scrollEventThrottle={16}
                bounces={false}
              />

              {/* Botones de Navegación Lateral */}
              {planta.galeria.length > 1 && (
                <>
                  {activeImageIndex > 0 && (
                    <Pressable 
                      onPress={goToPrev} 
                      style={[styles.navButton, { left: 10 }]}
                    >
                      <MaterialCommunityIcons name="chevron-left" size={32} color="#fff" />
                    </Pressable>
                  )}
                  {activeImageIndex < planta.galeria.length - 1 && (
                    <Pressable 
                      onPress={goToNext} 
                      style={[styles.navButton, { right: 10 }]}
                    >
                      <MaterialCommunityIcons name="chevron-right" size={32} color="#fff" />
                    </Pressable>
                  )}
                </>
              )}
              {planta.galeria.length > 1 && (
                <View style={styles.carouselDots}>
                  {planta.galeria.map((_: any, idx: number) => (
                    <View key={idx} style={[styles.dot, activeImageIndex === idx ? styles.activeDot : null]} />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: "#1A2F22" }]}>
               <MaterialCommunityIcons name="leaf" size={120} color="#1FC451" />
            </View>
          )}
          
          <Pressable 
            onPress={() => router.back()} 
            style={[styles.backButton, { top: 20 }]}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
               <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
               <Text style={{ fontSize: 16, color: "#1FC451", fontStyle: 'italic', marginTop: 4 }}>
                 {planta?.nombre_cientifico || ""}
               </Text>
             </View>
          </View>

          {/* Ficha Morfológica */}
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Ficha Técnica</Text>
          <View style={{ gap: 16, marginTop: 12, marginBottom: 24 }}>
            <MorphInfo icon="file-tree" label="Familia Botánica" value={familia} />
            <MorphInfo icon="map-marker-outline" label="Origen" value={planta?.origen} />
            <MorphInfo icon="sprout" label="Hábito de Crecimiento" value={habito} />
            <MorphInfo icon="clipboard-text-outline" label="Caracteres Diagnósticos" value={planta?.caracteres_diagnosticos} />
            <MorphInfo icon="flower" label="Tipo de Flor" value={planta?.tipo_flor} />
            <MorphInfo icon="palette-outline" label="Color de Flor principal" value={planta?.color_flor} />
            <MorphInfo icon="fruit-cherries" label="Tipo de Fruto" value={planta?.tipo_fruto} />
            <MorphInfo icon="flower-tulip-outline" label="Tipo de Inflorescencia" value={planta?.tipo_inflorescencia} />
            <MorphInfo icon="seed-outline" label="Tipo de Semilla" value={planta?.tipo_semilla} />
            <MorphInfo icon="fruit-grapes-outline" label="Tipo de Infrutescencia" value={planta?.tipo_infrutescencia} />
            <MorphInfo icon="water-outline" label="Tipo y Color de Exudado" value={planta?.exudado} />
            <MorphInfo icon="star-outline" label="Valor Ornamental" value={planta?.valor_ornamental} />
          </View>

          {/* Description */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción Morfológica Básica</Text>
          <Text style={[styles.description, { color: theme.icon, textAlign: "justify" }]}>
            {descripcion}
          </Text>

          {/* Usos Urbanos */}
          {planta?.usos_urbanos && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Usos Urbanos</Text>
              <Text style={[styles.description, { color: theme.icon }]}>
                {planta.usos_urbanos}
              </Text>
            </>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeaderContainer: {
    height: 400,
    width: "100%",
    position: "relative",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  navButton: {
    position: "absolute",
    top: 176, // (400 header height / 2) - 24 button radius
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  carouselDots: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  activeDot: {
    width: 24,
    backgroundColor: '#1FC451',
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 120, // leave space for bottom bar
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  primaryButton: {
    backgroundColor: "#1FC451",
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: "center",
    shadowColor: "#1FC451",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  morphItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  morphIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(31,196,81,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  morphLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  morphValue: {
    fontSize: 15,
  },
});
