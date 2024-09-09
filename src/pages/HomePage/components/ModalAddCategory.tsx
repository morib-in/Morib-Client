
import { useState } from 'react';


import { useQueryClient } from '@tanstack/react-query';

import AddCategoryListModal from '@/shared/components/AddCategoryListModal';
import ButtonCategoryCommon from '@/shared/components/ButtonCategoryCommon';
import ButtonStatusToggle from '@/shared/components/ButtonStatusToggle';
import Calendar from '@/shared/components/Calendar';
import CalendarSelectedDate from '@/shared/components/CalendarSelectedDate';
import CategoryCommonMoribSet from '@/shared/components/CategoryCommonMoribSet';
import CategoryMsetUrlInfo from '@/shared/components/CategoryMsetUrlInfo';
import InputCategoryUrl from '@/shared/components/InputCategoryUrl';

import { useCalendar } from '@/shared/hooks/useCalendar';

import { getTabName } from '@/shared/apis/tasks/axios/index';
import { useGetTabName, usePostCategory } from '@/shared/apis/tasks/queries/index';

import { formatCalendarApiDate } from '@/shared/utils/calendar/index';

import ArrowCircleUpRight from '@/shared/assets/svgs/arrow_circle_up_right.svg?react';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalAddCategoryProps {
	handleCloseModal: () => void;
}

const ModalAddCategory = ({ handleCloseModal }: ModalAddCategoryProps) => {
	const [totalUrlInfos, setTotalUrlInfos] = useState<UrlInfo[]>([]);
	const [rightModalUrlInfos, setRightModalUrlInfos] = useState<UrlInfo[]>([]);
	const [name, setName] = useState('');

	const [combinedInfos, setCombinedInfos] = useState<UrlInfo[]>(urlInfos);

	const queryClient = useQueryClient();

	const [urlData, setUrlData] = useState<UrlInfo[]>([]);
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('카테고리 추가');

	const {
		isDateToggleOn,
		isPeriodOn,
		selectedStartDate,
		selectedEndDate,
		isCalendarOpened,
		defaultDate,
		handleDateToggle,
		handlePeriodToggle,
		handleCalendarToggle,
		handleStartDateInput,
		handleEndDateInput,
		handlePeriodEnd,
		handleClearDateInfo,
	} = useCalendar();


	const handleUrlInfos = () => {
		setRightModalUrlInfos([]);
	};

	const handleAddTotalUrl = () => {
		setTotalUrlInfos((prev) => [...prev, ...rightModalUrlInfos]);
	};

	const handleRightModalUrlInfos = (urlInfo: UrlInfo) => {
		setRightModalUrlInfos((prevItems) => {
			if (prevItems.some((prevItem) => prevItem.url === urlInfo.url)) {
				return prevItems;
			}
			return [...prevItems, urlInfo];
		});
	};

	const {
		mutate: postCategory,
		isError: isMutateError,
		isPending: isMutatePending,
		error: mutateError,
	} = usePostCategory();
	const { error: queryError } = useGetTabName('');

	const handleClearData = () => {
		setName('');
		setRightModalUrlInfos([]);
		setTotalUrlInfos([]);
		handleClearDateInfo();
		handlePeriodEnd();
	};



	const handleDeleteUrlInfo = (urlInfoToDelete: UrlInfo) => {
		setRightModalUrlInfos((prevUrlInfos) => prevUrlInfos.filter((urlInfo) => urlInfo.url !== urlInfoToDelete.url));
	};

	const handleUrlInputChange = async (url: string) => {
		try {
			const tabNameData = await getTabName(url);
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: tabNameData.data.tabName,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
			};
			setTotalUrlInfos((prev) => [...prev, newUrlInfo]);
		} catch (isQueryError) {
			console.error(queryError);
		}
	};

	const handleCategoryData = () => {
		if (totalUrlInfos.length === 0) {
			const categoryData = {
				name,
				startDate: formatCalendarApiDate(selectedStartDate),
				endDate: formatCalendarApiDate(selectedEndDate),
			};
			postCategory(categoryData, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['todo'] });
				},
			});
		} else {
			const categoryData = {
				name,
				startDate: formatCalendarApiDate(selectedStartDate),
				endDate: formatCalendarApiDate(selectedEndDate),
				msets: totalUrlInfos.map((info) => ({
					name: info.domain,
					url: info.url,
				})),
			};
			postCategory(categoryData, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['todo'] });
				},
			});
		}
	};

	const isFormValid = () => {
		if (name) {
			return true;
		}
	};

	const nameInputDefaultStyle =
		'subhead-med-18 h-[4.6rem] w-[34rem] rounded-[8px] border-[1px] bg-gray-bg-03 px-[2rem] py-[1rem] text-white placeholder-gray-03 focus:outline-none';
	const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const dialogRef = useRef<HTMLDialogElement>(null);
	const showModal = () => {
		handleUrlInfos();
		dialogRef.current?.showModal();
	};

	const closeModal = () => {
		dialogRef.current?.close();
	};

	const handleMoveToNextModal = () => {
		showModal();
	};

	const handleClose = () => {
		handleClearData();
		handleCloseModal();
	};

	const handleCategoryModalClose = () => {
		handleClearData();
		closeModal();
	};

	const handlePostDataClick = () => {
		handleClearData();
		handleCategoryData();
		handleCloseModal();
		if (isMutatePending) return <div>Loading</div>;
		if (isMutateError) {
			console.error(mutateError);
		}
	};

	const handleMsetSubmit = () => {
		handleAddTotalUrl();
		closeModal();
	};

	return (

		<>
			<header>
				<h1 className="head-bold-24 text-gray-04">카테고리 추가</h1>
			</header>
			<section className="flex-start my-[2rem] mt-[1.6rem] inline-flex gap-[4.4rem]">
				<section className="flex-col">
					<h2 className="subhead-bold-22 pb-[1rem] pt-[1rem] text-white">이름 *</h2>
					<input
						type="text"
						placeholder={'이름을 20자 이내로 작성해주세요.'}
						className={nameInputDefaultStyle}
						onChange={handleValueChange}
						maxLength={20}
						value={name}
					/>
				</section>

				<div>
					<div className="mt-[1rem] flex items-center gap-[1rem]">
						<h2 className="subhead-bold-22 pb-[1rem] text-white">날짜</h2>
						<div className="mb-[0.6rem]">
							<ButtonStatusToggle isToggleOn={isDateToggleOn} onToggle={handleDateToggle} />
						</div>
					</div>
					{isDateToggleOn && (
						<CalendarSelectedDate
							isPeriodOn={isPeriodOn}
							selectedStartDate={selectedStartDate ?? defaultDate}
							selectedEndDate={selectedEndDate ?? null}
							onCalendarInputClick={handleCalendarToggle}
							readOnly={true}
						/>
					)}
					{isDateToggleOn && (
						<div>
							<Calendar
								isPeriodOn={isPeriodOn}
								selectedStartDate={selectedStartDate ?? defaultDate}
								selectedEndDate={selectedEndDate ?? null}
								onStartDateInput={handleStartDateInput}
								onEndDateInput={handleEndDateInput}
								isCalendarOpened={isCalendarOpened}
								onPeriodToggle={handlePeriodToggle}
								clickOutSideCallback={handleCalendarToggle}
							/>
						</div>
					)}
				</div>
			</section>

			<main className="flex flex-col">
				<section>
					<div className="flex justify-between">
						<h2 className="subhead-bold-22 pb-[1rem] text-white">모립세트</h2>
						<button
							className="mb-[0.6rem] flex items-center gap-[0.8rem] rounded-[5px] bg-gray-bg-04 px-[1.2rem] py-[0.8rem]"
							onClick={handleMoveToNextModal}
							type="button"
						>
							<p className="pretendard my-[0.15rem] text-[1.4rem] font-normal leading-120 text-white">빠른 불러오기</p>
							<ArrowCircleUpRight className="h-[2rem] w-[2rem]" />
						</button>
						<AddCategoryListModal
							handleSubmitModal={handleMsetSubmit}
							handleClose={handleCategoryModalClose}
							dialogRef={dialogRef}
							rightModalUrlInfos={rightModalUrlInfos}
							handleRightModalUrlInfos={handleRightModalUrlInfos}
							handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
							moribSetName={name}
						/>
					</div>
					<InputCategoryUrl variant="basic" onUrlInputChange={(url: string) => handleUrlInputChange(url)} />
				</section>

				<CategoryCommonMoribSet urlInfos={totalUrlInfos} variant="basic">
					{totalUrlInfos.map((urlInfo, url) => (
						<div key={url} className="flex h-[4.6rem] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem]">
							<CategoryMsetUrlInfo urlInfo={urlInfo} variant="basic" />
						</div>
					))}
				</CategoryCommonMoribSet>
			</main>

			<footer className="mt-[3rem] flex justify-end gap-[1.6rem]">
				<ButtonCategoryCommon variant="취소" handleCloseModal={handleClose}>
					취소
				</ButtonCategoryCommon>
				<ButtonCategoryCommon variant="완료" handleSubmit={handlePostDataClick} disabled={!isFormValid()}>
					완료
				</ButtonCategoryCommon>
			</footer>
		</>
	);
};

export default ModalAddCategory;
