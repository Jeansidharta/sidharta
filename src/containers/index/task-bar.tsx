import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	width: 100%;
	height: 50px;
	background-color: rgba(100, 100, 100, 0.7);
`;

type TaskBarProps = React.PropsWithoutRef<{
}>;

type TaskBarComponent = React.FunctionComponent<TaskBarProps>;

const TaskBar: TaskBarComponent = ({  }) => {
	return (
		<Root>
		</Root>
	);
}

export default TaskBar;