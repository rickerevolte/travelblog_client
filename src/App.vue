<template>
<NavHeader />

<RouterView />
</template>

<script>
import NavHeader from "./components/NavHeader.vue";

export default {
  components: {
    NavHeader,
  }
}
</script>
