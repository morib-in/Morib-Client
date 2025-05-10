import { forwardRef } from 'react';

import ButtonRadius5 from '@/shared/components/ButtonRadius5/ButtonRadius5';

interface RequireTitleProps {
	onClick: () => void;
}

const RequireTitle = forwardRef<HTMLDivElement, RequireTitleProps>(({ onClick }, ref) => {
	return (
		<div
			ref={ref}
			className="flex w-[47.2rem] flex-col justify-center gap-[3rem] whitespace-pre-line rounded-[8px] bg-gray-bg-04 p-[3rem] text-center text-white subhead-bold-22"
		>
			<p>
				허용서비스 리스트의 이름을
				<br />
				먼저 입력해주세요.
			</p>
			<ButtonRadius5.Md color="gray" onClick={onClick} className="h-[4.6rem] text-white outline-none">
				확인
			</ButtonRadius5.Md>
		</div>
	);
});

interface ConfirmDeleteProps {
	onClick: () => void;
	pageName: string;
}

const ConfirmDelete = forwardRef<HTMLDivElement, ConfirmDeleteProps>(({ onClick, pageName }, ref) => {
	return (
		<div
			ref={ref}
			className="flex w-[47.2rem] flex-col justify-center gap-[3rem] whitespace-pre-line rounded-[8px] bg-gray-bg-04 p-[3rem] text-center text-white subhead-bold-22"
		>
			<p>
				&apos;
				<span className="inline-block max-w-[22rem] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
					{pageName}
				</span>
				&apos; 허용 사이트가
				<br />
				삭제되었습니다.
			</p>
			<ButtonRadius5.Md color="gray" onClick={onClick} className="h-[4.6rem] text-white outline-none">
				확인
			</ButtonRadius5.Md>
		</div>
	);
});

interface DomainAllowConfirmProps {
	onConfirm: () => void;
	onCancel: () => void;
	siteName?: string;
}

const DomainAllowConfirm = forwardRef<HTMLDivElement, DomainAllowConfirmProps>(
	({ onConfirm, onCancel, siteName }, ref) => {
		return (
			<div
				ref={ref}
				className="flex w-[47.2rem] flex-col justify-center whitespace-pre-line rounded-[8px] bg-gray-bg-04 p-[3rem] text-center text-white subhead-bold-22"
			>
				<p className="pb-[1rem] text-center text-white subhead-bold-22">
					&apos;
					<span className="inline-block max-w-[22rem] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
						{siteName}
					</span>
					&apos;의 <br />
					상위 도메인을 허용할까요?
				</p>
				<p className="pb-[3rem] text-gray-05 subhead-med-18">해당 사이트 이름을 가진 링크들이 하나로 통합돼요.</p>
				<div className="flex w-full justify-center gap-[1rem]">
					<ButtonRadius5.Md color="main" onClick={onConfirm} className="h-[4.6rem] w-[19.3rem] text-black outline-none">
						허용
					</ButtonRadius5.Md>
					<ButtonRadius5.Md color="gray" onClick={onCancel} className="h-[4.6rem] w-[19.3rem] text-white outline-none">
						취소하기
					</ButtonRadius5.Md>
				</div>
			</div>
		);
	},
);

RequireTitle.displayName = 'RequireTitle';
ConfirmDelete.displayName = 'ConfirmDelete';
DomainAllowConfirm.displayName = 'DomainAllowConfirm';

const ModalContentsAlert = {
	RequireTitle,
	DomainAllowConfirm,
	ConfirmDelete,
};

export default ModalContentsAlert;
