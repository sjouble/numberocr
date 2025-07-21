@echo off
echo Android 개발 환경 설정 스크립트
echo ================================

echo.
echo 1. JAVA_HOME 설정 확인...
if defined JAVA_HOME (
    echo JAVA_HOME이 이미 설정되어 있습니다: %JAVA_HOME%
) else (
    echo JAVA_HOME이 설정되지 않았습니다.
    echo JDK 17을 설치하고 JAVA_HOME을 설정하세요.
)

echo.
echo 2. ANDROID_HOME 설정 확인...
if defined ANDROID_HOME (
    echo ANDROID_HOME이 이미 설정되어 있습니다: %ANDROID_HOME%
) else (
    echo ANDROID_HOME이 설정되지 않았습니다.
    echo Android Studio를 설치하고 ANDROID_HOME을 설정하세요.
)

echo.
echo 3. PATH에 Android 도구 추가...
echo 현재 PATH: %PATH%

echo.
echo 4. ADB 확인...
adb version 2>nul
if %errorlevel% equ 0 (
    echo ADB가 정상적으로 설치되어 있습니다.
) else (
    echo ADB를 찾을 수 없습니다. Android Studio 설치를 확인하세요.
)

echo.
echo 5. Java 확인...
java -version 2>nul
if %errorlevel% equ 0 (
    echo Java가 정상적으로 설치되어 있습니다.
) else (
    echo Java를 찾을 수 없습니다. JDK 설치를 확인하세요.
)

echo.
echo ================================
echo 설정 완료! 이제 npm run android를 실행할 수 있습니다.
pause 