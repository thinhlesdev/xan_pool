import { PayloadAction } from '@reduxjs/toolkit';
import {
  initialState,
  appReducer,
  searchUser,
  getUserRepo,
  getRepoFiles,
} from '@store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createApp } from '../../../src/create-app';

const mock = new MockAdapter(axios);

const store = createApp();

describe('App Slice', () => {
  describe('App Reducer', () => {
    test('should return initial state on first run', () => {
      const nextState = initialState;
      const action = {} as PayloadAction;
      const result = appReducer(undefined, action);

      expect(result).toEqual(nextState);
    });
  });

  describe('App Action', () => {
    beforeEach(() => {
      mock.reset();
    });

    test('should dispatch search user and return success state', async () => {
      const expectedResponse = {
        login: 'thinhlesdev',
        id: 54348153,
        node_id: 'MDQ6VXNlcjU0MzQ4MTUz',
        type: 'User',
        name: 'Ryan',
        company: '@as24ch',
        location: 'Ho Chi Minh, Vietnam',
        email: null,
        created_at: '2019-08-21T06:28:06Z',
        updated_at: '2021-07-08T06:46:09Z',
      };

      mock
        .onGet('https://api.github.com/users/thinhlesdev')
        .replyOnce(200, expectedResponse);

      expect(store.getState().app.isSearching).toBeFalsy();

      const promise = store.dispatch(searchUser('thinhlesdev'));

      expect(store.getState().app.isSearching).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeFalsy();
      expect(store.getState().app.user).toEqual(expectedResponse);
    });

    test('should dispatch search user and return error state', async () => {
      mock.onGet('/users/thinhlesdev').networkErrorOnce();

      const promise = store.dispatch(searchUser('thinhlesdev'));

      expect(store.getState().app.isSearching).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeTruthy();
    });

    test('should dispatch getUserRepo and return success state', async () => {
      const expectedResponse = [
        {
          id: 376698950,
          node_id: 'MDEwOlJlcG9zaXRvcnkzNzY2OTg5NTA=',
          name: 'apollo-graphql-full-stack',
          full_name: 'thinhlesdev/apollo-graphql-full-stack',
          private: false,
        },
      ];

      mock.onGet('/users/thinhlesdev/repos').replyOnce(200, expectedResponse);

      expect(store.getState().app.isLoading).toBeFalsy();

      const promise = store.dispatch(getUserRepo('thinhlesdev'));

      expect(store.getState().app.isLoading).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeFalsy();
      expect(store.getState().app.userRepos).toEqual(expectedResponse);
    });

    test('should dispatch get getUserRepo and return error state', async () => {
      mock.onGet('/users/thinhlesdev/repos').networkErrorOnce();

      const promise = store.dispatch(getUserRepo('thinhlesdev'));

      expect(store.getState().app.isLoading).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeTruthy();
    });

    test('should dispatch getRepoFiles and return success state', async () => {
      const expectedResponse = [
        {
          name: '.DS_Store',
          path: '.DS_Store',
          sha: '5008ddfcf53c02e82d7eee2e57c38e5672ef89f6',
        },
      ];

      mock
        .onGet('/repos/thinhlesdev/web-component-experiment/contents')
        .replyOnce(200, expectedResponse);

      expect(store.getState().app.isLoading).toBeFalsy();

      const promise = store.dispatch(
        getRepoFiles({
          userName: 'thinhlesdev',
          repoName: 'web-component-experiment',
        }),
      );

      expect(store.getState().app.isLoading).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeFalsy();
      expect(store.getState().app.repoFiles).toEqual(expectedResponse);
    });

    test('should dispatch get getRepoFiles and return error state', async () => {
      mock
        .onGet('/repos/thinhlesdev/web-component-experiment/contents')
        .networkErrorOnce();

      const promise = store.dispatch(
        getRepoFiles({
          userName: 'thinhlesdev',
          repoName: 'web-component-experiment',
        }),
      );

      expect(store.getState().app.isLoading).toBeTruthy();

      await Promise.resolve(promise);

      expect(store.getState().app.error).toBeTruthy();
    });
  });
});
