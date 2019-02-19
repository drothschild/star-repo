import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GitLogo from './GitHub-Mark-Light-32px.png';
import { useSpring, animated } from 'react-spring';
import Loader from './Loader';

import { GITHUB_GET_CODE, GITHUB_GET_AUTH } from '../constants';

const link = `${GITHUB_GET_CODE}${process.env.REACT_APP_CLIENT_ID}`;

const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1
];
const trans = (x, y, s) => `scale(${s})`;

const Button = styled(animated.button)`
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 2rem;
    padding: 0 1em;
    border: 1px;
    border-color: #2a65a0;
    color: #fff;
    background: linear-gradient(#3072b3, #599bdc);
    border-radius: 5px;
    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.2);
    margin: 0;
    text-align: center;
    cursor: ${props => (props.disabled ? 'none' : 'pointer')};
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
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 }
    }));

    useEffect(() => {
        if (window.location.search) {
            setLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) _getToken(code);
        }
        return () => {
            setLoading(false);
        };
    });

    const _getToken = async code => {
        const res = await axios.get(`${GITHUB_GET_AUTH}${code}`);
        window.history.pushState('', '', window.location.origin);
        const { token } = res.data;
        setToken(token);
        setLoading(false);
    };
    if (loading)
        return (
            <CenterDiv>
                <Loader />
            </CenterDiv>
        );
    return (
        <CenterDiv>
            <Button
                disabled={loading}
                onClick={() => {
                    window.location.replace(link);
                }}
                onMouseMove={({ clientX: x, clientY: y }) =>
                    set({ xys: calc(x, y) })
                }
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.interpolate(trans) }}
            >
                <img src={GitLogo} alt="Github Logo" /> Authenticate with Github
            </Button>
        </CenterDiv>
    );
}

export default Auth;
