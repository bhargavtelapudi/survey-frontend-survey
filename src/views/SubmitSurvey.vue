<template>
  <div class="wrapper">
    <v-form class="form" @submit="handleSubmitSurvey" ref="form" lazy-validation>
      <div class="header__card">
        <h1>{{ survey.title }}</h1>
        <div class="header__card--align">
          <v-text-field v-model="survey.email" label="Enter Your Email Id" :rules="[rules.required, rules.email]">
          </v-text-field>
          <v-text-field v-model="survey.name" label="Enter Your User Name" :rules="[rules.required]"></v-text-field>
        </div>
      </div>
      <div class="survey__questions--wrapper">
        <div class="survey__question--wrapper">
          <div class="survey__question" v-for="(question, index) in survey.questions" :key="index">
            <div class="survey__question--heading">
              <h4>Q : {{ question.title.toUpperCase() }} ?</h4>
            </div>
            <v-text-field v-if="question.question_type === 'text-field'" v-model="question.response"
              :label="question.required ? 'Your Answer *' : 'Your Answer'"
              :rules="[question.required && rules.required]" clearable clear-icon="mdi-close-circle"></v-text-field>
            <v-textarea v-if="question.question_type === 'paragraph'" :rules="[question.required && rules.required]"
              outlined clearable rows="3" row-height="25" clear-icon="mdi-close-circle" name="input-7-4"
              :label="question.required ? 'Your Answer *' : 'Your Answer'" v-model="question.response"></v-textarea>
            <!-- MULTIPLE CHOICE QUESTION-->
            <v-radio-group v-model="question.response" :rules="[question.required && rules.required]"
              v-if="question.question_type === 'multiple-choice'">
              <v-radio v-for="(item, index) in question.options" :key="index" :label="item.option" :value="item.option"
                color="indigo darken-3"></v-radio>
            </v-radio-group>

            <v-slider v-if="question.question_type === 'rating'" v-model="question.response" :rules="[
              question.required && ((v) => !!v || 'Rating Response Required'),
            ]" label="Rate Your Question" max="5" step="1" thumb-label="always" class="slider" color="indigo darken-3">
            </v-slider>
          </div>
        </div>
      </div>
      <button class="black-button">SUBMIT SURVEY</button>
    </v-form>
  </div>
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
export default {
  props: ["surveyId"],
  data() {
    return {
      survey: {
        id: this.surveyId,
        name: "",
        email: "",
        title: "",
        questions: [],
      },
      successfullySubmitted: false,
      rules: {
        required: (value) => !!value || `Field Required !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    retreiveSurvey() {
      SurveyDataService.getSurvey(this.surveyId)
        .then((response) => {
          const apiResponse = response.data;
          this.survey.title = response.data.survey_title;
          const formQuestions = apiResponse.questions.map((ele) => ({
            ...ele,
            response: null,
          }));
          this.survey.questions = formQuestions;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    async handleSubmitSurvey(e) {
      e.preventDefault();
      const formRes = await this.$refs.form.validate();
      if (formRes.valid) {
        let surveyResponses = [];
        surveyResponses = this.survey.questions.map((question) => ({
          id: question.id,
          response: question.response,
        }));
        const formApiData = {
          email: this.survey.email,
          name: this.survey.name,
          surveyId: this.surveyId,
          responses: surveyResponses,
        };
        SurveyDataService.submitSurveyResponse(formApiData)
          .then((response) => {
            if (response.status === 200) {
            this.successfullySubmitted = true;
            }
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
  mounted() {
    this.retreiveSurvey();
  },
};
</script>
<style>
.header__card {
  padding: 5px 0;
  border: 1px solid #bec95e;
  border-top: 12px solid #bec95e;
  border-radius: 10px;
  text-align: center;
  margin: 10px 0;
  box-shadow: 0px 15px 30px #3d3c3c2d;
}

.header__card h1 {
  font-size: 35px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
}

.header__card--align {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 40px 0 40px;
  gap: 40px;
}

.slider {
  margin-top: 20px;
}

.survey__questions--wrapper {
  padding: 10px 0;
  margin: 10px 0;
  border-top: 2px solid #bac3ba85;
}

.survey__question--wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.survey__question {
  display: flex;
  flex-direction: column;
  border-left: 5px solid #bec95e;
  margin: 10px 0;
  padding: 15px 10px 0 10px;
  box-shadow: 0px 20px 30px #33323241;
  border-radius: 5px;
}

.survey__question--heading {
  background: #e9e6e6;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 10px;
}

@media screen and (max-width: 900px) {
  .survey__question--wrapper {
    grid-template-columns: 1fr;
  }

  .header__card--align {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 10px;
  }

  .black-button {
    width: 100%;
  }
}
</style>