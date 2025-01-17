<template>
  <div
    :style="Style()['Base']"
    @mouseenter="flowboard_mouseenter"
    @mouseleave="flowboard_mouseleave"
    @click="clickLoginBaseView"
  >
    <div style="display: flex; flex-direction: row">
      <!-- 登录组件 -->
      <div class="loginMod">
        <!-- Logo -->
        <div style="margin-bottom: 15px">
          <van-image
            width="100"
            height="100"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
        </div>
        <!-- 标题 -->
        <div class="titleClass">夸克画板</div>
        <!-- 输入组件 -->
        <van-cell-group
          :border="false"
          :inset="true"
          style="margin-bottom: 5px; background-color: red"
        >
          <!-- 手机号 -->
          <van-field
            size="large"
            v-model="phone"
            type="number"
            label="手机号 +86"
            maxlength="11"
            minlength="11"
            placeholder="请输入手机号"
          />
          <!-- 图形验证码 -->
          <van-field
            ref="captchaRef"
            v-if="canShowImageCaptchaField"
            size="large"
            v-model="captcha"
            maxlength="4"
            minlength="4"
            label="图形验证码"
            center
            placeholder="图形验证码"
          >
            <template #button>
              <img
                @click="phoneCodeImage()"
                style="
                  width: 80px;
                  height: 35px;
                  margin-bottom: -8px;
                  cursor: pointer;
                "
                :src="captchaImageUrl"
              />
            </template>
          </van-field>
          <!-- 短信验证码 -->
          <van-field
            v-if="canShowPhoneCodeField"
            ref="phoneCode"
            size="large"
            type="number"
            v-model="code"
            maxlength="6"
            minlength="6"
            label="短信验证码"
            center
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button
                @click="clickSendPhoneCode"
                :loading="phoneCodeLoading"
                size="small"
                color="rgb(211,90,80)"
                >{{ phonecodeModel.timerTag }}</van-button
              >
            </template>
          </van-field>
        </van-cell-group>

        <div
          style="
            color: rgb(120, 120, 120);
            font-size: 13px;
            margin-bottom: 15px;
            width: 300px;
          "
        >
          无需注册，登录即注册。
        </div>

        <van-button
          @click="clickLogin"
          style="width: 100%; margin-bottom: 10px"
          size="normal"
          color="rgb(211,90,80)"
          :loading="loading"
          loading-type="spinner"
          :disabled="!canShowHightLoginBtn"
          >手机号登录</van-button
        >

        <div
          style="color: red; font-size: 12px; margin-bottom: 5px"
          v-if="!checkedAgreeBytefire"
        >
          先勾选《服务条款》《隐私政策》，再登录
        </div>

        <van-checkbox
          v-model="checkedAgreeBytefire"
          icon-size="16"
          checked-color="rgb(211,90,80)"
          style="font-size: 13px"
        >
          我已阅读，同意拜特火种<span
            @click.stop="clickService"
            style="color: rgb(211, 90, 80)"
            >《服务条款》</span
          ><span @click.stop="clickPolicy" style="color: rgb(211, 90, 80)"
            >《隐私政策》</span
          >
        </van-checkbox>
      </div>
      <!-- 服务条款 -->
      <div v-if="serviceShow" class="serviceClass">
        <div v-html="serviceHtml"></div>
      </div>
      <!-- 隐私政策 -->
      <div v-if="policyShow" class="policyClass">
        <div v-html="policyHtml"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendPhoneCode, privacyPolicy, termsService } from "@/api/user.js";
import {
  Icon,
  Image,
  CellGroup,
  Field,
  Button,
  Checkbox,
  CheckboxGroup,
} from "vant";
import moment from "moment";
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
      phone: undefined,
      code: undefined,
      captcha: undefined,
      captchaImageUrl: undefined,

      phonecodeModel: {
        timer: undefined,
        timerDur: 60,
        count: 1,
        showCounting: false,
        timerTag: "获取验证码",
      },

      policyHtml: undefined,
      policyShow: false,

      serviceHtml: undefined,
      serviceShow: false,

      phoneCodeLoading: false,

      checkedAgreeBytefire: true,
      checkedAutoLogin: true,
      isCover: false,
    };
  },
  watch: {
    // 当用户输入11位手机号, 立马切换光标
    phone(data) {
      if (data) {
        if (data.length === 11) {
          this.$nextTick(() => {
            this.phoneCodeImage();
          });
        }
      }
    },
  },
  props: {
    // base
    loading: {
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
    canShowImageCaptchaField() {
      if (this.phone) {
        return this.checkedAgreeBytefire && this.phone.length === 11;
      } else {
        return false;
      }
    },
    canShowPhoneCodeField() {
      if (this.phone && this.captcha) {
        return (
          this.checkedAgreeBytefire &&
          this.phone.length === 11 &&
          this.captcha.length === 4
        );
      } else {
        return false;
      }
    },
    canShowHightLoginBtn() {
      if (this.phone && this.captcha && this.code) {
        return (
          this.checkedAgreeBytefire &&
          this.phone.length === 11 &&
          this.captcha.length === 4
        );
      } else {
        return false;
      }
    },
  },
  created() {
    privacyPolicy().then((res) => {
      this.policyHtml = res.data;
    });
    termsService().then((res) => {
      this.serviceHtml = res.data;
    });
  },
  mounted() {},
  methods: {
    clickLogin() {
      this.$emit("clickLogin", {
        phone: this.phone,
        captcha: this.captcha,
        code: this.code,
      });
    },
    // 获取or点击验证码图形
    phoneCodeImage() {
      this.$refs.captchaRef.focus();
      if (this.phone && this.phone.length === 11) {
        this.captchaImageUrl =
          "http://39.100.88.196/api/ByteFire/Auth/" +
          this.phone +
          "/" +
          moment(new Date()).format("YYYYMMDDHHmmss") +
          "/phoneCodeImage.jpeg";
      }
    },
    clickLoginBaseView() {
      this.$emit("clickLoginBaseView", "");
    },
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
    // 点击获取手机验证码
    timerRunning() {
      const TIME_COUNT = this.phonecodeModel.timerDur;
      if (!this.phonecodeModel.timer) {
        this.phonecodeModel.count = TIME_COUNT;
        this.phonecodeModel.showCounting = true;
        this.phonecodeModel.timer = setInterval(() => {
          if (
            this.phonecodeModel.count > 1 &&
            this.phonecodeModel.count <= TIME_COUNT
          ) {
            this.phonecodeModel.timerTag = this.phonecodeModel.count;
            this.phonecodeModel.count--;
            // 停止loading
            this.phoneCodeLoading = false;
          } else {
            // 倒计时OK结束
            this.phonecodeModel.showCounting = false;
            clearInterval(this.phonecodeModel.timer);
            this.phonecodeModel.timer = undefined;
            this.phonecodeModel.timerTag = "重新开始";
          }
        }, 1000);
      }
    },
    clickSendPhoneCode() {
      this.phoneCodeLoading = true;
      if (this.phonecodeModel.showCounting === false) {
        // 发送请求
        sendPhoneCode({
          phone: this.phone,
          captcha: this.captcha,
        }).then((res) => {
          // 倒计时
          this.timerRunning();
          // 输入框聚焦
          this.$refs.phoneCode.focus();
        });
      }
    },
    clickService() {
      this.policyShow = false;
      this.serviceShow = true;
    },
    clickPolicy() {
      this.serviceShow = false;
      this.policyShow = true;
    },
  },
};
</script>

<style scoped>
.home-video {
  object-fit: cover; /*这里是关键*/
}
.serviceClass {
  width: 345px;
  height: 570px;
  background-color: rgb(245, 245, 228);
  padding-left: 15px;
  padding-right: 15px;
  overflow: auto;
}
.policyClass {
  width: 345px;
  height: 570px;
  background-color: rgb(245, 238, 245);
  padding-left: 15px;
  padding-right: 15px;
  overflow: auto;
}
.loginMod {
  width: 345px;
  height: 570px;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.titleClass {
  font-size: 20px;
  font-weight: 700;
  color: rgb(211, 90, 80);
  margin-bottom: 18px;
}
</style>
