<template>
  <div :style="Style()['Base']" @mouseenter="flowboard_mouseenter" @mouseleave="flowboard_mouseleave" @click="clickMiddleSq">
    <!-- middle bar -->
    <div :style="Style()['MiddleSq']">
      <van-icon
        :name="middleIconNameOrUrl"
        :color="middleIconColor"
        :dot="middleIconDotShow"
        :size="middleIconSizePx"
        :badge="middleIconBadge"
      />
    </div>
    <!-- 左侧bar -->
    <div v-show="leftSqShow && isCover" :style="Style()['LeftSq']" @click="clickLeftSq($event)">
      <van-image
        :width="leftSqWidth"
        :height="baseHeight"
        fit="contain"
        :src="leftSqInnerIconUrl"
      />
    </div>

    <!-- 四边bar -->
    <div :style="Style()['LeftBar']"></div>
    <div :style="Style()['TopBar']"></div>
    <div :style="Style()['RightBar']"></div>
    <div :style="Style()['BottomBar']"></div>
  </div>
</template>
<script>

import { Icon, Image } from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
  },
  data() {
    return {
      isCover: false
    };
  },
  props: {
    // base
    isSelected: {
      type: Boolean,
      default: false,
    },
    baseWidth: {
      type: Number,
      default: 80,
      require: false,
    },
    baseHeight: {
      type: Number,
      default: 80,
      require: false,
    },
    originBaseColor: {
      type: String,
      default: "red",
      require: false,
    },
    coverBaseColor: {
      type: String,
      default: "green",
      require: false,
    },
    selectedBaseColor: {
      type: String,
      default: "green",
      require: false,
    },
    // middle inner icon
    middleIconNameOrUrl: {
      type: String,
      default: "cart-o",
      require: false,
    },
    middleIconDotShow: {
      type: Boolean,
      default: false,
    },
    middleIconBadge: {
      type: String | Number,
      default: 1,
      require: false,
    },
    middleIconColor: {
      type: String,
      default: "#1989fa",
      require: false,
    },
    middleIconSizePx: {
      type: Number,
      default: 20,
      require: false,
    },
    // left bar
    leftSqShow: {
      type: Boolean,
      default: false,
    },
    leftSqWidth: {
      type: String | Number,
      default: 20,
      require: false,
    },
    leftSqBaseColor: {
      type: String,
      default: "green",
      require: false,
    },
    leftSqCoverColor: {
      type: String,
      default: "blue",
      require: false,
    },
    leftSqInnerIconUrl: {
      type: String,
      default: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    },
    // 4个边框
    // TOP
    topBarHeightPx: {
      type: Number,
      default: 5,
      require: false,
    },
    topBarBaseColor: {
      type: String,
      default: "black",
      require: false,
    },
    topBarCoverColor: {
      type: String,
      default: "orange",
      require: false,
    },
    // LEFT
    leftBarHeightPx: {
      type: Number,
      default: 5,
      require: false,
    },
    leftBarBaseColor: {
      type: String,
      default: "black",
      require: false,
    },
    leftBarCoverColor: {
      type: String,
      default: "orange",
      require: false,
    },
    // BOTTOM
    bottomBarHeightPx: {
      type: Number,
      default: 5,
      require: false,
    },
    bottomBarBaseColor: {
      type: String,
      default: "black",
      require: false,
    },
    bottomBarCoverColor: {
      type: String,
      default: "orange",
      require: false,
    },
    // Right
    rightBarHeightPx: {
      type: Number,
      default: 5,
      require: false,
    },
    rightBarBaseColor: {
      type: String,
      default: "black",
      require: false,
    },
    rightBarCoverColor: {
      type: String,
      default: "orange",
      require: false,
    },
  },
  computed: {},
  mounted() {},
  methods: {
    clickLeftSq(event){
      this.$emit('LeftSqClick', '')
      event.stopPropagation();
    },
    clickMiddleSq(){
      this.$emit('MiddleSqClick', '')
    },
    flowboard_mouseenter() {
      this.isCover = true;
    },
    flowboard_mouseleave(){
      this.isCover = false;
    },
    Style() {
      let Base = `
          width:${this.baseWidth}px;
          height:${this.baseHeight}px;
          background-color: ${
            this.isSelected
              ? this.selectedBaseColor
              : this.isCover
              ? this.coverBaseColor
              : this.originBaseColor
          };
          position: relative;
      `;

      let MiddleSq = `
          position: absolute;
          top:0;
          left:0;
          width:${this.baseWidth}px;
          height:${this.baseHeight}px;
          display:flex;
          justify-content: center;
          align-items: center;
      `;

      let LeftSq = `
        position: absolute;
        top:0;
        left:0;
        width: ${this.leftSqWidth}px;
        height: ${this.baseHeight}px;
        background-color: ${
          this.isCover ? this.leftSqCoverColor : this.leftSqBaseColor
        };
      `;

      let TopBar = `
        position: absolute;
        top:0;
        left:0;
        width: ${this.baseWidth}px;
        height: ${this.topBarHeightPx}px;
        background-color: ${
          this.isCover ? this.topBarCoverColor : this.topBarBaseColor
        };
      `;

      let BottomBar = `
        position: absolute;
        top:${this.baseHeight - this.bottomBarHeightPx}px;
        left:0;
        width: ${this.baseWidth}px;
        height: ${this.bottomBarHeightPx}px;
        background-color: ${
          this.isCover ? this.bottomBarCoverColor : this.bottomBarBaseColor
        };
      `;

      let LeftBar = `
        position: absolute;
        top:0;
        left:0;
        width: ${this.leftBarHeightPx}px;
        height: ${this.baseHeight}px;
        background-color: ${
          this.isCover ? this.leftBarCoverColor : this.leftBarBaseColor
        };
      `;

      let RightBar = `
        position: absolute;
        top:0;
        left:${this.baseWidth - this.rightBarHeightPx}px;
        width: ${this.rightBarHeightPx}px;
        height: ${this.baseHeight}px;
        background-color: ${
          this.isCover ? this.rightBarCoverColor : this.rightBarBaseColor
        };
      `;

      return {
        Base,
        MiddleSq,
        LeftSq,
        TopBar,
        BottomBar,
        LeftBar,
        RightBar,
      };
    },
  },
};
</script>

<style scoped>
</style>
