#!/bin/bash

# macOS Universal 앱 빌드 및 공증 스크립트
# Intel(x64) + Apple Silicon(arm64) 모두 지원하는 Universal 바이너리 생성

# .env 파일이 있으면 로드
if [ -f ".env" ]; then
  echo "=== .env 파일에서 환경 변수 로드 ==="
  export $(grep -v '^#' .env | xargs)
fi

# 환경 변수 확인
if [ -z "$APPLE_ID" ] || [ -z "$APPLE_APP_SPECIFIC_PASSWORD" ] || [ -z "$APPLE_TEAM_ID" ]; then
  echo "=== 환경 변수 설정이 필요합니다 ==="
  echo "다음 환경 변수를 .env 파일에 설정하세요:"
  echo "- APPLE_ID: Apple 개발자 계정 이메일"
  echo "- APPLE_APP_SPECIFIC_PASSWORD: 앱 특정 비밀번호 (https://appleid.apple.com에서 생성)"
  echo "- APPLE_TEAM_ID: Apple 개발자 팀 ID (10자리 식별자)"
  echo ""
  echo "예시 .env 파일:"
  echo "APPLE_ID=your.email@example.com"
  echo "APPLE_APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx"
  echo "APPLE_TEAM_ID=ABCDE12345"
  exit 1
fi

# electron-builder 환경 변수 설정
export CSC_IDENTITY_AUTO_DISCOVERY=true

# 타입스크립트 컴파일 및 빌드
echo "=== Electron 소스 코드 트랜스파일 ==="
pnpm transpile:electron

echo "=== React 앱 빌드 ==="
pnpm build

echo "=== electron-builder 실행 (Universal Mac) ==="
echo "공증을 시작합니다. 시간이 오래 걸릴 수 있습니다..."
pnpm electron-builder --mac --universal

echo "=== 빌드 및 공증 완료 ==="
echo "앱 위치: ./dist/" 