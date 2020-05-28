export default class Auth {
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static setCurrentBusiness(business) {
    localStorage.setItem('currentBusiness', JSON.stringify(business));
  }

  static getCurrentBusiness() {
    const currentBusiness = localStorage.getItem('currentBusiness');
    if (!!currentBusiness) return JSON.parse(currentBusiness);
    return null;
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }
}
