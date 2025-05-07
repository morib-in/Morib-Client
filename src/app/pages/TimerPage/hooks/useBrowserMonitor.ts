import { useCallback, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { usePostAddAllowedService } from '@/shared/apisV2/allowedService/allowedService.mutations';
import { timerKeys } from '@/shared/apisV2/timer/timer.keys';
import { useGetPopoverAllowedServiceList } from '@/shared/apisV2/timer/timer.queries';

interface UseBrowserMonitorProps {
	allowedServices: string[];
	isTimerActive: boolean;
	onStopTimer: () => void;
	onStartTimer: () => void;
}

/**
 * 브라우저 URL 모니터링 훅
 * 허용된 서비스 외의 URL에 접속하면 타이머를 자동으로 정지
 */
export function useBrowserMonitor(props: UseBrowserMonitorProps) {
	const { allowedServices, isTimerActive, onStopTimer } = props;

	const [isActive, setIsActive] = useState(false);
	const [lastUnallowedUrl, setLastUnallowedUrl] = useState<string | null>(null);

	// 이벤트 처리 상태 관리 (타이머 리렌더링 이슈로 ref로 이벤트 임시 처리)
	const isStoppingTimer = useRef(false);

	// useRef로 최신 값 참조를 위한 설정
	const listenersRegistered = useRef(false);
	const currentOnStopTimer = useRef(onStopTimer);
	const currentIsTimerActive = useRef(isTimerActive);

	// 최신 값으로 ref 업데이트
	useEffect(() => {
		currentOnStopTimer.current = onStopTimer;
		currentIsTimerActive.current = isTimerActive;

		// 타이머가 비활성화되면 정지 상태 초기화
		if (!isTimerActive) {
			isStoppingTimer.current = false;
		}
	}, [onStopTimer, isTimerActive]);

	// 허용 서비스 목록 전처리 (도메인 형식으로 변환)
	const processAllowedServices = useCallback(() => {
		return allowedServices.filter((domain) => domain && domain.includes('.'));
	}, [allowedServices]);

	// 브라우저 모니터링 시작
	const startMonitoring = useCallback(() => {
		if (!window.electron?.browserMonitor) {
			console.warn('브라우저 모니터링 API를 사용할 수 없습니다.');
			return;
		}

		// 타이머가 정지 중이거나 정지 처리 중이면 모니터링 시작하지 않음
		if (!currentIsTimerActive.current || isStoppingTimer.current) {
			console.log('타이머가 비활성 상태이거나 정지 처리 중이므로 모니터링을 시작하지 않습니다.');
			return;
		}

		// 허용 서비스 목록 가공
		const domains = processAllowedServices();
		console.log('모니터링 시작. 허용 도메인:', domains);

		// 허용 서비스 목록을 메인 프로세스로 전송
		window.electron.browserMonitor.startMonitoring(domains);
		setIsActive(true);
	}, [processAllowedServices]);

	// 브라우저 모니터링 중지
	const stopMonitoring = useCallback(() => {
		if (!window.electron?.browserMonitor) return;

		if (isActive) {
			console.log('브라우저 모니터링 중지');
			window.electron.browserMonitor.stopMonitoring();
			setIsActive(false);
		}
	}, [isActive]);

	// 허용 서비스 등록
	const registerAllowedService = useCallback(
		(url: string) => {
			try {
				// URL에서 호스트명 추출
				const hostname = new URL(url).hostname;
				console.log('허용 서비스 등록 요청:', hostname);

				// 추후 구현: 허용 서비스 목록에 호스트명 추가하는 API 호출
				console.log('허용 서비스 등록:', hostname);

				// 모니터링 재시작 (새 허용 목록 반영)
				if (isActive) {
					stopMonitoring();
					// 약간의 지연 후 재시작 (상태 업데이트 반영 위해)
					setTimeout(() => startMonitoring(), 100);
				}
			} catch (error) {
				console.error('URL 파싱 오류:', error);
			}
		},
		[isActive, startMonitoring, stopMonitoring],
	);

	// 타이머 중지 함수를 호출하는 공통 함수
	const executeTimerStop = useCallback(() => {
		// 이미 정지 중이면 중복 실행 방지
		if (isStoppingTimer.current) {
			console.log('이미 타이머 정지 처리 중입니다.');
			return false;
		}

		// 타이머가 비활성 상태면 실행하지 않음
		if (!currentIsTimerActive.current) {
			console.log('타이머가 이미 정지 상태입니다.');
			return false;
		}

		try {
			// 정지 중 플래그 설정
			isStoppingTimer.current = true;

			// 모니터링 즉시 중지 (중복 이벤트 방지)
			stopMonitoring();

			// 타이머 정지 함수 실행
			console.log('타이머 중지 함수 실행');
			currentOnStopTimer.current();
			console.log('타이머 중지 함수 실행 완료');
			return true;
		} catch (error) {
			console.error('타이머 중지 함수 실행 중 오류:', error);
			// 에러 발생 시에도 플래그는 초기화하지 않음 (타이머 상태 변경 시 초기화됨)
			return false;
		}
	}, [stopMonitoring]);

	// 허용서비스 그룹 목록 쿼리
	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();
	// 허용서비스 추가 mutation
	const { mutate: postAddAllowedService } = usePostAddAllowedService();
	const queryClient = useQueryClient();

	// 시스템 알림 띄우기 함수
	const showSystemNotification = (title: string, message: string) => {
		if ('Notification' in window) {
			new window.Notification(title, { body: message });
		}
	};

	// 허용되지 않은 URL 발견 시 처리와 타이머 중지 처리
	useEffect(() => {
		if (!window.electron?.browserMonitor || listenersRegistered.current) return;

		// 명시적인 타입 단언 사용
		const browserMonitor = window.electron?.browserMonitor;

		// 1. 타이머 중지 전용 이벤트 리스너
		console.log('타이머 중지 전용 이벤트 리스너 등록');
		const unsubscribeTimerStop = browserMonitor.onTimerStop((data: { url: string; timestamp: number }) => {
			console.log('타이머 중지 이벤트 수신:', data);

			// URL 상태 업데이트 (UI 표시용)
			setLastUnallowedUrl(data.url);

			// 타이머 중지 함수 실행
			executeTimerStop();
		});

		// 2. 일반 허용되지 않은 URL 감지 이벤트 리스너
		console.log('허용되지 않은 URL 이벤트 리스너 등록');
		const unsubscribe = browserMonitor.onUnallowedUrl((url: string, action?: string) => {
			console.log('허용되지 않은 URL 감지:', url, '액션:', action);
			setLastUnallowedUrl(url);

			// 타이머 중지 함수 실행
			executeTimerStop();
		});

		// 3. 알림 액션 이벤트 처리
		console.log('알림 액션 이벤트 리스너 등록');
		const unsubscribeNotification = browserMonitor.onNotificationAction((action, url) => {
			console.log('알림 액션 수신:', action, url);
			if (action === 'register') {
				const selectedGroups = allowedServiceList?.data.filter((group) => group.selected) ?? [];
				if (selectedGroups.length > 0) {
					postAddAllowedService(
						{ allowedGroupId: selectedGroups[0].id, siteUrl: url },
						{
							onSuccess: () => {
								const queryKey = timerKeys.popover();
								queryClient.invalidateQueries({ queryKey });

								showSystemNotification('허용서비스에 추가에 성공했어요.', `허용서비스 세트에 ${url}이 추가되었어요.`);
							},
							onError: () => {
								showSystemNotification('허용서비스 추가에 실패했어요.', '다시 시도해주세요.');
							},
						},
					);
				} else {
					showSystemNotification('허용서비스 추가에 실패했어요.', '타이머에서 허용 서비스 세트를 먼저 선택해주세요.');
				}
			}
		});

		// 리스너 등록 완료 표시
		listenersRegistered.current = true;

		return () => {
			console.log('URL 이벤트 리스너 해제');
			if (unsubscribe && typeof unsubscribe === 'function') {
				unsubscribe();
			}
			if (unsubscribeNotification && typeof unsubscribeNotification === 'function') {
				unsubscribeNotification();
			}
			if (unsubscribeTimerStop && typeof unsubscribeTimerStop === 'function') {
				unsubscribeTimerStop();
			}
			listenersRegistered.current = false;
		};
		// 의존성 배열에 executeTimerStop 추가
	}, [executeTimerStop]);

	// 타이머 상태에 따라 자동 모니터링 시작/중지
	useEffect(() => {
		console.log('타이머 상태 변경:', isTimerActive, '모니터링 상태:', isActive);

		if (isTimerActive && !isActive && !isStoppingTimer.current) {
			console.log('타이머 시작으로 인한 모니터링 시작');
			startMonitoring();
		} else if (!isTimerActive && isActive) {
			console.log('타이머 중지로 인한 모니터링 중지');
			stopMonitoring();
		}
	}, [isTimerActive, isActive, startMonitoring, stopMonitoring]);

	return {
		isActive,
		lastUnallowedUrl,
		startMonitoring,
		stopMonitoring,
		registerAllowedService,
	};
}
