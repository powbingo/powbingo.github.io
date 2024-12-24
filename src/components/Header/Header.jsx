import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';
import { setActiveTeam, userLogout } from '../../state/settings/settings.actions';
import useToggle from '../../common/useToggle';
import LoginModal from '../LoginModal.jsx/LoginModal';

export default function Header() {
  const dispatch = useDispatch();

  const activePage = useSelector(state => state.settings.activePage);
  const teams = useSelector(state => state.settings.teams);
  const password = useSelector(state => state.settings.password);
  const teamId = useSelector(state => state.settings.teamId);

  const [selectedTeam, setSelectedTeam] = useState();

  const { toggle, isToggled } = useToggle();

  useEffect(() => {
    const sessionTeam = window.sessionStorage.getItem('ironEmpireBingoActiveTeam');
    let relevantTeam = teams[0]?.id;

    if (sessionTeam) relevantTeam = sessionTeam;
    setSelectedTeam(relevantTeam);
    dispatch(setActiveTeam(relevantTeam))
  }, [teams]);

  const onTeamClick = (teamId) => () => {
    setSelectedTeam(teamId);
    dispatch(setActiveTeam(teamId));
  };

  const onLogoutClick = () => {
    return new Promise((resolve) => (
        Modal.confirm({
        title: 'Log out',
        content: 'Are you sure you want to log out?',
        onOk: () => {
          dispatch(userLogout());
          resolve(true);
        },
        okText: 'Yes',
        cancelText: 'No',
        maskClosable: true,
        className: 'logout-modal',
      })
    ));
  };

  const onLoginClick = () => {
    toggle();
  }

  const TeamComponent = ({ team }) => {
    const selectedClass = selectedTeam === team.id ? 'selected' : '';
    return (
      <div
        key={team.id}
        className={`ibm-plex-sans-medium header-button ${selectedClass}`}
        onClick={onTeamClick(team.id)}
      >
        {team.name}{team.id === teamId ? ' (my team)' : ''}
      </div>
    );
  }

  return (
    <Row style={{ marginTop: 32 }}>
      <Col span={16} className="header">
        { activePage === 'viewBoard' && teams.map(team => (<TeamComponent key={team.id} team={team} />)) }
      </Col>
      <Col span={8}>
        { (password === 'null' || !password) && (
          <div
            className="ibm-plex-sans-medium header-button logout-button"
            onClick={onLoginClick}
          >
            <UnlockOutlined className="header-icon" /> Log in
          </div>
        )}
        { (password !== 'null' && password) && (
          <div
            className="ibm-plex-sans-medium header-button logout-button"
            onClick={onLogoutClick}
          >
            <LockOutlined className="header-icon" /> Log out
          </div>
        )}
      </Col>
      <LoginModal visible={isToggled} onClose={toggle} />
    </Row>
  );
}