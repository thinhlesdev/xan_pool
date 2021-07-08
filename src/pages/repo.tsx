import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { getRepoFiles, State } from '@store';
import { useRoute } from 'react-router5';
import axios from 'axios';

const Repo: FunctionComponent = () => {
  const { repoFiles, isLoading, error } = useSelector(
    (state: State) => state.app,
  );
  const [readmeContent, seReadmeContent] = useState<string>();
  const dispatch = useDispatch();
  const route = useRoute();
  const { userName, repoName } = route.route.params;

  useEffect(() => {
    dispatch(getRepoFiles({ userName, repoName }));
  }, []);

  useEffect(() => {
    const readme = repoFiles.find((file) => file.name === 'README.md');

    if (readme) {
      axios.get(readme.download_url).then((response) => {
        seReadmeContent(response.data);
      });
    }
  }, [repoFiles.length]);

  if (isLoading) return <h1>Getting files...</h1>;
  if (error) return <h1>Error Getting Files</h1>;
  if (!repoFiles) return <h1>No File Found</h1>;

  return (
    <>
      <ul>
        {repoFiles.map((file) => (
          <li key={file.sha}>{file.name}</li>
        ))}
      </ul>
      {readmeContent ? (
        <>
          <h1>ReadMe:</h1>
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </>
      ) : (
        <h1>No ReadMe</h1>
      )}
    </>
  );
};

export default Repo;
