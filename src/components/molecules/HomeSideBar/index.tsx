import HomeSideBox from '@/components/atoms/HomeSideBox';
import SVGBtn from '@/components/atoms/SVGBtn';
import SpaceLogoBtn from '@/components/atoms/SpaceLogoBtn';

import GearIcon from '@/assets/svgs/gear.svg?react';
import LogoIcon from '@/assets/svgs/logo_icon.svg?react';

const HomeSideBar = () => {
	return (
		<HomeSideBox>
			<div>
				<SpaceLogoBtn>
					<LogoIcon />
				</SpaceLogoBtn>
			</div>
			<div>
				<SVGBtn>
					<GearIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</SVGBtn>
			</div>
		</HomeSideBox>
	);
};

export default HomeSideBar;
