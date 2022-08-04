<template>
  <div class="event" v-if="event">
    <h3>ID: {{ event.id }}</h3>
    <h1>Name: {{ event.AirlineName }}</h1>
    <p>Email: {{ event.email }}</p>
    <p>Address: {{ event.address }}</p>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
export default {
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    EventService.getEventAirline(this.id)
      .then((res) => {
        this.event = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
