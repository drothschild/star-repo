import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Repo from './Repo';
import Error from './Error';

const VIEWER_QUERY = gql`
    query VIEWER_QUERY {
        viewer {
            login
            starredRepositories(first: 100) {
                nodes {
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

function StarredReps() {
    return (
        <Query query={VIEWER_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Error error={error} />;
                return (
                    <div>
                        <h2>{data.viewer.login}'s Starred Repos</h2>
                        <ul>
                            {data.viewer.starredRepositories.nodes.map(node => (
                                <Repo repo={node} key={node.id} />
                            ))}
                        </ul>
                    </div>
                );
            }}
        </Query>
    );
}

export { VIEWER_QUERY };

export default StarredReps;
