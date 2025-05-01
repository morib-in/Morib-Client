export const HOME_RES = {
	GET_CATEGORY: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: [
			{
				date: '2024-07-01',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [],
					},
				],
			},
			{
				date: '2024-07-02',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [],
					},
				],
			},
			{
				date: '2024-07-03',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
				],
			},
			{
				date: '2024-07-04',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 4,
							name: 'BA 기초',
						},
						tasks: [],
					},

					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [
							{
								id: 7,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 2,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 3,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 4,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 5,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 6,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
							{
								id: 8,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: false,
							},
						],
					},
				],
			},
			{
				date: '2024-07-05',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [
							{
								id: 7,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: true,
							},
						],
					},
				],
			},
			{
				date: '2024-07-06',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [
							{
								id: 7,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: true,
							},
						],
					},
				],
			},
			{
				date: '2024-07-07',
				categories: [
					{
						category: {
							id: 2,
							name: 'BA 기본',
						},
						tasks: [],
					},
					{
						category: {
							id: 1,
							name: 'BA 기초',
						},
						tasks: [],
					},
					{
						category: {
							id: 3,
							name: 'BA 심화',
						},
						tasks: [
							{
								id: 7,
								name: 'Random Forest 모델 구성',
								startDate: '2024-07-04',
								endDate: '2024-09-15',
								elapsedTime: 0,
								isComplete: true,
							},
						],
					},
				],
			},
		],
	},
	GET_WORK_TIME: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: {
			targetDate: '2024-07-07',
			sumTodayElapsedTime: 2000,
		},
	},
	POST_TIMER_START: {
		status: 200,
		message: '요청이 성공했습니다.',
	},
	POST_CREATE_TASK: {
		status: 200,
		code: 's2000',
		message: '요청이 성공했습니다.',
	},
	POST_TOGGLE_TASK_STATUS: {
		status: 200,
		message: '요청이 성공했습니다.',
	},
	DELETE_CATEGORY: {
		status: 200,
		message: '요청이 성공했습니다.',
	},
};
