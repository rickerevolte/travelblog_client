<template>
  <div id="weatherWrapper">
    <div id="weatherIcon"><img :src="weatherIconURL" /></div>
    <div>
      <p>Weather in {{ city }}</p>
      <p>{{ description }}</p>
      <p>{{ temperature }} °C</p>
      <p>min-temp: {{ tempMin }} °C</p>
      <p>max-temp: {{ tempMax }} °C</p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "city",
    "temperature",
    "tempMax",
    "tempMin",
    "description",
    "weatherIconURL",
  ],
  data: function () {
    return {};
  },
};
</script>

<style scoped>
#weatherWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#weatherIcon {
  background-color: rgb(212, 212, 212);
  height: 100px;
  width: 100px;
  border-radius: 10px;
}
</style>
