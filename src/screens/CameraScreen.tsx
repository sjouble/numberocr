import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const status = await requestPermission();
      if (!status) {
        Alert.alert('오류', '카메라 권한을 허용해주세요.');
        navigation.goBack();
      }
    };
    checkPermission();
  }, [requestPermission, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsActive(true);
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsActive(false);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    }
  }, [navigation]);

  const takePicture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      navigation.navigate('Editor', { imageUri: `file://${photo.path}` });
    }
  };

  if (!hasPermission) {
    return <View />;
  }

  if (!device) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <Button title="촬영" onPress={takePicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});

export default CameraScreen;