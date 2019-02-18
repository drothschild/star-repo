import React, { useState } from 'react';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Auth from './components/Auth';
import StarredReps from './components/StarredReps';
import { GITHUB_GRAPHQL_END_POINT } from './constants';
import SearchRepos from './components/SearchRepos';

const httpLink = createHttpLink({
    uri: GITHUB_GRAPHQL_END_POINT
});

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
    if (!token) return <Auth setToken={setToken} />;
    return (
        <ApolloProvider client={client}>
            <StarredReps />
            <SearchRepos />
        </ApolloProvider>
    );
}

export default App;
