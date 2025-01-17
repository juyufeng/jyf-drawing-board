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
      <div style="margin-bottom: 15px">
        <van-image
          width="100"
          height="100"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </div>
      <div
        style="
          font-size: 20px;
          font-weight: 700;
          color: rgb(211, 90, 80);
          margin-bottom: 18px;
        "
      >
        暂无网络!
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
 
  },
};
</script>

<style scoped>

</style>
