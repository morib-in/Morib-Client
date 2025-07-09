import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPalette';

interface AllowedServicesItemProps {
	id: number;
	name: string;
	colorCode: string;
	isActive: boolean;
	onSelect: (id: number) => void;
}

const AllowedServicesItem = ({ id, name, colorCode, isActive, onSelect }: AllowedServicesItemProps) => {
	const colorClass =
		colorCode in COLOR_PALETTE_MAP ? COLOR_PALETTE_MAP[colorCode as keyof typeof COLOR_PALETTE_MAP] : 'bg-gray-bg-07';

	return (
		<li
			className={`flex h-[3.4rem] w-[17.2rem] cursor-pointer items-center rounded-[6px] py-[0.3rem] pl-[0.2rem] pr-[0.3rem] hover:bg-gray-bg-04 focus:outline-none ${
				isActive ? 'bg-gray-bg-05' : ''
			}`}
			onClick={() => onSelect(id)}
			tabIndex={0}
		>
			<div className="w-[14.9rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-white detail-semibold-14">
				{name}
			</div>

			<span className={`h-[1rem] w-[1rem] rounded-full ${colorClass}`} />
		</li>
	);
};

export default AllowedServicesItem;
