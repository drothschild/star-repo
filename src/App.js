import React, { useState } from 'react';
import styled from 'styled-components';
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

const httpLink = createHttpLink({
    uri: GITHUB_GRAPHQL_END_POINT
});

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
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
            <Header />
            <ApolloProvider client={client}>
                <Auth setToken={setToken} token={token}>
                    <Columns>
                        <StarredReps />
                        <SearchRepos />
                    </Columns>
                </Auth>
            </ApolloProvider>
        </div>
    );
}

export default App;
