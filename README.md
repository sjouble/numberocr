# NumberOCR

[![Personal Build](https://github.com/sjouble/numberocr/actions/workflows/personal-build.yml/badge.svg)](https://github.com/sjouble/numberocr/actions/workflows/personal-build.yml)
[![Lint and Test](https://github.com/sjouble/numberocr/actions/workflows/lint-test.yml/badge.svg)](https://github.com/sjouble/numberocr/actions/workflows/lint-test.yml)
[![Android Build](https://github.com/sjouble/numberocr/actions/workflows/android-build.yml/badge.svg)](https://github.com/sjouble/numberocr/actions/workflows/android-build.yml)

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

## 🚀 빠른 시작

### APK 다운로드 (가장 쉬운 방법)

1. **[Personal Build 워크플로우](https://github.com/sjouble/numberocr/actions/workflows/personal-build.yml) 클릭**
2. **"Run workflow" 버튼 클릭**
3. **빌드 완료 후 APK 다운로드**
4. **Android 기기에 설치**

> 💡 **참고**: Personal Build는 서명되지 않은 APK를 생성하므로 "알 수 없는 소스" 설정을 활성화해야 합니다.

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

## 🚀 CI/CD

이 프로젝트는 GitHub Actions를 사용하여 자동 빌드 및 배포를 지원합니다.

### 워크플로우 상태

위의 배지를 클릭하여 각 워크플로우의 상세 상태를 확인할 수 있습니다.

### 워크플로우

- **Personal Build**: 개인 사용을 위한 APK 빌드 (수동 실행 가능)
- **Lint and Test**: 코드 린트 및 테스트 실행
- **Android Build**: Android APK/AAB 빌드
- **iOS Build**: iOS 앱 빌드 (macOS)
- **Auto Release**: 자동 릴리즈 생성
- **Deploy**: 릴리즈 시 자동 배포

### 트리거

- `main` 또는 `develop` 브랜치에 푸시
- Pull Request 생성
- 릴리즈 발행

### 빌드 아티팩트

- Android APK (.apk)
- Android App Bundle (.aab)
- iOS Archive (.xcarchive)

## 📦 배포

### Android

1. GitHub에서 릴리즈 생성
2. 자동으로 APK와 AAB 파일이 업로드됨
3. Google Play Console에 AAB 파일 업로드

### iOS

1. GitHub에서 릴리즈 생성
2. iOS Archive 파일 다운로드
3. App Store Connect에 업로드

## 🔐 환경 변수

프로덕션 빌드를 위해 다음 GitHub Secrets를 설정해야 합니다:

- `MYAPP_UPLOAD_STORE_FILE`: Android 서명 키스토어 파일 경로
- `MYAPP_UPLOAD_KEY_ALIAS`: 키 별칭
- `MYAPP_UPLOAD_STORE_PASSWORD`: 키스토어 비밀번호
- `MYAPP_UPLOAD_KEY_PASSWORD`: 키 비밀번호

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 [Issues](https://github.com/sjouble/numberocr/issues)를 통해 연락해주세요.
