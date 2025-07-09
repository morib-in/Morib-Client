import ButtonAlert from '../ButtonAlert/ButtonAlert';
import { AlertModalProps } from '../types/index';

const Complete = ({ onCloseModal, userEmail }: AlertModalProps) => (
	<div className="flex flex-col rounded-[0.8rem] bg-gray-bg-04 p-[3rem]">
		<div className="w-[47.2rem]">
			<p className="flex justify-center text-white subhead-bold-22">{userEmail} 계정이</p>
			<p className="mb-[3rem] flex justify-center text-white subhead-bold-22"> 삭제되었습니다.</p>
			<ButtonAlert variant="primary" onClick={onCloseModal}>
				확인
			</ButtonAlert>
		</div>
	</div>
);

export default Complete;
