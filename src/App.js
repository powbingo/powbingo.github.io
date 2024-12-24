import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import './App.css';
import { getRole, getTeams, userLogin } from './state/settings/settings.actions';
import MainScreen from './components/MainScreen/MainScreen';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const dispatch = useDispatch();
  const password = useSelector(state => state.settings.password);

  useEffect(() => {
    dispatch(getRole());
  }, [password]);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('ironEmpireBingoToken');
    if (!token) return;

    dispatch(userLogin(token));
  }, []);

  return (
    <div className="App" style={{ background: 'black', height: '100%', width: '100%' }}>
      <Row style={{ height: '100%', width: '100%' }}>
        <Col span={6} style={{ height: '100%' }}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <MainScreen />
        </Col>
      </Row>
    </div>
  );
}

export default App;
