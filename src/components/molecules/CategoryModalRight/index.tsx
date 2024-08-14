import MinusBtn from '@/shared/assets/svgs/minus_btn.svg?react';

import CategoryCommonMoribSet from '@/components/CategoryCommonMoribSet';
import CategoryInputUrl from '@/components/CategoryInputUrl';
import CategoryMoribPageInfo from '@/components/CategoryMoribPageInfo';
import CategoryMoribUrlInfo from '@/components/CategoryMoribUrlInfo';
import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn';
import CategoryModalRightTitle from '@/components/atoms/CategoryModalRightTitle';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalRightProps {
	selectedInfo: UrlInfo[];
	setIsClicked: (is: any) => void;
	setSelectedOption: (name: string) => void;
	handleUrlInputChange: (url: string) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	handleCloseModal: () => void;
	moribSetName: string;
	handleClearModalData: () => void;
	addInfos: (selectedInfo: UrlInfo[]) => void;
}

const CategoryModalRight = ({
	selectedInfo,
	handleUrlInputChange,
	handleDeleteUrlInfo,
	handleCloseModal,
	moribSetName,
	handleClearModalData,
}: ModalRightProps) => {
	return (
		<div className="flex h-[80rem] w-[61.2rem] flex-col items-end justify-between rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
			<div className="mb-[8px] flex w-full flex-row justify-start">
				<CategoryModalRightTitle msetName={moribSetName} />
			</div>
			<div className="flex w-full flex-col">
				<CategoryInputUrl
					selectedInfo={selectedInfo}
					variant="small"
					onUrlInputChange={(url: string) => handleUrlInputChange(url)}
				/>
			</div>
			<div className="flex w-full" />
			<CategoryCommonMoribSet urlInfos={selectedInfo} variant="smallRight">
				{selectedInfo.map((urlInfo, url) => (
					<tr key={url} className="flex h-[4.6rem] gap-[2rem] border-b border-gray-bg-04 px-[0.8rem]">
						<CategoryMoribPageInfo urlInfo={urlInfo} variant="smallRight" />
						<CategoryMoribUrlInfo urlInfo={urlInfo} variant="smallRight">
							<div className="p-[1.25rem]">
								<button type="button" onClick={() => handleDeleteUrlInfo(urlInfo)}>
									<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
								</button>
							</div>
						</CategoryMoribUrlInfo>
					</tr>
				))}
			</CategoryCommonMoribSet>

			<div className="mt-[3rem] flex gap-[16px]">
				<CategoryCommonBtn
					variant="취소"
					handleCloseModal={handleCloseModal}
					handleClearModalData={handleClearModalData}
				>
					취소
				</CategoryCommonBtn>
				<CategoryCommonBtn
					variant="완료"
					handleCloseModal={handleCloseModal}
					handleClearModalData={handleClearModalData}
				>
					완료
				</CategoryCommonBtn>
			</div>
		</div>
	);
};

export default CategoryModalRight;
