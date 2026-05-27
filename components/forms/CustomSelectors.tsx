import React from 'react';
import { ScrollView } from 'react-native';
import { Button, XStack, YStack, Paragraph } from 'tamagui';

interface RadioSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  horizontal?: boolean;
}

export const RadioSelect = React.memo(function RadioSelect({ options, value, onChange, horizontal = false }: RadioSelectProps) {
  const renderButtons = () =>
    options.map((opt) => {
      const isSelected = value === opt;
      return (
        <Button
          key={opt}
          size="$3"
          bg={isSelected ? '#1FC451' : 'rgba(255,255,255,0.05)'}
          color={isSelected ? '#08130D' : 'rgba(255,255,255,0.7)'}
          borderColor={isSelected ? '#1FC451' : 'transparent'}
          borderWidth={1}
          onPress={() => onChange(opt)}
          mr={horizontal ? '$2' : 0}
          mb={horizontal ? 0 : '$2'}
          height="auto"
          py="$2"
          pressStyle={{ bg: isSelected ? '#15963c' : 'rgba(255,255,255,0.1)' }}
        >
          <Paragraph color={isSelected ? '#08130D' : 'rgba(255,255,255,0.7)'} size="$2" style={{ flexShrink: 1, flexWrap: 'wrap', textAlign: 'center' }}>
            {opt}
          </Paragraph>
        </Button>
      );
    });

  if (horizontal) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack>{renderButtons()}</XStack>
      </ScrollView>
    );
  }

  return (
    <XStack flexWrap="wrap" gap="$2">
      {renderButtons()}
    </XStack>
  );
});

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

export const MultiSelect = React.memo(function MultiSelect({ options, value, onChange }: MultiSelectProps) {
  const toggleOption = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((item) => item !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <XStack flexWrap="wrap" gap="$2">
      {options.map((opt) => {
        const isSelected = value.includes(opt);
        return (
          <Button
            key={opt}
            size="$3"
            bg={isSelected ? '#1FC451' : 'rgba(255,255,255,0.05)'}
            color={isSelected ? '#08130D' : 'rgba(255,255,255,0.7)'}
            borderColor={isSelected ? '#1FC451' : 'transparent'}
            borderWidth={1}
            onPress={() => toggleOption(opt)}
            height="auto"
            py="$2"
            pressStyle={{ bg: isSelected ? '#15963c' : 'rgba(255,255,255,0.1)' }}
          >
            <Paragraph color={isSelected ? '#08130D' : 'rgba(255,255,255,0.7)'} size="$2" style={{ flexShrink: 1, flexWrap: 'wrap', textAlign: 'center' }}>
              {opt}
            </Paragraph>
          </Button>
        );
      })}
    </XStack>
  );
});
