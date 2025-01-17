<template>
  <div @click="clickTest" :style="Style()['Base']">{{ test }}</div>
</template>
<script>
import moment from "moment"; 
import { Image, Icon } from "vant";
export default {
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
  },
  data() {
    return {};
  },
  props: {
    test: {
      type: String,
      default: "",
    },
  },
  methods: {
    Style() {
      let Base = `
        white-space:pre-wrap;
        word-break:keep-all;
        background-color:black;
        color:white;
        font-size:15px;
        width: 378px;
        height:667px;
        overflow: auto;
      `;
      return {
        Base,
      };
    },
    clickTest() {
      this.$store.dispatch(
        "setPostMessage",
        JSON.stringify({
          NAME: "点击Test",
          DESC: "success",
          Time: moment(new Date()).format("YYYYMMDDHHmmss"),
        })
      );
    },
  },
};
</script>

<style scoped>
</style>
