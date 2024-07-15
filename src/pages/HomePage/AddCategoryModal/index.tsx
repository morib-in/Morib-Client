import { useRef, useState } from 'react';

import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn/index';
import CategoryCommonTitle from '@/components/atoms/CategoryCommonTitle/index';
import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import GetCategoryBtn from '@/components/atoms/GetCategoryBtn/index';
import Calendar from '@/components/molecules/Calendar/index';
import CategoryInputMoribName from '@/components/molecules/CategoryInputMoribName/index';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';
import CategoryMoribSet from '@/components/molecules/CategoryMoribSet';
import CategoryModal, { CategoryRef } from '@/components/templates/CategoryModal/index';

import { URL_DATA } from '@/mocks/urlData.ts';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

const AddCategoryModal = () => {
	const [urlInfos, setUrlInfos] = useState<UrlInfo[]>([]);
	const [name, setName] = useState('');

	const handleNameChange = (newName: string) => {
		setName(newName);
	};

	const handleUrlInputChange = (url: string) => {
		const index = urlInfos.length;
		if (index < URL_DATA.length) {
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: URL_DATA[index].tabName,
				favicon: `${url}/favicon.ico`,
			};

			setUrlInfos((prevUrlInfos) => [...prevUrlInfos, newUrlInfo]);
		}
	};

	const categoryRef = useRef<CategoryRef>(null);

	const handleOpenDialog = () => {
		categoryRef.current?.open();
	};

	const handleCloseDialog = () => {
		categoryRef.current?.close();
	};

	return (
		<div>
			<button type="button" onClick={handleOpenDialog}>
				Open Dialog
			</button>
			<button type="button" onClick={handleCloseDialog}>
				Close Dialog
			</button>
			<CategoryModal ref={categoryRef}>
				{(handleCloseModal) => (
					<div>
						<CategoryCommonTitle>카테고리 추가</CategoryCommonTitle>
						<div className="flex-start mt-[1.6rem] inline-flex gap-[4.4rem]">
							<CategoryInputMoribName onNameChange={handleNameChange} />
							<Calendar />
						</div>

						<div className="relative flex flex-col">
							<CategoryMoribSet onUrlInputChange={handleUrlInputChange} />
							<div>
								<CategoryMoribContentSet urlInfos={urlInfos} variant="basic">
									{urlInfos.map((urlInfo, url) => (
										<tr
											key={url}
											className="flex h-[4.6rem] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem] hover:bg-gray-bg-06"
										>
											<CategoryMoribContentPage urlInfo={urlInfo} variant="basic" />
											<CategoryMoribContentUrl urlInfo={urlInfo} variant="basic" />
										</tr>
									))}
								</CategoryMoribContentSet>
							</div>
						</div>
						<div className="absolute right-[4.4rem] top-[20rem]">
							<GetCategoryBtn />
						</div>

						<div className="mt-[3rem] flex justify-end gap-[1.6rem]">
							<CategoryCommonBtn variant="취소" onClick={handleCloseModal}>
								취소
							</CategoryCommonBtn>
							<CategoryCommonBtn variant="완료">완료</CategoryCommonBtn>
						</div>
					</div>
				)}
			</CategoryModal>
		</div>
	);
};

export default AddCategoryModal;
