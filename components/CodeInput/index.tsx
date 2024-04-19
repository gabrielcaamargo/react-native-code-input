import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface ICodeInputProps {
  setFinalText: (setState: string) => void;
  numberOfInputs: number;
}

export function CodeInput({ setFinalText, numberOfInputs }: ICodeInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const valuesArray = Array.from({ length: numberOfInputs }, () => "");
  const inputRefs = useRef<TextInput[] | null[]>(
    Array.from({ length: 4 }, () => null)
  );
  const [textWithIds, setTextWithIds] = useState(
    valuesArray.map((item, index) => ({
      character: item,
      id: String(index),
      selected: false,
    }))
  );

  const style = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 8,
      justifyContent: "center",
    },
    input: {
      fontSize: 32,
      borderRadius: 16,
      height: 64,
      width: 64,
      borderWidth: 1,
      textAlign: "center",
    },
  });

  useEffect(() => {
    if (activeIndex === textWithIds.length) {
      inputRefs.current[0]?.focus();
    } else {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  useEffect(() => {
    const characters = textWithIds.map((item) => item.character);
    setFinalText(characters.join(""));
  }, [textWithIds]);

  function handleSelectInput(index: number) {
    const updatedTextWithIds = textWithIds.map((item, idx) => ({
      ...item,
      selected: idx === index,
    }));
    setTextWithIds(updatedTextWithIds);
    setActiveIndex(index);
    inputRefs.current[index]?.focus();
  }

  function handleChangeText(index: number, text: string) {
    setActiveIndex((prev) => {
      if (!text) {
        return prev;
      }
      if (text.length > 1) {
        return prev + 1;
      }
      if (prev === textWithIds.length) {
        return 0;
      }

      if (prev === textWithIds.length - 1) {
        return prev;
      }

      return prev + 1;
    });

    setTextWithIds((prevTextWithIds) => {
      const newTextWithIds = [...prevTextWithIds];
      newTextWithIds[index] = {
        ...newTextWithIds[index],
        character: text,
      };
      return newTextWithIds;
    });
  }

  function handleKeyPress(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) {
    if (event.nativeEvent.key === "Backspace") {
      const newTextWithIds = [...textWithIds];
      newTextWithIds[index].character = "";

      if (activeIndex >= 1) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  }

  return (
    <View style={style.container}>
      <FlatList
        horizontal
        data={textWithIds}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          width: "100%",
          justifyContent: "center",
          gap: 8,
        }}
        renderItem={({ item, index }) => {
          return (
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                ...style.input,
                borderColor:
                  index === activeIndex || item.selected ? "#000" : "#B1B1B1",
              }}
              value={item.character.charAt(0)}
              onChangeText={(text) => handleChangeText(index, text)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              maxLength={1}
              onFocus={() => handleSelectInput(index)}
            />
          );
        }}
      />
    </View>
  );
}
