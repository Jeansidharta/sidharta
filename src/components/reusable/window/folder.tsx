import React from 'react';
import Window from './base';
import IconsContainer from '../icons-container';
import { AnyProgramArgs } from '../../../models/program';

type FolderWindowProps = React.PropsWithoutRef<{
	iconChildren: AnyProgramArgs[],
	onClose: () => void,
	onIconOpen: (icon: any) => void,
}>;

type FolderWindowComponent = React.FunctionComponent<FolderWindowProps>;

const FolderWindow: FolderWindowComponent = ({ onClose, onIconOpen, iconChildren }) => {
	return (
		<Window onClose={onClose}>
			<IconsContainer
				programsArgs={iconChildren}
				onIconOpen={onIconOpen}
			/>
		</Window>
	);
}

export default FolderWindow;