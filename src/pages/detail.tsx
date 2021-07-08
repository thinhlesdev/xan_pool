import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRepo, State } from '@store';
import { useRoute, Link } from 'react-router5';

const Detail: FunctionComponent = () => {
  const { userRepos, isLoading, error } = useSelector(
    (state: State) => state.app,
  );
  const dispatch = useDispatch();
  const route = useRoute();
  const { userName } = route.route.params;

  useEffect(() => {
    dispatch(getUserRepo(userName));
  }, []);

  if (isLoading) return <h1>Getting user repos...</h1>;
  if (error) return <h1>Error Getting User</h1>;
  if (!userRepos.length) return <h1>No Repo Found</h1>;

  return (
    <div>
      {userRepos.map((repo) => (
        <div key={repo.id}>
          <Link
            href="/"
            routeName="repo"
            routeParams={{ userName, repoName: repo.name }}
          >
            {repo.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Detail;
