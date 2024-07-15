interface CategoryTitleProps {
	title: string;
}

const CategoryTitle = ({ title }: CategoryTitleProps) => {
	return <h2 className="title-med-32 text-gray-04">{title}</h2>;
};

export default CategoryTitle;
