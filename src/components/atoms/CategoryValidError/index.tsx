import Ic_alert from '@/assets/svgs/ic_alert.svg';

const CategoryValidError = () => {
	return (
		<div className="my-[0.6rem] flex">
			<img src={Ic_alert} alt="이메일 유효성 검사 실패" />
			<div className="detail-reg-14 ml-[0.5rem] text-error-01">알맞은 도메인을 입력해주세요.</div>
		</div>
	);
};

export default CategoryValidError;
