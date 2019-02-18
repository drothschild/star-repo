import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Repo from './Repo';
import Error from './Error';

const SEARCH_REPOS_QUERY = gql`
    query SEARCH_REPOS_QUERY($queryString: String!) {
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
    const [queryString, setQueryString] = useState('');

    // const context = useContext(QueryContext);
    const onChange = debounce(e => {
        setQueryString(e.target.value);
    }, 350);

    return (
        <div>
            <h2>Search Repos</h2>

            <input
                id="search"
                type="search"
                defaultValue={queryString}
                onChange={e => {
                    e.persist();
                    onChange(e);
                }}
            />
            <Query query={SEARCH_REPOS_QUERY} variables={{ queryString }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <Error error={error} />;
                    return (
                        <ul>
                            {data.search.nodes.map(repo => (
                                <Repo
                                    repo={repo}
                                    key={repo.id}
                                    queryString={queryString}
                                />
                            ))}
                        </ul>
                    );
                }}
            </Query>
        </div>
    );
}

export default SearchRepos;

export { SEARCH_REPOS_QUERY };
