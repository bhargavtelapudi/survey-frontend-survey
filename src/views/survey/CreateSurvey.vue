<template>
  <div class="wrapper">
    <div class="register-headings">
      <h1>Create Survey</h1>
      <h4 class="highlight__text">{{ message }}</h4>
    </div>
    <v-form class="form" @submit="createSurvey">
      <v-text-field label="Title" v-model="survey.title"
      :rules="[rules.fieldRequired]" />
      <v-text-field label="Description"
       v-model="survey.description"
       :rules="[rules.fieldRequired]"
        />
      <!-- <v-btn color="success">Add Questions For Survey</v-btn> -->
      <v-row justify="center">
        <v-col col="2"> </v-col>
        <v-col col="2">
          <v-btn color="success" type="submit">Create Survey</v-btn>
        </v-col>
        <v-col col="2">
          <v-btn color="info" @click="cancel()">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
export default {
  name: "create-survey",
  data() {
    return {
      survey: {
        title: "",
        description: "",
        isPublished: false,
        questions: [],
      },
      message: "Create Survey form",
      rules: {
        fieldRequired: value => !!value || 'Field Required.',
      },
    };
  },
  methods: {
    createSurvey() {
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        isPublished: this.survey.isPublished,
      }
      SurveyDataService.createSurvey(surveyData)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveysList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "usersList" });
    },
  },
};
</script>
<style>
</style>