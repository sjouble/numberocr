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

## 🚀 빠른 시작

### GitHub Actions를 통한 APK 빌드

1. **[Personal Build 워크플로우](https://github.com/sjouble/numberocr/actions/workflows/personal-build.yml) 클릭**
2. **"Run workflow" 버튼 클릭**
3. **빌드 완료 후 APK 다운로드**
4. **Android 기기에 설치**

> 💡 **참고**: Personal Build는 서명되지 않은 APK를 생성하므로 "알 수 없는 소스" 설정을 활성화해야 합니다.

## 📱 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- Java Development Kit (JDK) 17
- Android Studio (Android 개발용)
- Xcode (iOS 개발용, macOS만 해당)

### Android 환경 설정

Android 개발 환경 설정이 필요한 경우 [ANDROID_SETUP.md](./ANDROID_SETUP.md)를 참조하세요.

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

### 워크플로우

- **Complete Deploy Pipeline**: 전체 배포 파이프라인 (테스트 → 빌드 → 릴리즈)
- **Personal Build**: 개인 사용을 위한 APK 빌드 (수동 실행 가능)
- **Auto Release**: 자동 릴리즈 생성 및 APK 업로드
- **Deploy**: 릴리즈 시 자동 배포 알림

### 배포 방법

#### 1. 자동 배포 (권장)
```bash
# 버전 업데이트 및 배포
npm run deploy:release
```

#### 2. 수동 배포
```bash
# 버전 업데이트
npm run version:patch  # 또는 minor, major

# 태그 생성 및 배포
git add .
git commit -m "Bump version"
git tag v$(node -p "require('./package.json').version")
git push origin main --tags
```

#### 3. GitHub Actions 수동 실행
1. GitHub 저장소 → Actions 탭
2. "Complete Deploy Pipeline" 선택
3. "Run workflow" 클릭
4. 버전과 릴리즈 노트 입력

### 배포 결과물

- **APK 파일**: 직접 설치용
- **AAB 파일**: Google Play Store 업로드용
- **GitHub 릴리즈**: 자동 생성된 릴리즈 페이지

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
