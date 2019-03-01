import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Star from './Star';
import { VIEWER_QUERY } from './StarredReps';
import { SEARCH_REPOS_QUERY } from './SearchRepos';
import Error from './Error';

const UNSTAR_MUTATION = gql`
    mutation UNSTAR_MUTATION($starrableId: ID!) {
        removeStar(input: { starrableId: $starrableId }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;
const STAR_MUTATION = gql`
    mutation STAR_MUTATION($starrableId: ID!) {
        addStar(input: { starrableId: $starrableId }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
`;

const TransparentButton = styled.button`
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;

    div {
        display: flex;
        align-items: center;
    }
`;

function Repo({ repo, queryString }) {
    const correctMutation = repo.viewerHasStarred
        ? UNSTAR_MUTATION
        : STAR_MUTATION;
    return (
        <Item>
            <Mutation
                mutation={correctMutation}
                variables={{ starrableId: repo.id }}
                refetchQueries={[
                    { query: VIEWER_QUERY },
                    {
                        query: SEARCH_REPOS_QUERY,
                        variables: {
                            queryString: queryString ? queryString : ''
                        }
                    }
                ]} awaitRefetchQueries= {true}
            >
                {(toggleStar, { loading, error, data }) => {
                    if (error) return <Error error={error} />;
                    let starred = repo.viewerHasStarred;
                    if (data) {
                        starred = data.removeStar ? false : true;
                    }
                    return (
                        <TransparentButton
                            onClick={toggleStar}
                            disabled={loading}
                            aria-label="star-button"
                        >
                            <div>
                                <Star filled={starred} loading={loading} />
                            </div>
                        </TransparentButton>
                    );
                }}
            </Mutation>
            <img
                src={repo.owner.avatarUrl}
                alt={repo.owner.login}
                style={{ height: 32, width: 32 }}
                data-testid="owner-avatar"
            />
            <a href={repo.url} data-testid="name">
                {repo.name}
            </a>
        </Item>
    );
}

export default Repo;

export { UNSTAR_MUTATION, STAR_MUTATION };
