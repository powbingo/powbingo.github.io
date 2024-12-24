import {
  GET_SUBMISSIONS,
  GET_SETTINGS,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  UPDATE_SETTINGS,
} from '../../../state/actionTypes';
import AdminService from './admin.service';
import { boardMap } from '../sampleBoards';
import { BOARD_STATUSES } from '../boards.contants';

export const getSubmissions = (teamId) => async (dispatch) => {
  try {
    // TODO
    const data = boardMap[teamId];
    // const data = await BoardsService.getBoard(teamId);
    dispatch({
      type: GET_SUBMISSIONS,
      payload: {
        data,
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateTile = (teamId, tileId, payload) => async (dispatch) => {
  try {
    // TODO check below as well
    let data = [...boardMap[teamId]];
    data = data.map((row) => {
      return row.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            images: [...tile.images || [], ...payload.images || []],
          };
        }
        return tile;
      });
    });

    // const data = await BoardsService.updateTile(teamId, tileId, payload);
    dispatch({
      type: UPDATE_TILE,
      payload: {
        data,
      }
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const submitTile = (teamId, tileId) => async (dispatch) => {
  try {
    let data = [...boardMap[teamId]];
    data = data.map((row) => {
      return row.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            status: BOARD_STATUSES.SUBMITTED,
          };
        }
        return tile;
      });
    });

    // const data = await BoardsService.submitTile(teamId, tileId);
    dispatch({
      type: SUBMIT_TILE,
      payload: {
        data,
      }
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const approveTile = (teamId, tileId) => async (dispatch) => {
  try {
    let data = [...boardMap[teamId]];
    data = data.map((row) => {
      return row.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            status: BOARD_STATUSES.APPROVE_TILE,
          };
        }
        return tile;
      });
    });

    // const data = await BoardsService.approveTile(teamId, tileId);
    dispatch({
      type: APPROVE_TILE,
      payload: {
        data,
      }
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const rejectTile = (teamId, tileId) => async (dispatch) => {
  try {
    let data = [...boardMap[teamId]];
    data = data.map((row) => {
      return row.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            status: BOARD_STATUSES.REJECTED,
          };
        }
        return tile;
      });
    });

    // const data = await BoardsService.rejectTile(teamId, tileId);
    dispatch({
      type: REJECT_TILE,
      payload: {
        data,
      }
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}