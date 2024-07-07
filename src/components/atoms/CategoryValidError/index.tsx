import AlertIcon from '@/assets/svgs/AlertIcon.svg?react';

const CategoryValidError = () => {
	return (
		<div className="my-[0.6rem] flex">
			<AlertIcon />
			<div className="detail-reg-14 ml-[0.5rem] text-error-01">알맞은 도메인을 입력해주세요.</div>
		</div>
	);
};

export default CategoryValidError;
