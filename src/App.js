import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Auth from './components/Auth';
import StarredReps from './components/StarredReps';
import { GITHUB_GRAPHQL_END_POINT } from './constants';
import SearchRepos from './components/SearchRepos';
import Header from './components/Header';
import Background from './components/Background.png';

const httpLink = createHttpLink({
    uri: GITHUB_GRAPHQL_END_POINT
});

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    width: 80%;
    max-width: 1200px;
    background-color: white;
    margin: 1rem 3rem 20%;
    padding: 3rem 3rem 5%;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.18);
    border-radius: 5px;
`;
const Main = styled.div`
    background-image: url(${Background});
    background-attachment: fixed;
    height: 100%;
    min-height: 1000px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
`;

const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
    font-size: 10px;
  }
  body {
    height: 100%;
    font-size: 1.5rem;
    line-height: 2;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

function App() {
    const [token, setToken] = useState('');
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <div>
            <GlobalStyle />
            <Header />
            <Main>
                <ApolloProvider client={client}>
                    <Auth setToken={setToken} token={token}>
                        <Columns>
                            <StarredReps />
                            <SearchRepos />
                        </Columns>
                    </Auth>
                </ApolloProvider>
            </Main>
        </div>
    );
}

export default App;
