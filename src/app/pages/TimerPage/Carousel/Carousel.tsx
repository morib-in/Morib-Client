import { useRef } from 'react';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';
import ModalContentsFriends from '@/shared/components/ModalContentsFriends/ModalContentsFriends';

import useCarousel from '@/shared/hooks/useCarousel';

import { overlay } from '@/shared/utils/overlay';

import { Direction } from '@/shared/types/global';

import { useGetTimerFriends } from '@/shared/apisV2/timer/timer.queries';

import CarouselFriend from './CarouselFriend';

/**
 * 타이머 페이지 하단 친구 캐러셀 컴포넌트
 */
const Carousel = () => {
	const carouselRef = useRef<HTMLDivElement>(null);

	const { data: friendsList } = useGetTimerFriends();

	const { handleNext, handlePrev } = useCarousel({ carouselRef });

	const handleFriendsModal = () => {
		overlay({
			backdrop: true,
			content: ({ isOpen }) => <ModalContentsFriends isModalOpen={isOpen} />,
		});
	};

	return (
		<div className="flex h-[15rem] w-full max-w-[86.6rem] items-center justify-between gap-[6rem]">
			<ButtonArrowSVG direction={Direction.LEFT} onClick={handlePrev} />
			<div ref={carouselRef} className="flex w-[65.8rem] min-w-0 gap-x-[4.2rem] overflow-x-auto">
				{!friendsList?.data || friendsList.data.length === 0 ? (
					<div className="flex h-full w-full flex-col items-center justify-center gap-y-[1.6rem]">
						<h3 className="text-gray-04 subhead-bold-20">함께 몰입할 친구를 추가해보아요!</h3>
						<ButtonRadius8.Md onClick={handleFriendsModal}>친구 추가하기</ButtonRadius8.Md>
					</div>
				) : (
					<>
						{friendsList.data.map((friend) => (
							<CarouselFriend
								key={friend.id}
								id={friend.id}
								image={friend.imageUrl}
								time={friend.elapsedTime}
								name={friend.name}
								categoryName={friend.categoryName || ''}
								isPlaying={friend.timerStatus === 'RUNNING'}
								isOnline={friend.isOnline}
							/>
						))}
					</>
				)}
			</div>
			<ButtonArrowSVG direction={Direction.RIGHT} onClick={handleNext} />
		</div>
	);
};

export default Carousel;
