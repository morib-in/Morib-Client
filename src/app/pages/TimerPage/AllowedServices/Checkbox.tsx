import React from 'react';

import ActiveCheckboxIcon from '@/shared/assets/svgs/timer/ic_check_box_active.svg?react';
import InactiveCheckboxIcon from '@/shared/assets/svgs/timer/ic_check_box_inactive.svg?react';

interface CheckboxProps {
	onClick?: () => void;
	checked?: boolean;
}

/**
 * 체크박스 컴포넌트
 * @param onClick 클릭 시 실행할 함수
 * @param checked 체크 여부
 */
const Checkbox = ({ onClick, checked = false }: CheckboxProps) => {
	return (
		<div onClick={onClick} className="cursor-pointer" role="checkbox" tabIndex={0} aria-checked={checked}>
			{checked ? <ActiveCheckboxIcon /> : <InactiveCheckboxIcon />}
		</div>
	);
};

export default Checkbox;
