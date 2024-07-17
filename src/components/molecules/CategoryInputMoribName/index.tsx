import CategoryInput from '@/components/atoms/CategoryInput/index';
import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';

interface CategoryInputMoribName {
	onNameChange: (name: string) => void;
	isValid: boolean;
}

const CategoryInputMoribName = ({ onNameChange, isValid }: CategoryInputMoribName) => {
	return (
		<div className="flex gap-[4.4rem]">
			<div className="flex-col">
				<div className="pl-[1rem] pt-[1rem]">
					<CategoryInputTitle title="이름 *" />
				</div>
				<CategoryInput
					onNameChange={onNameChange}
					placeholder="이름을 10자 이내로 작성해주세요."
					errorMessage="이름을 10자 이내로 작성해주세요."
					isValid={isValid}
				/>
			</div>
		</div>
	);
};

export default CategoryInputMoribName;
