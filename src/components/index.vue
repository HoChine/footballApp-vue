<template>
  <div class="m-wrapper">
    <router-view></router-view>
    <footer class="footer">
      <ul>
        <li class="active">
          <router-link to="/index/home">
            <i class="iconfont icon-shouyeshouye"></i>
            <div>首页</div>
          </router-link>
        </li>
        <li>
          <router-link to="/index/find">
            <i class="iconfont icon-faxian"></i>
            <div>发现</div>
          </router-link>
        </li>
        <li>
          <router-link to="/index/photos">
            <i class="iconfont icon-zhaoxiangji"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/index/mine">
            <i class="iconfont icon-user"></i>
            <div>我的</div>
          </router-link>
        </li>
        <li>
          <router-link to="/index/exit">
            <i class="iconfont icon-tuichudenglu"></i>
            <div>退出</div>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'm-wrapper',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped>

</style>
