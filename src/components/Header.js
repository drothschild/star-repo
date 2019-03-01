import React from 'react';
import styled from 'styled-components';

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    color: white;
`;

const StyledHeader = styled.div`
    background-color: #bd8c7d;
    border-bottom: 5px solid #49494b;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Logo>Star Repo</Logo>
        </StyledHeader>
    );
}
