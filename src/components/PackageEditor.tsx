import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const PackageEditor = ({ visible, onClose }: Props) => {
  const [units, setUnits] = useState<string[]>([]);
  const [newUnit, setNewUnit] = useState('');

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const storedUnits = await AsyncStorage.getItem('packaging_units');
        if (storedUnits) {
          setUnits(JSON.parse(storedUnits));
        } else {
          setUnits(['카톤', '중포']); // Default units
        }
      } catch (error) {
        Alert.alert('오류', '포장단위를 불러오지 못했습니다.');
      }
    };
    if (visible) {
        loadUnits();
    }
  }, [visible]);

  const saveUnits = async (newUnits: string[]) => {
    try {
      await AsyncStorage.setItem('packaging_units', JSON.stringify(newUnits));
      setUnits(newUnits);
    } catch (error) {
      Alert.alert('오류', '포장단위를 저장하지 못했습니다.');
    }
  };

  const handleAdd = () => {
    if (newUnit && !units.includes(newUnit)) {
      saveUnits([...units, newUnit]);
      setNewUnit('');
    } else {
        Alert.alert('입력 오류', '이미 존재하는 단위입니다.');
    }
  };

  const handleDelete = (unitToDelete: string) => {
    saveUnits(units.filter(unit => unit !== unitToDelete));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>포장단위 편집</Text>
          <FlatList
            data={units}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.unitItem}>
                <Text>{item}</Text>
                <Button title="삭제" onPress={() => handleDelete(item)} color="red" />
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newUnit}
              onChangeText={setNewUnit}
              placeholder="새 포장단위 입력"
            />
            <Button title="추가" onPress={handleAdd} />
          </View>
          <Button title="닫기" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    unitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
    },
});

export default PackageEditor;