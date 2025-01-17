<template>
  <div
    :style="Style()['Base']"
  >
    <div style="width:100%;height:100%;">
       <!-- 左侧按钮 -->
      <div v-show="currentIndex && currentIndex !== 0" :style="Style()['pageLeft']" @click="clickLeftPage">
        <van-icon size="24" style="margin-left: -3px" name="arrow-left" />
      </div>
      <!-- 右侧按钮 -->
      <div :style="Style()['pageRight']" @click="clickRightPage">
        <van-icon size="24" style="margin-left: 3px" name="arrow" />
      </div>
      <div @click="clickJump" class="blinkdiv" :style="Style()['goinButton']">
        跳 过
      </div>
      <Swiper
        @transtionend="getNum"   
        ref="swiper"
        v-if="swiftList.length > 0"
        :autoPlay="false"
        :showIndicator="false"
        interval="2500"
        duration="500"
        style="
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        "
      >
        <Slide :key="index" v-for="(url, index) in swiftList">
          <img
            style="object-fit: fill; pointer-events: none"
            width="100%"
            height="100%"
            :src="url"
          />
        </Slide>
      </Swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, Slide } from "vue-swiper-component";
import {
  Image,
  Icon,
} from "vant";
export default {
  components: {
    Swiper,
    Slide,
    [Image.name]: Image,
    [Icon.name]: Icon,
  },
  data() {
    return {
      currentIndex: undefined,
      swiftList: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
      ]
    };
  },
  computed: {
    hhh() {
      return this.$store.getters.clientHeight || 1080;
    },
    www() {
      return this.$store.getters.clientWidth || 1920;
    },
  },
  mounted() {},
  methods: {
    clickLeftPage() {
      this.$refs.swiper.prevSlide();
    },
    clickRightPage() {
      this.$refs.swiper.nextSlide();
    },
    getNum(number) {
      this.currentIndex = number;
      if(number === (this.swiftList.length -1) ) {
        this.closeIntroduceView();
      }
    },
    clickJump() {
      this.closeIntroduceView();
    },
    closeIntroduceView() {
      this.$emit("closeIntroduceView", '');
    },
    Style() {
      let innerLine = this.www / 4;
      let Base = `
         border-width: ${innerLine/2}px;
         border-style: solid;
         border-left-color:rgb(245,245,245);
         border-top-color:black;
         border-right-color:rgb(245,245,245);
         border-bottom-color:black;
         width: ${this.www - innerLine}px;
         height:${this.hhh - innerLine}px;
      `;

      // 相对于Base父视图 
      let toTop = 40;
      let toLeftRight = 90;
      let pageLeft = `
          position: absolute;
          z-index:999;
          color: white;
          top: ${(this.hhh - toTop) / 2}px;
          left: ${toLeftRight}px;

          width: 40px;
          height:40px;
          border-radius:20px;
          background-color:black;
          opacity: 0.7;
          cursor:pointer;

          display: flex;
          align-items: center;
          justify-content:center;
      `;
      let pageRight = `
          position: absolute;
          z-index:999;
          color: white;
          top: ${(this.hhh - toTop) / 2}px;
          left: ${this.www - toLeftRight - 20}px;

          width: 40px;
          height:40px;
          border-radius:20px;
          background-color:black;
          opacity: 0.7;
          cursor:pointer;

          display: flex;
          align-items: center;
          justify-content:center;
      `;

      let goinBtnW = 100;
      let goinBtnH = 40;
      let goinButton = `
        width: ${goinBtnW}px;
        height:60px;
        border-radius:10px;
        position: absolute;
        z-index: 9999;
        top: ${((this.hhh - goinBtnH) * 5) / 6}px;
        left: ${(this.www - goinBtnW) / 2}px;
        text-align:center;
        line-height:60px;
      `;
      return {
        Base,
        pageLeft,
        pageRight,
        goinButton,
      };
    },
  },
};
</script>

<style scoped>
@-webkit-keyframes blackWhite {
  0% {
    color: rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
  }
  20% {
    color: rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(100, 109, 110, 0.6);
  }
}

.blinkdiv {
  color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  -webkit-animation-name: blackWhite;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-duration: 6s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

</style>
