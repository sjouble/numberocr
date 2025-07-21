#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 버전 타입: major, minor, patch
const versionType = process.argv[2] || 'patch';

// package.json 읽기
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// 현재 버전
const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// 새 버전 계산
let newVersion;
switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// package.json 업데이트
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

// android/app/build.gradle 업데이트
const buildGradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
let buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');

// versionName 업데이트
buildGradleContent = buildGradleContent.replace(
  /versionName\s+"[^"]*"/,
  `versionName "${newVersion}"`
);

// versionCode 업데이트 (현재 날짜 기반)
const today = new Date();
const versionCode = parseInt(today.getFullYear().toString().slice(-2) + 
                           String(today.getMonth() + 1).padStart(2, '0') + 
                           String(today.getDate()).padStart(2, '0'), 10);

buildGradleContent = buildGradleContent.replace(
  /versionCode\s+\d+/,
  `versionCode ${versionCode}`
);

fs.writeFileSync(buildGradlePath, buildGradleContent);

console.log(`✅ 버전이 ${currentVersion}에서 ${newVersion}로 업데이트되었습니다.`);
console.log(`📱 versionCode: ${versionCode}`);
console.log(`🏷️  다음 명령어로 태그를 생성하세요:`);
console.log(`   git add .`);
console.log(`   git commit -m "Bump version to ${newVersion}"`);
console.log(`   git tag v${newVersion}`);
console.log(`   git push origin main --tags`); 