import DropdownOptionsBtn from '@/components/atoms/DropdownOptionsBtn';

interface Category {
	id: number;
	name: string;
}

interface OptionData {
	category: Category;
}

interface OptionsListProps {
	optionData: OptionData[];
}
const DropdownOptionsList = ({ optionData }: OptionsListProps) => {
	return (
		<ul className="w-[27.2rem] flex-col overflow-hidden rounded-[5px] shadow-[0_3px_30px_0_rgba(0,0,0,0.40)]">
			{optionData.map((item) => {
				return (
					<li key={item.category.id}>
						<DropdownOptionsBtn>{item.category.name}</DropdownOptionsBtn>
					</li>
				);
			})}
		</ul>
	);
};

export default DropdownOptionsList;
