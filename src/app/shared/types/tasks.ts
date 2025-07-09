import { GetCategoryTaskRes } from './api/home';
import { GetTimerFriendsRes, GetTimerTodosRes } from './api/timer';

export type TaskType = GetCategoryTaskRes['data'][number]['categories'][number]['tasks'][number];
export type TaskListType = GetCategoryTaskRes['data'][number]['categories'][number]['tasks'];
export type CategoryListType = GetCategoryTaskRes['data'][number]['categories'][number]['category'];
export type CategoriesType = GetCategoryTaskRes['data'][number]['categories'];

export type TimerTodoType = GetTimerTodosRes['data']['task'][number];
export type TimerFriendType = GetTimerFriendsRes['data'][number];
