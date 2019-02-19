import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const glitter = keyframes`
  	0% { transform: scale(1.0); opacity: 1; }
	25% { transform: scale(0.5); opacity: 0; }
	50% { transform: scale(1.0); opacity: 1; }
	75% { transform: scale(0.5); opacity: 0; }
	100% { transform: scale(1.0); opacity: 1; }
}
`;

const FilledStar = styled.svg`
    fill: ${props => (props.filled ? 'gold' : 'white')};
    animation: ${props =>
        props.loading
            ? css`
                  ${glitter} 4.5s  infinite
              `
            : ''};
`;
function Star({ filled, loading }) {
    return (
        <FilledStar
            filled={filled}
            loading={loading}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 51 48"
            title={filled ? 'Starred' : 'Unstarred'}
        >
            <path
                stroke="black"
                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            />
        </FilledStar>
    );
}
export default Star;
