import { useEffect, useRef, useState } from 'react';

interface UseTimerCountProps {
	isPlaying: boolean;
	previousTime: number;
	shouldRun?: boolean;
}

interface UseTimerCountReturn {
	timer: number;
	increasedTime: number;
	resetIncreasedTime: () => void;
}

/**
 * 타이머 카운트를 관리하는 커스텀 훅
 *
 * 타이머의 초기 시간(previousTime)을 받아 시간이 증가하는 기능을 제공.
 * isPlaying 상태에 따라 자동으로 타이머를 시작하거나 멈춤
 *
 * @example
 * // 사용 예시
 * const { timer, increasedTime, resetIncreasedTime } = useTimerCount({
 *   isPlaying: true,
 *   previousTime: 60, // 1분의 초기 시간
 * });
 *
 * @param isPlaying 타이머가 실행 중인지 여부
 * @param previousTime 이전 저장된 시간 (초 단위)
 * @param shouldRun 타이머가 실행되어야 하는지 여부 (기본값: isPlaying)
 * @returns 타이머 정보 객체 (현재 시간, 증가한 시간, 증가 시간 초기화 함수)
 */
export const useTimerCount = ({
	isPlaying,
	previousTime,
	shouldRun = isPlaying,
}: UseTimerCountProps): UseTimerCountReturn => {
	const [increasedTime, setIncreasedTime] = useState(0);
	const timerIntervalId = useRef<ReturnType<typeof setInterval> | null>(null);

	// 이전 시간이 변경되면 증가 시간 초기화
	useEffect(() => {
		setIncreasedTime(0);
	}, [previousTime]);

	// 타이머 실행/정지 처리
	useEffect(() => {
		const shouldStartTimer = isPlaying && shouldRun;

		if (shouldStartTimer) {
			// 이미 실행 중인 타이머가 없으면 새로 시작
			if (timerIntervalId.current === null) {
				timerIntervalId.current = setInterval(() => {
					setIncreasedTime((prevTime) => prevTime + 1);
				}, 1000);
			}
		} else {
			// 실행 중인 타이머가 있으면 정지
			if (timerIntervalId.current !== null) {
				clearInterval(timerIntervalId.current);
				timerIntervalId.current = null;
			}
		}

		// 컴포넌트 언마운트 시 타이머 정리
		return () => {
			if (timerIntervalId.current !== null) {
				clearInterval(timerIntervalId.current);
				timerIntervalId.current = null;
			}
		};
	}, [isPlaying, shouldRun]);

	// 증가 시간 초기화 함수
	const resetIncreasedTime = () => {
		setIncreasedTime(0);
	};

	// 총 타이머 시간 = 이전 시간 + 증가 시간
	const timer = previousTime + increasedTime;

	return { timer, increasedTime, resetIncreasedTime };
};
