import { ChangeEvent, KeyboardEvent, forwardRef } from 'react';

import Spacer from '@/shared/components/Spacer/Spacer';

import MeatballDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import PlusIcon from '@/shared/assets/svgs/home/ic_plus.svg?react';

import StatusDefaultBoxCategory from '../BoxCategory/StatusDefaultBoxCategory/StatusDefaultBoxCategory';

interface BoxAddCategoryProps {
	categoryInput: string;
	onCategoryInputChange: (categoryInput: string) => void;
	onCategoryInputKeydown: () => void;
}

const BoxAddCategory = forwardRef<HTMLDivElement, BoxAddCategoryProps>(function BoxAddCategory(
	{ categoryInput, onCategoryInputChange, onCategoryInputKeydown },
	ref,
) {
	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		onCategoryInputChange(e.target.value);
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && categoryInput.trim() !== '') {
			onCategoryInputKeydown();
		}
	};

	return (
		<div ref={ref}>
			<Spacer.Height
				as="article"
				className="flex w-[31.6rem] flex-shrink-0 flex-col rounded-[16px] bg-gray-bg-03 p-[1.8rem]"
			>
				<div className="mt-[0.4rem] flex items-center justify-between">
					<input
						value={categoryInput}
						onChange={handleChangeInput}
						/* NOTE: onKeydown 사용했을 때, 한글 입력이 이상하게 적용되어 onKeyPress 적용 */
						onKeyPress={handleKeydown}
						placeholder="카테고리 이름"
						className="w-full bg-transparent text-white subhead-semibold-18 focus:outline-none"
						autoFocus
					/>
					<div className="ml-[1rem] flex gap-[1rem]">
						<button disabled className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05">
							<PlusIcon />
						</button>
						<button disabled>
							<MeatballDefaultIcon className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05" />
						</button>
					</div>
				</div>

				<StatusDefaultBoxCategory />
			</Spacer.Height>
		</div>
	);
});

export default BoxAddCategory;
