import { ButtonHTMLAttributes, ReactNode, createContext, useContext, useRef, useState } from 'react';

import useClickOutside from '../../hooks/useClickOutside';

interface DropdownContextProps {
	open: boolean;
	handleToggleOpen: () => void;
	handleToggleClose: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

// useDropdownContext: Select 컴포넌트 외부에서 서브 컴포넌트들이 사용됐을 때 에러 처리
const useDropdownContext = () => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('Select 컴포넌트는 Select  내에서 사용되어야 합니다.');
	}
	return context;
};

// Dropdown root 컴포넌트
interface DropdownRootProps {
	children: ReactNode;
}
const DropdownRoot = ({ children }: DropdownRootProps) => {
	const [open, setOpen] = useState(false);

	const handleToggleOpen = () => setOpen((prev) => !prev);
	const handleClose = () => setOpen(false);

	const ref = useRef(null);
	useClickOutside(ref, handleClose);

	const contextValue: DropdownContextProps = {
		open,
		handleToggleOpen,
		handleToggleClose: handleClose,
	};

	return (
		<DropdownContext.Provider value={contextValue}>
			<div ref={ref} className="relative z-50 flex">
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

// Dropdown의 메뉴를 trigger 하는 컴포넌트
interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const DropdownTrigger = ({ children, ...props }: DropdownTriggerProps) => {
	const { handleToggleOpen } = useDropdownContext();

	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				handleToggleOpen();
			}}
			className="relative"
			{...props}
		>
			{children}
		</button>
	);
};

// Dropdown의 메뉴 리스트를 렌더링하는 컴포넌트
interface DropdownContentProps {
	children: ReactNode;
	maxHeight?: string; // dropdown 메뉴의 최대 높이를 지정해서 스크롤 할 수 있음
	boxShadow?: string;
	className?: string;
}

const DropdownContent = ({ children, maxHeight, boxShadow, className }: DropdownContentProps) => {
	const { open, handleToggleClose } = useDropdownContext();

	const shadowStyle = boxShadow ? boxShadow : 'shadow-[0_3px_30px_0_rgba(0,0,0,0.4)]';

	return (
		<ul
			onClick={handleToggleClose}
			className={`absolute overflow-y-scroll rounded-[4px] ${shadowStyle} ${maxHeight} ${className}`}
		>
			{open && children}
		</ul>
	);
};

// Dropdown의 메뉴 리스트 아이템 컴포넌트
interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	textColor?: 'default' | 'red';
}

const DropdownItem = ({ label, textColor = 'default', ...props }: DropdownItemProps) => {
	const textStyle = textColor === 'red' ? 'text-error-01' : 'text-white';

	return (
		<li className="z-50 border-t border-t-gray-bg-04 first:border-none">
			<button
				{...props}
				className={`flex bg-gray-bg-02 px-[1.6rem] py-[0.4rem] hover:bg-gray-bg-03 active:bg-gray-bg-04`}
			>
				<p className={`flex h-[2.2rem] min-w-[13.5rem] items-center detail-reg-12 ${textStyle}`}>{label}</p>
			</button>
		</li>
	);
};

const Dropdown = Object.assign(DropdownRoot, {
	Trigger: DropdownTrigger,
	Content: DropdownContent,
	Item: DropdownItem,
});

export default Dropdown;
