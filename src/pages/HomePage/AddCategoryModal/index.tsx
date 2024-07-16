import { useEffect, useRef, useState } from 'react';

import CalendarInput from '@/components/atoms/CalendarInput/index';
import CategoryCommonBtn from '@/components/atoms/CategoryCommonBtn/index';
import CategoryCommonTitle from '@/components/atoms/CategoryCommonTitle/index';
import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryMoribContentPage from '@/components/atoms/CategoryMoribContentPage';
import CategoryMoribContentUrl from '@/components/atoms/CategoryMoribContentUrl';
import CategoryToggle from '@/components/atoms/CategoryToggle/index';
import Calendar from '@/components/molecules/Calendar/index';
import CategoryInputMoribName from '@/components/molecules/CategoryInputMoribName/index';
import CategoryMoribContentSet from '@/components/molecules/CategoryMoribContentSet';
import CategoryMoribSet from '@/components/molecules/CategoryMoribSet';
import CategoryModal, { CategoryRef } from '@/components/templates/CategoryModal/index';

import { usePostCategory } from '@/apis/tasks/queries/index';

import { formatCalendarApiDate } from '@/utils/calendar/index';

import { URL_DATA } from '@/mocks/urlData.ts';

interface UrlInfo {
	url: string;
	domain: string;
	favicon: string;
}

const AddCategoryModal = () => {
	const [urlInfos, setUrlInfos] = useState<UrlInfo[]>([]);
	const { mutate: postCategory, isError, isPending, error } = usePostCategory();
	const [name, setName] = useState('');

	const handleNameChange = (newName: string) => {
		setName(newName);
	};
	const [isDateToggleOn, setIsDateToggleOn] = useState(false);
	const [isPeriodOn, setIsPeriodOn] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
	const [isCalendarOpened, setIsCalendarOpened] = useState(false);

	const defaultDate = new Date();

	const handleUrlInputChange = (url: string) => {
		const index = urlInfos.length;
		if (index < URL_DATA.length) {
			const newUrlInfo: UrlInfo = {
				url: url,
				domain: URL_DATA[index].tabName,
				favicon: `https://www.google.com/s2/favicons?domain=${url}`,
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

	const handleDateToggle = () => {
		if (!isDateToggleOn) setIsCalendarOpened(true);
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

	const categoryData = {
		name,
		startDate: formatCalendarApiDate(selectedStartDate),
		endDate: formatCalendarApiDate(selectedEndDate),
		msets: urlInfos.map((info) => ({
			name: info.domain,
			url: info.url,
		})),
	};

	const isFormValid = () => {
		if (name && selectedStartDate && urlInfos.length > 0) {
			return true;
		}
	};

	const handlePostDataClick = () => {
		postCategory(categoryData);
		handleCloseDialog();
		if (isPending) return <div>Loading</div>;
		if (isError) {
			console.log(error);
		}
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
						<CategoryCommonTitle />
						<div className="flex-start mt-[1.6rem] inline-flex gap-[4.4rem]">
							<CategoryInputMoribName onNameChange={handleNameChange} />
							<div ref={calendarRef}>
								<div className="ml-[1rem] mt-[1rem] flex items-center gap-[1rem]">
									<CategoryInputTitle title="날짜" />
									<div className="mb-[0.6rem]">
										<CategoryToggle isToggleOn={isDateToggleOn} onToggle={handleDateToggle} />
									</div>
								</div>
								{isDateToggleOn && (
									<CalendarInput
										isPeriodOn={isPeriodOn}
										selectedStartDate={selectedStartDate ?? defaultDate}
										selectedEndDate={selectedEndDate ?? null}
										onCalendarInputClick={handleOpenCalendar}
										readOnly={true}
									/>
								)}
								{isDateToggleOn && (
									<Calendar
										isPeriodOn={isPeriodOn}
										selectedStartDate={selectedStartDate ?? defaultDate}
										selectedEndDate={selectedEndDate ?? null}
										onStartDateInput={handleStartDateInput}
										onEndDateInput={handleEndDateInput}
										isCalendarOpened={isCalendarOpened}
										onPeriodToggle={handlePeriodToggle}
									/>
								)}
							</div>
						</div>

						<div className="flex flex-col">
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

						<div className="mt-[3rem] flex justify-end gap-[1.6rem]">
							<CategoryCommonBtn variant="취소" onClick={handleCloseModal}>
								취소
							</CategoryCommonBtn>
							<CategoryCommonBtn variant="완료" handleSubmit={handlePostDataClick} disabled={!isFormValid()}>
								완료
							</CategoryCommonBtn>
						</div>
					</div>
				)}
			</CategoryModal>
		</div>
	);
};

export default AddCategoryModal;
