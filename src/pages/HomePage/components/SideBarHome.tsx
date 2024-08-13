import HomeSideBox from '@/components/atoms/HomeSideBox';
import SpaceLogoBtn from '@/components/atoms/SpaceLogoBtn';

import GearIcon from '@/shared/assets/svgs/gear.svg?react';
import LogoIcon from '@/shared/assets/svgs/logo_icon.svg?react';

import ButtonSVG from '../../../shared/components/ButtonSVG';

const SideBarHome = () => {
	return (
		<HomeSideBox>
			<div>
				<SpaceLogoBtn>
					<LogoIcon />
				</SpaceLogoBtn>
			</div>
			<div>
				<ButtonSVG>
					<GearIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</ButtonSVG>
			</div>
		</HomeSideBox>
	);
};

export default SideBarHome;
