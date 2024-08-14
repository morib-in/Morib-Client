interface FaviconDataProps {
	name: string;
	favicon: string;
}

const TimerFavicon = ({ name, favicon }: FaviconDataProps) => {
	return <img className="h-[3.2rem] w-[3.2rem]" src={favicon} alt={name} />;
};

export default TimerFavicon;
