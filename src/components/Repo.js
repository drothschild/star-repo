import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
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

function Repo({ repo, queryString }) {
    const correctMutation = repo.viewerHasStarred
        ? UNSTAR_MUTATION
        : STAR_MUTATION;
    return (
        <li>
            <Mutation
                mutation={correctMutation}
                variables={{ starrableId: repo.id }}
                refetchQueries={[
                    { query: VIEWER_QUERY },
                    {
                        query: SEARCH_REPOS_QUERY,
                        variables: { queryString: queryString }
                    }
                ]}
            >
                {(toggleStar, { error }) => {
                    if (error) return <Error error={error} />;
                    return (
                        <button onClick={toggleStar}>
                            <Star filled={repo.viewerHasStarred} />
                        </button>
                    );
                }}
            </Mutation>{' '}
            <img
                src={repo.owner.avatarUrl}
                alt={repo.owner.login}
                style={{ height: 32, width: 32 }}
            />{' '}
            {repo.name}
        </li>
    );
}

export default Repo;
