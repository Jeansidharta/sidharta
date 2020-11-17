import React from 'react';
import styled, { css } from 'styled-components';
import Images from '../../../constants/images';
import { AnyProgramArgs, isProgramDownload } from '../../../models/program';

const Root = styled.button<{ width: number, height: number }>`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	padding: 12px;
	align-items: center;
	background-color: transparent;
	border: none;
	outline: none;
`;

const Name = styled.p`
	font-size: 12px;
	margin: 4px 0 0 0;
	text-align: center;
	overflow-wrap: break-word;
	color: white;
	text-shadow:
		-1px -1px 0 rgba(0, 0, 0, 0.5),
		 1px -1px 0 rgba(0, 0, 0, 0.5),
		-1px  1px 0 rgba(0, 0, 0, 0.5),
		 1px  1px 0 rgba(0, 0, 0, 0.5);
	width: 100%;
`;

const VisualsContainer = styled.div`
	padding: 4px;
	${Root}:focus & {
		border: 1px solid white;
		box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 1);
	}
`;

const ImageContainer = styled.div`
`;

const iconImageStyles = css`
	user-select: none;
	user-drag: none;
	height: 46px;
	width: 30px;
`;

type IconProps = React.PropsWithoutRef<{
	programArgs: AnyProgramArgs,
	size: { x: number, y: number, },
	onAppOpen?: (programArgs: AnyProgramArgs) => void,
}> & React.ComponentProps<'button'>;

const ImagesFolder = styled(Images.folder).attrs(() => ({ css: iconImageStyles }))``;
const ImagesWeb = styled(Images.web).attrs(() => ({ css: iconImageStyles }))``;
const ImagesDownload = styled(Images.download).attrs(() => ({ css: iconImageStyles }))``;
const ImagesBlankFile = styled(Images.blankFile).attrs(() => ({ css: iconImageStyles }))``;

type IconComponent = React.FunctionComponent<IconProps>;

const Icon: IconComponent = ({
	programArgs,
	ref,
	size,
	onAppOpen,
	...props
}) => {
	const rootRef = React.useRef<HTMLButtonElement | null>(null);

	React.useEffect(() => {
		const elem = rootRef.current!;
		const left = elem.offsetLeft;
		const top = elem.offsetTop;
		const { height, width } = elem.getBoundingClientRect();
		const col = Math.floor(left / width) + 1;
		const row = Math.floor(top / height) + 1;
		elem.style.gridColumnStart = col.toString();
		elem.style.gridRowStart = row.toString();
	}, []);

	function handleDoubleClick () {
		if (isProgramDownload(programArgs)) {
			const anchor = document.createElement('a');
			anchor.setAttribute('download', 'true');
			anchor.setAttribute('href', programArgs.url);
			anchor.setAttribute('title', programArgs.title);
			anchor.innerText = programArgs.title;
			anchor.click();
		} else if (onAppOpen) {
			onAppOpen(programArgs);
		}
	}

	let IconImageElem: React.FunctionComponent;

	if (programArgs.programType === 'folder') {
		IconImageElem = ImagesFolder;
	} else if (programArgs.programType === 'iframe') {
		IconImageElem = ImagesWeb;
	} else if (programArgs.programType === 'download') {
		IconImageElem = ImagesDownload;
	} else {
		IconImageElem = ImagesBlankFile;
	}

	return (
		<Root
			onDoubleClick={handleDoubleClick}
			height={size.y}
			width={size.x}
			ref={rootRef}
			{...props}
		>
			<VisualsContainer draggable>
				<ImageContainer>
					<IconImageElem />
				</ImageContainer>
				<Name>{programArgs.title}</Name>
			</VisualsContainer>
		</Root>
	);
}

export default Icon;