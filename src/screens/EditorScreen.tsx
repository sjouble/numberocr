import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import TextRecognition from 'react-native-text-recognition';
import ViewShot from "react-native-view-shot";

type EditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Editor'>;
type EditorScreenRouteProp = RouteProp<RootStackParamList, 'Editor'>;

const EditorScreen = () => {
  const navigation = useNavigation<EditorScreenNavigationProp>();
  const route = useRoute<EditorScreenRouteProp>();
  const { imageUri } = route.params;

  const [partNumber, setPartNumber] = useState('');
  const [unit, setUnit] = useState('카톤');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selection, _setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const viewShot = useRef<ViewShot>(null);

  const handleRecognize = async () => {
    if (selection.width > 10 && selection.height > 10 && viewShot.current && viewShot.current.capture) {
      try {
          const uri = await viewShot.current.capture();
          const result = await TextRecognition.recognize(uri);
          const numbers = result.join('').replace(/[^0-9]/g, '');
          setPartNumber(numbers);
      } catch (error) {
          Alert.alert('OCR 오류', '텍스트를 인식하지 못했습니다.');
      }
    }
  };

  const handleSave = () => {
    if (!partNumber || !quantity) {
      Alert.alert('입력 오류', '품번과 수량을 모두 입력해주세요.');
      return;
    }
    const newItem = {
      partNumber,
      unit,
      quantity: parseInt(quantity, 10),
      expiryDate,
    };
    navigation.navigate('List', { newItem });
  };

  return (
    <View style={styles.container}>
        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}>
            <Image source={{ uri: imageUri }} style={styles.image} {...panResponder.panHandlers} />
            {selection.width > 0 && selection.height > 0 && (
                <View style={[styles.selection, { left: selection.x, top: selection.y, width: selection.width, height: selection.height }]} />
            )}
        </ViewShot>

      <View style={styles.form}>
        <Text>품번:</Text>
        <TextInput style={styles.input} value={partNumber} onChangeText={setPartNumber} keyboardType="numeric" />
        <Button title="품번 인식" onPress={handleRecognize} />
        <Text>포장단위:</Text>
        <TextInput style={styles.input} value={unit} onChangeText={setUnit} />
        <Text>수량:</Text>
        <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
        <Text>유통기한:</Text>
        <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} keyboardType="numeric" placeholder="YYYYMMDD" />
        <Button title="입력" onPress={handleSave} />
        <Button title="추가 입력" onPress={() => navigation.navigate('Camera')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  selection: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 0, 0.5)',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default EditorScreen;