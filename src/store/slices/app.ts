import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@store';
import { TFile, TRepo, TUser } from '@types';

type THomeState = {
  isSearching: boolean;
  isLoading: boolean;
  error: boolean;
  user?: TUser;
  repoFiles: TFile[];
  userRepos: TRepo[];
};

export const initialState: THomeState = {
  isSearching: false,
  isLoading: false,
  error: false,
  userRepos: [],
  user: undefined,
  repoFiles: [],
};

export const searchUser = createAsyncThunk<
{ data: TUser },
string,
ThunkApiConfig
>('home/searchUser', (payload, { extra: { api } }) => api.get.search(payload));

export const getUserRepo = createAsyncThunk<
{ data: TRepo[] },
string,
ThunkApiConfig
>('home/getUserRepo', (payload, { extra: { api } }) =>
  api.get.userRepos(payload));

export const getRepoFiles = createAsyncThunk<
{ data: TFile[] },
{ userName: string; repoName: string },
ThunkApiConfig
>('home/getRepoFiles', (payload, { extra: { api } }) =>
  api.get.repoFiles(payload));

export const { reducer: appReducer } = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUser.pending, (state) => {
      state.isSearching = true;
    });
    builder.addCase(searchUser.rejected, (state) => {
      state.error = true;
      state.isSearching = false;
    });
    builder.addCase(searchUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.error = false;
      state.isSearching = false;
    });
    builder.addCase(getUserRepo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserRepo.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(getUserRepo.fulfilled, (state, { payload }) => {
      state.userRepos = payload.data;
      state.error = false;
      state.isLoading = false;
    });
    builder.addCase(getRepoFiles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRepoFiles.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(getRepoFiles.fulfilled, (state, { payload }) => {
      state.repoFiles = payload.data;
      state.error = false;
      state.isLoading = false;
    });
  },
});
