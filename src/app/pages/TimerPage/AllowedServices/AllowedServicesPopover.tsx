import { useCallback, useMemo, useState } from 'react';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

import { getServiceFavicon } from '@/pages/OnboardingPage/utils/serviceUrl';
import { usePostApplyAllowedServiceGroup } from '@/shared/apisV2/timer/timer.mutations';
import { useGetPopoverAllowedServiceList } from '@/shared/apisV2/timer/timer.queries';

import { useTimerContext } from '../contexts/TimerContext';
import Checkbox from './Checkbox';

interface AllowedServicesPopoverProps {
	onCancel: () => void;
}

/**
 * 허용 서비스 설정 팝오버 컴포넌트
 * @param onCancel 취소 시 실행할 함수
 */
const AllowedServicesPopover = ({ onCancel }: AllowedServicesPopoverProps) => {
	const { actions } = useTimerContext();

	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();

	// 서비스 그룹 데이터 메모이제이션
	const serviceGroups = useMemo(() => allowedServiceList?.data ?? [], [allowedServiceList?.data]);

	// 초기 선택된 그룹 ID와 선택된 그룹 목록 계산
	const initialData = useMemo(() => {
		const selectedIds = serviceGroups.filter((group) => group.selected).map((group) => group.id);
		const firstId = serviceGroups[0]?.id ?? null;
		return { selectedIds, firstId };
	}, [serviceGroups]);

	// 선택된 서비스 그룹 ID 관리
	const [selectedServiceGroupId, setSelectedServiceGroupId] = useState<number | null>(initialData.firstId);

	// 체크된 서비스 그룹 ID 목록 관리
	const [checkedServiceGroupIds, setCheckedServiceGroupIds] = useState<number[]>(initialData.selectedIds);

	// 현재 선택된 그룹의 허용 사이트 목록 (파생 데이터)
	const activeAllowedSites = useMemo(() => {
		return serviceGroups.find((group) => group.id === selectedServiceGroupId)?.allowedSites ?? [];
	}, [serviceGroups, selectedServiceGroupId]);

	// 체크박스 상태 확인 (파생 함수)
	const isCheckedServiceGroupId = useMemo(() => {
		return (id: number) => checkedServiceGroupIds.includes(id);
	}, [checkedServiceGroupIds]);

	// API mutation 설정
	const { mutate: applyAllowedServiceGroup } = usePostApplyAllowedServiceGroup({
		allowedGroupIdList: checkedServiceGroupIds,
	});

	// 체크박스 토글 핸들러
	const toggleCheckedServiceGroupId = useCallback((id: number) => {
		setCheckedServiceGroupIds((prev) =>
			prev.includes(id) ? prev.filter((checkedId) => checkedId !== id) : [...prev, id],
		);
	}, []);

	// 적용 버튼 핸들러
	const handleApplyAllowedServiceGroup = useCallback(() => {
		applyAllowedServiceGroup(undefined, {
			onSuccess: actions.hideAllowedServices,
		});
	}, [actions.hideAllowedServices, applyAllowedServiceGroup]);

	// 서비스 그룹 선택 핸들러
	const handleSelectServiceGroup = useCallback((id: number) => {
		setSelectedServiceGroupId(id);
	}, []);

	if (!allowedServiceList) {
		return null;
	}

	return (
		<div className="flex h-[45rem] w-[53.2rem] overflow-hidden rounded-[1.5rem] bg-gray-bg-03">
			{/* 왼쪽 서비스 그룹 목록 */}
			<div className="flex w-[23rem] flex-col bg-gray-bg-02 p-[1rem]">
				<h3 className="h-[3.4rem] w-[21rem] px-[1.7rem] py-[1rem] text-gray-04 detail-reg-14">허용서비스 세트</h3>
				<ul className="mt-[0.8rem] h-[32.4rem] w-[20.4rem] overflow-y-auto">
					{serviceGroups.map((service) => (
						<li
							key={service.id}
							onClick={() => handleSelectServiceGroup(service.id)}
							className={`flex h-[3.4rem] w-full cursor-pointer items-center rounded-[6px] px-[0.5rem] hover:bg-gray-bg-04 ${
								service.id === selectedServiceGroupId ? 'bg-gray-bg-05' : ''
							}`}
						>
							<div className="flex w-full items-center">
								<div className="h-[2.8rem] w-[2.8rem] p-[0.7rem]" onClick={(e) => e.stopPropagation()}>
									<Checkbox
										onClick={() => toggleCheckedServiceGroupId(service.id)}
										checked={isCheckedServiceGroupId(service.id)}
									/>
								</div>

								<div className="ml-2 w-[14.9rem] overflow-hidden text-ellipsis whitespace-nowrap text-white detail-semibold-14">
									{service.name}
								</div>

								{/* 색상 표시 원 */}
								<div
									className={`ml-auto h-[1rem] w-[1rem] flex-shrink-0 rounded-full ${
										service.colorCode in COLOR_PALETTE_MAP ? COLOR_PALETTE_MAP[service.colorCode] : 'bg-gray-bg-07'
									}`}
								/>
							</div>
						</li>
					))}
				</ul>
				<div className="flex h-[5.4rem] justify-end gap-[0.5rem] p-[1rem]">
					<button
						onClick={onCancel}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[8px] bg-gray-bg-06 text-white detail-semibold-14"
					>
						취소
					</button>
					<button
						onClick={handleApplyAllowedServiceGroup}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[8px] bg-mint-02 text-black detail-semibold-14"
					>
						등록
					</button>
				</div>
			</div>

			{/* 오른쪽 허용 사이트 목록 */}
			<div className="flex w-[30.2rem] flex-col gap-[0.8rem] bg-gray-bg-03 py-[1rem] pl-[0.9rem] pr-[1.7rem]">
				<h3 className="h-[3.4rem] w-[28.6rem] p-[1rem] text-gray-04 detail-reg-14">허용할 사이트</h3>
				<ul className="h-[37.6rem] overflow-y-auto">
					{activeAllowedSites.map((siteInfo) => (
						<li
							key={siteInfo.id}
							className="flex h-[3.2rem] w-[27.6rem] items-center gap-[1rem] rounded-[8px] px-[0.7rem] odd:bg-gray-bg-02"
						>
							<img src={getServiceFavicon(siteInfo.siteUrl)} alt={`${siteInfo.siteName} 아이콘`} className="h-6 w-6" />
							<span className="truncate text-white detail-reg-12">{siteInfo.siteName}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default AllowedServicesPopover;
