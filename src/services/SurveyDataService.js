import http from "../http-common";
const accessToken = sessionStorage.getItem("authToken");

class SurveyDataService {
  getAllAdminSurveys() {
    return http.get("/survey/list", {
      headers: {
        'x-access-token': accessToken
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/create/survey", surveyData, {
      headers: {
        'x-access-token': accessToken
      }
    });
  }
  deleteSurvey(id) {
    return http.delete(`/survey/${id}`, {
      headers: {
        'x-access-token': accessToken
      }
    });
  }
}
export default new SurveyDataService();