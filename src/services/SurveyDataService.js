import http from "../http-common";
class SurveyDataService {
  getSurvey(id) {
    return http.get(`/complete/surveys/${id}`);
  }
  submitSurveyResponse(surveyData) {
    return http.post(`/response?surveyId=${surveyData.surveyId}`, surveyData);
  }
}
export default new SurveyDataService();
