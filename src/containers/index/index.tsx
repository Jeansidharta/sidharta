import React from 'react';
import styled from 'styled-components';
import IconsContainer from '../../components/reusable/icons-container';

import Images from '../../constants/images';
import TaskBar from './task-bar';
import { FolderWindow, IFrameWindow } from '../../components/reusable/window';
import { AnyProgramArgs, isProgramFolder, isProgramIFrame, isProgramMarkdownFile } from '../../models/program';
import MarkdownFileWindow from '../../components/reusable/window/markdown-file';

const Root = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Background = styled(Images.wallpaper).attrs(() => ({ fit: 'cover' }))`
	position: fixed;
	left: 0;
	top: 0;
`;

const TaskBarContainer = styled.div`
	position: relative;
`;

const iconsContent: AnyProgramArgs[] = [
	{ title: 'Contact me!', programType: 'markdown-file', url: '/markdown/contact-me.md' },
	{ title: 'Security concerns', programType: 'markdown-file', url: '/markdown/security.md' },
	{ title: 'servicoes', programType: 'markdown-file', url: '/markdown/services-list.md' },
	{ title: 'Why certs?', programType: 'markdown-file', url: '/markdown/certs.md' },
	{ title: 'Certificates', programType: 'folder', childIcons: [{ title: 'batata', programType: 'iframe', url: '/desktop' }] },
];

function Desktop () {
	const [openPrograms, setOpenPrograms] = React.useState<AnyProgramArgs[]>([]);

	function handleProgramClose (programArgs: AnyProgramArgs) {
		setOpenPrograms(openPrograms => openPrograms.filter(args => args !== programArgs));
	}

	function renderWindows () {
		return (
			openPrograms.map((program, index) => {
				if (isProgramFolder(program)) {
					return <FolderWindow
						key={index}
						iconChildren={program.childIcons}
						onIconOpen={handleProgramOpen}
						onClose={() => handleProgramClose(program)}
					/>;
				} else if (isProgramIFrame(program)) {
					return <IFrameWindow
						key={index}
						onClose={() => handleProgramClose(program)}
						url={program.url}
					/>;
				} else if (isProgramMarkdownFile(program)) {
					return <MarkdownFileWindow
						key={index}
						markdownURL={program.url}
						onClose={() => handleProgramClose(program)}
					/>;
				} else throw new Error('Invalid program type');
			})
		);
	}

	function handleProgramOpen (programArgs: AnyProgramArgs) {
		setOpenPrograms([...openPrograms, programArgs]);
	}

	return (
		<Root>
			<Background src="/images/wallpaper.jpg" />
			<IconsContainer
				programsArgs={iconsContent}
				onIconOpen={handleProgramOpen}
			/>
			{renderWindows()}
			<TaskBarContainer>
				<TaskBar />
			</TaskBarContainer>
		</Root>
	);
}

export default Desktop;