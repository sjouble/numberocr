# 🚀 NumberOCR 배포 가이드

이 문서는 NumberOCR 앱의 GitHub Actions를 통한 자동 배포 방법을 설명합니다.

## 📋 배포 워크플로우

### 1. **Complete Deploy Pipeline** (`.github/workflows/complete-deploy.yml`)
- **트리거**: main 브랜치 푸시, v* 태그 푸시, 수동 실행
- **단계**:
  1. **테스트**: 코드 테스트 및 린팅
  2. **Android 빌드**: APK 및 AAB 파일 생성
  3. **릴리즈 생성**: GitHub 릴리즈 자동 생성
  4. **배포 알림**: 배포 완료 요약

### 2. **Android Build** (`.github/workflows/android-build.yml`)
- **트리거**: main, develop 브랜치 푸시, PR, 릴리즈
- **기능**: Android APK/AAB 빌드 및 아티팩트 업로드

### 3. **Auto Release** (`.github/workflows/auto-release.yml`)
- **트리거**: 수동 실행
- **기능**: 수동으로 버전과 릴리즈 노트 입력하여 릴리즈 생성

## 🛠️ 배포 방법

### 방법 1: 자동 배포 (권장)

```bash
# 1. 버전 업데이트 및 배포 준비
npm run deploy:prepare

# 2. 릴리즈 태그 생성 및 배포
npm run deploy:release
```

### 방법 2: 수동 배포

```bash
# 1. 버전 업데이트
npm run version:patch  # 또는 minor, major

# 2. 변경사항 커밋
git add .
git commit -m "Bump version to $(node -p "require('./package.json').version")"

# 3. 태그 생성
git tag v$(node -p "require('./package.json').version")

# 4. 푸시
git push origin main --tags
```

### 방법 3: GitHub Actions 수동 실행

1. GitHub 저장소 → Actions 탭
2. "Complete Deploy Pipeline" 선택
3. "Run workflow" 클릭
4. 버전과 릴리즈 노트 입력
5. "Run workflow" 클릭

## 📱 배포 결과물

### APK 파일
- **용도**: 직접 설치용
- **위치**: GitHub 릴리즈 페이지
- **설치 방법**:
  1. APK 파일 다운로드
  2. Android 설정 → 보안 → 알 수 없는 소스 활성화
  3. APK 파일 실행하여 설치

### AAB 파일
- **용도**: Google Play Store 업로드용
- **위치**: GitHub 릴리즈 페이지
- **사용법**: Google Play Console에 업로드

## 🔧 환경 설정

### GitHub Secrets 설정 (선택사항)

릴리즈 빌드에 서명을 추가하려면 다음 secrets를 설정하세요:

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 secrets 추가:
   - `MYAPP_UPLOAD_STORE_FILE`: 키스토어 파일 (Base64 인코딩)
   - `MYAPP_UPLOAD_KEY_ALIAS`: 키 별칭
   - `MYAPP_UPLOAD_STORE_PASSWORD`: 키스토어 비밀번호
   - `MYAPP_UPLOAD_KEY_PASSWORD`: 키 비밀번호

### 키스토어 생성 방법

```bash
# 키스토어 생성
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Base64 인코딩
base64 my-upload-key.keystore | tr -d '\n' | tee my-upload-key.keystore.base64.txt
```

## 📊 배포 상태 확인

### GitHub Actions
- 저장소 → Actions 탭에서 워크플로우 실행 상태 확인
- 각 단계별 상세 로그 확인 가능

### 릴리즈 페이지
- 저장소 → Releases 탭에서 릴리즈 목록 확인
- 각 릴리즈의 다운로드 링크 및 릴리즈 노트 확인

## 🚨 문제 해결

### 빌드 실패
1. 로컬에서 `npm test` 실행하여 테스트 통과 확인
2. `npm run lint` 실행하여 코드 스타일 확인
3. GitHub Actions 로그에서 구체적인 오류 메시지 확인

### 릴리즈 생성 실패
1. GitHub 토큰 권한 확인
2. 태그 이름 형식 확인 (v1.0.0 형식)
3. 중복 태그 확인

### APK 설치 실패
1. 기기의 "알 수 없는 소스" 설정 확인
2. APK 파일 손상 여부 확인
3. 기기 호환성 확인 (minSdkVersion)

## 📈 버전 관리

### 시맨틱 버저닝
- **MAJOR**: 호환되지 않는 API 변경
- **MINOR**: 이전 버전과 호환되는 기능 추가
- **PATCH**: 이전 버전과 호환되는 버그 수정

### 버전 업데이트 명령어
```bash
npm run version:patch  # 1.0.0 → 1.0.1
npm run version:minor  # 1.0.0 → 1.1.0
npm run version:major  # 1.0.0 → 2.0.0
```

## 🔄 CI/CD 파이프라인

```
코드 푸시 → 테스트 → 빌드 → 릴리즈 생성 → 배포 알림
    ↓           ↓        ↓         ↓           ↓
  main 브랜치  Jest    Android   GitHub     Slack/Email
              ESLint   Gradle    Release    알림
```

## 📞 지원

배포 관련 문제가 발생하면:
1. GitHub Issues에 문제 보고
2. GitHub Actions 로그 첨부
3. 환경 정보 (OS, Node.js 버전 등) 포함 