<template>
  <div
    :style="Style()['Base']"
    @mouseenter="flowboard_mouseenter"
    @mouseleave="flowboard_mouseleave"
  >
    <div
      style="
        width: 345px;
        height: 345px;
        background-color: white;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <video id="video"></video>
      <div
        style="
          font-size: 20px;
          font-weight: 700;
          color: rgb(211, 90, 80);
          margin-bottom: 18px;
        "
      >
        <button @click="beforeStart()">开始录制</button>
        <button @click="stop()">停止录制</button>
        <button @click="replay()">回放</button>
        <button @click="live()">直播</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Icon,
  Image,
  CellGroup,
  Field,
  Button,
  Checkbox,
  CheckboxGroup,
} from "vant";
export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  data() {
    return {
      tracks: [], // 媒体数据
      options: {
        mimeType: "video/webm; codecs = vp8", // 媒体格式
      },
      constraints: {
        audio: true,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      },
      mediaRecorder: "",
      isCover: false,
    };
  },
  props: {
    // base
    isSelected: {
      type: Boolean,
      default: false,
    },
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
    flowboard_mouseenter() {
      this.isCover = true;
    },
    flowboard_mouseleave() {
      this.isCover = false;
    },
    Style() {
      let Base = `
          background-color:rgb(245,245,245);
          display:flex;
          align-items: center;
          justify-content: center;
          width: ${this.www}px;
          height:${this.hhh}px;
      `;
      return {
        Base,
      };
    },

    // 开始录制前
    beforeStart() {
      // 初始化请求用户授权监控
      navigator.mediaDevices.getDisplayMedia(this.constraints).then((stream) => {
        // 对音视流进行操作
        this.start(stream);
      });
    },

    // 开始录制
    start(stream) {
      alert("开始录制");
      window.stream = stream;
      // 创建 MediaRecorder 的实例对象，对指定的媒体流进行录制
      this.mediaRecorder = new MediaRecorder(stream, this.options);
      // 当生成媒体流数据时触发该事件，回调传参 event 指本次生成处理的媒体数据
      this.mediaRecorder.ondataavailable = (event) => {
        if (event) {
          if (event.data) {
            if (event.data.size > 0) {
              this.tracks.push(event.data); // 存储媒体数据
            }
          }
        }
      };
      this.mediaRecorder.start();
    },

    // 结束录制
    stop() {
      if (this.mediaRecorder != undefined) {
        this.mediaRecorder.stop();
        alert("结束录制");
      } else {
        alert("暂无录制");
      }
    },

    // 回放录制内容
    replay() {
      if (this.tracks.length > 0) {
        const video = document.getElementById("video");
        const blob = new Blob(this.tracks, { type: "video/webm" });
        video.src = window.URL.createObjectURL(blob);
        video.srcObject = null;
        video.controls = true;
        video.play();
      } else {
        alert("暂无回放");
      }
    },

    // 直播
    live() {
      alert("开始直播");
      const video = document.getElementById("video");
      video.srcObject = window.stream;
      video.controls = true;
      video.play();
    },
  },
};
</script>

<style scoped>
.home-video {
  /* z-index: 100;
  position: absolute; */
  /* top: 0;
  left: 0; */
  /* min-width: 100%;
  min-height: 100%; */
  object-fit: cover; /*这里是关键*/
  /* width: auto;
  height: auto; */
}
</style>
