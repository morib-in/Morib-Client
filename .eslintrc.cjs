module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true, // Node.js 환경 추가
	},

	plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'prettier', '@tanstack/query'],

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'prettier',
	],

	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest', // 사용할 ECMAScript 버전을 설정
		ecmaFeatures: {
			// ECMAScript의 언어 확장 기능을 설정
			jsx: true, //일반 자바스크립트의 확장 문법도 린트
		},
		sourceType: 'module',
	},

	ignorePatterns: ['build', 'dist', 'public'], // lint 무시 파일 정하기

	rules: {
		'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }], // "warn": 규칙을 경고로 사용
		'react/react-in-jsx-scope': 'off', //react 17부턴 import react가 필요없는데 off해두지 않으면 에러뜸
		'react/jsx-uses-react': 'off', //import react 강제 옵션 해제
		'react-hooks/rules-of-hooks': 'error', // 리액트 훅의 순서를 지키게끔 한다. (React는 Hook이 호출되는 순서에 의존하기 때문에)
		'react/jsx-props-no-spreading': 'off', // props를 스프레드 연산자를 통해 전달하도록
		'react/forbid-prop-types': 'off',
		'react/function-component-definition': [
			// 함수 작성 방식
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react-hooks/exhaustive-deps': 'warn', // useEffect, useCallback, useMemo 등의 dependencies 배열 에러
		'react/self-closing-comp': 'warn', // 태그 사이 아무 것도 없으면 닫힘 태그로 <div />와 같이 사용하도록
		'react/prop-types': 'off', // prop-type 지정

		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // 콘솔은 확인 뒤 지우기
		'no-unused-vars': 'error', // 사용하지 않는 변수 error처리
		'no-undef': 'error', // 정의 안 한 변수 사용 x
		'no-shadow': 'off', // 바깥 스코프의 선언된 변수와 같은 이름의 새로운 변수 선언 금지
		'no-trailing-spaces': 'error', // 쓸데없는 공백 없애기
		'no-empty-pattern': 'warn', // 빈 구조분해 할당 에러
		'no-duplicate-imports': 'error', //중복 Import 방지

		'no-use-before-define': 'off',

		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unused-vars': 'warn', // 타입스크립트의 사용하지 않는 변수 error 처리

		'prettier/prettier': ['error', { singleQuote: true, useTabs: true, printWidth: 120 }],
	},
};
