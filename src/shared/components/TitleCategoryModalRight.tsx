interface CategoryTitle {
	msetName: string;
}

const CategoryModalRightTitle = ({ msetName }: CategoryTitle) => {
	return (
		<header className="subhead-bold-22 flex p-[1rem]">
			<h1 className="text-mint-01">
				{msetName.length > 0 ? (
					msetName
				) : (
					<>
						<span className="pr-[1rem]" /> _______ <span className="pr-[0.5rem]" />
					</>
				)}
			</h1>
			<p className="text-white">의 모립세트</p>
		</header>
	);
};

export default CategoryModalRightTitle;
