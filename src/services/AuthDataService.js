import http from "../http-common";
const accessToken = sessionStorage.getItem("authToken");

class AuthService {
  login(authData) {
    return http.post(`/auth/login`, authData);
  }
  logout(userId) {
    return http.get(`/auth/logout/${userId}`,{
      headers: {
        'x-access-token': accessToken
      }
    });
  }
}
export default new AuthService();