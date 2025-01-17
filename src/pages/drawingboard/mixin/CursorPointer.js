


export default {
  data() {
    return {
      cursorPointerCSSEnable: false,
      cursorPointerCSS: 'cursorPointerCSS_Yellow_Time2'
    }
  },
  methods: {
    checkCursorPointerEnableTag(tab) {
      this.toolArray[this.currentLeftSqClickIndex].CursorPointerEnableTag = [
        tab,
      ];
      this.cursorPointerCSSEnable = tab === "启用";
    },
    ShowMousePointerView() {
      let currentDivWWW = 60;
      // 注意: top left 不是鼠标坐标, 是div的左上角xy坐标
      let top = this.cursorPointer.y - currentDivWWW / 2;
      let left = this.cursorPointer.x - currentDivWWW / 2;
      
      // 上边距 - 超出边距
      if(top <=0) {
        top = 0;
      }
      // 下边距 - 超出边距
      if(top >= this.hhh - currentDivWWW) {
        top = this.hhh - currentDivWWW;
      }
      // 左边距 - 超出边距
      if(left <= 0) {
        left = 0;
      }
      // 右边距 - 超出边距
      if(left >= this.www - currentDivWWW) {
        left = this.www - currentDivWWW;
      }
      
      return `
          pointer-events: none;
          z-index: 999;
          position: absolute;
          top:${top}px;
          left:${left}px;
        `;
    },
    checkCursorPointer(tab) {
      this.toolArray[this.currentLeftSqClickIndex].CursorPointerType = [
        tab,
      ];
      this.toolArray[this.currentLeftSqClickIndex].name = tab;
      if (tab === "红色呼吸灯") {
        this.cursorPointerCSS = 'cursorPointerCSS_Red_Time2';
        this.checkCursorFlashPointer(this.toolArray[this.currentLeftSqClickIndex].CursorFlashType[0]);
      }
      else if (tab === '黄色呼吸灯') {
        this.cursorPointerCSS = 'cursorPointerCSS_Yellow_Time2';
        this.checkCursorFlashPointer(this.toolArray[this.currentLeftSqClickIndex].CursorFlashType[0]);
      }
      else if (tab === '蓝色呼吸灯') {
        this.cursorPointerCSS = 'cursorPointerCSS_Blue_Time2';
        this.checkCursorFlashPointer(this.toolArray[this.currentLeftSqClickIndex].CursorFlashType[0]);
      }
      else if (tab === '小心心') {
        this.cursorPointerCSS = 'cursorPointerCSS_Heart';
      }
    },
    checkCursorFlashPointer(tab)
    {
      this.toolArray[this.currentLeftSqClickIndex].CursorFlashType = [
        tab,
      ];
      // ["舒缓", "正常", "警示"]
      if (tab === "舒缓")
      {
        if(this.cursorPointerCSS.indexOf('_Time') === -1) {
          this.cursorPointerCSS +=  '_Time4';
        }else{
          this.cursorPointerCSS = this.cursorPointerCSS.split('_Time')[0] + '_Time4';
        }
      }
      else if (tab === '正常')
      {
        if(this.cursorPointerCSS.indexOf('_Time') === -1) {
          this.cursorPointerCSS +=  '_Time2';
        }else{
          this.cursorPointerCSS = this.cursorPointerCSS.split('_Time')[0] + '_Time2';
        }
      }
      else if (tab === '警示')
      {
        if(this.cursorPointerCSS.indexOf('_Time') === -1) {
          this.cursorPointerCSS +=  '_Time1';
        }else{
          this.cursorPointerCSS = this.cursorPointerCSS.split('_Time')[0] + '_Time1';
        }
      }
    }
  }
}
