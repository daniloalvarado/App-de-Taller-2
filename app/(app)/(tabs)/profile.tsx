import { SignOutButton } from "@/components/SignOutButton";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getUserDisplayName, getUserInitials } from "@/lib/utils/user";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  H1,
  H2,
  ScrollView,
  Spinner,
  Text,
  View,
  XStack,
  YStack
} from "tamagui";

let isNavigatingToAbout = false;

export default function Profile() {
  const { user, isLoaded } = useUser();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Spinner size="large" />
        </View>
      </View>
    );
  }

  const initials = getUserInitials(user);
  const displayName = getUserDisplayName(user);

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 20,
        }}
      >
        <YStack px="$4" gap="$4" pb={insets.bottom + 100}>
          {/* Profile Header Card */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$6"
          >
            <YStack gap="$4" style={{ alignItems: "center" }}>
              {/* Profile Picture */}
              <View
                style={{
                  borderRadius: 60,
                  overflow: "hidden",
                  width: 120,
                  height: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e5e7eb",
                }}
              >
                {user?.imageUrl ? (
                  <Image
                    source={{ uri: user.imageUrl }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Text fontSize={42} fontWeight="700" color="$color11">
                    {initials}
                  </Text>
                )}
              </View>

              {/* Name & Email */}
              <YStack style={{ alignItems: "center" }} gap="$2">
                <H1
                  fontSize={28}
                  fontWeight="700"
                  color="#ffffff"
                  style={{ textAlign: "center" }}
                >
                  {displayName}
                </H1>
                {user?.primaryEmailAddress?.emailAddress && (
                  <Text fontSize={14} color="rgba(255,255,255,0.7)">
                    {user.primaryEmailAddress.emailAddress}
                  </Text>
                )}
              </YStack>

              {/* Plan Badge */}
              <View style={styles.proPlanBadge}>
                <Text fontSize={13} fontWeight="700" color="#1FC451">
                  🌱 Usuario Explorador
                </Text>
              </View>
            </YStack>
          </Card>

          {/* Acerca de Section */}
          <Pressable 
            onPress={() => {
              if (isNavigatingToAbout) return;
              isNavigatingToAbout = true;
              router.push("/about");
              setTimeout(() => { isNavigatingToAbout = false; }, 800);
            }}
          >
            <Card
              size="$4"
              bordered
              bg="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              padding="$5"
            >
              <YStack gap="$4">
                <YStack gap="$2">
                  <XStack style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <H2 fontSize={18} fontWeight="700" color="#ffffff">
                      Acerca del Proyecto
                    </H2>
                    <Feather name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
                  </XStack>
                  <Text fontSize={14} color="rgba(255,255,255,0.7)" lineHeight={22}>
                    Catálogo virtual de flora ornamental de Iquitos · Responsabilidad Social Universitaria
                  </Text>
                </YStack>
              </YStack>
            </Card>
          </Pressable>

          {/* Account Section */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$5"
          >
            <YStack gap="$4">
              <YStack gap="$2">
                <H2 fontSize={18} fontWeight="700" color="#ffffff">
                  Cuenta
                </H2>
                <Text fontSize={13} color="rgba(255,255,255,0.7)" lineHeight={18}>
                  Administrar la configuración de tu cuenta
                </Text>
              </YStack>
              <SignOutButton />
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
  },
  planBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
  },
  proPlanBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(31, 196, 81, 0.4)",
    backgroundColor: "transparent",
  },
});
