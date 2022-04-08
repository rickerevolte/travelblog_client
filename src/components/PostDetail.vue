<template>
    <div class="wrapper">
        <img :src="selectedPost.image" />
        <h5>{{selectedPost.from}} - {{selectedPost.to}}</h5>
        <h4>{{selectedPost.shortText}}</h4>
        <p>{{selectedPost.longText}}</p>
    </div>
</template>

<script>
export default {
    props: ["selectedPost"]
}
</script>
<style scoped>

.wrapper {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    min-width: 300px;
}

img {
    max-width: 600px;
    min-width: 300px;
}
</style>