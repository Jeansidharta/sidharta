import React from 'react';
import styled from 'styled-components';
import Images from '../../constants/images';

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
	text-shadow: 0px 0px 3px black;
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

const IconImage = styled(Images.blankFile)`
	user-select: none;
	user-drag: none;
	height: 46px;
	width: 30px;
`;

type IconProps = React.PropsWithoutRef<{
	iconSrc?: string,
	name: string,
	size: { x: number, y: number, },
	url: string,
	onAppOpen?: (url: string) => void,
}> & React.ComponentProps<'button'>;

type IconComponent = React.FunctionComponent<IconProps>;

const Icon: IconComponent = ({
	iconSrc = '/images/blank-file.svg',
	name,
	url,
	ref,
	size,
	onAppOpen,
	...props
}) => {
	const rootRef = React.useRef<HTMLButtonElement | null>(null);

	React.useEffect(() => {
		const elem = rootRef.current!;
		const { height, width, top, left } = elem.getBoundingClientRect();
		const col = Math.floor(left / width) + 1;
		const row = Math.floor(top / height) + 1;
		elem.style.gridColumnStart = col.toString();
		elem.style.gridRowStart = row.toString();
	}, []);

	function handleDoubleClick () {
		if (onAppOpen) onAppOpen(url);
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
					<IconImage />
				</ImageContainer>
				<Name>{name}</Name>
			</VisualsContainer>
		</Root>
	);
}

export default Icon;