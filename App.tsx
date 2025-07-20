import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import EditorScreen from './src/screens/EditorScreen';
import ListScreen from './src/screens/ListScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Editor: { imageUri: string };
  List: { newItem: object };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '재고 정리' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Editor" component={EditorScreen} options={{ title: '품번 입력' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: '정리 목록' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;