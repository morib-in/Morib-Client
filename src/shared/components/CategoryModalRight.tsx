import ButtonCategoryCommon from '@/shared/components/ButtonCategoryCommon';
import CategoryMsetUrlInfo from '@/shared/components/CategoryMsetUrlInfo';

import MinusBtn from '@/shared/assets/svgs/minus_btn.svg?react';

import CategoryCommonMoribSet from './CategoryCommonMoribSet';
import InputCategoryUrl from './InputCategoryUrl';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalRightProps {
	rightModalUrlInfos: UrlInfo[];
	handleUrlInputChange: (url: string) => void;

	handleDeleteUrlInfo: (url: UrlInfo) => void;
	handleSubmitModal: () => void;
	moribSetName: string;
	handleClearModalData: () => void;
	handleClose: () => void;
}

const CategoryModalRight = ({
	rightModalUrlInfos,
	handleUrlInputChange,
	handleDeleteUrlInfo,
	handleSubmitModal,
	handleClose,
	moribSetName,
	handleClearModalData,
}: ModalRightProps) => {
	return (
		<div className="flex h-[80rem] w-[61.2rem] flex-col items-end justify-between rounded-r-[1rem] bg-gray-bg-03 pb-[3rem] pl-[3rem] pr-[4.3rem] pt-[9.7rem]">
			<header className="subhead-bold-22 mb-[8px] flex w-full flex-row justify-start p-[1rem]">
				<h1 className="text-mint-01">
					{moribSetName.length > 0 ? (
						moribSetName
					) : (
						<>
							<span className="pr-[1rem]" /> _______ <span className="pr-[0.5rem]" />
						</>
					)}
				</h1>
				<p className="text-white">의 모립세트</p>
			</header>

			<section className="flex w-full">
				<InputCategoryUrl
					rightModalUrlInfos={rightModalUrlInfos}
					variant="small"
					onUrlInputChange={(url: string) => handleUrlInputChange(url)}
				/>
			</section>
			<CategoryCommonMoribSet urlInfos={rightModalUrlInfos} variant="smallRight">
				{rightModalUrlInfos.map((urlInfo, url) => (
					<div key={url} className="flex h-[4.6rem] gap-[2rem] border-b border-gray-bg-04 px-[0.8rem]">
						<CategoryMsetUrlInfo urlInfo={urlInfo} variant="smallRight">
							<div className="p-[1.25rem]">
								<button type="button" onClick={() => handleDeleteUrlInfo(urlInfo)}>
									<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
								</button>
							</div>
						</CategoryMsetUrlInfo>
					</div>
				))}
			</CategoryCommonMoribSet>

			<footer className="mt-[3rem] flex gap-[16px]">
				<ButtonCategoryCommon variant="취소" handleCloseModal={handleClose} handleClearModalData={handleClearModalData}>
					취소
				</ButtonCategoryCommon>
				<ButtonCategoryCommon
					variant="완료"
					handleCloseModal={handleSubmitModal}
					handleClearModalData={handleClearModalData}
				>
					완료
				</ButtonCategoryCommon>
			</footer>
		</div>
	);
};

export default CategoryModalRight;
