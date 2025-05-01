import { useEffect, useState } from 'react';

import type { PopoverAllowedSitesType } from '@/shared/types/allowedService';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

import { getServiceFavicon } from '@/pages/OnboardingPage/utils/serviceUrl';
import { usePostApplyAllowedServiceGroup } from '@/shared/apisV2/timer/timer.mutations';
import { useGetPopoverAllowedServiceList } from '@/shared/apisV2/timer/timer.queries';

import Checkbox from './Checkbox/Checkbox';

const PopoverAllowedService = ({ onCancel }: { onCancel: () => void }) => {
	const [selectedServiceGroupId, setSelectedServiceGroupId] = useState<number | null>(null);
	const [checkedServiceGroupIds, setCheckedServiceGroupIds] = useState<number[]>([]);
	const [activeAllowedSites, setActiveAllowedSites] = useState<PopoverAllowedSitesType>([]);

	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();
	const { mutate: applyAllowedServiceGroup } = usePostApplyAllowedServiceGroup({
		allowedGroupIdList: checkedServiceGroupIds,
	});

	const isCheckedServiceGroupId = (id: number) => checkedServiceGroupIds.includes(id);

	const handleAllowedServiceGroupClick = (id: number) => {
		setSelectedServiceGroupId(id);
		changeActiveAllowedSites(id);
	};

	const changeActiveAllowedSites = (selectedServiceGroupId: number) => {
		const activeAllowedSites = allowedServiceList?.data?.find(
			(group) => group.id === selectedServiceGroupId,
		)?.allowedSites;

		if (activeAllowedSites) {
			setActiveAllowedSites(activeAllowedSites);
		}
	};

	const toggleCheckedServiceGroupIds = (id: number) => {
		if (isCheckedServiceGroupId(id)) {
			const newActiveServiceGroupIds = checkedServiceGroupIds.filter((checkedId) => checkedId !== id);
			setCheckedServiceGroupIds(newActiveServiceGroupIds);
		} else {
			const newActiveServiceGroupIds = [...checkedServiceGroupIds, id];
			setCheckedServiceGroupIds(newActiveServiceGroupIds);
		}
	};

	const handleApplyAllowedServiceGroup = () => {
		applyAllowedServiceGroup(undefined, {
			onSuccess: () => {
				onCancel();
			},
		});
	};

	useEffect(() => {
		if (allowedServiceList) {
			const registeredNames = [] as string[];

			allowedServiceList.data.forEach((group) => {
				if (group.selected) {
					if (!isCheckedServiceGroupId(group.id)) {
						setCheckedServiceGroupIds((prev) => [...prev, group.id]);
					}

					registeredNames.push(...group.allowedSites.map((site) => site.siteName));
				}
			});
		}
	}, [allowedServiceList]);

	return (
		<div className="flex h-[45rem] w-[53.2rem]">
			<div className="flex w-[23rem] flex-col rounded-l-[8px] bg-gray-bg-02 p-[1rem]">
				<h3 className="h-[3.4rem] w-[21rem] px-[1.7rem] py-[1rem] text-gray-04 detail-reg-14">허용서비스 세트</h3>
				<ul className="mt-[0.8rem] h-[32.4rem] w-[20.4rem] overflow-y-auto">
					{allowedServiceList?.data?.map((service) => (
						<li
							key={service.id}
							className={`flex h-[3.4rem] w-[20.4rem] cursor-pointer items-center rounded-[6px] py-[0.3rem] pl-[1rem] pr-[0.3rem] hover:bg-gray-bg-04 focus:outline-none ${
								service.id === selectedServiceGroupId ? 'bg-gray-bg-05' : ''
							}`}
							onClick={() => handleAllowedServiceGroupClick(service.id)}
							tabIndex={0}
						>
							<div
								onClick={(e) => {
									e.stopPropagation();
								}}
								className="h-[2.8rem] w-[2.8rem] p-[0.7rem]"
							>
								<Checkbox
									onClick={() => {
										toggleCheckedServiceGroupIds(service.id);
									}}
									checked={isCheckedServiceGroupId(service.id)}
								/>
							</div>
							<div className="w-[14.9rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-white detail-semibold-14">
								{service.name}
							</div>

							<span className={`h-[1rem] w-[1rem] rounded-full ${COLOR_PALETTE_MAP[service.colorCode]}`} />
						</li>
					))}
				</ul>
				<div className="flex h-[5.4rem] justify-end gap-[0.5rem] p-[1rem]">
					<button
						onClick={onCancel}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[3.297px] bg-gray-bg-06 text-white detail-semibold-14"
					>
						취소
					</button>
					<button
						onClick={handleApplyAllowedServiceGroup}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[3.297px] bg-mint-02 text-black detail-semibold-14"
					>
						등록
					</button>
				</div>
			</div>

			<div className="flex w-[30.2rem] flex-col gap-[0.8rem] rounded-r-[8px] bg-gray-bg-03 py-[1rem] pl-[0.9rem] pr-[1.7rem]">
				<h3 className="h-[3.4rem] w-[28.6rem] p-[1rem] text-gray-04 detail-reg-14">허용할 사이트</h3>
				<ul className="h-[37.6rem] overflow-y-auto">
					{activeAllowedSites.map((siteInfo) => (
						<li
							key={siteInfo.id}
							className="flex h-[3.2rem] w-[27.6rem] items-center gap-[1rem] rounded-[3px] px-[0.7rem] odd:bg-gray-bg-02"
						>
							<img src={getServiceFavicon(siteInfo.siteUrl)} alt={`${siteInfo.siteName} Icon`} className="h-6 w-6" />
							<span className="truncate text-white detail-reg-12">{siteInfo.siteName}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PopoverAllowedService;
