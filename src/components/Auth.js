import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GitLogo from './GitHub-Mark-Light-32px.png';

const link = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${
    process.env.REACT_APP_CLIENT_ID
}`;

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

export default class Auth extends Component {
    async componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('code')) {
            const res = await axios.get(
                `https://gatekeeper-github-david.herokuapp.com/authenticate/${urlParams.get(
                    'code'
                )}`
            );
            const { token } = res.data;
        }
    }
    render() {
        return (
            <Button
                onClick={() => {
                    window.location.replace(link);
                }}
            >
                <img src={GitLogo} alt="Github Logo" /> Authenticate with Github
            </Button>
        );
    }
}
