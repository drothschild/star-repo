import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const VIEWER_QUERY = gql`
    query {
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
export default class StarredReps extends Component {
    render() {
        return (
            <Query query={VIEWER_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    console.log(data);
                    return (
                        <div>
                            <h2>{data.viewer.login}'s Starred Repos</h2>
                            <ul>
                                {data.viewer.starredRepositories.nodes.map(
                                    node => (
                                        <li key={node.id}>{node.name}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
