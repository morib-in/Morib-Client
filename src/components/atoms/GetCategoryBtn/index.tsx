import ArrowCircleUpRight from '@/assets/svgs/arrow_circle_up_right.svg?react';

type GetCategoryBtnProps = {
	onClick: () => void;
};

const GetCategoryBtn = ({ onClick }: GetCategoryBtnProps) => {
	return (
		<>
			<button className="flex gap-[0.8rem] rounded-[5px] bg-gray-bg-04 px-[1.2rem] py-[0.8rem]" onClick={onClick}>
				<div className="pretendard my-[0.15rem] text-[1.4rem] font-normal leading-120 text-white">빠른 불러오기</div>
				<ArrowCircleUpRight className="h-[2rem] w-[2rem]" />
			</button>
		</>
	);
};

export default GetCategoryBtn;
