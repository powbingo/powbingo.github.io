import axios from 'axios';

const SettingsService = {
  async getRole() {
    const { data } = await axios.get('/role');
    return data;
  },
  async getTeams() {
    const { data } = await axios.get('/teams');
    return data;
  },
  async verifyPassword(password) {
    const { data } = await axios.post('/verify/password', { password });
    return data;
  }
}

export default SettingsService;