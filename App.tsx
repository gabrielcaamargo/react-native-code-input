import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CodeInput } from "./components/CodeInput";
import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("")
  return (
    <View style={{ backgroundColor: '#FAFAFA', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CodeInput setFinalText={setCode} numberOfInputs={4} />
      <TouchableOpacity onPress={() => Alert.alert(code)} style={{ marginTop: 24 }}>
        <Text>Click me!</Text>
      </TouchableOpacity>
    </View>
  )
}