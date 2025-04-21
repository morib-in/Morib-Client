import MoribSetBtnActiveIcon from '@/shared/assets/svgs/btn_moribset_active.svg?react';
import MoribSetBtnDefaultIcon from '@/shared/assets/svgs/btn_moribset_default.svg?react';

import AllowedServicesTooltip from './AllowedServicesTooltip';

interface AllowedServicesTitleProps {
	onClick: () => void;
	registeredNames: string[];
	isAllowedServiceVisible: boolean;
}

/**
 * 허용 서비스 타이틀 컴포넌트
 * @param onClick 클릭 시 실행할 함수
 * @param registeredNames 등록된 서비스 이름 목록
 * @param isAllowedServiceVisible 허용 서비스 팝업이 표시 중인지 여부
 */
const AllowedServicesTitle = ({ onClick, registeredNames, isAllowedServiceVisible }: AllowedServicesTitleProps) => {
	const joinedNames = registeredNames.join(', ');
	const hasServices = registeredNames.length > 0;

	return (
		<div
			onClick={onClick}
			className="absolute left-[3.2rem] top-[3.2rem] flex h-[5.4rem] w-[calc(100vw*4/9)] cursor-pointer items-center"
			role="button"
			aria-label="허용 서비스 설정"
			tabIndex={0}
		>
			{hasServices ? (
				// 서비스가 등록된 경우
				<>
					<MoribSetBtnActiveIcon className="h-[5.5rem] w-[5.4rem] flex-shrink-0" />
					<p className="flex items-center overflow-hidden whitespace-nowrap text-gray-03 subhead-semibold-20">
						<span className="text-mint-01">[</span>
						<span className="overflow-hidden text-ellipsis whitespace-nowrap text-mint-01">{joinedNames}</span>
						<span className="text-mint-01">] 허용 서비스 세트 실행 중</span>
					</p>
				</>
			) : (
				// 서비스가 등록되지 않은 경우
				<div className="h-[7rem] flex-col items-center">
					<div className="flex items-center">
						<MoribSetBtnDefaultIcon />
						<p className="text-gray-03 subhead-semibold-20">허용서비스 세트를 등록해주세요.</p>
					</div>
					{!isAllowedServiceVisible && (
						<div className="ml-[1.2rem]">
							<AllowedServicesTooltip />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AllowedServicesTitle;
