#!/bin/bash

# 이미지 최적화 스크립트
# 사용법: ./optimize_images.sh [directory]
# 예시: ./optimize_images.sh images/projects/2024-klever

# 컬러 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== 이미지 최적화 스크립트 ===${NC}\n"

# 디렉토리 인자가 없으면 현재 디렉토리 사용
TARGET_DIR="${1:-.}"

if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${YELLOW}오류: 디렉토리를 찾을 수 없습니다: $TARGET_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}대상 디렉토리: $TARGET_DIR${NC}\n"

# 최적화 전 총 크기 계산
BEFORE_SIZE=$(du -sh "$TARGET_DIR" | cut -f1)
echo -e "최적화 전 크기: ${YELLOW}$BEFORE_SIZE${NC}\n"

# ImageMagick 설치 확인
if ! command -v convert &> /dev/null; then
    echo -e "${YELLOW}ImageMagick이 설치되어 있지 않습니다.${NC}"
    echo "Homebrew로 설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        brew install imagemagick
    else
        echo "ImageMagick 없이는 이미지 최적화를 진행할 수 없습니다."
        exit 1
    fi
fi

# 백업 디렉토리 생성
BACKUP_DIR="${TARGET_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
echo -e "${BLUE}백업 디렉토리 생성: $BACKUP_DIR${NC}"
cp -r "$TARGET_DIR" "$BACKUP_DIR"

total_files=0
optimized_files=0

echo -e "\n${BLUE}PNG 파일 최적화 중...${NC}"
# PNG 파일 최적화 (품질 유지하면서 압축)
while IFS= read -r -d '' file; do
    ((total_files++))
    echo -e "${GREEN}처리 중: $file${NC}"
    convert "$file" -strip -quality 85 -define png:compression-level=9 "$file"
    ((optimized_files++))
done < <(find "$TARGET_DIR" -type f -iname "*.png" -print0)

echo -e "\n${BLUE}JPG/JPEG 파일 최적화 중...${NC}"
# JPG 파일 최적화
while IFS= read -r -d '' file; do
    ((total_files++))
    echo -e "${GREEN}처리 중: $file${NC}"
    convert "$file" -strip -interlace Plane -quality 85 "$file"
    ((optimized_files++))
done < <(find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

echo -e "\n${BLUE}GIF 파일 최적화 중...${NC}"
# GIF 파일 최적화 (GIF는 특별히 주의 필요)
while IFS= read -r -d '' file; do
    ((total_files++))
    echo -e "${YELLOW}GIF 파일 발견: $file${NC}"
    echo -e "${YELLOW}GIF 파일은 수동으로 최적화하는 것을 권장합니다 (예: gifsicle 사용)${NC}"
    # gifsicle이 설치되어 있으면 최적화
    if command -v gifsicle &> /dev/null; then
        echo -e "${GREEN}gifsicle로 최적화 중...${NC}"
        gifsicle -O3 --colors 256 "$file" -o "$file"
        ((optimized_files++))
    else
        echo -e "${YELLOW}gifsicle을 설치하면 GIF 최적화가 가능합니다: brew install gifsicle${NC}"
    fi
done < <(find "$TARGET_DIR" -type f -iname "*.gif" -print0)

# 최적화 후 총 크기 계산
AFTER_SIZE=$(du -sh "$TARGET_DIR" | cut -f1)

echo -e "\n${BLUE}=== 최적화 완료 ===${NC}"
echo -e "처리된 파일: ${GREEN}$optimized_files / $total_files${NC}"
echo -e "최적화 전: ${YELLOW}$BEFORE_SIZE${NC}"
echo -e "최적화 후: ${GREEN}$AFTER_SIZE${NC}"
echo -e "백업 위치: ${BLUE}$BACKUP_DIR${NC}"
echo -e "\n${GREEN}✓ 완료!${NC}"