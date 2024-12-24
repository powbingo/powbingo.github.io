import {
  GET_ROLE,
  USER_LOGIN,
  USER_LOGOUT,
  GET_TEAMS,
  SET_ACTIVE_PAGE,
  SET_ACTIVE_TEAM,
} from '../actionTypes';
import SettingsService from './settings.service';

export const getRole = () => async (dispatch) => {
  // TODO
  const role = 'user';
  // try {
  //   const data = await SettingsService.getRole();
  // } catch (err) {
  //   console.error(err);
  // }
  dispatch({
    type: GET_ROLE,
    payload: {
      data: {
        role,
        teamId: '2',
      },
    }
  });
};

export const userLogin = (password) => async (dispatch) => {
  window.localStorage.setItem('ironEmpireBingoToken', password);
  // TODO - send request to backend

  // const data = await SettingsService.verifyPassword(password);

  dispatch({
    type: USER_LOGIN,
    payload: {
      password,
    }
  });

  return true;
  // return data;
};

export const userLogout = () => async (dispatch) => {
  window.localStorage.setItem('ironEmpireBingoToken', null);
  dispatch({
    type: USER_LOGOUT,
  });
};

export const setActivePage = (page) => async (dispatch) => {
  window.sessionStorage.setItem('ironEmpireBingoActivePage', page);
  dispatch({
    type: SET_ACTIVE_PAGE,
    payload: {
      page,
    }
  });
};

export const setActiveTeam = (team) => async (dispatch) => {
  window.sessionStorage.setItem('ironEmpireBingoActiveTeam', team);
  dispatch({
    type: SET_ACTIVE_TEAM,
    payload: {
      team,
    }
  });
}

export const getTeams = () => async (dispatch) => {
  // TODO
  const teams = [
    {
      id: '1',
      name: 'Team A',
      members: [
        'Vodkabarrage',
        'Jawn II',
        'Tina Snow',
        '704',
        'G abby',
        'IM Pumpkin',
        'Justinsiron',
        'chezzisspoon',
        'Haku Ou',
        'Annoyingbtw',
        'Iron To Goo',
        'T3',
      ]
    },
    {
      id: '2',
      name: 'Team B',
    },
    {
      id: '3',
      name: 'Team C',
    },
    {
      id: '4',
      name: 'Team D',
    },
    {
      id: '5',
      name: 'Team E',
    },
    {
      id: '6',
      name: 'Team F',
    },
    {
      id: '7',
      name: 'Team G',
    },
  ];
  // const teams = await SettingsService.getTeams();
  dispatch({
    type: GET_TEAMS,
    payload: {
      data: teams,
    }
  });
}