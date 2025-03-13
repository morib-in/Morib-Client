import { FieldType } from '@/shared/types/fileds';

import { AllowedSiteType } from '../types/allowedSites';

// LINK: https://www.notion.so/11a97d212fa28029992bdc1bef53c766?pvs=4

export const SUGGESTED_STIES: Record<FieldType, AllowedSiteType[]> = {
	비즈니스: [
		{
			favicon: 'https://www.gstatic.com/trends/favicon.ico',
			siteName: 'Google Trends',
			pageName: 'Google Trends',
			siteUrl: 'https://trends.google.com/trends/?geo=US',
		},
		{
			favicon: 'https://trello.com/favicon.ico',
			siteName: 'Trello',
			pageName: 'Trello',
			siteUrl: 'https://trello.com/en',
		},
		{
			favicon: 'https://www.salesforce.com/favicon.ico',
			siteName: 'Salesforce',
			pageName: 'Salesforce Korea',
			siteUrl: 'https://www.salesforce.com/kr/?ir=1',
		},
		{
			favicon: 'https://slack.com/favicon.ico',
			siteName: 'Slack',
			pageName: 'Slack - 협업툴',
			siteUrl: 'https://slack.com/intl/ko-kr/',
		},
		{
			favicon: 'https://cfl.dropboxstatic.com/static/metaserver/static/images/favicon.ico',
			siteName: 'Dropbox',
			pageName: 'Dropbox for Business',
			siteUrl: 'https://www.dropbox.com/business',
		},
	],
	디자인: [
		{
			favicon: 'https://static.figma.com/uploads/b6df2735e4cb368306acf5480b50f96e69f96099',
			siteName: '피그마',
			pageName: 'Figma - 디자인 협업툴',
			siteUrl: 'https://www.figma.com/',
		},
		{
			favicon: 'https://unsplash.com/favicon.ico',
			siteName: '언스플레쉬',
			pageName: 'Unsplash',
			siteUrl: 'https://unsplash.com/ko',
		},
		{
			favicon: 'https://www.freepik.com/favicon.ico',
			siteName: '프리픽',
			pageName: 'Freepik',
			siteUrl: 'https://www.freepik.com/',
		},
		{
			favicon: 'https://kr.pinterest.com/favicon.ico',
			siteName: '핀터레스트',
			pageName: 'Pinterest',
			siteUrl: 'https://kr.pinterest.com/',
		},
		{
			favicon: 'https://a5.behance.net/37b8f834c44e77b0120ebd66481759ccebaf636d/img/site/favicon.png?cb=264615658',
			siteName: '비핸스',
			pageName: 'Behance',
			siteUrl: 'https://www.behance.net/',
		},
		{
			favicon: 'https://cdn-bastani.stunning.kr/static/feature/notefolioFavicon/favicon.ico',
			siteName: '노트폴리오',
			pageName: 'Notefolio',
			siteUrl: 'https://notefolio.net/',
		},
		{
			favicon:
				'https://cdn.dribbble.com/assets/favicon-452601365a822699d1d5db718ddf7499d036e8c2f7da69e85160a4d2f83534bd.ico',
			siteName: '드리블',
			pageName: 'Dribbble',
			siteUrl: 'https://dribbble.com/',
		},
	],
	마케팅: [
		{
			favicon: 'https://newneek.co/favicon.ico',
			siteName: '뉴닉',
			pageName: 'Newneek',
			siteUrl: 'https://newneek.co/',
		},
		{
			favicon: 'https://www.careet.net/content/images/favicon.ico',
			siteName: '캐릿',
			pageName: 'Careet',
			siteUrl: 'https://www.careet.net/',
		},
		{
			favicon: 'https://tsn.dmcmedia.co.kr/dmcreportCDN/DMCReportFront/images/favicon.png',
			siteName: 'DMC리포트',
			pageName: 'DMC Report',
			siteUrl: 'https://www.dmcreport.co.kr/',
		},
		{
			favicon: 'https://www.mezzomedia.co.kr/images/favicon.ico',
			siteName: '메조 미디어',
			pageName: 'Mezzo Media',
			siteUrl: 'https://www.mezzomedia.co.kr/',
		},
		{
			favicon: 'https://www.nasmedia.co.kr/wp-content/themes/nasmedia/images/favicon/r-01.png',
			siteName: '나스 미디어',
			pageName: 'Nas Media',
			siteUrl: 'https://www.nasmedia.co.kr/',
		},
	],
	기획: [
		{
			favicon: 'https://disquiet.io/favicon.ico',
			siteName: '디스콰이엇',
			pageName: 'Disquiet',
			siteUrl: 'https://disquiet.io/',
		},
		{
			favicon: 'https://brunch.co.kr/favicon.ico',
			siteName: '브런치',
			pageName: 'Brunch',
			siteUrl: 'https://brunch.co.kr/',
		},
		{
			favicon: 'https://www.notion.so/images/favicon.ico',
			siteName: '노션',
			pageName: 'Notion',
			siteUrl: 'https://www.notion.so/',
		},
		{
			favicon: 'https://www.producthunt.com/favicon.ico',
			siteName: 'Product Hunt',
			pageName: 'Product Hunt',
			siteUrl: 'https://www.producthunt.com/',
		},
		{
			favicon: 'https://static.figma.com/uploads/b6df2735e4cb368306acf5480b50f96e69f96099',
			siteName: '피그마',
			pageName: 'Figma - 디자인 협업툴',
			siteUrl: 'https://www.figma.com/',
		},
	],
	개발: [
		{
			favicon: 'https://chatgpt.com/favicon.ico',
			siteName: '챗지피티',
			pageName: 'ChatGPT',
			siteUrl: 'https://chatgpt.com/',
		},
		{
			favicon: 'https://www.acmicpc.net/favicon.ico',
			siteName: '백준',
			pageName: 'Baekjoon Online Judge',
			siteUrl: 'https://www.acmicpc.net/',
		},
		{
			favicon: 'https://github.com/favicon.ico',
			siteName: 'GitHub',
			pageName: 'GitHub',
			siteUrl: 'https://github.com/',
		},
		{
			favicon: 'https://slack.com/favicon.ico',
			siteName: 'Slack',
			pageName: 'Slack',
			siteUrl: 'https://slack.com/intl/ko-kr/',
		},
		{
			favicon: 'https://stackoverflow.com/favicon.ico',
			siteName: 'Stack Overflow',
			pageName: 'Stack Overflow',
			siteUrl: 'https://stackoverflow.com/',
		},
	],
	공부: [
		{
			favicon: 'https://www.notion.so/images/favicon.ico',
			siteName: '노션',
			pageName: 'Notion',
			siteUrl: 'https://www.notion.so/',
		},
		{
			favicon: 'https://www.copykiller.com/favicon.ico',
			siteName: '카피킬러라이트',
			pageName: 'CopyKiller Lite',
			siteUrl: 'https://www.copykiller.com/',
		},
		{
			favicon: 'https://www.riss.kr/favicon.ico',
			siteName: 'RISS',
			pageName: 'RISS',
			siteUrl: 'https://www.riss.kr/',
		},
		{
			favicon: 'https://drive.google.com/favicon.ico',
			siteName: 'Google Drive',
			pageName: 'Google Drive',
			siteUrl: 'https://drive.google.com/',
		},
		{
			favicon: 'https://meet.google.com/favicon.ico',
			siteName: 'Google Workspace',
			pageName: 'Google Workspace',
			siteUrl: 'https://meet.google.com/',
		},
	],
	기타: [
		{
			favicon: 'https://papago.naver.com/favicon.ico',
			siteName: '네이버 파파고',
			pageName: 'Naver Papago',
			siteUrl: 'https://papago.naver.com/',
		},
		{
			favicon: 'https://chatgpt.com/favicon.ico',
			siteName: '챗지피티',
			pageName: 'ChatGPT',
			siteUrl: 'https://chatgpt.com/',
		},
		{
			favicon: 'https://www.ilovepdf.com/favicon.ico',
			siteName: 'iLovePDF',
			pageName: 'iLovePDF',
			siteUrl: 'https://www.ilovepdf.com/ko',
		},
		{
			favicon: 'https://www.hancomdocs.com/favicon.ico',
			siteName: 'Hancomdocs',
			pageName: 'Hancomdocs',
			siteUrl: 'https://www.hancomdocs.com/home',
		},
		{
			favicon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
			siteName: 'Gmail',
			pageName: 'Gmail',
			siteUrl: 'https://mail.google.com/mail/',
		},
	],
};
