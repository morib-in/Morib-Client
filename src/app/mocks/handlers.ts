import { commonResolvers } from './common/common.resolvers';
import { homeResolvers } from './home/home.resolvers';
import { onboardingResolvers } from './onboarding/onboarding.resolvers';

export const handlers = [...homeResolvers, ...onboardingResolvers, ...commonResolvers];
