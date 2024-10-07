type TitleMoribSetProp = { moribSetName: string };
const TitleMoribSet = ({ moribSetName }: TitleMoribSetProp) => {
	return (
		<div className="subhead-bold-22 mb-[8px] flex w-full flex-row justify-start p-[1rem]">
			<h2 className="text-mint-01">
				{moribSetName.length > 0 ? (
					moribSetName
				) : (
					<>
						<span className="pr-[1rem]" /> _______ <span className="pr-[0.5rem]" />
					</>
				)}
			</h2>
			<h2 className="text-white">의 모립세트</h2>
		</div>
	);
};

export default TitleMoribSet;
