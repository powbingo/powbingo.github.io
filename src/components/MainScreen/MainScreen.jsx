import React from 'react';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import Board from '../Board/Board';
import UploadScreenshot from '../UploadScreenshot/UploadScreenshot';
import AdminSettings from '../Admin/AdminSettings';
import AdminSubmissions from '../Admin/AdminSubmissions';

export default function MainScreen() {
  const activePage = useSelector(state => state.settings.activePage);
  const activeSubPage = useSelector(state => state.settings.activeSubPage);

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
      { activePage === 'admin' && (
        <>
         {activeSubPage === 'settings' && (
           <AdminSettings />
         )}
          {activeSubPage === 'submissions' && (
            <AdminSubmissions />
          )}
        </>
      )}
    </div>
  );
}