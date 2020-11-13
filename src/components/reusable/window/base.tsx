import React from 'react';
import styled from 'styled-components';
import { MouseDragEvent, useMouseDrag } from '../../../libs/useMouseDrag';

const Root = styled.div`
	position: absolute;
	border: 1px solid white;
	box-shadow: 0px 0px 0px 1px black;
	width: max-content;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	padding: 8px;
	display: flex;
	flex-direction: row-reverse;
	background-color: white;
	cursor: pointer;
	user-select: none;
`;

const CloseButton = styled.button`
`;

const InnerWindow = styled.div`
	background-color: white;
	width: 100%;
	height: 100%;
	user-select: none;
	border: 1px solid black;
	overflow: hidden;
`;

const RESIZE_INTERFACE_SIZE = 10;

const ResizeButton = styled.div<{ corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }>`
	position: absolute;
	width: ${RESIZE_INTERFACE_SIZE}px;
	height: ${RESIZE_INTERFACE_SIZE}px;

	${props => (
		props.corner === 'top-left' ? `left: 0; top: 0; cursor: nw-resize; transform: translate(-50%, -50%);` :
		props.corner === 'top-right' ? `right: 0; top: 0; cursor: ne-resize; transform: translate(50%, -50%);` :
		props.corner === 'bottom-left' ? `left: 0; bottom: 0; cursor: ne-resize; transform: translate(-50%, 50%);` :
		props.corner === 'bottom-right' ? `right: 0; bottom: 0; cursor: nw-resize; transform: translate(50%, 50%);` :
		''
	 )}
`;

const ResizeSide = styled.div<{ side: 'top' | 'left' | 'right' | 'bottom' }>`
	position: absolute;
	width: ${RESIZE_INTERFACE_SIZE}px;
	height: ${RESIZE_INTERFACE_SIZE}px;

	${props => (
		props.side === 'top' ? `width: calc(100% - ${RESIZE_INTERFACE_SIZE}px); top: 0; left: 50%; cursor: n-resize; transform: translate(-50%, -50%);` :
		props.side === 'left' ? `height: calc(100% - ${RESIZE_INTERFACE_SIZE}px); top: 50%; left: 0; cursor: w-resize; transform: translate(-50%, -50%);` :
		props.side === 'right' ? `height: calc(100% - ${RESIZE_INTERFACE_SIZE}px); top: 50%; right: 0; cursor: e-resize; transform: translate(50%, -50%);` :
		props.side === 'bottom' ? `width: calc(100% - ${RESIZE_INTERFACE_SIZE}px); bottom: 0; left: 50%; cursor: s-resize; transform: translate(-50%, 50%);` :
		''
	 )}
`;

type WindowProps = React.PropsWithChildren<{
	onClose?: () => void,
}>;

type WindowComponent = React.FunctionComponent<WindowProps>;

type Coords = { x: number, y: number };

const Window: WindowComponent = ({
	children,
	onClose,
}) => {
	const sizeRef = React.useRef<Coords>({ x: 400, y: 300 });
	const positionRef = React.useRef<Coords>({
		x: window.innerWidth / 2 - sizeRef.current.x / 2,
		y: window.innerHeight / 2 - sizeRef.current.y / 2,
	});

	const headerRef = React.useRef<HTMLDivElement | null>(null);
	const rootRef = React.useRef<HTMLDivElement | null>(null);
	useMouseDrag(headerRef, { onDrag: handleDrag });

	// Diagonal resizers
	const TopLeftResizerRef = React.useRef<HTMLDivElement | null>(null);
	const TopRightResizerRef = React.useRef<HTMLDivElement | null>(null);
	const BottomLeftResizerRef = React.useRef<HTMLDivElement | null>(null);
	const BottomRightResizerRef = React.useRef<HTMLDivElement | null>(null);
	useMouseDrag(TopLeftResizerRef, { onDrag: handleDragTopLeft });
	useMouseDrag(TopRightResizerRef, { onDrag: handleDragTopRight });
	useMouseDrag(BottomRightResizerRef, { onDrag: handleDragBottomRight });
	useMouseDrag(BottomLeftResizerRef, { onDrag: handleDragBottomLeft });

	// resizers
	const TopResizerRef = React.useRef<HTMLDivElement | null>(null);
	const BottomResizerRef = React.useRef<HTMLDivElement | null>(null);
	const LeftResizerRef = React.useRef<HTMLDivElement | null>(null);
	const RightResizerRef = React.useRef<HTMLDivElement | null>(null);
	useMouseDrag(TopResizerRef, { onDrag: handleDragTop });
	useMouseDrag(BottomResizerRef, { onDrag: handleDragTBottom });
	useMouseDrag(LeftResizerRef, { onDrag: handleDragBottLeft });
	useMouseDrag(RightResizerRef, { onDrag: handleDragBotRight });

	// Resizer handlers
	function handleDragTop (event: MouseDragEvent) {
		sizeRef.current.y -= event.deltaMousePosition.y;
		positionRef.current.y += event.deltaMousePosition.y;
		updateWindowSize();
		updateWindowPosition();
	}
	function handleDragTBottom (event: MouseDragEvent) {
		sizeRef.current.y += event.deltaMousePosition.y;
		updateWindowSize();
	}
	function handleDragBottLeft (event: MouseDragEvent) {
		sizeRef.current.x -= event.deltaMousePosition.x;
		positionRef.current.x += event.deltaMousePosition.x;
		updateWindowSize();
		updateWindowPosition();
	}
	function handleDragBotRight (event: MouseDragEvent) {
		sizeRef.current.x += event.deltaMousePosition.x;
		updateWindowSize();
	}

	// Diagonal resizer handlers
	function handleDragTopLeft (event: MouseDragEvent) {
		sizeRef.current.x -= event.deltaMousePosition.x;
		sizeRef.current.y -= event.deltaMousePosition.y;
		positionRef.current.x += event.deltaMousePosition.x;
		positionRef.current.y += event.deltaMousePosition.y;
		updateWindowSize();
		updateWindowPosition();
	}
	function handleDragTopRight (event: MouseDragEvent) {
		sizeRef.current.x += event.deltaMousePosition.x;
		sizeRef.current.y -= event.deltaMousePosition.y;
		positionRef.current.y += event.deltaMousePosition.y;
		updateWindowSize();
		updateWindowPosition();
	}
	function handleDragBottomRight (event: MouseDragEvent) {
		sizeRef.current.x += event.deltaMousePosition.x;
		sizeRef.current.y += event.deltaMousePosition.y;
		updateWindowSize();
	}
	function handleDragBottomLeft (event: MouseDragEvent) {
		sizeRef.current.x -= event.deltaMousePosition.x;
		sizeRef.current.y += event.deltaMousePosition.y;
		positionRef.current.x += event.deltaMousePosition.x;
		updateWindowSize();
		updateWindowPosition();
	}

	function updateWindowPosition () {
		const rootElem = rootRef.current;
		if (!rootElem) throw new Error('Trying to drag null element');
		const { style } = rootElem;
		style.left = positionRef.current.x + 'px';
		style.top = positionRef.current.y + 'px';
	}

	function updateWindowSize () {
		const rootElem = rootRef.current;
		if (!rootElem) throw new Error('Trying to drag null element');
		const { style } = rootElem;
		style.width = sizeRef.current.x + 'px';
		style.height = sizeRef.current.y + 'px';
	}

	function handleDrag (event: MouseDragEvent) {
		const { deltaMousePosition } = event;
		const newX = positionRef.current.x + deltaMousePosition.x;
		const newY = positionRef.current.y + deltaMousePosition.y;
		positionRef.current = {x: newX, y: newY};
		updateWindowPosition();
	}

	React.useEffect(() => {
		updateWindowPosition();
		updateWindowSize();
	}, []);

	return (
		<Root ref={rootRef}>
			<Header ref={headerRef}>
				<CloseButton onClick={onClose}>X</CloseButton>
			</Header>
			<InnerWindow>{children}</InnerWindow>
			<ResizeButton ref={TopRightResizerRef} corner="top-right" />
			<ResizeButton ref={TopLeftResizerRef} corner="top-left" />
			<ResizeButton ref={BottomLeftResizerRef} corner="bottom-left" />
			<ResizeButton ref={BottomRightResizerRef} corner="bottom-right" />
			<ResizeSide ref={TopResizerRef} side="top" />
			<ResizeSide ref={BottomResizerRef} side="bottom" />
			<ResizeSide ref={LeftResizerRef} side="left" />
			<ResizeSide ref={RightResizerRef} side="right" />
		</Root>
	);
}

export default Window;