import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import ButtonCategoryCommon from '@/shared/components/ButtonCategoryCommon';
import TitleCategoryCommon from '@/shared/components/TitleCategoryCommon';

import { getTabName } from '@/shared/apis/tasks/axios/index';
import { useGetTabName, usePostCategory } from '@/shared/apis/tasks/queries/index';

import { formatCalendarApiDate } from '@/shared/utils/calendar/index';

import CalendarInput from '@/components/atoms/CalendarInput/index';
import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import CategoryToggle from '@/components/atoms/CategoryToggle/index';
import Calendar from '@/components/molecules/Calendar/index';
import CategoryInputMoribName from '@/components/molecules/CategoryInputMoribName/index';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';
import CategoryMoribSet from '@/components/molecules/CategoryMoribSet';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface ModalAddCategoryProps {
	handleCloseModal: () => void;
}

const ModalAddCategory = ({ handleCloseModal }: ModalAddCategoryProps) => {
	const [urlInfos, setUrlInfos] = useState<UrlInfo[]>([]);
	const [selectedInfo, setSelectedInfo] = useState<UrlInfo[]>([]);
	const [name, setName] = useState('');
	const [isDateToggleOn, setIsDateToggleOn] = useState(false);
	const [isPeriodOn, setIsPeriodOn] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
	const [isCalendarOpened, setIsCalendarOpened] = useState(false);
	const [combinedInfos, setCombinedInfos] = useState<UrlInfo[]>(urlInfos);

	const queryClient = useQueryClient();

	const [urlData, setUrlData] = useState<UrlInfo[]>([]);
	const [isClicked, setIsClicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('카테고리 추가');

	const handleUrlInfos = () => {
		setSelectedInfo([]);
	};

	//Todo: any 타입 수정
	const addInfos = (selectedInfos: any) => {
		//setCombinedInfos((prev) => [...prev, ...selectedInfos]);

		setCombinedInfos((prevItems) => {
			if (prevItems.some((prevItem) => prevItem.url === selectedInfos.url)) {
				return prevItems;
			}
			return [...prevItems, ...selectedInfos];
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
		setUrlInfos([]);
		setSelectedStartDate(null);
		setSelectedEndDate(null);
		setIsDateToggleOn(false);
		setSelectedInfo([]);
		setCombinedInfos([]);
	};

	const handleSelectedInfo = (urlInfo: UrlInfo) => {
		setSelectedInfo((prevItems) => {
			if (prevItems.some((prevItem) => prevItem.url === urlInfo.url)) {
				return prevItems;
			}
			return [...prevItems, urlInfo];
		});
	};

	const handleDeleteUrlInfo = (urlInfoToDelete: UrlInfo) => {
		setSelectedInfo((prevUrlInfos) => prevUrlInfos.filter((urlInfo) => urlInfo.url !== urlInfoToDelete.url));
	};

	const handleNameChange = (name: string) => {
		setName(name);
	};

	const defaultDate = new Date();

	const handleUrlInputChange = async (url: string) => {
		try {
			const tabNameData = await getTabName(url);
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: tabNameData.data.tabName,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
			};
			setUrlInfos((prevUrlInfos) => [...prevUrlInfos, newUrlInfo]);
			setCombinedInfos((prev) => [...prev, newUrlInfo]);
		} catch (isQueryError) {
			console.error(queryError);
		}
	};

	const handleDateToggle = () => {
		if (!isDateToggleOn) {
			setIsCalendarOpened(true);
		} else {
			setSelectedStartDate(null);
			setSelectedEndDate(null);
		}
		setIsDateToggleOn((prev) => !prev);
	};

	const handlePeriodToggle = () => {
		setIsPeriodOn((prev) => !prev);
	};

	const handleStartDateInput = (date: Date | null) => {
		setSelectedStartDate(date);
	};

	const handleEndDateInput = (date: Date | null) => {
		setSelectedEndDate(date);
	};

	const handleOpenCalendar = () => {
		setIsCalendarOpened(true);
	};

	const calendarRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
			setIsCalendarOpened(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!isDateToggleOn) {
			setIsCalendarOpened(false);
		}
	}, [isCalendarOpened, isDateToggleOn]);

	const handleCategoryData = () => {
		if (combinedInfos.length === 0) {
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
				msets: combinedInfos.map((info) => ({
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

	const handleClose = () => {
		handleClearData();
		handleCloseModal();
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

	const handleClearModalData = () => {
		setIsClicked(false);
		setSelectedOption('카테고리 추가');
		setUrlData([]);
	};

	return (
		<div className="">
			<TitleCategoryCommon />
			<div className="flex-start mt-[1.6rem] inline-flex gap-[4.4rem]">
				<CategoryMoribName name={name} onNameChange={handleNameChange} />
				<div ref={calendarRef}>
					<div className="mt-[1rem] flex items-center gap-[1rem]">
						<TitleCategory title="날짜" />
						<div className="mb-[0.6rem]">
							<ButtonStatusToggle isToggleOn={isDateToggleOn} onToggle={handleDateToggle} />
						</div>
					</div>
					{isDateToggleOn && (
						<CalendarSelectedDate
							isPeriodOn={isPeriodOn}
							selectedStartDate={selectedStartDate ?? defaultDate}
							selectedEndDate={selectedEndDate ?? null}
							onCalendarInputClick={handleOpenCalendar}
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
							/>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col">
				<CategoryMoribSetAdd
					onUrlInputChange={handleUrlInputChange}
					selectedInfo={selectedInfo}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					setSelectedInfo={setSelectedInfo}
					urlInfo={urlInfos}
					moribSetName={name}
					urlData={urlData}
					setUrlData={setUrlData}
					isClicked={isClicked}
					setIsClicked={setIsClicked}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					handleClearModalData={handleClearModalData}
					handleUrlInfos={handleUrlInfos}
					addInfos={addInfos}
				/>
				<div>
					<CategoryCommonMoribSet urlInfos={combinedInfos} variant="basic">
						{combinedInfos.map((urlInfo, url) => (
							<tr key={url} className="flex h-[4.6rem] gap-[1.2rem] border-b border-gray-bg-04 px-[0.8rem]">
								<CategoryMoribPageInfo urlInfo={urlInfo} variant="basic" />
								<CategoryMoribUrlInfo urlInfo={urlInfo} variant="basic" />
							</tr>
						))}
					</CategoryCommonMoribSet>
				</div>
			</div>

			<div className="mt-[3rem] flex justify-end gap-[1.6rem]">
				<ButtonCategoryCommon variant="취소" handleCloseModal={handleClose}>
					취소
				</ButtonCategoryCommon>
				<ButtonCategoryCommon variant="완료" handleSubmit={handlePostDataClick} disabled={!isFormValid()}>
					완료
				</ButtonCategoryCommon>
			</div>
		</div>
	);
};

export default ModalAddCategory;
