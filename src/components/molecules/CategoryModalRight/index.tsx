import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn';

const CategoryModalRight = () => {
	return (
		<div className="flex-end flex h-[80rem] w-[61.2rem] items-end justify-end rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
			<div className="flex gap-[16px]">
				<CategoryCommonBtn variant="취소">취소</CategoryCommonBtn>
				<CategoryCommonBtn variant="완료">완료</CategoryCommonBtn>
			</div>
		</div>
	);
};

export default CategoryModalRight;
