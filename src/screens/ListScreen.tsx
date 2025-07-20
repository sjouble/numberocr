import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import PackageEditor from '../../components/PackageEditor';

type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>;

interface ListItem {
  partNumber: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
}

const ListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ListScreenRouteProp>();
  const [items, setItems] = useState<ListItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('inventory_items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        Alert.alert('오류', '데이터를 불러오지 못했습니다.');
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem as ListItem;
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      AsyncStorage.setItem('inventory_items', JSON.stringify(updatedItems));
    }
  }, [route.params?.newItem]);

  const formatDataForShare = () => {
    return items.map(item => 
      `${item.partNumber} | ${item.quantity} | ${item.unit} | ${item.expiryDate || ''}`
    ).join('\n');
  };

  const shareList = async () => {
    const content = formatDataForShare();
    try {
      await Share.open({ message: content });
    } catch (error) {
      Alert.alert('공유 오류', '목록을 공유하지 못했습니다.');
    }
  };

  const saveAsFile = async () => {
    const content = `품번 | 수량 | 단위 | 유통기한\n${formatDataForShare()}`;
    const path = `${RNFS.DocumentDirectoryPath}/inventory_list.txt`;

    try {
      await RNFS.writeFile(path, content, 'utf8');
      Alert.alert('저장 완료', `파일이 ${path} 에 저장되었습니다.`);
    } catch (error) {
      Alert.alert('파일 저장 오류', '목록을 파일로 저장하지 못했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{`품번: ${item.partNumber}`}</Text>
            <Text>{`수량: ${item.quantity}`}</Text>
            <Text>{`단위: ${item.unit}`}</Text>
            {item.expiryDate && <Text>{`유통기한: ${item.expiryDate}`}</Text>}
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="클립보드에 복사" onPress={() => { /* Clipboard API */ }} />
        <Button title="텍스트 파일로 저장" onPress={saveAsFile} />
        <Button title="공유하기" onPress={shareList} />
        <Button title="포장단위 편집" onPress={() => setModalVisible(true)} />
      </View>
      <PackageEditor visible={modalVisible} onClose={() => setModalVisible(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default ListScreen;