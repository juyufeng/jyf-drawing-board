export default {
  data() {
    return {
      // 默认是隐藏模式: 是否鼠标移入中, 然后显示/隐藏
      showToolBar: false,
      // 当前ToolBar的模式: 隐藏模式 显示模式
      cacheCurrentShowToolBarModel: undefined,
      cacheCurrentKeyboardKeys: [],
      // 是否显示弹出层
      showPopup: false,
      // 当前点击的主按钮
      currentMiddleClickedObj: undefined,
      currentLeftSqClickIndex: undefined,
      currentMiddleSqClickIndex: undefined,

      toolBarCss: undefined,
      toolWidth: 70,
      copyToolWidth: undefined,
      toolArray: [
        {
          id: 7,
          name: "设置",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/settings.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 36,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",


          AdName: '充值VIP',
          AdImageUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          JumpType: '内部网页',

          KVTitle: '个人信息',
          KeyValues: [
            {
              k: '用户',
              v: '183****2571'
            },
            {
              k: '用户等级',
              v: '初级会员'
            },
            {
              k: '会员到期',
              v: '永久'
            },
          ],

          ToolSqSizeRate: 50,

          LogOut: true,

          OlnyShowByCursorIns: ['是', '否'],
          OlnyShowByCursorIn: ['否'],

          keyboardKey: 'p', keyboardKeyCode: '80', keyboardKeyLock: true,
        },
        {
          id: 0,
          enable: true,
          name: "自由划线",
          isSelected: true,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/autoline.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 28,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          keyboardKey: 's', keyboardKeyCode: '83', keyboardKeyLock: true,
        },
        {
          id: 1,
          enable: true,
          name: "箭头",
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/arrow.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 42,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          keyboardKey: 'a', keyboardKeyCode: '65', keyboardKeyLock: true,
        },
        {
          id: 2,
          enable: true,
          name: "直线",
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/line.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 28,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          StateDrawLineStyle: "直线",
          StateDrawLineDotArray: [12],
          StateDrawLineDotChecked: ["等间线X1"],

          StateDrawLineCaps: ["圆端", "方端"],
          StateDrawLineCap: ["圆端"],

          keyboardKey: 'w', keyboardKeyCode: '87', keyboardKeyLock: true,
        },
        {
          id: 3,
          name: "圆",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/round.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 32,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          StateDrawContainerColorShow: false,
          StateDrawContainerColor: "rgba(255,255,255, 0)",

          StateDrawLineStyle: "直线",
          StateDrawLineDotArray: [12],
          StateDrawLineDotChecked: ["等间线X1"],

          StateDrawTypes: ["圆", "椭圆"],
          StateDrawType: ["圆"],

          keyboardKey: 'r', keyboardKeyCode: '82', keyboardKeyLock: true,
        },
        {
          id: 4,
          name: "等边",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/triangle.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 34,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          StateDrawContainerColorShow: false,
          StateDrawContainerColor: "rgba(255,255,255, 0)",

          StateDrawLineStyle: "直线",
          StateDrawLineDotArray: [12],
          StateDrawLineDotChecked: ["等间线X1"],

          StateDrawTypes: ["等边", "等腰", "直角"],
          StateDrawType: ["等边"],

          StateDrawCornerTypes: [
            { name: "圆角", value: "round" },
            { name: "方角", value: "bevel" },
            { name: "尖角", value: "miter" },
          ],
          StateDrawCornerType: ["round"],

          keyboardKey: 't', keyboardKeyCode: '84', keyboardKeyLock: true,
        },
        {
          id: 5,
          name: "正方形",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/rectangle.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 30,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawWidth: 12,
          StateDrawLineColor: "#ff4d4d",

          StateDrawContainerColorShow: false,
          StateDrawContainerColor: "rgba(255,255,255, 0)",

          StateDrawLineStyle: "直线",
          StateDrawLineDotArray: [12],
          StateDrawLineDotChecked: ["等间线X1"],

          StateDrawTypes: ["矩形", "正方形"],
          StateDrawType: ["矩形"],

          StateDrawCornerTypes: [
            { name: "圆角", value: "round" },
            { name: "方角", value: "bevel" },
            { name: "尖角", value: "miter" },
          ],
          StateDrawCornerType: ["round"],

          keyboardKey: 'f', keyboardKeyCode: '70', keyboardKeyLock: true,
        },
        {
          id: 8,
          name: "文本",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/word.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 30,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          // StateDrawWidth: 12,
          // StateDrawLineColor: "#ff4d4d",

          StateDrawWordFont: 36,
          StateDrawWordColor: "#ff4d4d",
          StateDrawWordColorShow: false,

          StateDrawMode: "closeable",
          StateDrawInfo:
            "提示: 创建文本框时, 按住鼠标左键拖动(而不是双击左键哦~)!",

          keyboardKey: 't', keyboardKeyCode: '84', keyboardKeyLock: true,
        },
        {
          id: 6,
          name: "橡皮擦",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/eraser.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 40,
          leftSqShow: false,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          keyboardKey: 'e', keyboardKeyCode: '69', keyboardKeyLock: true,
        },
        {
          id: 8,
          name: "排序和快捷键",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/more.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 29,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawMode: "closeable",
          StateDrawInfo: "提示:  撤销操作Ctrl(Command)+Z  恢复撤销Ctrl(Command)+X  ",

          keyboardKey: 'l', keyboardKeyCode: '76', keyboardKeyLock: true,
        },
        {
          id: 9,
          name: "鼠标指针",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/cursor.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 32,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          CursorPointerTypes: ["红色呼吸灯", "黄色呼吸灯", "蓝色呼吸灯", "小心心"],
          CursorPointerType: ["黄色呼吸灯"],

          CursorFlashTypes: ["舒缓", "正常", "警示"],
          CursorFlashType: ["正常"],

          CursorPointerEnableTags: ["启用", "不启用"],
          CursorPointerEnableTag: ["不启用"],

          keyboardKey: 'm', keyboardKeyCode: '77', keyboardKeyLock: true,
        },

        {
          id: 10,
          name: "下载",
          enable: true,
          isSelected: false,
          baseWidth: 70,
          baseHeight: 70,
          originBaseColor: "white",
          coverBaseColor: "rgb(240,240,240)",
          selectedBaseColor: "#ff4d4d",
          middleIconNameOrUrl: require("@/assets/svgs/download.svg"),
          middleIconDotShow: false,
          middleIconBadge: "",
          middleIconColor: "",
          middleIconSizePx: 32,
          leftSqShow: true,
          leftSqWidth: 14,
          leftSqBaseColor: "#ff4d4d",
          leftSqCoverColor: "rgb(211,90,80)",
          leftSqInnerIconUrl: require("@/assets/pngs/leftarrow.png"),
          topBarHeightPx: 1,
          topBarBaseColor: "gray",
          topBarCoverColor: "rgb(211,90,80)",
          rightBarHeightPx: 1,
          rightBarBaseColor: "gray",
          rightBarCoverColor: "rgb(211,90,80)",
          bottomBarHeightPx: 1,
          bottomBarBaseColor: "gray",
          bottomBarCoverColor: "rgb(211,90,80)",
          leftBarHeightPx: 1,
          leftBarBaseColor: "gray",
          leftBarCoverColor: "rgb(211,90,80)",

          StateDrawMode: "closeable",
          StateDrawInfo:
            "在Win10中同时按下Win+ Shift+S组合键便可进入截屏模式，在macOS中同时按下command+shift+4组合键便可进入截屏模式。",

          DownloaderTypes: ["png", "jpg", "bmp", "webp"],
          DownloaderType: ["png"],

          keyboardKey: 'd', keyboardKeyCode: '68', keyboardKeyLock: true,

        },
      ],
      copyToolArray: [],
    }
  },
  created() {
    this.ToolBarInit();
  },
  methods: {
    ToolBarInit() {
      // 初始化 是否显示showToolBar
      let i = this.toolArray.findIndex(v => v.name === '设置');
      if (i !== -1) {
        this.cacheCurrentShowToolBarModel = this.toolArray[i].OlnyShowByCursorIn[0] === '是' ? '隐藏模式' : '显示模式';
      }
      //  --- 修改初始化数据 - 因为必须要能展示出11个
      let hhh = this.$store.getters.clientHeight;
      let toTop = 150;
      let autoInitWidthByNumber_Max70 = ((hhh - toTop * 2) / this.toolArray.length) > 70 ? 70 : ((hhh - toTop * 2) / this.toolArray.length);
      let autoInitWidthByNumber_Max70_Rate = autoInitWidthByNumber_Max70 / 70;
      this.toolArray = this.toolArray.map(v => {
        v.baseWidth = autoInitWidthByNumber_Max70;
        v.baseHeight = autoInitWidthByNumber_Max70;
        v.middleIconSizePx = v.middleIconSizePx * autoInitWidthByNumber_Max70_Rate;
        v.leftSqWidth = v.leftSqWidth * autoInitWidthByNumber_Max70_Rate;
        return v;
      });
      this.toolWidth = autoInitWidthByNumber_Max70;
      this.copyToolWidth = this.toolWidth;
      //  ---  以上是 根据设备来自适应 
      this.copyToolArray = this.$jyf.DeepClone(this.toolArray);;
      this.ToolStyle();
    },
    ToolStyle() {
      let www = this.$store.getters.clientWidth;
      let hhh = this.$store.getters.clientHeight;
      let toolWidth = this.toolWidth;
      let toolHeight = this.toolArray.filter(v => v.enable).length * toolWidth;
      this.toolBarCss = `
        position:absolute;
        background-color:transparent;
        top:${(hhh - toolHeight) / 2}px;
        left:${www - toolWidth}px;
        width:${toolWidth}px;
        height:${toolHeight}px;
        pointer-events:${this.mouseDidDown ? 'none' : 'auto'};
        display:flex;
        flex-direction:column;
      `;
    },
    LeftSqClick(item, index) {
      if (index !== this.currentMiddleSqClickIndex) {
        return;
      }
      this.showPopup = true;
      this.currentLeftSqClickIndex = index;
    },
    MiddleSqClick(item, index) {
      // if (item.name === "设置") {
      //   this.$store.dispatch(
      //     "setPostMessage",
      //     JSON.stringify({
      //       NAME: "窗口状态",
      //       DESC: "退出全屏",
      //       Time: moment(new Date()).format("YYYYMMDDHHmmss"),
      //     })
      //   );
      // } else if (item.name === "撤销") {
      //   this.prevStepOperate();
      // } else if (item.name === "回滚") {
      //   this.nextStepOperate();
      // } else {
      //   this.markSharpButtonSelectedState(index);
      //   this.clickSharpToolButton(item);
      // }
      this.markSharpButtonSelectedState(index);
      this.clickSharpToolButton(item);
      // 过滤弹窗
      if (["撤销", "回滚"].indexOf(item.name) === -1) {
        this.currentMiddleClickedObj = item;
        this.currentMiddleSqClickIndex = index;
        this.setOpsModel();
      }
    },
    // 点击 MiddleSq 中白名单按钮
    clickSharpToolButton(item) {
      this.canvas.isDrawingMode = false;
      if (this.textbox) {
        //退出文本编辑状态
        this.textbox.exitEditing();
        this.textbox = null;
      }
      if (item.name == "自由划线") {
        this.canvas.isDrawingMode = true;
        this.canvas.selectable = false;
        this.canvas.selection = false;
      } else if (item.name == "橡皮擦") {
        this.canvas.selection = true;
        this.canvas.skipTargetFind = false;
        this.canvas.selectable = true;
      }
      else if (item.name == "设置") {
        this.doUserSettings();
      }
      else if (item.name == "下载") {
        this.downloadByFabric();
      }
      else {
        this.canvas.skipTargetFind = true; //画板元素不能被选中
        this.canvas.selection = false; //画板不显示选中
      }
    },
    // 选择是否 当鼠标移入时才显示toolBar
    clickOlnyShowByCursorIn(tab) {
      this.toolArray[this.currentLeftSqClickIndex].OlnyShowByCursorIn = [tab];
      this.cacheCurrentShowToolBarModel = tab === '是' ? '隐藏模式' : '显示模式';
    },
    // 遍历标记状态
    markSharpButtonSelectedState(index) {
      this.toolArray
        .filter((v) => ["撤销", "回滚"].indexOf(v.name) === -1)
        .forEach((v, i) => {
          // 当前选中的那一个
          if (index === i) {
            this.toolArray[i].isSelected = true;
          } else {
            this.toolArray[i].isSelected = false;
          }
        });
    },
    // 关闭popview
    closePopup() {
      // 刷新toolBar尺寸/排序Lock
      this.resizeToolBar();
      // 刷新toolBar 样式
      this.ToolStyle();
      // 刷新并更新本地快捷键组
      this.refreshKeyboard();

    },
    refreshKeyboard() {
      this.cacheCurrentKeyboardKeys = [];
      // 所有键盘的键
      let keyboardKeyObjs = this.toolArray.filter(v => {
        return v.keyboardKey != '';
      }).map(v => {
        return {
          'keyboardKey': v.keyboardKey,
          'keyboardKeyCode': v.keyboardKeyCode
        }
      });
      if (keyboardKeyObjs.length > 0) {
        for (let i = 0; i < keyboardKeyObjs.length; i++) {
          this.cacheCurrentKeyboardKeys.push({
            key: keyboardKeyObjs[i].keyboardKey,
            keyCode: keyboardKeyObjs[i].keyboardKeyCode,
            index: this.toolArray.findIndex(v => v.keyboardKey === keyboardKeyObjs[i].keyboardKey),
          });
        }
      }
    },
    // 当关闭popview时刷新toolBar尺寸
    resizeToolBar() {
      let i = this.toolArray.findIndex(v => v.name === '设置');
      if (i !== -1) {
        let currentRate = this.toolArray[i].ToolSqSizeRate / 50;
        this.toolWidth = this.copyToolWidth * currentRate;

        this.toolArray = this.toolArray.map(v => {
          // 排序Lock全部置为false  选中的高亮置为false
          v.keyboardKeyLock = true;
          if(v.hasOwnProperty('SortSelected')) {
            v.SortSelected = false;
          }

          // 尺寸功能
          let oriIndex = this.copyToolArray.findIndex(vv => vv.id === v.id);

          let baseWidth = this.copyToolArray[oriIndex].baseWidth;
          let baseHeight = this.copyToolArray[oriIndex].baseHeight;
          let middleIconSizePx = this.copyToolArray[oriIndex].middleIconSizePx;
          let leftSqWidth = this.copyToolArray[oriIndex].leftSqWidth;

          v.baseWidth = baseWidth * currentRate;
          v.baseHeight = baseHeight * currentRate;
          v.middleIconSizePx = middleIconSizePx * currentRate;
          v.leftSqWidth = leftSqWidth * currentRate;

          return v;
        });
      }
    }
    //
  }
}
