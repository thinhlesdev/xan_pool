import { TFile, TRepo, TUser } from '@types';
import { AxiosInstance } from 'axios';

export const createApi = (client: AxiosInstance) => ({
  get: {
    search: (userName: string) => client.get<TUser>(`users/${userName}`),
    userRepos: (userName: string) =>
      client.get<TRepo[]>(`/users/${userName}/repos`),
    repoFiles: ({
      userName,
      repoName,
    }: {
      userName: string;
      repoName: string;
    }) => client.get<TFile[]>(`/repos/${userName}/${repoName}/contents`),
  },
});

export type Api = ReturnType<typeof createApi>;
