<template>
  <div v-if="event">
    <p>Edit {{ event.first_name }}'s Detail here</p>
    <button @click="edit">Save Edit</button>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
export default {
  props: ["id"],
  inject: ["GStore"],
  data() {
    return {
      event: null,
    };
  },
  methods: {
    edit() {
      //Assuming successful API call to register them

      //Set a flash message to appear on the next page loaded which says
      //'You are successfully registered for' + this.event.title

      this.GStore.flashMessage =
        this.event.first_name + "'s detail update is in progress.";
      setTimeout(() => {
        //After 3 seconds remove it
        this.GStore.flashMessage = "";
      }, 5000);

      this.$router.push({
        name: "EventDetails",
        query: { id: this.event.id },
      });
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEventPass(parseInt(routeTo.query.id))
      .then((response) => {
        next((comp) => {
          comp.event = response.data;
        });
      })
      .catch(() => {
        next({ name: "NetworkError " });
      })
      .finally(() => {});
  },
};
</script>
