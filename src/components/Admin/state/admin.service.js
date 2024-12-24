import axios from 'axios';

const AdminService = {
  async getSubmissions() {
    const { data } = await axios.get('/admin/submissions');
    return data;
  },
  async getSettings() {
    const { data } = await axios.get('/admin/settings');
    return data;
  },
  async createTeam(payload) {
    const { data } = await axios.post('/admin/team', payload);
    return data;
  },
  async updateTeam(teamId, payload) {
    const { data } = await axios.put(`/admin/team/${teamId}`, payload);
    return data;
  },
  async deleteTeam(teamId) {
    const { data } = await axios.delete(`/admin/team/${teamId}`);
    return data;
  },
  async updateSettings(payload) {
    const { data } = await axios.post('/admin/settings', payload);
    return data;
  },
};

export default AdminService;