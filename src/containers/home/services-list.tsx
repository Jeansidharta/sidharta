import React from 'react';
import styled from 'styled-components';

import { Description, Subtitle, Title, PageRoot } from './components';

const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Link = styled.a`
	color: ${props => props.theme.colors.primary.main};
	text-decoration: none;
`;

const ServicesList = () => {
	return (
		<PageRoot>
			<Title>Services list</Title>
			<Description>
				Here are some links to all of my services being hosted here:
			</Description>
			<LinksContainer>
				<Link href="https://dns-manager.sidharta.xyz/admin/">DNS manager</Link>
			</LinksContainer>
		</PageRoot>
	);
}

export default ServicesList;