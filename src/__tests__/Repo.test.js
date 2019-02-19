import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
    cleanup
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';
import Repo, { UNSTAR_MUTATION, STAR_MUTATION } from '../components/Repo';
import { SEARCH_REPOS_QUERY } from '../components/SearchRepos';
import { VIEWER_QUERY } from '../components/StarredReps';
import { fakeRepo } from '../components/FakeItems';

afterEach(cleanup);
const mocks = [
    {
        request: {
            query: UNSTAR_MUTATION,
            variables: {
                starrableId: fakeRepo.id
            }
        },
        result: {
            data: {
                removeStar: {
                    starrable: {
                        ...fakeRepo,
                        viewerHasStarred: false,
                        __typename: 'Repository'
                    },
                    __typename: 'RemoveStarPayload'
                }
            }
        }
    },
    {
        request: {
            query: STAR_MUTATION,
            variables: {
                starrableId: fakeRepo.id
            }
        },
        result: {
            data: {
                addStar: {
                    __typename: 'AddStarPayload',
                    starrable: {
                        ...fakeRepo,
                        viewerHasStarred: true,
                        __typename: 'Repository'
                    }
                }
            }
        }
    },
    {
        request: {
            query: SEARCH_REPOS_QUERY,
            variables: {
                queryString: ''
            }
        },
        result: {
            data: {
                search: {
                    __typename: 'SearchResultItemConnection',
                    nodes: []
                }
            }
        }
    },
    {
        request: {
            query: VIEWER_QUERY
        },
        result: {
            data: {
                viewer: {
                    login: '',
                    __typename: 'SearchResultItemConnection',
                    starredRepositories: []
                }
            }
        }
    }
];

describe('<Repo />', () => {


    it('can be unstarred', async () => {
        const { getByLabelText, getByTitle } = render(
            <MockedProvider mocks={mocks} addTypename={true}>
                <Repo repo={{ ...fakeRepo, viewerHasStarred: true }} />
            </MockedProvider>
        );
        const starButton = getByLabelText('star-button');
        fireEvent.click(starButton);
        await waitForElement(() => getByTitle('Unstarred'));
    });

    it('can be starred', async () => {
        const { getByLabelText, getByTitle } = render(
            <MockedProvider mocks={mocks} addTypename={true}>
                <Repo repo={{ ...fakeRepo, viewerHasStarred: false }} />
            </MockedProvider>
        );
        const starButton = getByLabelText('star-button');

        fireEvent.click(starButton);
        await waitForElement(() => getByTitle('Starred'));
    });

    it('loads data', () => {
        const { getByTestId, getByAltText } = render(
            <MockedProvider mocks={mocks} addTypename={true}>
                <Repo repo={fakeRepo} />
            </MockedProvider>
        );
        const repoName = getByTestId('name');
        getByAltText(fakeRepo.owner.login);
        expect(repoName.textContent).toBe(fakeRepo.name);
    });
});
