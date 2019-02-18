import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GitLogo from './GitHub-Mark-Light-32px.png';
import { GITHUB_GET_CODE, GITHUB_GET_AUTH } from '../constants';

const link = `${GITHUB_GET_CODE}${process.env.REACT_APP_CLIENT_ID}`;

const Button = styled.button`
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 2rem;
    padding: 0 1em;
    border: 1px;
    border-color: #2a65a0;
    color: #fff;
    background: linear-gradient(#3072b3, #599bdc);
    border-radius: 2px;
    margin: 0;
    text-align: center;
    cursor: pointer;
`;

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 12rem;
`;

function Auth({ setToken }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (window.location.search) {
            setLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            window.history.pushState('', '', window.location.origin);
            if (code) _getToken(code);
        }
        return () => {
            setLoading(false);
        };
    });

    const _getToken = async code => {
        const res = await axios.get(`${GITHUB_GET_AUTH}${code}`);
        const { token } = res.data;
        setToken(token);
        setLoading(false);
    };
    if (loading) return <div>Loading...</div>;
    return (
        <CenterDiv>
            <Button
                onClick={() => {
                    window.location.replace(link);
                }}
            >
                <img src={GitLogo} alt="Github Logo" /> Authenticate with Github
            </Button>
        </CenterDiv>
    );
}

export default Auth;
