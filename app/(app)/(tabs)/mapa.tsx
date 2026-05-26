import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions, Pressable, ActivityIndicator, Image } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { client, urlFor } from "@/lib/sanity";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, Card, XStack, YStack, Button } from "tamagui";
import { useRouter } from "expo-router";

// Estilo oscuro simple para el mapa
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
];

export default function MapaScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const [plantas, setPlantas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanta, setSelectedPlanta] = useState<any | null>(null);

  // Coordenadas centrales de Iquitos
  const iquitosRegion = {
    latitude: -3.74912,
    longitude: -73.25383,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      // Solo plantas validadas que tengan coordenadas
      const data = await client.fetch(`
        *[_type == "planta" && estado_revision == "Validado" && defined(latitud) && defined(longitud)] {
          _id,
          nombre_cientifico,
          nombres_comunes,
          habito,
          latitud,
          longitud,
          galeria,
          familia
        }
      `);
      setPlantas(data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (planta: any) => {
    setSelectedPlanta(planta);
    // Centrar suavemente el mapa en el marcador seleccionado
    mapRef.current?.animateToRegion({
      latitude: planta.latitud - 0.005, // Offset para que no quede oculto por la tarjeta
      longitude: planta.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 500);
  };

  const handleMapPress = () => {
    // Si toca cualquier parte del mapa, ocultar la tarjeta
    setSelectedPlanta(null);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.loadingOverlay, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color="#1FC451" />
          <Text style={{ color: theme.text as any, marginTop: 16 }}>Cargando mapa forestal...</Text>
        </View>
      ) : null}

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={iquitosRegion}
        customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
        onPress={handleMapPress}
        showsUserLocation={true}
      >
        {plantas.map((planta) => (
          <Marker
            key={planta._id}
            coordinate={{ latitude: planta.latitud, longitude: planta.longitud }}
            onPress={(e) => {
              e.stopPropagation(); // Evitar que el mapa reciba el tap
              handleMarkerPress(planta);
            }}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerPin}>
                <MaterialCommunityIcons name="leaf" size={16} color="#08130D" />
              </View>
              <View style={styles.markerPointer} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Card for Selected Plant */}
      {selectedPlanta && (
        <View style={[styles.floatingCardContainer, { paddingBottom: insets.bottom + 80 }]}>
          <Card 
            elevate 
            size="$4" 
            bordered 
            bg={colorScheme === "dark" ? "#12221A" : "#ffffff"} 
            borderColor="rgba(31, 196, 81, 0.3)"
            animation="bouncy"
            scale={1}
            pressStyle={{ scale: 0.98 }}
            onPress={() => router.push(`/plant/${selectedPlanta._id}` as any)}
          >
            <XStack style={{ padding: 12, alignItems: 'center' }} gap="$3">
              {/* Thumbnail */}
              <View style={styles.thumbnailContainer}>
                {selectedPlanta.galeria && selectedPlanta.galeria.length > 0 ? (
                  <Image 
                    source={{ uri: urlFor(selectedPlanta.galeria[0]).width(200).url() }} 
                    style={styles.thumbnail} 
                  />
                ) : (
                  <MaterialCommunityIcons name="leaf" size={32} color="#1FC451" />
                )}
              </View>

              {/* Info */}
              <YStack flex={1} gap="$1">
                <Text fontSize={18} fontWeight="bold" style={{ color: theme.text as any }} numberOfLines={1}>
                  {selectedPlanta.nombre_cientifico || selectedPlanta.nombres_comunes}
                </Text>
                
                <XStack gap="$2" flexWrap="wrap">
                  <View style={styles.badge}>
                    <MaterialCommunityIcons name="sprout" size={12} color="#1FC451" />
                    <Text fontSize={11} style={{ color: theme.text as any }}>{selectedPlanta.habito}</Text>
                  </View>
                  <View style={styles.badge}>
                    <MaterialCommunityIcons name="file-tree" size={12} color="#f59e0b" />
                    <Text fontSize={11} style={{ color: theme.text as any }}>{selectedPlanta.familia || 'Desconocida'}</Text>
                  </View>
                </XStack>
                
                <Text fontSize={12} style={{ color: "#1FC451", marginTop: 4 }} fontWeight="bold">
                  Toca para ver ficha técnica ➝
                </Text>
              </YStack>
            </XStack>
          </Card>
        </View>
      )}

      {/* Top Overlay Actions (e.g. Center Map, Filters) */}
      <View style={[styles.topOverlay, { top: insets.top + 10 }]}>
        <View style={[styles.badge, { backgroundColor: "rgba(0,0,0,0.6)", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }]}>
          <MaterialCommunityIcons name="map-marker-multiple" size={16} color="#1FC451" />
          <Text style={{ color: "#fff", marginLeft: 8 }} fontWeight="bold">{plantas.length} Especies mapeadas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPin: {
    backgroundColor: '#1FC451',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1FC451',
    marginTop: -2,
  },
  floatingCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 5,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(31, 196, 81, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  }
});
