const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// GitHub 저장소 정보
const REPO_URL = 'https://github.com/sjouble/numberocr';
const RELEASES_URL = `${REPO_URL}/releases`;

async function generateQRCode() {
  try {
    // QR 코드 생성
    const qrCodeDataURL = await QRCode.toDataURL(RELEASES_URL, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // HTML 파일 생성
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NumberOCR 설치</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .qr-container {
            margin: 20px 0;
        }
        .qr-code {
            border: 2px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            display: inline-block;
        }
        .instructions {
            text-align: left;
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px;
        }
        .button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <h1>📱 NumberOCR 설치</h1>
    <p>아래 QR 코드를 스캔하여 GitHub 릴리즈 페이지로 이동하세요.</p>
    
    <div class="qr-container">
        <div class="qr-code">
            <img src="${qrCodeDataURL}" alt="QR Code" />
        </div>
    </div>
    
    <div class="instructions">
        <h3>📋 설치 방법:</h3>
        <ol>
            <li>QR 코드를 스캔하여 GitHub 릴리즈 페이지로 이동</li>
            <li>최신 릴리즈에서 APK 파일 다운로드</li>
            <li>Android 설정에서 "알 수 없는 소스" 활성화</li>
            <li>다운로드한 APK 파일 설치</li>
        </ol>
    </div>
    
    <a href="${RELEASES_URL}" class="button" target="_blank">GitHub 릴리즈 바로가기</a>
    <a href="${REPO_URL}" class="button" target="_blank">GitHub 저장소</a>
    
    <div class="instructions">
        <h3>🔧 설치 후 설정:</h3>
        <ul>
            <li>카메라 권한 허용</li>
            <li>저장소 권한 허용</li>
            <li>앱 실행 후 카메라 기능 테스트</li>
        </ul>
    </div>
</body>
</html>`;

    // HTML 파일 저장
    const outputPath = path.join(__dirname, '../docs/install-qr.html');
    fs.writeFileSync(outputPath, htmlContent);
    
    console.log('✅ QR 코드 HTML 파일이 생성되었습니다:');
    console.log(`📁 위치: ${outputPath}`);
    console.log(`🌐 GitHub 릴리즈: ${RELEASES_URL}`);
    
  } catch (error) {
    console.error('❌ QR 코드 생성 중 오류 발생:', error);
  }
}

// 스크립트 실행
generateQRCode(); 