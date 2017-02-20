<template>
  <div class="swiper-container m-guide">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="/static/images/slide1.png" alt=""></div>
      <div class="swiper-slide"><img src="/static/images/slide2.png" alt=""></div>
      <div class="swiper-slide"><img src="/static/images/slide3.png" alt=""></div>
      <div class="swiper-slide">
        <img src="/static/images/slide4.png">
        <router-link to="/index/home">立即开启</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'm-guide',
    data () {
      setTimeout(function () {
        new Swiper(".m-guide");
      },200)
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
