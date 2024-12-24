import {
  GET_BOARD,
  UPDATE_TILE,
  SUBMIT_TILE,
  APPROVE_TILE,
  REJECT_TILE,
} from '../../../state/actionTypes';

const initialState = {
  board: [[]]
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD:
      return {
        ...state,
        board: action.payload.data,
      };
    case UPDATE_TILE:
      return {
        ...state,
        board: action.payload.data,
      };
    case SUBMIT_TILE:
      return {
        ...state,
        board: action.payload.data,
      };
    case APPROVE_TILE:
      return {
        ...state,
        board: action.payload.data,
      };
    case REJECT_TILE:
      return {
        ...state,
        board: action.payload.data,
      };
    default:
      return state;
  }
}