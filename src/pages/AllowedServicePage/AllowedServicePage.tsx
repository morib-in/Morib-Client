import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import ModalContentsFriends from '@/shared/components/ModalContentsFriends/ModalContentsFriends';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';
import Spacer from '@/shared/components/Spacer/Spacer';
import TextField from '@/shared/components/TextField/TextField';

import { isUrlValid } from '@/shared/utils/validation';

import { ColorPaletteType } from '@/shared/types/allowedService';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';

import ModalContentsAlert from '@/pages/AllowedServicePage/ModalContentsAlert/ModalContentsAlert';
import { allowedServiceKeys } from '@/shared/apisV2/allowedService/allowedService.keys';
import {
	useDeleteAllowedService,
	useDeleteAllowedServiceGroup,
	usePatchChangeAllowedServiceGroupColor,
	usePatchChangeAllowedServiceGroupName,
	usePostAddAllowedService,
	usePostAddAllowedServiceGroup,
} from '@/shared/apisV2/allowedService/allowedService.mutations';
import {
	useGetAllowedServiceGroupDetail,
	useGetAllowedServiceList,
	useGetRecommendedSites,
} from '@/shared/apisV2/allowedService/allowedService.queries';

import AllowedServiceGroupDetail from './AllowedServiceGroupDetail/AllowedServiceGroupDetail';
import AllowedServiceList from './AllowedServiceList/AllowedServiceList';
import RecommendService from './RecommendService/RecommendService';

interface ModalState {
	variant: 'confirm-delete' | 'title-required';
	pageName?: string;
}
// NOTE: 리렌더링 최적화 필요
const AllowedServicePage = () => {
	const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
	const [currentTap, setCurrentTap] = useState<'WEB' | 'DESKTOP'>('WEB');
	const [titleInput, setTitleInput] = useState('');
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [urlInput, setUrlInput] = useState('');
	const [selectedColor, setSelectedColor] = useState<ColorPaletteType>('#868C93');
	const [modalState, setModalState] = useState<ModalState>({
		variant: 'confirm-delete',
		pageName: '',
	});

	const queryClient = useQueryClient();

	const friendsModalRef = useRef<ModalWrapperRef>(null);
	const actionFeedbackRef = useRef<ModalWrapperRef>(null);

	const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleInput(e.target.value);
	};

	const handleEditingTitleStatus = (status: boolean) => {
		setIsEditingTitle(status);
	};

	const handleChangeUrlInput = (e: ChangeEvent<HTMLInputElement>) => {
		setUrlInput(e.target.value);
		resetAllowedService();
	};

	const handleEnableAddingAllowedServiceGroup = () => {
		setActiveGroupId(null);
		setTitleInput('');
		setSelectedColor('#868C93');
		resetUrlInput();
	};

	const { data: allowedServiceList } = useGetAllowedServiceList({ connectType: currentTap });
	const { data: allowedServiceGroupDetail } = useGetAllowedServiceGroupDetail({
		// NOTE: enabled 설정으로 activeGroupId가 null일 때 요청 보내지 않도록 했끼 떄문에 타입 단언 작성
		allowedGroupId: activeGroupId!,
		connectType: currentTap,
	});
	const { data: recommendedSites } = useGetRecommendedSites({
		allowedGroupId: activeGroupId!,
	});

	const { mutate: patchChangeAllowedServiceGroupName } = usePatchChangeAllowedServiceGroupName();
	const { mutate: patchChangeAllowedServiceGroupColor } = usePatchChangeAllowedServiceGroupColor();
	const { mutate: postAddAllowedServiceGroup } = usePostAddAllowedServiceGroup();
	const { mutate: deleteAllowedServiceGroup } = useDeleteAllowedServiceGroup();
	const {
		mutate: postAddAllowedService,
		reset: resetAllowedService,
		isPending,
		isError,
		error,
	} = usePostAddAllowedService();
	const { mutate: deleteAllowedService } = useDeleteAllowedService();

	const resetUrlInput = () => {
		setUrlInput('');
		resetAllowedService();
	};

	const handleSelectActiveGroupId = (activeGroupId: number | null) => {
		setActiveGroupId(activeGroupId);
		resetUrlInput();
	};

	const handleSelectColor = (hashColor: ColorPaletteType) => {
		if (activeGroupId === null) {
			setSelectedColor(hashColor);
		} else {
			patchChangeAllowedServiceGroupColor({
				allowedGroupId: activeGroupId,
				colorCode: hashColor,
			});
		}
	};

	const handleChangeAllowedServiceGroupName = () => {
		if (titleInput.length > 0 && activeGroupId && allowedServiceGroupDetail?.data.name !== titleInput) {
			patchChangeAllowedServiceGroupName({
				allowedGroupId: activeGroupId,
				name: titleInput,
			});
		} else {
			setTitleInput(allowedServiceGroupDetail?.data.name || '');
		}
	};

	const handleAddAllowedServiceGroup = () => {
		if (titleInput.length > 0) {
			postAddAllowedServiceGroup(
				{
					name: titleInput,
					colorCode: selectedColor,
				},
				{
					onSuccess: (response) => {
						setActiveGroupId(response.data.id);
					},
				},
			);
		}
	};

	const handleKeyDownTitleInput = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			if (activeGroupId === null) {
				handleAddAllowedServiceGroup();
			} else {
				handleChangeAllowedServiceGroupName();
				handleEditingTitleStatus(false);
			}
		}
	};

	const handleDeleteAllowedServiceGroup = (groupId: number) => {
		deleteAllowedServiceGroup(
			{ allowedGroupId: groupId },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: allowedServiceKeys.allowedServiceList({ connectType: currentTap }),
					});
				},
			},
		);
	};

	const handleAddAllowedService = (urlInput: string, activeGroupId: number | null) => {
		if (!activeGroupId) {
			handleOpenActionFeedbackModal({
				variant: 'title-required',
			});
			return;
		}
		if (activeGroupId && !isPending) {
			postAddAllowedService(
				{
					siteUrl: urlInput,
					allowedGroupId: activeGroupId,
				},
				{
					onSuccess: () => {
						setUrlInput('');
					},
				},
			);
		}
	};

	const handleDeleteAllowedService = (id: number, deleteUrl: string) => {
		deleteAllowedService(
			{
				allowedSiteId: String(id),
			},
			{
				onSuccess: () => {
					if (
						isError &&
						error?.response?.data.message &&
						error.response.data.message.includes('존재하는') &&
						deleteUrl === urlInput
					) {
						resetAllowedService();
					}
					handleOpenActionFeedbackModal({
						variant: 'confirm-delete',
						pageName: deleteUrl,
					});
				},
			},
		);
	};

	const handleKeyDownUrlInput = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			e.preventDefault();
			handleAddAllowedService(urlInput, activeGroupId);
		}
	};

	// NOTE: 첫 렌더링 시 api를 통해 받은 첫번째 allowed service group id를 activeGroupId로 설정
	// 리스트 삭제 후, 현재 active 그룹이 리스트에 없는 경우 첫 번째 그룹으로 설정
	useEffect(() => {
		if (allowedServiceList && allowedServiceList.data.length > 0) {
			const activeGroupExists = activeGroupId && allowedServiceList.data.some((group) => group.id === activeGroupId);

			if (!activeGroupId || !activeGroupExists) {
				setActiveGroupId(allowedServiceList.data[0].id);
			}
		} else if (allowedServiceList && allowedServiceList.data.length === 0 && activeGroupId !== null) {
			// 리스트가 비어있고 선택된 그룹이 있으면 입력 모드로  전환
			handleEnableAddingAllowedServiceGroup();
		}
	}, [allowedServiceList]);

	// NOTE: allowedServiceGroupDetail이 존재할 때 titleInput을 설정
	useEffect(() => {
		if (allowedServiceGroupDetail) {
			setTitleInput(allowedServiceGroupDetail.data.name);
			setSelectedColor(allowedServiceGroupDetail.data.colorCode);
		}
	}, [allowedServiceGroupDetail, setTitleInput]);

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};

	const handleOpenActionFeedbackModal = (state: Partial<ModalState> = {}) => {
		setModalState((prev) => ({ ...prev, ...state }));
		actionFeedbackRef.current?.open();
	};

	const handleCloseActionFeedbackModal = () => {
		actionFeedbackRef.current?.close();
	};

	return (
		<AutoFixedGrid type="allowedService" className="gap-[3rem] bg-gray-bg-01 px-[3.6rem] py-[4.2rem]">
			<div className="absolute right-[4.2rem] top-[5.4rem] z-50 flex gap-[0.8rem]">
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<AutoFixedGrid.Slot className="flex h-full min-h-0 w-full flex-col items-start gap-[2rem]">
				<AllowedServiceList>
					<AllowedServiceList.Header>
						<AllowedServiceList.Title>나의 허용서비스 리스트</AllowedServiceList.Title>
						<AllowedServiceList.PlusButton onClick={handleEnableAddingAllowedServiceGroup} />
					</AllowedServiceList.Header>

					<AllowedServiceList.Content>
						{activeGroupId === null && (
							<AllowedServiceList.ItemInput titleInput={titleInput} selectedColor={selectedColor} />
						)}
						{allowedServiceList?.data.map((allowedServiceGroupData) => (
							<AllowedServiceList.Item
								key={allowedServiceGroupData.id}
								activeGroupId={activeGroupId}
								activeGroupTitleInput={titleInput}
								onSelectActiveGroup={handleSelectActiveGroupId}
								onDeleteAllowedServiceGroup={handleDeleteAllowedServiceGroup}
								isEditingTitle={isEditingTitle}
								{...allowedServiceGroupData}
							/>
						))}
					</AllowedServiceList.Content>
				</AllowedServiceList>
			</AutoFixedGrid.Slot>

			<AutoFixedGrid.Slot className="flex h-full min-h-0 w-full min-w-[894px] flex-col gap-y-[1.9rem]">
				<Spacer.Height className="flex flex-col">
					<AllowedServiceGroupDetail>
						<AllowedServiceGroupDetail.Header
							isEditingTitle={isEditingTitle}
							onChangeEditingTitleStatus={handleEditingTitleStatus}
							activeGroupId={activeGroupId}
							onAddAllowedServiceGroup={handleAddAllowedServiceGroup}
							onChangeAllowedServiceGroupName={handleChangeAllowedServiceGroupName}
						>
							<AllowedServiceGroupDetail.ColorButton onSelectColor={handleSelectColor} selectedColor={selectedColor} />
							<AllowedServiceGroupDetail.Input
								value={titleInput}
								onChange={handleChangeTitleInput}
								onKeyPress={handleKeyDownTitleInput}
								placeholder="허용서비스 세트의 이름을 입력해주세요."
							/>
						</AllowedServiceGroupDetail.Header>

						<AllowedServiceGroupDetail.Tabs>
							<AllowedServiceGroupDetail.TabButton onClick={() => setCurrentTap('WEB')} isActive={currentTap === 'WEB'}>
								웹사이트
							</AllowedServiceGroupDetail.TabButton>
						</AllowedServiceGroupDetail.Tabs>

						<AllowedServiceGroupDetail.Content>
							<TextField
								value={urlInput}
								onKeyDown={handleKeyDownUrlInput}
								onChange={handleChangeUrlInput}
								isError={(urlInput.length > 0 && !isUrlValid(urlInput)) || isError}
								errorMessage={isError ? error.response?.data.message : '알맞은 형식의 url을 입력해 주세요.'}
								placeholder="허용할 웹사이트 주소를 입력해 주세요."
							>
								<TextField.ClearButton onClick={resetUrlInput} />
								<TextField.ConfirmButton
									disabled={urlInput.trim().length === 0 || isPending}
									onClick={() => handleAddAllowedService(urlInput, activeGroupId)}
								>
									사이트 등록하기
								</TextField.ConfirmButton>
							</TextField>
							<AllowedServiceGroupDetail.Table totalLength={allowedServiceGroupDetail?.data.allowedSites.length || 0}>
								{allowedServiceGroupDetail &&
									activeGroupId &&
									allowedServiceGroupDetail.data.allowedSites.map((allowedSiteData, index) => (
										<AllowedServiceGroupDetail.TableRow
											key={`${index}-${allowedSiteData.id}`}
											activeGroupId={activeGroupId}
											onDeleteAllowedSite={() => {
												handleDeleteAllowedService(allowedSiteData.id, allowedSiteData.siteUrl);
											}}
											{...allowedSiteData}
										/>
									))}
							</AllowedServiceGroupDetail.Table>
						</AllowedServiceGroupDetail.Content>
					</AllowedServiceGroupDetail>
				</Spacer.Height>

				<RecommendService>
					{recommendedSites?.data.recommendSites.map((recommendedSite) => (
						<RecommendService.Item
							key={recommendedSite.siteUrl}
							recommendSite={recommendedSite}
							onClick={() => handleAddAllowedService(recommendedSite.siteUrl, activeGroupId)}
						/>
					))}
				</RecommendService>
			</AutoFixedGrid.Slot>
			<ModalWrapper ref={friendsModalRef} backdrop>
				{({ isModalOpen }) => <ModalContentsFriends isModalOpen={isModalOpen} />}
			</ModalWrapper>
			<ModalWrapper ref={actionFeedbackRef} backdrop>
				{() => (
					<ModalContentsAlert.ActionFeedback
						variant={modalState.variant}
						onClick={handleCloseActionFeedbackModal}
						pageName={modalState.pageName}
					/>
				)}
			</ModalWrapper>
		</AutoFixedGrid>
	);
};

export default AllowedServicePage;
