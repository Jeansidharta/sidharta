import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useGetResource } from '../../../libs/useGetResource';
import Spinner from '../spinner';
import Window from './base';

const Root = styled.div`
	overflow: auto;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const MarkdownContainer = styled.div`
	padding: 1rem;
	max-width: 600px;
	height: 100%;
`;

type MarkdownFileWindowProps = React.PropsWithoutRef<{
	onClose: () => void;
	markdownURL: string;
}>;

type MarkdownFileWindowComponent = React.FunctionComponent<MarkdownFileWindowProps>;

const MarkdownFileWindow: MarkdownFileWindowComponent = ({ onClose, markdownURL }) => {
	const { isLoading, data, error } = useGetResource(markdownURL);

	let content: React.ReactNode;

	if (isLoading) {
		content = <Spinner />;
	} else if (error) {
		content = <p>And error occurred: {error.message}</p>;
	} else if (!data) {
		content = <p>Could not find any data.</p>;
	}

	return (
		<Window onClose={onClose}>
			<Root>
				<MarkdownContainer>
					{ data ? <ReactMarkdown>{data}</ReactMarkdown> : content}
				</MarkdownContainer>
			</Root>
		</Window>
	);
}

export default MarkdownFileWindow;