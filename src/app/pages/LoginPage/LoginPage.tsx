import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loginTimerURL from '@/shared/assets/svgs/login/ic_login_timer.svg';
import logoURL from '@/shared/assets/svgs/login/ic_logo.svg';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { authConfig } from '@/shared/config/auth';

const LoginPage = () => {
	const [typedText, setTypedText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const fullText = '온전한 몰입 공간';
	const typingSpeed = 150; // 타이핑 속도 (ms)
	const deletingSpeed = 80; // 삭제 속도 (ms)
	const pauseTime = 4000; // 완성된 후 대기 시간 (ms)
	const typingRef = useRef<HTMLSpanElement>(null);

	const navigate = useNavigate();

	// 페이지 진입 시 애니메이션
	useEffect(() => {
		document.querySelector('.main-container')?.classList.add('show');
	}, []);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		// 타이핑 효과
		if (!isDeleting && typedText !== fullText) {
			timeout = setTimeout(() => {
				setTypedText(fullText.substring(0, typedText.length + 1));
			}, typingSpeed);
		}
		// 완성 후 대기
		else if (!isDeleting && typedText === fullText) {
			timeout = setTimeout(() => {
				setIsDeleting(true);
			}, pauseTime);
		}
		// 삭제 효과
		else if (isDeleting && typedText !== '') {
			timeout = setTimeout(() => {
				setTypedText(fullText.substring(0, typedText.length - 1));
			}, deletingSpeed);
		}
		// 삭제 완료 후 다시 시작
		else if (isDeleting && typedText === '') {
			timeout = setTimeout(() => {
				setIsDeleting(false);
			}, pauseTime / 2);
		}

		return () => clearTimeout(timeout);
	}, [typedText, isDeleting]);

	// 커서 깜빡임 효과
	useEffect(() => {
		if (!typingRef.current) return;

		const blinkInterval = setInterval(() => {
			if (typingRef.current) {
				typingRef.current.classList.toggle('typing-cursor');
			}
		}, 500);

		return () => clearInterval(blinkInterval);
	}, []);

	const navigateToLogin = () => {
		setIsExiting(true);
		setTimeout(() => {
			authConfig.redirectToMoribAuth();
		}, 700);
	};

	useEffect(() => {
		if (authConfig.isAuthenticated()) {
			navigate(ROUTES_CONFIG.home.path);
		}
	}, [navigate]);

	return (
		<div className="fixed h-screen w-screen">
			<div className="main-container relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#181C22] py-[12.5vh] pl-0 text-white opacity-0 transition-all duration-700 sm:pl-0 md:justify-end md:pl-[12.5vw]">
				<div className={`bg-animate transition-opacity duration-500 ${isExiting ? 'opacity-0' : ''}`} />

				{/* 파티클 요소들 */}
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />

				<div
					className={`relative z-10 flex h-full w-full items-center transition-all duration-700 ${isExiting ? 'translate-y-12 opacity-0' : ''}`}
				>
					<section className="flex h-[39.63vh] flex-[4] flex-col items-center justify-center gap-[8rem] md:items-start">
						<img src={logoURL} alt="Morib 로고" className="logo-animate h-auto w-[22.4rem]" />

						{/* 제목 - 피그마 기준 72px 폰트, 줄간격 1.3 */}
						<div className="flex w-full flex-col items-center md:items-start">
							{/* 타이틀 영역에 고정 높이 지정 */}
							<div className="mb-[3rem]">
								<h1 className="flex flex-col gap-[0.3em] whitespace-pre-line text-center text-4xl font-bold sm:text-6xl md:text-start md:text-7xl 2xl:text-8xl">
									<span className="title-animate">당신을 위한</span>
									<span className="typing-cursor typing-container mt-[0.5rem] lg:mt-[0.5rem]">{typedText}</span>
								</h1>
							</div>

							<button
								type="button"
								className="btn-animate h-[5.4rem] w-[34.5rem] cursor-pointer rounded-lg bg-main-gra-01 px-16 py-4 text-[#333333] subhead-bold-20 hover:bg-main-gra-hover active:bg-main-gra-press"
								onClick={navigateToLogin}
							>
								Morib에 로그인하기
							</button>
						</div>
					</section>

					<section className="relative hidden h-full flex-[10] items-center md:flex">
						<img src={loginTimerURL} alt="몰입 타이머 시각화" className="img-animate mr-[3.7rem] h-auto w-full" />
					</section>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
