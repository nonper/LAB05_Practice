<template>
  <div class="event" v-if="GStore.event">
    <h1>Name: {{ GStore.event.first_name }} {{ GStore.event.last_name }}</h1>
    <p>ID: {{ GStore.event.id }}</p>
    <p>Email: {{ GStore.event.email }}</p>
    <p>Gender: {{ GStore.event.gender }}</p>
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>
