import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn';
import CategoryModalRightTitle from '@/components/atoms/CategoryModalRightTitle';
import CategoryMoribContent from '@/components/atoms/CategoryMoribContent';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';

import MinusBtn from '@/assets/svgs/minus_btn.svg?react';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

interface ModalRightProps {
	selectedInfo: UrlInfo[];
	handleUrlInputChange: () => string;
	handleDeleteUrlInfo: () => string;
}

const CategoryModalRight = ({ selectedInfo, handleUrlInputChange, handleDeleteUrlInfo }: ModalRightProps) => {
	return (
		<div className="flex h-[80rem] w-[61.2rem] flex-col items-end justify-between rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
			<div className="mb-[8px] flex w-full flex-row justify-start">
				<CategoryModalRightTitle msetName="앱잼 와이어프레임" />
			</div>
			<div className="mb-[2.8rem] flex w-full flex-col">
				<CategoryUrlInput selectedInfo={selectedInfo} variant="small" onUrlInputChange={handleUrlInputChange} />
			</div>
			<div className="flex w-full" />
			<CategoryMoribContentSet urlInfos={selectedInfo} variant="smallRight">
				{selectedInfo.map((urlInfo, url) => (
					<CategoryMoribContent key={url} urlInfo={urlInfo} variant="smallRight">
						<button type="button" onClick={() => handleDeleteUrlInfo(urlInfo)}>
							<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
						</button>
					</CategoryMoribContent>
				))}
			</CategoryMoribContentSet>

			<div className="mt-[3rem] flex gap-[16px]">
				<CategoryCommonBtn variant="취소">취소</CategoryCommonBtn>
				<CategoryCommonBtn variant="완료">완료</CategoryCommonBtn>
			</div>
		</div>
	);
};

export default CategoryModalRight;
