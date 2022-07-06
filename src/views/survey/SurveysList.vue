<template>
  <div class="wrapper">
    <h1>Surveys List</h1>
    <h4 class="highlight__text">{{ message }}</h4>
    <div v-show="surveysLength > 0">
      <v-row class="albums__list--table">
        <v-col cols="9" sm="2">
          <span>Title</span>
        </v-col>
        <v-col cols="9" sm="2">
          <span>Description</span>
        </v-col>
        <v-col cols="4" sm="2">
          <span>Status</span>
        </v-col>
        <v-col cols="9" sm="1">
          <span>View</span>
        </v-col>
        <v-col cols="9" sm="1">
          <span>Delete</span>
        </v-col>
        <div class="album__item--wrapper">
          <SurveyListItem v-for="survey in surveys.survey" :key="survey.id" :survey="survey"
            @deleteSurvey="goDelete(survey.id)" @viewSurvey="goView(survey.id)" />
        </div>
      </v-row>
    </div>
    <h2 v-show="surveysLength < 1" class="highlight__text" style="text-align: center">
      NO SURVEYS FOUND
    </h2>
  </div>
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
import SurveyListItem from "@/components/SurveyListItem.vue";
export default {
  name: "surveys-list",
  data() {
    return {
      surveys: {},
      surveysLength:0,
      message: "View or Delete Surveys",
    };
  },
  components: {
    SurveyListItem,
  },
  methods: {
    goView(album) {
      this.$router.push({ name: "view", params: { id: album.id } });
    },
    goDelete(id) {
      SurveyDataService.deleteSurvey(id)
        .then(() => {
          this.retreiveSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retreiveSurveys() {
      SurveyDataService.getAllAdminSurveys()
        .then((response) => {
          this.surveys = response.data;
          this.surveysLength = response.data.survey.length;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retreiveSurveys();
  },
};
</script>
<style>
</style>