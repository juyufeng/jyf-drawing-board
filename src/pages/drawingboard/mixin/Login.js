import { userAuthention } from "@/api/user.js"
import { setToken } from "@/utils/auth.js"
import moment from "moment"
export default {
  data() {
    return {
      showUserLoginView: false,
      loginLoading: false,
    }
  },

  computed: {

  },
  methods: {
    clickLogin(data) {
      this.loginLoading = true;
      userAuthention({
        phone: data.phone,
        code: data.code,
        captcha: data.captcha
      }).then(res => {
        //  let user = res.data
        this.$store.dispatch(
          "setPostMessage",
          JSON.stringify({
            NAME: "保存",
            DESC: "保存TOKEN",
            TOKEN: res.data.token
          })
        );
        // 存到本地localStorage
        setToken(res.data.token);
        this.showUserLoginView = false;
        this.loginLoading = false;
      }).catch(err => {
        this.loginLoading = false;
      })
    },
    clickLoginOut() {
      this.showPopup = false;
      setTimeout(() => {
        this.showUserLoginView = true;
      }, 500);
      // 发送给客户端
      this.$store.dispatch(
        "setPostMessage",
        JSON.stringify({
          NAME: "登录状态",
          DESC: "退出登录",
          Time: moment(new Date()).format("YYYYMMDDHHmmss"),
        })
      );
      console.log('H5->OS :登录状态')
    }

  }
}
