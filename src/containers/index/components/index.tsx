import styled from 'styled-components';

export const PageRoot = styled.div<{ maxHeight?: boolean }>`
	padding: 4rem 1rem;
	background-color: ${props => props.theme.colors.gray.light};
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 20px;
	${props => props.maxHeight ? `min-height: 100vh;` : ``}
`;

export const Subtitle = styled.h3<{ warning?: boolean }>`
	color: ${props => props.warning ? props.theme.colors.error.main : ''};
`;

export const Title = styled.h2`
	text-align: center;
`;

export const Description = styled.p`
	max-width: 800px;
	text-align: justify;
`;