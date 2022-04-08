<template>
    <div id="infowindow">
            <a :href="url"><h3>{{headLine}}</h3></a>
            <h2>{{city}}</h2>
            <p>{{from}} - {{to}}</p>
        <div class="infoAuth">
            <img :src="auth_pic" />
            <h5>by: {{author}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["url", "id", "headLine", "city", "from", "to", "auth_pic", "author" ],
    }
</script>

<style scoped>
#infowindow > a {
    color: black;
    text-decoration: underline;
}
.infoAuth {
    position: relative;
    display: block;
    line-height: 40px;  
}
.infoAuth img {
    float: left;
    position: relative;
    width: 40px;
    border-radius: 50%;
}
.infoAuth > h5 {
  padding-left: 50px;
}
</style>