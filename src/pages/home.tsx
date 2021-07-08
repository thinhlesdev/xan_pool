import React, { FunctionComponent } from 'react';
import { State } from '@store';
import { useSelector } from 'react-redux';
import { SearchSelect } from '@components';
import './styles/home.scss';

const Home: FunctionComponent = () => {
  const { isSearching, error } = useSelector(
    (state: State) => state.app,
  );

  return (
    <div className="page-home">
      <SearchSelect />
      {isSearching && <h1 className="loading-title">Getting user...</h1>}
      {error && <h1>User not found</h1>}
    </div>
  );
};
export default Home;
