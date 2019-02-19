import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Repo from './Repo';
import Error from './Error';
import Loader from './Loader';

const List = styled.ul`
    list-style: none;
    margin-top: 4rem;
    padding: 0;
`;
const VIEWER_QUERY = gql`
    query VIEWER_QUERY {
        viewer {
            login
            starredRepositories(first: 100) {
                nodes {
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

function StarredReps() {
    return (
        <Query query={VIEWER_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <Error error={error} />;
                return (
                    <div>
                        <h2>{data.viewer.login}'s Starred Repos</h2>

                        <List>
                            {data.viewer.starredRepositories.nodes.map(node => (
                                <Repo repo={node} key={node.id} />
                            ))}
                        </List>
                    </div>
                );
            }}
        </Query>
    );
}

export { VIEWER_QUERY };

export default StarredReps;
