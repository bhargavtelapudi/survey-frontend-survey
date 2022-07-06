<template>
  <v-row class="user__list-item">
    <v-col cols="9" sm="2">
      <span>{{ survey.survey_title }}</span>
    </v-col>
    <v-col cols="9" sm="2">
      <span> {{ survey.survey_description }}</span>
    </v-col>
    <v-col cols="4" sm="2">
      <span> {{ survey.survey_isPublihsed ? 'Published':"UnPublished"}}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewSurvey"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSurvey" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    survey: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    viewSurvey() {
      this.$emit("viewSurvey");
    },
  },
};
</script>
<style>
.user__list-item {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 5px 0;
  border-top: 1px solid var(--colorLightGrey);
}
</style>
