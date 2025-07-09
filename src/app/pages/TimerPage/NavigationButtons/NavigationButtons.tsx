import React from 'react';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';
import HomeIcon from '@/shared/assets/svgs/btn_home.svg?react';

interface NavigationButtonsProps {
	onHomeClick: () => void;
	onSidebarToggle: () => void;
}

/**
 * 네비게이션 버튼 컴포넌트
 */
const NavigationButtons = ({ onHomeClick, onSidebarToggle }: NavigationButtonsProps) => {
	return (
		<div className="absolute right-[3.2rem] top-[3.2rem] flex w-[10.8rem] items-center">
			<button className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04" onClick={onHomeClick}>
				<HomeIcon />
			</button>
			<button onClick={onSidebarToggle} className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04">
				<HamburgerIcon />
			</button>
		</div>
	);
};

export default NavigationButtons;
