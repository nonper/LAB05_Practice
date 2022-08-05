<template>
  <div class="event" v-if="GStore.event">
    <h3>ID: {{ GStore.event.id }}</h3>
    <h1>Name: {{ GStore.event.AirlineName }}</h1>
    <p>Email: {{ GStore.event.email }}</p>
    <p>Address: {{ GStore.event.address }}</p>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>
