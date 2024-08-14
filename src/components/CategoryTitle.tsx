interface CategoryTitleProps {
	title: string;
}

const CategoryTitle = ({ title }: CategoryTitleProps) => {
	return <div className="subhead-bold-22 pb-[1rem] text-white">{title}</div>;
};

export default CategoryTitle;
