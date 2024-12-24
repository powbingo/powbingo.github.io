import { AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { setActivePage } from '../../state/settings/settings.actions';

export default function Sidebar() {
  const dispatch = useDispatch();

  const role = useSelector(state => state.settings.role);
  const activeTeam = useSelector(state => state.settings.activeTeam);
  const activePage = useSelector(state => state.settings.activePage);
  const teams = useSelector(state => state.settings.teams);

  const [selectedPage, setSelectedPage] = useState('viewBoard');

  useEffect(() => {
    const sessionPage = window.sessionStorage.getItem('ironEmpireBingoActivePage');
    if (sessionPage) {
      setSelectedPage(sessionPage);
      dispatch(setActivePage(sessionPage));
    }
  }, []);

  const getClassName = (classNames, page) => {
    return `${classNames} ${selectedPage === page ? 'selected' : ''}`;
  };

  const onClick = (page) => () => {
    setSelectedPage(page);
    dispatch(setActivePage(page));
  };

  const relevantTeam = useMemo(() => (
    teams.find(team => team.id === activeTeam)
  ), [teams, activeTeam]);

  return (
    <div className="sidebar">
      <div
        onClick={onClick('viewBoard')}
        className={getClassName("sidebar-button ibm-plex-sans-medium", 'viewBoard')}
      >
        <AppstoreOutlined className="sidebar-icon" />  View board
      </div>
      <div
        onClick={onClick('uploadScreenshot')}
        className={getClassName("sidebar-button ibm-plex-sans-medium", 'uploadScreenshot')}
      >
        <UploadOutlined className="sidebar-icon" /> Upload screenshot
      </div>
      { role === 'admin' && (
        <div
          onClick={onClick('admin')}
          className={getClassName("sidebar-button ibm-plex-sans-medium", 'admin')}
        >
          <SettingOutlined className="sidebar-icon" />  Admin
        </div>
      )}
      { !!relevantTeam && activePage === 'viewBoard' && (
        <div style={{ position: 'relative', top: 325 }}>
          <div className="sidebar-team ibm-plex-sans-medium">{relevantTeam.name}</div>
          {relevantTeam.members?.map((member) => (
            <div key={member.id} className="sidebar-member ibm-plex-sans-medium">{member}</div>
          ))}
        </div>
      )}
    </div>
  )
}