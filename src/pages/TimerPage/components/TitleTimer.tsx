import TitleCategory from './TitleCategory';
import TitleTodo from './TitleTodo';

interface titleNameProps {
	targetName: string;
	targetCategoryName: string;
}

const TitleTimer = ({ targetName, targetCategoryName }: titleNameProps) => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<TitleTodo title={targetName} />
			<TitleCategory title={targetCategoryName} />
		</div>
	);
};
export default TitleTimer;
