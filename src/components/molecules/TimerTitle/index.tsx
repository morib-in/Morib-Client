import CategoryTitle from './CategoryTitle';
import TodoTitle from './TodoTitle';

const TimerTitle = () => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<TodoTitle title="스톱워치 와프 그리기" />
			<CategoryTitle title="모립 프로젝트" />
		</div>
	);
};
export default TimerTitle;
