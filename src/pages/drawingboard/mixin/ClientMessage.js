import { setToken } from "@/utils/auth.js"

export default {
  data() {
    return {

    }
  },
  computed: {
    clientMessage() {
      return this.$store.getters.receivedMessage;
    },
  },
  watch: {
    clientMessage: {
      handler(newData, oldData) {
        this.parseClientMessage(newData);
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    parseClientMessage(newData) {
      /*
         // 触发行为
          @"Uni_Action": @"初始化",
          // 设备
          @"Uni_Device": @"macOS",
          // UUID
          @"Uni_UUID":[ToolManager getUUID],
          // 本地有Token
          @"Uni_Token": (NSString *)[DCObjManager dc_readUserDataForKey:@"TOKEN"],
          // 不显示LoginView 直接登录;
          @"Uni_ShowUserLoginView": [ToolManager ShowIntroduce] ? @true : @false,
          // 是否需要展示IntroduceView
          @"Uni_ShowIntroduceView": @false                     
      */
      if (newData.Uni_Action === '初始化') {
        if (newData.Uni_Device === 'macOS') {
          this.showMacTop = true;
        }
        this.showUserLoginView = newData.Uni_ShowUserLoginView;
        this.showIntroduce = newData.Uni_ShowIntroduceView;
        setToken(newData.Uni_Token);
      }
      if (newData.Uni_Action === 'OC事件穿透') {
        this.mouseDidDown = newData.Uni_MouseDidDown;
      }
      if (newData.Uni_Action === 'OC状态栏事件') {
        setTimeout(() => {
          this.showTest = newData.showTest == 1;
        }, 500);
      }
      console.log(JSON.stringify(newData))
      // end
    }
  }
}
