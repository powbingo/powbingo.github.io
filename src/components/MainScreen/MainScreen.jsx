import React from 'react';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import Board from '../Board/Board';
import UploadScreenshot from '../UploadScreenshot/UploadScreenshot';

export default function MainScreen() {
  const activePage = useSelector(state => state.settings.activePage);

  console.log('here', activePage);

  return (
    <div>
      <Header />
      { activePage === 'viewBoard' && (
        <Board />
      )}
      { activePage === 'uploadScreenshot' && (
        <UploadScreenshot />
      )}
    </div>
  );
}