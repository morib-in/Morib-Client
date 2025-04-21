import { useMemo } from 'react';

import { getBaseUrl } from '@/shared/utils/url';

import { DEFAULT_URL } from '@/shared/constants/timerPageText';

import { useGetPopoverAllowedServiceList } from '@/shared/apisV2/timer/timer.queries';

/**
 * 허용된 서비스를 관리하는 커스텀 훅
 * React Query를 통해 받아온 데이터를 가공하여 필요한 형태로 반환
 * @returns 등록된 서비스 이름 목록, 허용된 사이트 URL 목록, 기본 URL을 포함한 URL 목록
 */
export const useAllowedServices = () => {
	// 허용된 서비스 목록 가져오기
	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();

	// 등록된 서비스 및 URL 정보 가공
	const { registeredNames, allowedSiteUrls } = useMemo(() => {
		if (!allowedServiceList?.data) {
			return { registeredNames: [], allowedSiteUrls: [] };
		}

		// 선택된 서비스 그룹만 필터링
		const selectedGroups = allowedServiceList.data.filter((group) => group.selected);

		// 그룹 이름만 추출
		const names = selectedGroups.map((group) => group.name);

		// 모든 허용된 사이트 URL 수집 및 중복 제거
		const urls = Array.from(
			new Set(selectedGroups.flatMap((group) => group.allowedSites?.map((site) => site.siteUrl) || [])),
		);

		return {
			registeredNames: names,
			allowedSiteUrls: urls,
		};
	}, [allowedServiceList?.data]);

	// 정리된 URL에서 기본 URL 추출
	const baseUrls = useMemo(() => {
		const mappedUrls = allowedSiteUrls.map((url) => getBaseUrl(url.trim()));
		return [...mappedUrls, DEFAULT_URL];
	}, [allowedSiteUrls]);

	return {
		registeredNames,
		allowedSiteUrls,
		baseUrls,
	};
};
