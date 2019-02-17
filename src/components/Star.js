import React from 'react';
import styled from 'styled-components';

const FilledStar = styled.svg`
    fill: ${props => (props.filled ? 'yellow' : 'none')};
    width: 36px;
    height: 36px;
`;
function Star(filled) {
    return (
        <FilledStar
            filled={filled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
        >
            <path
                stroke="black"
                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            />
        </FilledStar>
    );
}
export default Star;
