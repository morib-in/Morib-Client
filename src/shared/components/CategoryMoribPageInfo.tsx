interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryMoribPageInfoProps {
	urlInfo: UrlInfo;
	variant: 'basic' | 'smallLeft' | 'smallRight';
}

const CategoryMoribPageInfo = ({ urlInfo, variant }: CategoryMoribPageInfoProps) => {
	const sizeVariant = {
		basic: {
			pageWidth: 'w-[22.8rem]',
		},
		smallLeft: {
			pageWidth: 'w-[18.8rem]',
		},
		smallRight: { pageWidth: 'w-[18.1rem]' },
	};

	return (
		<td className="flex items-center">
			<div className={`my-[0.1rem] flex h-[2.2rem] items-center`}>
				<img src={urlInfo.favicon} alt="favicon" className="my-[0.1rem] mr-[1.2rem] h-[2rem] w-[2rem]" />
				<div className={`body-reg-16 my-[0.05rem] truncate text-white ${sizeVariant[variant].pageWidth}`}>
					{urlInfo.domain}
				</div>
			</div>
		</td>
	);
};

export default CategoryMoribPageInfo;
