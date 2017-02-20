<template>
  <div class="m-main m-home">
    <header class="header">
      <ul>
        <li><i class="iconfont icon-menu" id="menu"></i></li>
        <li>
          <ul id="indexChange">
            <li v-for="(header,index) in homeHeader" :class="{active:curHeader==index}" @click="changeHeader(index)">
              {{header}}
            </li>
          </ul>
        </li>
        <li><i class="iconfont icon-a871"></i></li>
      </ul>
    </header>
    <section class="section m-home-section">
      <div class="swiper-container m-precent m-home-swiper" id="outerSwiper">
        <div class="swiper-wrapper m-precent">
          <div class="swiper-slide m-precent m-swiper-outer">
            <nav class="m-nav">
              <ul>
                <li v-for="(nav,index) in homeNav" :class="{active:curNav==index}" @click="changeNav(index)">{{nav}}
                </li>
              </ul>
            </nav>
            <div class="swiper-container m-home-swiper m-precent">
              <div class="swiper-wrapper">
                <div class="swiper-slide m-scroll-container" id="myScroll">
                  <div class="m-scroll-wrapper">
                    <div class="refresh">
                      <img :src="refreshImg" class="reversal">
                      <span>{{refreshText}}</span>
                    </div>
                    <dl v-for="item in homeData">
                      <dt><img :src="item.img" ></dt>
                      <dd>{{item.title}}</dd>
                    </dl>
                    <div class="upload">
                      <img :src="uploadImg">
                      <span>{{uploadText}}</span>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">足球美女</div>
                <div class="swiper-slide">足球热点</div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">关注</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'm-main',
    mounted(){
      this.$http.get("/static/data/livelist.json").then(function (res) {
        this.homeData = res.data.data
      });
      var _this = this;
      setTimeout(function () {
        _this.MySwiper = new Swiper(".m-home-swiper", {
          initialSlide: 0,
          onSlideChangeStart: function (swiper) {
            swiper.container[0].id ? _this.curHeader = swiper.activeIndex : _this.curNav = swiper.activeIndex;
          }
        });

        var mainScroll = new IScroll("#myScroll", {
          probeType: 3
        });
        var scrollSize = 30;
        // 隐藏下拉刷新
        mainScroll.scrollBy(0,-scrollSize);
        // 当滚动的时候
        mainScroll.on("scroll",function(){
          // 获取当前滚动条的位置
          var y = this.y;
          // 计算最大的滚动范围
          var maxY = this.maxScrollY - y;
          // 如果是下拉
          if(y>=0){
            _this.refreshText = "松手立即刷新";
            _this.refreshImg = "/static/images/ajax-loader.gif";
            return "";
          }
          // 如果是上拉
          if(maxY>=0){
            _this.uploadText = "上拉加载数据";
            _this.uploadImg = "/static/images/ajax-loader.gif";
            return "";
          }

        })

        // 当滚动结束刷新数据时
        mainScroll.on("scrollEnd",function(){
          if(this.y >= -scrollSize && this.y < 0){
            mainScroll.scrollTo(0,-scrollSize);
          }else if(this.y>=0){
            setTimeout(function(){
              mainScroll.scrollTo(0,-scrollSize);
              _this.$http.get("/static/data/livelist.json").then(function (res) {
                var data = res.data.data;
                var random = Math.floor(Math.random() * data.length);
                var randomData = data[random];
                _this.homeData.unshift(randomData);
                setTimeout(function () {
                  _this.refreshText = "下拉刷新";
                  _this.refreshImg = "/static/images/arrow.png";
                  mainScroll.refresh();
                },200)
              })
            },1000)
          }
          // 计算最大的滚动范围
          var maxY = this.maxScrollY - this.y;
          var self = this;
          console.log(this.y);
          if(maxY>-scrollSize && maxY<0){
            mainScroll.scrollTo(0,this.maxScrollY+scrollSize);
          }else if(maxY >= 0){
            console.log(-30);
            setTimeout(function () {
              _this.$http.get("/static/data/livelist.json").then(function (res) {
                _this.homeData = _this.homeData.concat(res.data.data);
                setTimeout(function () {
                  mainScroll.refresh();
                  _this.uploadText = "上拉加载";
                  _this.uploadImg = "/static/images/arrow.png";
                },200)
              })
            },1000)
          }
        })
        document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
      }, 200);
    },
    data () {
      return {
        homeHeader: ["热点", "关注"],
        homeNav: ["足球现场", "足球生活", "足球美女"],
        homeData: [],
        curHeader: 0,
        curNav: 0,
        refreshText:"下拉刷新",
        refreshImg:"/static/images/arrow.png",
        uploadText:"上拉加载",
        uploadImg:"/static/images/arrow.png"
      }
    },
    methods:{
      changeHeader(index){
        this.curHeader = index;
        this.MySwiper[0].slideTo(index);
      },
      changeNav(index){
        this.curNav = index;
        this.MySwiper[1].slideTo(index);
      }
    }
  }
</script>

