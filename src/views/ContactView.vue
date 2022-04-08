<template>
    <div class="content">
        <h2>Contact/Imprint</h2>
        <div id="imprint">
            <p>This website was created in 2022 as the finishing project for the course 'full-stack web development' of the 
                <br><a href="https://hamburgcodingschool.com/" target="blank">Hamburg Coding School</a></p>
                <ul>
                <li><b>By:</b></li>
                <li>Oliver Eckert</li>
                <li>mail@olivereckert.de</li>
                <li>Talstraße 67a</li>
                <li>20359 Hamburg</li>
            </ul>
            <p>Many thanks to Helder Pereira, Paul Anton, Pedro Remoaldo and Tobias Schulz-Hess of Hamburg Coding School</p>
            <p>special thanks to Toti Baches for the LogIn</p>
        </div>
    </div>
</template>

<style>
#topBar {
  position: absolute;
  top:0;
  width: 100%;
  height: 60px;
}
</style>
<style scoped>
.content {
    position: relative;
    top: 90px;
}
#imprint {
    width: 300px;
    height: 400px;
    background-color: rgb(218, 216, 206);
    border-radius: 10px;
    margin-left: 10px;
    padding: 10px;
}
h2 {
    padding: 10px;
}
ul {
    list-style: none;
}
</style>