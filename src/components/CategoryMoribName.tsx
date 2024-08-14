import CategoryMoribNameInput from '@/components/CategoryMoribNameInput';
import CategoryTitle from '@/components/CategoryTitle';

interface CategoryMoribNameProps {
	onNameChange: (name: string) => void;
	name: string;
}

const CategoryMoribName = ({ name, onNameChange }: CategoryMoribNameProps) => {
	return (
		<div className="flex gap-[4.4rem]">
			<div className="flex-col">
				<div className="pt-[1rem]">
					<CategoryTitle title="이름 *" />
				</div>
				<CategoryMoribNameInput
					value={name}
					onNameChange={onNameChange}
					placeholder="이름을 20자 이내로 작성해주세요."
					maxLength={20}
				/>
			</div>
		</div>
	);
};

export default CategoryMoribName;
