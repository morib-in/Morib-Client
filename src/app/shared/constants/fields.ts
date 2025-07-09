import BusinessIcon from '@/shared/assets/svgs/onboarding/ic_business.svg';
import DesignIcon from '@/shared/assets/svgs/onboarding/ic_design.svg';
import DevelopmentIcon from '@/shared/assets/svgs/onboarding/ic_development.svg';
import MarketingIcon from '@/shared/assets/svgs/onboarding/ic_marketing.svg';
import PlanningIcon from '@/shared/assets/svgs/onboarding/ic_planning.svg';
import StudyIcon from '@/shared/assets/svgs/onboarding/ic_studying.svg';

export const FIELDS = ['비즈니스', '디자인', '마케팅', '기획', '공부', '개발', '기타'] as const;

export const FIELDS_WITH_ICONS = [
	{ label: '비즈니스', img: BusinessIcon },
	{ label: '디자인', img: DesignIcon },
	{ label: '마케팅', img: MarketingIcon },
	{ label: '기획', img: PlanningIcon },
	{ label: '공부', img: StudyIcon },
	{ label: '개발', img: DevelopmentIcon },
] as const;

export const FIELDS_MAP = {
	비즈니스: 'Business Owner/Executive',
	디자인: 'Designer',
	마케팅: 'Marketer',
	기획: 'PM/PO',
	공부: 'Student',
	개발: 'Dev',
	기타: 'Others',
};
