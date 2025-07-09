import ButtonAlert from '../ButtonAlert/ButtonAlert';
import { AlertModalProps } from '../types/index';

const Logout = ({ onCloseModal, onConfirm, userEmail }: AlertModalProps) => (
	<div className="flex flex-col rounded-[0.8rem] bg-gray-bg-04 p-[3rem]">
		<p className="flex justify-center text-white subhead-bold-22">{userEmail} 계정이</p>
		<p className="mb-[1rem] flex justify-center text-white subhead-bold-22">
			본 기기를 포함한 모든 기기에서 로그아웃됩니다.
		</p>
		<p className="mb-[3rem] flex justify-center text-gray-05 subhead-med-18">로그아웃 하시겠습니까?</p>
		<div className="flex gap-[1rem]">
			<ButtonAlert variant="danger" onClick={onConfirm}>
				로그아웃
			</ButtonAlert>
			<ButtonAlert variant="primary" onClick={onCloseModal}>
				취소하기
			</ButtonAlert>
		</div>
	</div>
);

export default Logout;
