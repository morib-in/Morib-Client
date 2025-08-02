import { dialog, screen } from 'electron';

/**
 * 기본 줌 레벨
 * Zoom Factor 와 Zoom level 은 다른 개념이다.
 * Zoom Factor 는 퍼센트 배율로 줌 조절
 * Zoom level 은 지수 배율로 줌 조절 (1.2^n, n은 정수)
 * 편의를 위해서 Zoom Level 사용으로 통일
 */

/**
 * workAreaSize.width >= MAC16_WIDTH(1728) 일 경우 기본 배율
 */
const BASE_ZOOM_LEVEL = 0;

/**
 * workAreaSize.width < MAC16_WIDTH(1728) 일 경우 줌 축소
 */
const SMALL_ZOOM_LEVEL = -1.0;

/**
 * 맥북 16인치 해상도 기준 (workAreaSize.width: 1700)
 */
const MAC16_WIDTH = 1700;

/**
 * 화면 해상도에 따른 적절한 줌 팩터를 계산합니다.
 * @returns 화면에 맞는 줌 팩터
 */
export const calculateZoomLevel = (): number => {
	// 맥 os 화면 해상도 확인 (workArea란 상단 메뉴바 제외 영역)
	const display = screen.getPrimaryDisplay();
	const pixelWidth = display.workAreaSize.width;

	// 해상도가 맥북 16인치보다 작은 경우 줌 축소
	if (pixelWidth < MAC16_WIDTH) {
		return SMALL_ZOOM_LEVEL;
	}

	return BASE_ZOOM_LEVEL;
};

/**
 * BrowserWindow 생성 시 webPreferences에 포함할 줌 설정 반환
 * 이 방법은 Chromium의 preference 저장 기능에 영향을 받지 않게 하기 위함
 * @returns webPreferences에 포함할 zoomFactor 값
 */
export const getZoomPreferences = () => {
	return {
		zoomLevel: calculateZoomLevel(),
	};
};
