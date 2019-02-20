import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes, css } from 'styled-components';
import debounce from 'lodash.debounce';
import Repo from './Repo';
import Error from './Error';
import Loader from './Loader';

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

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchBox = styled.div`
    height: 4em;
    input {
        width: 100%;
        padding: 10px;
        border: 1px solid lightslategrey;
        font-size: 1.5rem;
        :focus {
            outline: none;
        }
        animation: ${props =>
            props.loading
                ? css`
                      ${glow} 0.5s ease-in-out infinite alternate
                  `
                : ''};
    }
`;

function SearchRepos() {
    const [queryString, setQueryString] = useState('');
    const [queryLoading, setQueryLoading] = useState(false);
    const onChange = debounce(e => {
        setQueryString(e.target.value);
    }, 350);

    return (
        <div>
            <h2>Search Repos</h2>
            <SearchBox loading={queryLoading}>
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
                    setQueryLoading(loading);
                    if (loading) return <Loader />;
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
