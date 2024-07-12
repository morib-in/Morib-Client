interface CategoryTitle {
	msetName: string;
}

const CategoryModalRightTitle = ({ msetName }: CategoryTitle) => {
	return (
		<header className="subhead-bold-22 flex p-[1rem]">
			<h1 className="text-mint-01">{msetName}</h1>
			<p>의 모립세트</p>
		</header>
	);
};

export default CategoryModalRightTitle;
