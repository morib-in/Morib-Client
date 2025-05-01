import MoribSetBtnActiveIcon from '@/shared/assets/svgs/btn_moribset_active.svg?react';
import MoribSetBtnDefaultIcon from '@/shared/assets/svgs/btn_moribset_default.svg?react';

import ToolTipAllowedService from './TooltipAllowedService/ToolTipAllowedService';

interface TitleAllowedServiceProps {
	onClick: () => void;
	registeredNames: string[];
	isAllowedServiceVisible: boolean;
}

const TitleAllowedService = ({ onClick, registeredNames, isAllowedServiceVisible }: TitleAllowedServiceProps) => {
	const joinedNames = registeredNames.join(', ');

	return (
		<div
			onClick={onClick}
			className="absolute left-[3.2rem] top-[3.2rem] flex h-[5.4rem] w-[calc(100vw*4/9)] cursor-pointer items-center"
		>
			{registeredNames.length > 0 ? (
				<>
					<MoribSetBtnActiveIcon className="h-[5.5rem] w-[5.4rem] flex-shrink-0" />
					<p className="flex items-center overflow-hidden whitespace-nowrap text-gray-03 subhead-semibold-20">
						<span className="text-mint-01">[</span>
						<span className="overflow-hidden text-ellipsis whitespace-nowrap text-mint-01">{joinedNames}</span>
						<span className="text-mint-01">] 허용 서비스 세트 실행 중</span>
					</p>
				</>
			) : (
				<div className="h-[7rem] flex-col items-center">
					<div className="flex items-center">
						<MoribSetBtnDefaultIcon />
						<p className="text-gray-03 subhead-semibold-20">허용서비스 세트를 등록해주세요.</p>
					</div>
					{!isAllowedServiceVisible && (
						<div className="ml-[1.2rem]">
							<ToolTipAllowedService />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default TitleAllowedService;
