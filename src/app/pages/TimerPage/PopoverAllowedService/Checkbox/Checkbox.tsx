import ActiveCheckboxIcon from '@/shared/assets/svgs/timer/ic_check_box_active.svg?react';
import InactiveCheckboxIcon from '@/shared/assets/svgs/timer/ic_check_box_inactive.svg?react';

interface CheckboxProps {
	onClick?: () => void;
	checked?: boolean;
}

const Checkbox = ({ onClick, checked = false }: CheckboxProps) => {
	// TODO: 접근성 고려하여 나머지 input 들도 tabIndex가 필요한지 검토하기
	return (
		<div onClick={onClick} className="cursor-pointer" role="checkbox" tabIndex={0} aria-checked={checked}>
			{checked ? <ActiveCheckboxIcon /> : <InactiveCheckboxIcon />}
		</div>
	);
};

export default Checkbox;
