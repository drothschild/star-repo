import React, { Component } from 'react';
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

export default class Auth extends Component {
    async componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        window.history.pushState('', '', window.location.origin);
        if (code) {
            const res = await axios.get(
                `${GITHUB_GET_AUTH}${urlParams.get('code')}`
            );
            const { token } = res.data;
            this.props.setToken(token);
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
