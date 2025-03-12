interface ButtonServiceProps {
	favicon: string;
	title: string;
	url: string;
	onAddSelectedService: (service: string) => void;
}

const ButtonService = ({ title, url, favicon, onAddSelectedService }: ButtonServiceProps) => {
	return (
		<button
			onClick={() => onAddSelectedService(url)}
			className="flex h-[11rem] w-[34rem] items-center gap-x-[2rem] rounded-[8px] bg-gray-bg-03 p-[2rem]"
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
