import React from 'react';
import styled from 'styled-components';

import Window from './base';
import IconsContainer from '../icons-container';
import { AnyProgramArgs } from '../../../models/program';

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

type FolderWindowProps = React.PropsWithoutRef<{
	iconChildren: AnyProgramArgs[],
	onClose: () => void,
	onIconOpen: (icon: any) => void,
}>;

type FolderWindowComponent = React.FunctionComponent<FolderWindowProps>;

const FolderWindow: FolderWindowComponent = ({ onClose, onIconOpen, iconChildren }) => {
	return (
		<Window onClose={onClose}>
			<Root>
				<IconsContainer
					programsArgs={iconChildren}
					onIconOpen={onIconOpen}
				/>
			</Root>
		</Window>
	);
}

export default FolderWindow;