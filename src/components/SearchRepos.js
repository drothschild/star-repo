import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Repo from './Repo';
import Error from './Error';

const SEARCH_REPOS = gql`
    query SEARCH_REPOS($queryString: String!) {
        search(query: $queryString, first: 30, type: REPOSITORY) {
            nodes {
                ... on Repository {
                    id
                    name
                    viewerHasStarred
                    createdAt
                    owner {
                        login
                        avatarUrl(size: 32)
                    }
                }
            }
        }
    }
`;
function SearchRepos() {
    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState([]);

    const onChange = debounce(async (e, client) => {
        console.log(e.target.value);
        setLoading(true);
        const res = await client.query({
            query: SEARCH_REPOS,
            variables: { queryString: e.target.value }
        });
        setLoading(false);
        console.log(res);
        setRepos(res.data.search.nodes);
    }, 350);

    return (
        <div>
            <h2>Search Repos</h2>
            <ApolloConsumer>
                {client => (
                    <input
                        id="search"
                        type="search"
                        onChange={e => {
                            e.persist();
                            onChange(e, client);
                        }}
                    />
                )}
            </ApolloConsumer>
            {!loading & '<div>Loading...</div>'}
            <ul>
                {repos.map(repo => (
                    <Repo repo={repo} key={repo.id} />
                ))}
            </ul>
        </div>
    );
}

export default SearchRepos;
