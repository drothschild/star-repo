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
            clientMutationId
        }
    }
`;
const STAR_MUTATION = gql`
    mutation STAR_MUTATION($starrableId: ID!) {
        addStar(input: { starrableId: $starrableId }) {
            clientMutationId
        }
    }
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem;
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
                ]}
            >
                {(toggleStar, { loading, error }) => {
                    if (loading) return <Star />;
                    if (error) return <Error error={error} />;
                    return (
                        <TransparentButton onClick={toggleStar}>
                            <div>
                                <Star filled={repo.viewerHasStarred} />
                            </div>
                        </TransparentButton>
                    );
                }}
            </Mutation>
            <img
                src={repo.owner.avatarUrl}
                alt={repo.owner.login}
                style={{ height: 32, width: 32 }}
            />
            <a href={repo.url}>{repo.name}</a>
        </Item>
    );
}

export default Repo;
