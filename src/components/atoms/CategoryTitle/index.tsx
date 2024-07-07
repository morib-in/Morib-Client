interface CategoryTitleProps {
	title: string;
}

const CategoryTitle = (props: CategoryTitleProps) => {
	return <h2 className="title-med-32 text-gray-04">{props.title}</h2>;
};

export default CategoryTitle;
