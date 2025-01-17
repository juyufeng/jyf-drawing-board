export default {
  data() {
    return {
      keyDownContainer: []
    }
  },
  computed: {

  },
  methods: {
    // --------------------------------------------------  操作  --------------------------------------------------
    /**
     * 绑定键盘事件
     */
    osCtrl(e1) {
      return this.$jyf.OSnow() === "mac" ? e1.metaKey : e1.ctrlKey;
    },
    bindKeyBoard() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 =
          e || window.event || arguments.callee.caller.arguments[0];

        let keyCode = e1.keyCode;
        let key = e1.key.toLowerCase() + '';

        // alert(key)

        // Ctrl + Z
        if (key == "z" && this.osCtrl(e1)) {
          this.prevStepOperate();
          return;
        }

        // Ctrl + X
        if (key == "x" && this.osCtrl(e1)) {
          this.nextStepOperate();
          return;
        }

        // 自定义快捷键
        this.keyDownContainer.push({
          key, keyCode
        });
        
        // 优化性能
        if (this.keyDownContainer.filter(v => v.key === 'alt') !== -1) {
          if (this.keyDownContainer.filter(v => v.key === 'shift') !== -1) {
            let hotKeyfilters = this.cacheCurrentKeyboardKeys.filter(v => v.keyCode == keyCode);
            if (hotKeyfilters.length > 0) {
              // 当前点击的主按钮
              let index = hotKeyfilters[0].index;
              let item = this.toolArray[index];
              this.MiddleSqClick(item, index);
              return;
            }
          } else {
            return;
          }
        } else {
          return;
        }
      };
      document.onkeyup = (e) => {
        let e2 =
          e || window.event || arguments.callee.caller.arguments[0];
        let keyCode = e2.keyCode;
        let key = e2.key.toLowerCase() + '';
        this.keyDownContainer = this.keyDownContainer.filter(k => k.keyCode != keyCode);
      };
    },
    /**
     * 操作保存的数据
     */
    operateDataIntoPipe(eraserObjs, currentFuncFrom = undefined) {
      let opsName = this.opsModel.drawingObj.ops.name;
      // alert(opsName);
      if (opsName === "橡皮擦") {
        if (currentFuncFrom === undefined) {
          return;
        }
      } else {
        // 自由划线 和 箭头 既没有点击又没有移动
        if (opsName === "自由划线" || opsName === "箭头") {
          if (!(this.mouseDidMove || this.mouseDidDown)) {
            return;
          }
        } else {
          if (!this.mouseDidMove) {
            return;
          }
        }
      }

      // alert("执行了operateDataIntoPipe 函数");
      let max = this.opsModel.deep;
      // 更新指针位置
      this.opsModel.pointer += 1;
      // ---->
      if (opsName === "橡皮擦") {
        this.opsModel.drawingObj.eraserObjs = eraserObjs;
        this.opsModel.drawingObjs.splice(
          this.opsModel.pointer,
          0,
          this.opsModel.drawingObj
        );
      } else if (opsName === "自由划线" || opsName === "文本") {
        this.opsModel.drawingObj.obj =
          this.canvas._objects[this.canvas._objects.length - 1];
        this.opsModel.drawingObjs.splice(
          this.opsModel.pointer,
          0,
          this.opsModel.drawingObj
        );
      } else {
        this.opsModel.drawingObjs.splice(
          this.opsModel.pointer,
          0,
          this.opsModel.drawingObj
        );
      }
      // <----
      // 考虑到可能存在后续动作，插入队列操作
      if (max && max < this.opsModel.drawingObjs.length) {
        // 深度存在，则判断当前队列长，超出则从头移出队列
        this.opsModel.drawingObjs.shift();
        this.opsModel.pointer -= 1;
      }
    },
    /**
     * 上一步
     */
    prevStepOperate() {
      if (this.opsModel.pointer >= 0) {
        if (
          this.opsModel.drawingObjs[this.opsModel.pointer].ops.name !== "橡皮擦"
        ) {
          this.canvas.remove(
            this.opsModel.drawingObjs[this.opsModel.pointer].obj
          );
        } else {
          // 之前是被橡皮擦擦掉的,  撤销 -> 新增
          let eraserObjs =
            this.opsModel.drawingObjs[this.opsModel.pointer].eraserObjs;
          if (eraserObjs.length > 0) {
            for (let i = 0; i < eraserObjs.length; i++) {
              this.canvas.add(eraserObjs[i]);
            }
          }
        }
        // 加载前一步
        this.opsModel.pointer -= 1;
      }
    },
    /**
     * 下一步
     */
    nextStepOperate() {
      // 指针移动
      if (this.opsModel.pointer >= this.opsModel.drawingObjs.length - 1) {
        return;
      }
      this.opsModel.pointer += 1;
      if (
        this.opsModel.drawingObjs[this.opsModel.pointer].ops.name !== "橡皮擦"
      ) {
        this.canvas.add(this.opsModel.drawingObjs[this.opsModel.pointer].obj);
      } else {
        // 之前是被橡皮擦擦掉的,  回滚 -> 用橡皮擦
        let eraserObjs =
          this.opsModel.drawingObjs[this.opsModel.pointer].eraserObjs;
        if (eraserObjs.length > 0) {
          for (let i = 0; i < eraserObjs.length; i++) {
            this.canvas.remove(eraserObjs[i]);
          }
        }
      }
    },

  }
}
