import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Star from './Star';
import { VIEWER_QUERY } from './StarredReps';
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
                {(toggleStar, { loading, error, data }) => {
                    if (data) console.log(data);
                    if (loading) return <div>Loading...</div>;
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
