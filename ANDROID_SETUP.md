# 📱 Android 개발 환경 설정 가이드

이 문서는 NumberOCR 앱을 로컬에서 Android로 실행하기 위한 환경 설정 방법을 설명합니다.

## 🔧 필수 요구사항

### 1. Java Development Kit (JDK) 17
- **다운로드**: [Eclipse Temurin JDK 17](https://adoptium.net/temurin/releases/?version=17)
- **설치 후**: JAVA_HOME 환경 변수 설정 필요

### 2. Android Studio
- **다운로드**: [Android Studio](https://developer.android.com/studio)
- **설치 시 포함**: Android SDK, Android SDK Platform, AVD

### 3. Node.js 18+
- **확인**: `node --version`
- **설치**: [Node.js 공식 사이트](https://nodejs.org/)

## 🛠️ 설치 단계

### 1단계: JDK 17 설치

#### Windows에서 설치:
1. [Eclipse Temurin JDK 17](https://adoptium.net/temurin/releases/?version=17) 다운로드
2. 설치 파일 실행
3. 기본 설정으로 설치

#### 환경 변수 설정:
1. Windows 검색에서 "환경 변수" 검색
2. "시스템 환경 변수 편집" 클릭
3. "환경 변수" 버튼 클릭
4. 시스템 변수에서 "새로 만들기":
   - 변수 이름: `JAVA_HOME`
   - 변수 값: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x.x-hotspot` (실제 설치 경로)

### 2단계: Android Studio 설치

1. [Android Studio 다운로드](https://developer.android.com/studio)
2. 설치 파일 실행
3. 설치 구성 요소 선택:
   - ✅ Android SDK
   - ✅ Android SDK Platform
   - ✅ Android Virtual Device (AVD)
   - ✅ Performance (Intel HAXM)

#### 환경 변수 설정:
1. 시스템 변수에서 "새로 만들기":
   - 변수 이름: `ANDROID_HOME`
   - 변수 값: `C:\Users\[사용자명]\AppData\Local\Android\Sdk`

2. PATH 변수에 추가:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

### 3단계: Android SDK 설정

1. Android Studio 실행
2. Tools → SDK Manager
3. SDK Platforms 탭에서 다음 설치:
   - ✅ Android 14.0 (API 34)
   - ✅ Android 13.0 (API 33)
   - ✅ Android 12.0 (API 31)

4. SDK Tools 탭에서 다음 설치:
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Command-line Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools

### 4단계: Android 에뮬레이터 생성

1. Android Studio → Tools → AVD Manager
2. "Create Virtual Device" 클릭
3. 기기 선택 (예: Pixel 7)
4. 시스템 이미지 선택 (API 33 이상)
5. AVD 이름 설정 후 "Finish"

## ✅ 설치 확인

### 1. 환경 변수 확인
```bash
# Java 확인
java -version

# Android SDK 확인
adb version

# 환경 변수 확인
echo %JAVA_HOME%
echo %ANDROID_HOME%
```

### 2. React Native Doctor 실행
```bash
npx react-native doctor
```

모든 항목이 ✅로 표시되어야 합니다.

## 🚀 앱 실행

### 1. 에뮬레이터 시작
```bash
# 에뮬레이터 목록 확인
emulator -list-avds

# 에뮬레이터 시작
emulator -avd [에뮬레이터_이름]
```

### 2. 앱 실행
```bash
# Metro 서버 시작
npm start

# 새 터미널에서 Android 앱 실행
npm run android
```

## 🔧 문제 해결

### JAVA_HOME 오류
```
ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
```
**해결**: JDK 17 설치 및 JAVA_HOME 환경 변수 설정

### ADB 오류
```
'adb'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.
```
**해결**: Android Studio 설치 및 PATH에 platform-tools 추가

### 에뮬레이터 오류
```
error Failed to launch emulator. Reason: No emulators found
```
**해결**: Android Studio에서 AVD 생성

### 빌드 오류
```bash
# 캐시 정리
cd android
./gradlew clean
cd ..

# Metro 캐시 정리
npm start -- --reset-cache
```

## 📱 실제 기기로 테스트

### 1. 기기에서 개발자 옵션 활성화
1. 설정 → 휴대전화 정보 → 빌드 번호 7번 탭
2. 설정 → 개발자 옵션 → USB 디버깅 켜기

### 2. 기기 연결
1. USB 케이블로 컴퓨터에 연결
2. 기기에서 "USB 디버깅 허용" 확인
3. `adb devices`로 기기 인식 확인

### 3. 앱 실행
```bash
npm run android
```

## 🎯 빠른 설정 스크립트

프로젝트 루트의 `setup-android-env.bat` 파일을 실행하여 환경 설정을 확인할 수 있습니다:

```bash
setup-android-env.bat
```

## 📞 지원

문제가 발생하면:
1. `npx react-native doctor` 실행 결과 확인
2. 환경 변수 설정 재확인
3. Android Studio 재설치 고려
4. GitHub Issues에 문제 보고 