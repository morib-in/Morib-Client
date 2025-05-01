import {
	ButtonHTMLAttributes,
	ChangeEvent,
	InputHTMLAttributes,
	KeyboardEvent,
	ReactNode,
	createContext,
	useContext,
} from 'react';

import InputClearIcon from '@/shared/assets/svgs/btn_inputClear.svg?react';
import SuccessIcon from '@/shared/assets/svgs/button_inputSuccess.svg?react';
import FailIcon from '@/shared/assets/svgs/ic_description.svg?react';

interface TextFieldContextProps {
	isError?: boolean;
	value?: string | number | readonly string[] | undefined;
}

const TextFieldContext = createContext<TextFieldContextProps | null>(null);

const useTextFieldContext = () => {
	const context = useContext(TextFieldContext);
	if (!context) {
		throw new Error('TextField 컴포넌트는 <TextField> 내부에서 사용되어야 합니다.');
	}
	return context;
};

const TextFieldRoot = ({
	isError,
	errorMessage,
	isSuccess,
	successMessage,
	onKeyDown,
	children,
	...props
}: TextFieldRootProps) => {
	const borderStyle = isError ? 'border-error-02' : isSuccess ? 'border-mint-01' : 'border-transparent';

	const contextValue = {
		isError,
		value: props.value,
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isError) return;

		onKeyDown && onKeyDown(e);
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		props.onChange && props.onChange(e);
	};

	return (
		<TextFieldContext.Provider value={contextValue}>
			<div
				className={`relative mt-auto flex h-[6.6rem] shrink-0 items-center justify-between rounded-[8px] border-[1px] bg-gray-bg-02 py-[1rem] pl-[2rem] pr-[1rem] ${borderStyle} `}
			>
				<input
					onKeyDown={handleKeyDown}
					onChange={handleOnChange}
					{...props}
					className="flex flex-grow bg-transparent text-white subhead-med-18 placeholder:text-gray-04 focus:outline-none"
				/>
				{children}

				{errorMessage && (
					<div className={`absolute left-0 top-[7.65rem] gap-[0.5rem] ${isError && errorMessage ? 'flex' : 'hidden'} `}>
						<FailIcon />
						<p className="text-error-01 body-reg-16">{errorMessage}</p>
					</div>
				)}

				{successMessage && (
					<div className={`absolute left-0 top-[7.65rem] gap-[0.5rem] ${isSuccess ? 'flex' : 'hidden'} `}>
						<SuccessIcon />
						<p className="text-mint-01 body-reg-16">{successMessage}</p>
					</div>
				)}
			</div>
		</TextFieldContext.Provider>
	);
};

const TextFieldClearButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { value } = useTextFieldContext();

	return (
		<button {...props} className={`${!value?.toString().length && 'hidden'} ${props.className}`}>
			<InputClearIcon />
		</button>
	);
};

const TextFieldConfirmButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { isError } = useTextFieldContext();

	return (
		<button
			{...props}
			disabled={isError || props.disabled}
			className={`ml-[2rem] rounded-[5px] px-[2.2rem] py-[1.2rem] body-semibold-16 ${
				!isError && !props.disabled
					? 'bg-main-gra-01 text-gray-01 hover:bg-main-gra-hover active:bg-main-gra-press'
					: 'bg-gray-bg-05 text-gray-04'
			}`}
		>
			{props.children}
		</button>
	);
};

interface TextFieldRootProps extends InputHTMLAttributes<HTMLInputElement> {
	isError?: boolean;
	errorMessage?: string;
	isSuccess?: boolean;
	successMessage?: string;
	children: ReactNode;
}

const TextField = Object.assign(TextFieldRoot, {
	ClearButton: TextFieldClearButton,
	ConfirmButton: TextFieldConfirmButton,
});

export default TextField;
