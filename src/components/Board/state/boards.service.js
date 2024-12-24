import axios from 'axios';

const BoardsService = {
  async getBoard(teamId) {
    const { data } = await axios.get(`/boards${teamId}`);
    return data;
  },
  async updateTile(teamId, tileId, payload) {
    const { data } = await axios.post(`/boards/${teamId}/${tileId}`, payload);
    return data;
  },
  async submitTile(teamId, tileId) {
    const { data } = await axios.post(`/boards/${teamId}/${tileId}/submit`);
    return data;
  },
  async approveTile(teamId, tileId) {
    const { data } = await axios.post(`/boards/${teamId}/${tileId}/approve`);
    return data;
  },
  async rejectTile(teamId, tileId) {
    const { data } = await axios.post(`/boards/${teamId}/${tileId}/reject`);
    return data;
  },
};

export default BoardsService;