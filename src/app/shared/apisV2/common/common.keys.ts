/*
 NOTE: queryKey 작성 방식
 첫 번째 요소: 도메인명(여기서는 'interestArea')
 두 번째 요소: 리소스 (예: 'list', 'detail')
 그 뒤: 해당 액션을 구분하는 파라미터(예: id, filter, req 객체)
*/

/*
NOTE: queryKey 작성 예시
 export const interestAreaKeys = {
 all: ['interestArea'] as const,
 lists: () => [...interestAreaKeys.all, 'list'] as const,
 list: (filter: string) => [...interestAreaKeys.lists(), filter] as const,
 detail: (id: number) => [...interestAreaKeys.all, 'detail', id] as const,
 post: (req: PostInterestAreaReq) => [...interestAreaKeys.all, 'post', req] as const,
 }
*/

export const commonKeys = {
	common: ['common'] as const,
	heartBeat: () => [...commonKeys.common, 'heartBeat'] as const,
};
