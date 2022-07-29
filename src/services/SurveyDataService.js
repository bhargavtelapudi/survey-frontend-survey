import http from "../http-common";
class SurveyDataService {
  getSurvey(id) {
    return http.get(`/survey/${id}`);
  }
}
export default new SurveyDataService();
