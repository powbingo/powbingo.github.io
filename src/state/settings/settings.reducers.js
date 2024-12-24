import {
  GET_ROLE,
  USER_LOGIN,
  USER_LOGOUT,
  GET_TEAMS,
  SET_ACTIVE_PAGE,
  SET_ACTIVE_TEAM,
} from '../actionTypes';

const initialState = {
  role: 'user',
  password: null,
  teamId: null,
  teams: [],
  activeTeam: null,
  activePage: 'viewBoard',
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE: {
      // TODO
      const currentPassword = state.password;
      let currentRole = action.payload.data.role;
      let currentTeamId = action.payload.data.teamId;

      if (currentPassword === 'admin') currentRole = 'admin';
      if (currentPassword === 'captain') currentRole = 'captain';

      if (!currentPassword || currentPassword === 'null') {
        currentRole = 'user';
        currentTeamId = null;
      }

      return {
        ...state,
        role: currentRole,//action.payload.data.role,
        teamId: currentTeamId,
      };
    }
    case USER_LOGIN:
      return {
        ...state,
        password: action.payload.password,
      };
    case USER_LOGOUT:
      console.log(state);
      return {
        ...state,
        password: null,
        role: 'user',
        teamId: null,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload.data,
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload.page,
      };
    case SET_ACTIVE_TEAM:
      return {
        ...state,
        activeTeam: action.payload.team,
      };

    default:
      return state;
  }
}