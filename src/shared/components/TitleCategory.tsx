interface TitleCategoryProps {
	title: string;
}

const TitleCategory = ({ title }: TitleCategoryProps) => {
	return <div className="subhead-bold-22 pb-[1rem] text-white">{title}</div>;
};

export default TitleCategory;
