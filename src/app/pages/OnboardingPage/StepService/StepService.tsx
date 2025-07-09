import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import Spacer from '@/shared/components/Spacer/Spacer';
import TextField from '@/shared/components/TextField/TextField';

import { isUrlValid } from '@/shared/utils/validation';

import { ColorPaletteType } from '@/shared/types/allowedService';
import { AllowedSiteType, AllowedSitesType } from '@/shared/types/allowedSites';
import type { FieldType } from '@/shared/types/fileds';

import { FIELDS, FIELDS_MAP } from '@/shared/constants/fields';

import BackIcon from '@/shared/assets/svgs/ic_back_btn.svg?react';

import { useGetUrlInfo } from '@/shared/apisV2/common/common.mutations';
import { usePostInterestArea } from '@/shared/apisV2/onboarding/onboarding.mutations';
import { useGetSuggestedSites } from '@/shared/apisV2/onboarding/onboarding.queries';

import AllowedService from './AllowedServices/AllowedServices';
import ButtonService from './ButtonService/ButtonService';
import Tabs from './Tabs/Tabs';

interface StepServiceProps {
	setStep: (step: string) => void;
	selectedField: FieldType | null;
}

const StepService = ({ setStep, selectedField }: StepServiceProps) => {
	const [activeTab, setActiveTab] = useState<FieldType>(selectedField || '비즈니스');
	const [inputUrl, setInputUrl] = useState('');
	const [selectedServices, setSelectedServices] = useState<AllowedSitesType>([]);
	const [inputSuccess, setInputSuccess] = useState(false);
	const [categoryNameInput, setCategoryNameInput] = useState('허용서비스 리스트 1');
	const [selectedColor, setSelectedColor] = useState<ColorPaletteType>('#868C93');

	const navigate = useNavigate();

	const { mutateAsync: getUrlInfo, reset: resetGetUrlInfo, isError, isPending } = useGetUrlInfo();
	const { mutate: postInterestArea } = usePostInterestArea();
	const { data: suggestedSites } = useGetSuggestedSites();

	const getDomainFromUrl = (url: string) => {
		return url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
	};

	const checkIsSelectedUrl = (siteUrl: string) => {
		return selectedServices.some((service) => getDomainFromUrl(service.siteUrl) === getDomainFromUrl(siteUrl));
	};

	const handleAddSelectedService = async (siteUrl: string) => {
		const selected = checkIsSelectedUrl(siteUrl);

		if (!siteUrl || selected) return;

		const response = await getUrlInfo({ siteUrl });

		setInputSuccess(true);
		const urlInfo = response?.data;
		setSelectedServices((prev) => [...prev, urlInfo]);
		setInputUrl('');
	};

	const handleAddRecommendedService = (urlInfo: AllowedSiteType) => {
		const selected = checkIsSelectedUrl(urlInfo.siteUrl);

		if (selected) {
			return handleRemoveSelectedService(urlInfo.siteUrl);
		}

		setSelectedServices((prev) => [...prev, urlInfo]);
	};

	const handleRemoveSelectedService = (url: string) => {
		setSelectedServices((prev) => prev.filter((service) => service.siteUrl !== url));
	};

	const handleChangeInputUrl = (e: ChangeEvent<HTMLInputElement>) => {
		if (inputSuccess) {
			setInputSuccess(false);
		}

		resetGetUrlInfo();
		setInputUrl(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			handleAddSelectedService(inputUrl);
		}
	};

	const handleChangeActiveTab = (tab: FieldType) => {
		setActiveTab(tab);
	};

	const handleClickClearButton = () => {
		resetGetUrlInfo();
		setInputUrl('');
	};

	const handleChangeCategoryNameInput = (e: ChangeEvent<HTMLInputElement>) => {
		setCategoryNameInput(e.target.value);
	};

	const handleInitCategoryNameInput = () => {
		setCategoryNameInput('허용 서비스 리스트 1');
	};

	const handleComplete = () => {
		if (!selectedField) {
			alert('필드를 먼저 선택해주세요');
			setStep('field');
		} else {
			postInterestArea(
				{
					allowedSites: selectedServices,
					interestArea: FIELDS_MAP[selectedField],
					name: categoryNameInput,
					colorCode: selectedColor,
				},
				{
					onSuccess: () => {
						navigate('/home');
					},
				},
			);
		}
	};

	useEffect(() => {
		if (isError) {
			const timer = setTimeout(() => {
				resetGetUrlInfo();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isError]);

	useEffect(() => {
		if (inputSuccess) {
			const timer = setTimeout(() => {
				setInputSuccess(false);
				resetGetUrlInfo();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [inputSuccess]);

	return (
		<AutoFixedGrid type="onboarding" className="relative gap-[2rem] bg-gray-bg-01 px-[6rem] pb-[5rem] pt-[11rem]">
			<AutoFixedGrid.Slot className="h-full min-h-0">
				<button onClick={() => setStep('field')} className="absolute left-[6rem] top-[5rem]">
					<BackIcon />
				</button>

				<Spacer.Height as="main" className="flex flex-col pb-[3rem]">
					<h1 className="mb-[2rem] text-white title-bold-36">작업 시 사용할 서비스들을 입력해주세요</h1>
					<p className="mb-[2.3rem] text-gray-04 subhead-reg-22">
						필요한 서비스에만 들어가고, 나의 온전한 집중 시간을 기록할 수 있어요. 만든 허용서비스 리스트는 언제든 편집할
						수 있어요.
					</p>

					<Tabs activeTab={activeTab} onChangeActiveTab={handleChangeActiveTab}>
						<Tabs.TriggerList>
							{FIELDS.map((field) => (
								<Tabs.Trigger value={field} key={field} />
							))}
						</Tabs.TriggerList>

						<Tabs.ContentList>
							{suggestedSites?.data?.[FIELDS_MAP[activeTab]].map((site: AllowedSiteType) => (
								<ButtonService
									key={site.siteUrl}
									favicon={site.favicon}
									title={site.siteName}
									url={site.siteUrl}
									onAddSelectedService={() => handleAddRecommendedService(site)}
									isSelected={selectedServices.some((service) => service.siteUrl === site.siteUrl)}
								/>
							))}
						</Tabs.ContentList>
					</Tabs>

					<TextField
						value={inputUrl}
						onKeyDown={handleKeyDown}
						onChange={handleChangeInputUrl}
						isError={(inputUrl.length > 0 && !isUrlValid(inputUrl)) || isError || checkIsSelectedUrl(inputUrl)}
						errorMessage={
							isError
								? '유효하지 않은 주소입니다.'
								: checkIsSelectedUrl(inputUrl)
									? '이미 등록된 URL입니다.'
									: '알맞은 형식의 URL을 입력해 주세요.'
						}
						isSuccess={inputSuccess}
						successMessage={'URL 입력에 성공했어요.'}
						placeholder="직접 URL 입력하기"
					>
						<TextField.ClearButton onClick={handleClickClearButton} />
						<TextField.ConfirmButton
							disabled={inputUrl.length === 0 || isPending}
							onClick={() => handleAddSelectedService(inputUrl)}
						>
							등록하기
						</TextField.ConfirmButton>
					</TextField>
				</Spacer.Height>
			</AutoFixedGrid.Slot>

			<AutoFixedGrid.Slot className="h-full min-h-0">
				<AllowedService>
					<AllowedService.Header>
						<AllowedService.HeaderColorButton selectedColor={selectedColor} onSelectColor={setSelectedColor} />
						<AllowedService.HeaderInput
							value={categoryNameInput}
							onChange={handleChangeCategoryNameInput}
							onInitCategoryNameInput={handleInitCategoryNameInput}
						/>
					</AllowedService.Header>
					<AllowedService.List>
						{selectedServices.map((service) => (
							<AllowedService.Item
								key={service.siteUrl}
								favicon={service.favicon}
								siteName={service.siteName}
								pageName={service.pageName}
								siteUrl={service.siteUrl}
								onClick={handleRemoveSelectedService}
							/>
						))}
					</AllowedService.List>
					<AllowedService.BottomButton onClick={handleComplete}>모두 입력했어요</AllowedService.BottomButton>
				</AllowedService>
			</AutoFixedGrid.Slot>
		</AutoFixedGrid>
	);
};

export default StepService;
