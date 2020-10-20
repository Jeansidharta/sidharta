import React from 'react';
import styled from 'styled-components';

import { PageRoot } from './components';

const Root = styled(PageRoot)`
	justify-content: center;
`;

const Title = styled.h1`
	font-size: 80px;
	color: ${props => props.theme.colors.gray.darker};
`;

type HeroTextProps = React.PropsWithoutRef<{
}>;

type HeroTextComponent = React.FunctionComponent<HeroTextProps>;

const HeroText: HeroTextComponent = ({  }) => {
	return (
		<Root maxHeight>
			<Title>Welcome!</Title>
		</Root>
	);
}

export default HeroText;