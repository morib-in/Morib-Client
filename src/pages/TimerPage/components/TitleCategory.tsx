interface TitleCategoryProps {
	title: string;
}

const TitleCategory = ({ title }: TitleCategoryProps) => {
	return <h2 className="title-med-32 text-gray-04">{title}</h2>;
};

export default TitleCategory;
