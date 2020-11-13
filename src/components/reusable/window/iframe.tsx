import React from 'react';
import styled from 'styled-components';

import Window from './base';

const IFrame = styled.iframe`
	width: 100%;
	height: 100%;
	user-drag: none;
	user-select: none;
`;

type IFrameWindowProps = React.PropsWithoutRef<{
	url: string,
	onClose: () => void,
}>;

type IFrameWindowComponent = React.FunctionComponent<IFrameWindowProps>;

const IFrameWindow: IFrameWindowComponent = ({ onClose, url }) => {
	return (
		<Window onClose={onClose}>
			<IFrame src={url} />
		</Window>
	);
}

export default IFrameWindow;