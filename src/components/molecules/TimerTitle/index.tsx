import CategoryTitle from '@/components/atoms/CategoryTitle';
import TodoTitle from '@/components/atoms/TodoTitle';

const TimerTitle = () => {
	return (
		<div className="flex flex-col items-center gap-[1rem]">
			<TodoTitle title="스톱워치 와프 그리기" />
			<CategoryTitle title="모립 프로젝트" />
		</div>
	);
};
export default TimerTitle;
