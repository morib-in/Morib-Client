import ButtonAlert from '../ButtonAlert/ButtonAlert';
import { AlertModalProps } from '../types/index';

const RegisterAllowedService = ({ onCloseModal, onConfirm }: AlertModalProps) => (
	<div className="flex h-[20rem] w-[47.2rem] flex-col gap-[3rem] rounded-[8px] bg-gray-bg-04 p-[3rem]">
		<div className="flex flex-col items-center gap-[0.1rem]">
			<p className="text-white subhead-bold-22">허용 서비스 세트를 먼저 등록해주세요.</p>
			<p className="text-gray-05 subhead-med-18">허용 서비스를 등록하러 갈까요?</p>
		</div>
		<div className="flex gap-[1rem]">
			<ButtonAlert variant="mint" onClick={onConfirm}>
				등록하기
			</ButtonAlert>
			<ButtonAlert variant="primary" onClick={onCloseModal}>
				취소하기
			</ButtonAlert>
		</div>
	</div>
);

export default RegisterAllowedService;
