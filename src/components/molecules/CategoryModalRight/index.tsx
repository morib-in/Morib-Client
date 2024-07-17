import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn';
import CategoryModalRightTitle from '@/components/atoms/CategoryModalRightTitle';
import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';

import MinusBtn from '@/assets/svgs/minus_btn.svg?react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalRightProps {
	selectedInfo: UrlInfo[];
	handleUrlInputChange: (url: string) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	handleCloseModal: () => void;
	moribSetName: string;
}

const CategoryModalRight = ({
	selectedInfo,
	handleUrlInputChange,
	handleDeleteUrlInfo,
	handleCloseModal,
	moribSetName,
}: ModalRightProps) => {
	console.log('selectedInfo:', selectedInfo);

	return (
		<div className="flex h-[80rem] w-[61.2rem] flex-col items-end justify-between rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
			<div className="mb-[8px] flex w-full flex-row justify-start">
				<CategoryModalRightTitle msetName={moribSetName} />
			</div>
			<div className="flex w-full flex-col">
				<CategoryUrlInput
					selectedInfo={selectedInfo}
					variant="small"
					onUrlInputChange={(url: string) => handleUrlInputChange(url)}
				/>
			</div>
			<div className="flex w-full" />
			<CategoryMoribContentSet urlInfos={selectedInfo} variant="smallRight">
				{selectedInfo.map((urlInfo, url) => (
					<tr key={url} className="flex h-[4.6rem] gap-[2rem] border-b border-gray-bg-04 px-[0.8rem]">
						<CategoryMoribContentPage urlInfo={urlInfo} variant="smallRight" />
						<CategoryMoribContentUrl urlInfo={urlInfo} variant="smallRight">
							<div className="p-[1.25rem]">
								<button type="button" onClick={() => handleDeleteUrlInfo(urlInfo)}>
									<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
								</button>
							</div>
						</CategoryMoribContentUrl>
					</tr>
				))}
			</CategoryMoribContentSet>

			<div className="mt-[3rem] flex gap-[16px]">
				<CategoryCommonBtn variant="취소" handleCloseModal={handleCloseModal}>
					취소
				</CategoryCommonBtn>
				<CategoryCommonBtn variant="완료" handleCloseModal={handleCloseModal}>
					완료
				</CategoryCommonBtn>
			</div>
		</div>
	);
};

export default CategoryModalRight;
