import GearIcon from '@/shared/assets/svgs/gear.svg?react';

import HomeSideBox from '@/components/atoms/HomeSideBox';
import SpaceLogoBtn from '@/components/atoms/SpaceLogoBtn';

import ButtonSVG from '../../../shared/components/ButtonSVG';

const SideBarHome = () => {
	return (
		<HomeSideBox>
			<div>
				<SpaceLogoBtn>
					<img src={`${import.meta.env.VITE_IMAGE_CDN_URL}logo_icon.svg`} alt="로고 아이콘" />
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
