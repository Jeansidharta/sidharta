import React from 'react';
import styled from 'styled-components';
import { AnyProgramArgs } from '../../../models/program';
import Icon from './icon';

const Root = styled.div`
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

type IconsContainerProps = React.PropsWithoutRef<{
	programsArgs: AnyProgramArgs[],
	onIconOpen: (icon: AnyProgramArgs) => void,
}>;

type IconsContainerComponent = React.FunctionComponent<IconsContainerProps>;

const IconsContainer: IconsContainerComponent = ({
	programsArgs,
	onIconOpen,
}) => {
	const iconsContainerRef = React.useRef<HTMLDivElement | null>(null);

	function handleIconDragEnd (event: React.MouseEvent<HTMLButtonElement>) {
		if (!iconsContainerRef.current) throw new Error('Reference not set');

		let { clientX: x, clientY: y, currentTarget } = event;
		const {
			left: containerLeft,
			top: containerTop,
		} = iconsContainerRef.current.getBoundingClientRect();

		x -= containerLeft;
		y -= containerTop;

		const { width: targetWidth, height: targetHeight } = (
			currentTarget.getBoundingClientRect()
		);

		const dragColumn = Math.floor(x / targetWidth);
		const dragRow = Math.floor(y / targetHeight);

		currentTarget.style.gridColumnStart = (dragColumn + 1).toString();
		currentTarget.style.gridRowStart = (dragRow + 1).toString();
	}

	return (
		<Root ref={iconsContainerRef}>
			{programsArgs.map((programArgs, index) => (
				<Icon
					name={programArgs.title}
					onDragEnd={handleIconDragEnd}
					size={{ x: 80, y: 100 }}
					programArgs={programArgs}
					onAppOpen={() => onIconOpen(programArgs)}
					key={index}
				/>
			))}
		</Root>
	);
}

export default IconsContainer;