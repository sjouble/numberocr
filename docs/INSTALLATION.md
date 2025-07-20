# NumberOCR 개인 설치 가이드

## 📱 개인 사용을 위한 APK 설치 방법

### 방법 1: GitHub Actions를 통한 자동 빌드

#### 1단계: GitHub에서 빌드 실행
1. [NumberOCR GitHub 저장소](https://github.com/sjouble/numberocr)로 이동
2. **Actions** 탭 클릭
3. **Personal Build** 워크플로우 선택
4. **Run workflow** 버튼 클릭
5. **main** 브랜치 선택 후 **Run workflow** 클릭

#### 2단계: APK 다운로드
1. 빌드가 완료될 때까지 대기 (약 5-10분)
2. **NumberOCR-Debug-APK** 또는 **NumberOCR-Release-APK** 아티팩트 클릭
3. **app-debug.apk** 또는 **app-release-unsigned.apk** 다운로드

#### 3단계: Android 기기에 설치
1. 다운로드한 APK 파일을 Android 기기로 전송
2. Android 기기에서 **설정 > 보안 > 알 수 없는 소스** 활성화
3. APK 파일을 탭하여 설치

### 방법 2: 로컬 빌드

#### 사전 요구사항
- Node.js 18 이상
- Android Studio
- Android SDK

#### 빌드 명령어
```bash
# 저장소 클론
git clone https://github.com/sjouble/numberocr.git
cd numberocr

# 의존성 설치
npm install

# Android 빌드
npm run android

# 또는 직접 Gradle 사용
cd android
./gradlew assembleDebug
```

### 방법 3: 릴리즈에서 다운로드

1. [GitHub Releases](https://github.com/sjouble/numberocr/releases) 페이지 방문
2. 최신 릴리즈에서 APK 파일 다운로드
3. Android 기기에 설치

## 🔧 설치 후 설정

### 권한 설정
앱 설치 후 다음 권한을 허용해야 합니다:
- **카메라**: 텍스트 인식 기능 사용
- **저장소**: 데이터 저장 및 파일 공유
- **네트워크**: 업데이트 확인

### 첫 실행
1. 앱 실행
2. 권한 요청 허용
3. 카메라 버튼을 눌러 텍스트 인식 테스트

## 🚨 문제 해결

### 설치 실패 시
1. **"알 수 없는 소스" 설정 확인**
2. **이전 버전 제거 후 재설치**
3. **APK 파일 무결성 확인**

### 앱 실행 오류 시
1. **권한 설정 확인**
2. **Android 버전 확인** (API 24 이상 필요)
3. **저장소 공간 확인**

## 📞 지원

문제가 발생하면 [GitHub Issues](https://github.com/sjouble/numberocr/issues)에 문의해주세요. 