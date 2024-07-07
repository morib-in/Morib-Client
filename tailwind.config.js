/** @type {import('tailwindcss')'Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				pretendard: ['Pretendard'],
			},
			colors: {
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
				'error-02': '##FF1717',
				'error-03': '#AE3333',
				black: '#000000',
				dim: 'rgba(0, 0, 0, 0.6)',
			},
			lineHeight: {
				120: '120%',
				140: '140%',
			},
			backgroundImage: {
				'main-gra-01': 'linear-gradient(to right, #00F2C6, #A5FFFD)',
				'main-gra-hover': 'linear-gradient(to right, #01DAB3, #92E6E4)',
				'main-gra-press': 'linear-gradient(to right, #03C2A0, #80CCCA)',
			},
		},
	},
	plugins: [],
};
