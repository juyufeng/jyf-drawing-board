<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
import VConsole from "vconsole";
import moment from "moment";

export default {
  name: "app",
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    postMessage() {
      return this.$store.getters.postMessage;
    },
    clientMessage() {
      return this.$store.getters.receivedMessage;
    },
  },
  watch: {
    postMessage: {
      handler(newData, oldData) {
        this.dispatchMessage(newData);
      },
      deep: true,
      immediate: false,
    },
  },
  beforeCreate() {
    let w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    this.$store.dispatch("setClientWidth", w);
    this.$store.dispatch("setClientHeight", h);
  },
  created() {
    // new VConsole();
  },
  mounted() {
    this.$store.dispatch(
      "setPostMessage",
      JSON.stringify({
        NAME: "加载状态",
        DESC: "success",
        Time: moment(new Date()).format("YYYYMMDDHHmmss"),
      })
    );

    // 客户端->H5
    eventbus.on("_macOSCalljs", (e) => {
      let data = e.data;
      if (data) {
        let json = this.$jyf.Base64_Decode(data);
        let obj = JSON.parse(json);
        this._receivedMessageFromMacOS(obj);
      }
    });

    // 监听窗体变化
    window.onresize = () => {
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      let h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      this.$store.dispatch("setClientWidth", w);
      this.$store.dispatch("setClientHeight", h);
    };
  },
  methods: {
    // H5->客户端
    dispatchMessage(message) {
      // H5->OC
      this._dispatchMessageToMacOS(message);
    },
    // 客户端->H5
    receivedMessage(message) {
      this.$store.dispatch("setReceivedMessage", message);
    },
    _dispatchMessageToMacOS(message) {
      // 当为产线环境
      if (window.location.href.indexOf("localhost") === -1) {
        window.webkit.messageHandlers.bytefire.postMessage(message);
      }
    },
    _receivedMessageFromMacOS(message) {
      this.receivedMessage(message);
    },
  },
};
</script>

<style>
</style>
