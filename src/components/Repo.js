import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Star from './Star';
import { VIEWER_QUERY } from './StarredReps';
import Error from './Error';
const UNSTAR_MUTATION = gql`
    mutation UNSTAR_MUTATION($starrableId: ID!) {
        removeStar(input: { starrableId: $starrableId }) {
            clientMutationId
        }
    }
`;

const Repo = ({ repo }) => {
    return (
        <li>
            <Mutation
                mutation={UNSTAR_MUTATION}
                variables={{ starrableId: repo.id }}
                refetchQueries={[{ query: VIEWER_QUERY }]}
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
            <img src={repo.owner.avatarUrl} alt={repo.owner.login} />{' '}
            {repo.name}
        </li>
    );
};

export default Repo;
