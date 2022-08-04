<template>
  <div class="event" v-if="event">
    <h1>Name: {{ event.first_name }} {{ event.last_name }}</h1>
    <p>ID: {{ event.id }}</p>
    <p>Email: {{ event.email }}</p>
    <p>Gender: {{ event.gender }}</p>
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
    EventService.getEventPass(this.id)
      .then((res) => {
        this.event = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
