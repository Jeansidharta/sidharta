import React from 'react';
import styled from 'styled-components';

import Window from './base';
import IconsContainer from '../icons-container';
import { AnyProgramArgs } from '../../../models/program';
import FloatIconButton from '../float-icon-button';
import Images from '../../../constants/images';

const Root = styled.div`
	width: 100%;
	height: 100%;
`;

const FolderHeader = styled.div`
	padding: 8px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const BackButton = styled(FloatIconButton)`
	width: 24px;
	height: 24px;
`;

type FolderWindowProps = React.PropsWithoutRef<{
	iconChildren: AnyProgramArgs[],
	onClose: () => void,
	onIconOpen: (icon: any) => void,
}>;

type FolderWindowComponent = React.FunctionComponent<FolderWindowProps>;

const FolderWindow: FolderWindowComponent = ({ onClose, onIconOpen, iconChildren }) => {
	const [iconChildrenChain, setIconChildrenChain] = React.useState<AnyProgramArgs[][]>([iconChildren]);

	function handleIconOpen (args: AnyProgramArgs) {
		if (args.programType === 'folder') {
			setIconChildrenChain([ ...iconChildrenChain, args.childIcons]);
		} else {
			onIconOpen(args);
		}
	}

	function handeBackClick () {
		if (iconChildrenChain.length > 1) {
			const dup = [...iconChildrenChain];
			dup.pop();
			setIconChildrenChain(dup);
		}
	}

	return (
		<Window onClose={onClose}>
			<Root>
				<FolderHeader>
					<BackButton onClick={handeBackClick} imageElem={<Images.backArrow />}  />
				</FolderHeader>
				<IconsContainer
					programsArgs={iconChildrenChain[iconChildrenChain.length - 1]}
					onIconOpen={handleIconOpen}
				/>
			</Root>
		</Window>
	);
}

export default FolderWindow;