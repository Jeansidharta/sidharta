import React from 'react';
import styled from 'styled-components';

import Images from '../../constants/images';
import Icon from './icon';
import TaskBar from './task-bar';
import Window from './window';

const Root = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const IconsContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	position: relative;
	grid-auto-flow: column;
	grid-auto-columns: max-content;
	grid-template-rows: repeat(auto-fill, 100px);
	grid-template-columns: repeat(100, 80px);
	justify-items: center;
	align-items: center;
`;

const Background = styled(Images.wallpaper).attrs(() => ({ fit: 'cover' }))`
	position: fixed;
	left: 0;
	top: 0;
`;

const TaskBarContainer = styled.div`
	position: relative;
`;

const iconsContent = [
	{ iconSrc: undefined, text: 'Batata' },
	{ iconSrc: undefined, text: 'Tomate' },
	{ iconSrc: undefined, text: 'Cebola' },
	{ iconSrc: undefined, text: 'Chocolate' },
];

function Desktop () {
	const iconsContainerRef = React.useRef<HTMLDivElement | null>(null);
	const [windows, setWindows] = React.useState<string[]>([]);

	function handleIconDragEnd (event: React.MouseEvent<HTMLButtonElement>) {
		if (!iconsContainerRef.current) throw new Error('Reference not set');

		const { clientX: x, clientY: y, currentTarget } = event;

		const { width: targetWidth, height: targetHeight } = (
			currentTarget.getBoundingClientRect()
		);

		const dragColumn = Math.floor(x / targetWidth);
		const dragRow = Math.floor(y / targetHeight);

		console.log(dragRow, dragColumn);
		currentTarget.style.gridColumnStart = (dragColumn + 1).toString();
		currentTarget.style.gridRowStart = (dragRow + 1).toString();
	}

	function renderWindows () {
		function handleWindowClose (window: string) {
			setWindows(windows.filter(w => w !== window));
		}

		return (
			windows.map(window => (
				<Window
					key="window"
					url={window}
					onClose={() => handleWindowClose(window)}
				/>
			))
		);
	}

	function handleIconOpen (newUrl: string) {
		setWindows([...windows, newUrl]);
	}

	return (
		<Root>
			<Background src="/images/wallpaper.jpg" />
			<IconsContainer ref={iconsContainerRef}>
				{iconsContent.map((iconContent, index) => (
					<Icon
						iconSrc={iconContent.iconSrc}
						name={iconContent.text}
						onDragEnd={handleIconDragEnd}
						size={{ x: 80, y: 100 }}
						url="/desktop"
						onAppOpen={handleIconOpen}
						key={index}
					/>
				))}
			</IconsContainer>
			{renderWindows()}
			<TaskBarContainer>
				<TaskBar />
			</TaskBarContainer>
		</Root>
	);
}

export default Desktop;