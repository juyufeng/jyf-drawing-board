<template>
  <div @click="ClickMapTop" :style="Style()['Base']"></div>
</template>
<script>
import moment from "moment"; 
export default {
  data() {
    return {};
  },
  methods: {
    Style() {
      let Base = `
        background-color:rgba(230,80,50,  0.2);
        font-size:15px;
        width: 100%;
        height:25px;
      `;
      return {
        Base,
      };
    },
    ClickMapTop() {
      this.$store.dispatch(
        "setPostMessage",
        JSON.stringify({
          NAME: "HideApp",
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
