/** @type {import('tailwindcss')'Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	plugins: [
		({ addUtilities }) => {
			addUtilities({
				'.title-semibold-64': {
					'@apply text-[6.4rem] font-semibold leading-normal': '',
				},
				'.title-semibold-48': {
					'@apply text-[4.8rem] font-semibold leading-normal': '',
				},
				'.title-bold-36': {
					'@apply text-[3.6rem] font-bold leading-normal': '',
				},
				'.title-bold-32': {
					'@apply text-[3.2rem] font-bold leading-normal': '',
				},
				'.title-med-32': {
					'@apply text-[3.2rem] font-medium leading-normal': '',
				},
				'.head-bold-30': {
					'@apply text-[3rem] font-bold leading-normal': '',
				},
				'.head-bold-28': {
					'@apply text-[2.8rem] font-bold leading-normal': '',
				},
				'.head-bold-24': {
					'@apply text-[2.4rem] font-bold leading-normal': '',
				},
				'.subhead-bold-22': {
					'@apply text-[2.2rem] font-bold leading-140': '',
				},
				'.subhead-reg-22': {
					'@apply text-[2.2rem] font-normal leading-120': '',
				},
				'.subhead-reg-20': {
					'@apply text-[2rem] font-normal leading-120': '',
				},
				'.subhead-bold-20': {
					'@apply text-[2rem] font-bold leading-120': '',
				},
				'.subhead-semibold-20': {
					'@apply text-[2rem] font-semibold leading-120': '',
				},
				'.subhead-semibold-18': {
					'@apply text-[1.8rem] font-semibold leading-120': '',
				},
				'.subhead-med-18': {
					'@apply text-[1.8rem] font-medium leading-120': '',
				},
				'.body-semibold-16': {
					'@apply text-[1.6rem] font-semibold leading-120': '',
				},
				'.body-semibold-16-done': {
					'@apply text-[1.6rem] font-semibold leading-140 line-through': '',
				},
				'.body-med-16': {
					'@apply text-[1.6rem] font-medium leading-140': '',
				},
				'.body-reg-24': {
					'@apply text-[2.4rem] font-normal leading-normal': '',
				},
				'.body-reg-16': {
					'@apply text-[1.6rem] font-normal leading-140': '',
				},
				'.detail-semibold-14': {
					'@apply text-[1.4rem] font-semibold leading-140': '',
				},
				'.detail-reg-14': {
					'@apply text-[1.4rem] font-normal leading-140': '',
				},
				'.detail-reg-12': {
					'@apply text-[1.2rem] font-normal leading-120': '',
				},
			});
		},
	],
	theme: {
		extend: {
			dropShadow: {
				calendarDrop: '0 3px 30px rgba(0, 0, 0, 0.40)',
			},
			fontFamily: {
				pretendard: ['Pretendard'],
			},
			colors: {
				login: '#181C21',
				'mint-01': '#06FFD2',
				'mint-02': '#8BFFEA',
				'mint-02-hover': '#7DE6D3',
				'mint-02-press': '#6FCCBB',
				secondary: '#00BF9C',
				'date-active': 'rgba(139, 255, 234, 0.1)',
				'gray-bg-01': '#181C22',
				'gray-bg-02': '#292D34',
				'gray-bg-03': '#33373F',
				'gray-bg-04': '#414751',
				'gray-bg-05': '#4F5762',
				'gray-bg-06': '#656D77',
				'gray-bg-07': '#868C93',
				'gray-01': '#333333',
				'gray-02': '#5D5D5D',
				'gray-03': '#7C7C7C',
				'gray-04': '#A5A5A5',
				'gray-05': '#DFDFDF',
				white: '#FFFFFF',
				'error-01': '#F84949',
				'error-02': '#FF1717',
				'error-03': '#AE3333',
				black: '#000000',
				dim: 'rgba(0, 0, 0, 0.6)',
				'color-palette-red': '#FF8080',
				'color-palette-yellow1': '#FFB62F',
				'color-palette-yellow2': '#FFF787',
				'color-palette-green1': '#B6FFA5',
				'color-palette-green2': '#5CE082',
				'color-palette-green3': '#179F62',
				//mint-01
				'color-palette-blue1': '#27C5FF',
				'color-palette-blue2': '#3D6DFF',
				'color-palette-purple1': '#7742FF',
				'color-palette-pink': '#FF74F8',
				//gray-bg-07
			},
			lineHeight: {
				120: '120%',
				140: '140%',
			},
			backgroundImage: {
				'login-bg': "url('@/shared/assets/images/login_background.png')",
				'main-gra-01': 'linear-gradient(to right, #00F2C6, #A5FFFD)',
				'main-gra-hover': 'linear-gradient(to right, #01DAB3, #92E6E4)',
				'main-gra-press': 'linear-gradient(to right, #03C2A0, #80CCCA)',
			},
		},
	},
};
