import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
    cleanup
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';
import lolex from 'lolex';
import SearchRepos, { SEARCH_REPOS_QUERY } from '../components/SearchRepos';
import { fakeRepo } from '../components/FakeItems';

afterEach(cleanup);
const mocks = [
    {
        request: {
            query: SEARCH_REPOS_QUERY,
            variables: {
                queryString: fakeRepo.name
            }
        },
        result: {
            data: {
                search: {
                    __typename: 'SearchResultItemConnection',
                    nodes: [fakeRepo]
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
    }
];

describe('<SearchRepos />', () => {
    it('searches for matching repos', async () => {
        let clock = lolex.install();
        const { getByTestId, getByLabelText } = render(
            <MockedProvider mocks={mocks} addTypename={true}>
                <SearchRepos />
            </MockedProvider>
        );
        const search = getByLabelText('search-input');
        fireEvent.change(search, {
            target: { value: fakeRepo.name }
        });

        clock.tick(360);
        const repoName = await waitForElement(() => getByTestId('name'));
        expect(repoName).toHaveTextContent(fakeRepo.name);
        clock.uninstall();
    });
});
