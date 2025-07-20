# NumberOCR

NumberOCR는 React Native로 개발된 OCR(광학 문자 인식) 앱입니다. 카메라를 통해 숫자와 텍스트를 인식하고, 패키지 정보를 관리할 수 있습니다.

## 🚀 주요 기능

- **📷 카메라 기능**: VisionCamera를 사용한 고성능 카메라
- **🔍 텍스트 인식**: OCR을 통한 숫자/텍스트 인식
- **📦 패키지 관리**: 인식된 정보를 패키지로 저장 및 관리
- **📋 목록 관리**: 저장된 항목들을 목록으로 확인
- **💾 데이터 저장**: AsyncStorage를 사용한 로컬 데이터 저장
- **📤 공유 기능**: 인식된 데이터를 텍스트 파일로 저장 및 공유

## 🛠️ 기술 스택

- **React Native**: 0.80.1
- **TypeScript**: 5.0.4
- **Vision Camera**: 4.7.1
- **Text Recognition**: 1.0.2
- **React Navigation**: 7.1.14
- **Async Storage**: 2.2.0

## 📱 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- React Native 개발 환경 설정
- Android Studio (Android 개발용)
- Xcode (iOS 개발용, macOS만 해당)

### 로컬 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **Metro 서버 시작**
   ```bash
   npm start
   ```

3. **Android 앱 실행**
   ```bash
   npm run android
   ```

4. **iOS 앱 실행** (macOS만 해당)
   ```bash
   cd ios && bundle install && bundle exec pod install && cd ..
   npm run ios
   ```

## 🔧 개발

### 스크립트

- `npm start`: Metro 서버 시작
- `npm run android`: Android 앱 빌드 및 실행
- `npm run ios`: iOS 앱 빌드 및 실행
- `npm run lint`: ESLint 실행
- `npm test`: 테스트 실행

### 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── screens/        # 화면 컴포넌트
└── ...
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
