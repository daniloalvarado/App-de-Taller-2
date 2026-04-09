import { Feather } from "@tamagui/lucide-icons";
import React from "react";

import { Text, XStack, YStack } from "tamagui";

export default function Logo({ hasText = false }: { hasText?: boolean }) {
  return (
    <YStack gap="$3" style={{ alignItems: "center" }} mb="$4">
      <XStack
        bg="#1FC451"
        p="$3"
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
      >
        <Feather size={32} color="#08130D" />
      </XStack>
      {hasText && (
        <Text fontSize="$7" fontWeight="700" color="#ffffff">
          Flora Iquitos
        </Text>
      )}
    </YStack>
  );
}
