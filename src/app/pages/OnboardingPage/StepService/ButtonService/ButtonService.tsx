interface ButtonServiceProps {
	favicon: string;
	title: string;
	url: string;
	onAddSelectedService: () => void;
	isSelected: boolean;
}

const ButtonService = ({ title, url, favicon, onAddSelectedService, isSelected }: ButtonServiceProps) => {
	return (
		<button
			onClick={onAddSelectedService}
			className={`flex h-[11rem] w-[34rem] items-center gap-x-[2rem] rounded-[8px] border-[1px] p-[2rem] ${
				isSelected ? 'border-mint-01 bg-gray-bg-02' : 'border-transparent bg-gray-bg-03'
			}`}
		>
			<img src={favicon} alt={`${title} 아이콘`} className="h-[7rem] w-[7rem] rounded-full" />
			<div className="flex flex-col">
				<p className="w-[21.3rem] truncate text-start text-white head-bold-24">{title}</p>
				<p className="w-[21.3rem] truncate text-start text-gray-03 detail-reg-14">{url}</p>
			</div>
		</button>
	);
};

export default ButtonService;
