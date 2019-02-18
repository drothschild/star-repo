import casual from 'casual';

casual.seed(500);

const fakeOwner = {
    __typename: 'User',
    id: '123',
    login: 'fakeOwner',
    avatarUrl: 'http://www.example.com/avatar'
};

const fakeRepo = {
    __typename: 'Repository',
    id: '123',
    name: 'dog',
    url: 'http://www.example.com',
    viewerHasStarred: true,
    owner: fakeOwner
};

const fakeViewer = {
    __typename: 'User',
    id: casual.uuid,
    login: 'fakeViewer',
    avatarUrl: 'http://www.example.com/avatar',
    StarredRepositories: { nodes: [fakeRepo] }
};

export { fakeOwner, fakeRepo, fakeViewer };
