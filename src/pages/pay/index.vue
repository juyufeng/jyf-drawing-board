<template>
  <div
    :style="Style()['Base']"
    @mouseenter="flowboard_mouseenter"
    @mouseleave="flowboard_mouseleave"
  >
    <div class="Title">
      <div>
        当前账户：VIP会员仅剩 <span style="color: red">21</span> 
        天，升级到<span style="color: red">永久会员</span
        >仅需<span style="color: red; font-size: 20px; font-weight: 600"
          >280</span
        >元！
      </div>
      <van-icon @click="closePage" style="cursor: pointer" size="20" name="close" />
    </div>
    <div class="Box">
      <div class="Item">
        <van-icon name="gem" />
        <div>13元/月</div>
      </div>
      <div class="ItemBar"></div>
      <div class="Item">
        <van-icon name="gem" />
        <div class="through">39元/3个月</div>
        <div>30元/3个月</div>
        <div style="color:red;font-size:15px;">限时：7.7折</div>
      </div>
      <div class="ItemBar"></div>
      <div class="Item">
        <van-icon name="gem" />
        <div class="through">156元/1年</div>
        <div>78元/1年</div>
        <div style="color:red;font-size:15px;">限时：5折</div>
      </div>
      <div class="ItemBar"></div>
      <div class="Item">
        <van-icon name="gem" />
         <div class="through">468元/3年</div>
        <div>158元/3年</div>
        <div style="color:red;font-size:15px;">限时：3.3折</div>
      </div>
      <div class="ItemBar"></div>
      <div
        style="
          font-size: 28px;
          font-weight: 600;
          background-color: rgb(248, 208, 108);
          color: rgb(115, 101, 34);
        "
        class="Item"
      >
        <van-icon name="gem" />
        <div>280元</div>
        <div>永久会员</div>
      </div>
    </div>
    <div class="Foot">
      <div class="btn">打赏开发者</div>
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
          background-color:rgb(245,235,245);
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: ${this.www}px;
          height:${this.hhh}px;
      `;

      return {
        Base,
      };
    },
    closePage() {
       this.$emit("closePage", '');
    }
  },
};
</script>

<style scoped>
.Item {
  width: 19.2%;
  height: 100%;
  background-color: rgb(230, 230, 245);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ItemBar {
  width: 1%;
  height: 100%;
  background-color: white;
}
.Box {
  width: 60%;
  height: 40%;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.Title {
  background-color: white;
  width: 60%;
  padding: 15px 15px 0px 15px;
  font-size: 15px;
  font-weight: 500;
  color: rgb(70, 60, 60);
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}
.Foot {
  background-color: white;
  width: 60%;
  padding: 0px 15px 15px 15px;
  font-size: 15px;
  font-weight: 500;
  color: rgb(70, 60, 60);
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.btn {
  border-radius: 4px;
  padding: 5px;
  width: 100px;
  text-align: center;
  background-color: rgb(255, 40, 40);
  color: white;
  font-size: 14px;
  cursor: pointer;
}
.through {
  color:rgb(170,170,170);
  text-decoration:line-through;
}
</style>
