import {
  GET_SUBMISSIONS,
  GET_SETTINGS,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  UPDATE_SETTINGS,
} from '../../../state/actionTypes';

const initialState = {
  submissions: [],
  settings: {
    teams: [],
  },
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return {
        ...state,
        submissions: action.payload.data,
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload.data,
      };
    case CREATE_TEAM: {
      const settings = { ...state.settings };
      if (!settings.teams) {
        settings.teams = [];
      }

      settings.teams.push(action.payload.data);

      return {
        ...state,
        settings,
      };
    }
    case UPDATE_TEAM: {
      const settings = { ...state.settings };
      settings.teams = settings?.teams.map((team) => {
        if (team.id === action.payload.data.id) {
          return action.payload.data;
        }
        return team;
      });

      return {
        ...state,
        settings,
      };
    }
    case DELETE_TEAM: {
      const settings = { ...state.settings };
      settings.teams = settings.teams?.filter((team) => team.id !== action.payload.data.id) || [];
      return {
        ...state,
        settings,
      };
    }
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload.data,
        }
      };
    default:
      return state;
  }
}