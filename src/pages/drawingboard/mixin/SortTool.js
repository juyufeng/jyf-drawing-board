import { Notify } from 'vant';

export default {
  data() {
    return {
      
    }
  },
  computed: {

  },
  methods: {
    // Sort排序
    sorttoolArray(list) {
      return list.map((v, k) => {
        const obj = this.$jyf.DeepClone(v)
        obj.Sort = k + 1
        return obj
      })
    },
    // 上移
    clickGoUp(item, index) {
      // 选中则标亮
      this.refreshSelectedBar(item);
      this.goUp(this.toolArray, index)
      this.toolArray = this.sorttoolArray(this.toolArray)
      this.updateCurrentMiddleSqClickIndex();
    },
    // 下移
    clickGoDown(item, index) {
      // 选中则标亮
      this.refreshSelectedBar(item);
      this.goDown(this.toolArray, index)
      this.toolArray = this.sorttoolArray(this.toolArray)
      this.updateCurrentMiddleSqClickIndex();
    },
    // 置顶
    clickToTop(item, index) {
      // 选中则标亮
      this.refreshSelectedBar(item);
      this.toTop(this.toolArray, index)
      this.toolArray = this.sorttoolArray(this.toolArray)
      this.updateCurrentMiddleSqClickIndex();
    },
    // 置底
    clickToButtom(item, index) {
      // 选中则标亮
      this.refreshSelectedBar(item);
      // 操作
      this.toButtom(this.toolArray, index)
      this.toolArray = this.sorttoolArray(this.toolArray)
      this.updateCurrentMiddleSqClickIndex();
    },
    refreshSelectedBar(item){
      // 当前排序点击的ID
      this.toolArray.map(v=>{
        if(v.hasOwnProperty('SortSelected')) {
          v.SortSelected = false;
        }
        return v;
      })
      item.SortSelected = true;
    },
    // ---------------------------------------- 上移 下移 置顶 置底 --------------------------------------------
    // ------------------------------------------------------------------------------------------------------
    toTop(fieldData, index) {
      if (index != 0) {
        return fieldData.unshift(fieldData.splice(index, 1)[0])
      }
    },
    goUp(fieldData, index) {
      if (index != 0) {
        return (fieldData[index] = fieldData.splice(
          index - 1,
          1,
          fieldData[index]
        )[0])
      } else {
        return fieldData.push(fieldData.shift())
      }
    },
    goDown(fieldData, index) {
      if (index != fieldData.length - 1) {
        return (fieldData[index] = fieldData.splice(
          index + 1,
          1,
          fieldData[index]
        )[0])
      } else {
        return fieldData.unshift(fieldData.splice(index, 1)[0])
      }
    },
    toButtom(fieldData, index) {
      if (index != fieldData.length - 1) {
        const temp = this.$jyf.DeepClone(fieldData[index])
        fieldData.splice(index, 1)
        fieldData.push(temp)
      }
    },
    // 上下移动后要 - 刷新 - 
    updateCurrentMiddleSqClickIndex() {
      let index = this.toolArray.findIndex((v) => {
        return v.name === this.currentMiddleClickedObj.name;
      });
      this.currentMiddleSqClickIndex = index;
      this.currentLeftSqClickIndex = index;
      this.currentMiddleClickedObj = this.toolArray[index];
    },
    clickSortKeyChange(bar, barIndex) {
      // 锁住状态: 点击了修改按钮
      if (bar.keyboardKeyLock === true) {
        bar.keyboardKeyLock = false
      }
      // 点击了确认按钮
      else {
        if ([
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
          'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ].indexOf(bar.keyboardKey.toLowerCase()) !== -1) {
          // 先去重 去空
          let keyboardKeys = this.toolArray.filter(v => {
            return v.keyboardKey != '' && v.name !== bar.name;
          }).map(v => v.keyboardKey);
          if (keyboardKeys.indexOf(bar.keyboardKey.toLowerCase()) !== -1) {
            Notify({ type: 'danger', message: bar.keyboardKey + '已经被其他快捷键占用!' });
            bar.keyboardKey = '';
          } 
          bar.keyboardKey = bar.keyboardKey.toLowerCase();
          bar.keyboardKeyCode = this.$jyf.keyboardKeyToKeyCode(bar.keyboardKey);
          bar.keyboardKeyLock = true;
        }
        else {
          Notify({ type: 'danger', message: '请输入a~z或0~9' });
          bar.keyboardKeyLock = false;
        }
      }
    }

  }
}
