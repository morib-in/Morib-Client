import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';

interface WorkSpaceSettingContentProps {
	personalWorkspaces: string[];
	teamWorkspaces: string[];
}

const WorkSpaceSettingContent = ({ personalWorkspaces, teamWorkspaces }: WorkSpaceSettingContentProps) => (
	<>
		<p className="w-full border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">내 워크스페이스</p>

		{personalWorkspaces.map((name, index) => (
			<div key={index} className="flex h-[11rem] w-full items-center gap-[2rem] py-[2rem]">
				<div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-bg-07" />
				<div className="flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white subhead-med-18">
					{name}
				</div>
			</div>
		))}

		<p className="mt-[4rem] w-full border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">
			팀 워크스페이스
		</p>

		{teamWorkspaces.map((name, index) => (
			<div key={index} className="flex h-[11rem] w-full items-center gap-[2rem] py-[2rem]">
				<div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-bg-07" />
				<div className="flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white subhead-med-18">
					{name}
				</div>
			</div>
		))}

		<div className="flex h-[9.2rem] w-full items-center justify-end pt-[17.8rem]">
			<ButtonRadius8.Md type="button">변경사항 저장</ButtonRadius8.Md>
		</div>
	</>
);

export default WorkSpaceSettingContent;
