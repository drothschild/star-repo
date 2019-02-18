import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled  from 'styled-components';
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
                    url
                    viewerHasStarred
                    owner {
                        login
                        avatarUrl(size: 32)
                    }
                }
            }
        }
    }
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const SearchBox = styled.div`
    height: 4em;
    input {
        width: 100%;
        padding: 10px;
        border: 1px solid black;
        font-size: 1.5rem;
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
            <SearchBox>
                <input
                    id="search"
                    type="search"
                    aria-label="search-input"
                    defaultValue={queryString}
                    onChange={e => {
                        e.persist();
                        onChange(e);
                    }}
                />
            </SearchBox>
            <Query query={SEARCH_REPOS_QUERY} variables={{ queryString }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <Error error={error} />;
                    if (!data || data.search.nodes.length === 0)
                        return <h3>...</h3>;
                    return (
                        <List>
                            {data.search.nodes.map(repo => (
                                <Repo
                                    repo={repo}
                                    key={repo.id}
                                    queryString={queryString}
                                />
                            ))}
                        </List>
                    );
                }}
            </Query>
        </div>
    );
}

export default SearchRepos;

export { SEARCH_REPOS_QUERY };
