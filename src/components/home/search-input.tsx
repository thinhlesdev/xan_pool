import React, { FormEvent, FunctionComponent, useRef } from 'react';
import { searchUser, State } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'react-router5';

export const SearchSelect: FunctionComponent = () => {
  const { user } = useSelector(
    (state: State) => state.app,
  );
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSearchInput = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const searchValue = inputRef.current?.value;
    if (searchValue) dispatch(searchUser(searchValue));
  };

  if (user) {
    router.navigate('detail', { userName: inputRef.current?.value });
  }

  return (
    <form onSubmit={handleSearchInput}>
      <input type="text" ref={inputRef} />
      <button type="submit" placeholder="username">Search</button>
    </form>
  );
};
