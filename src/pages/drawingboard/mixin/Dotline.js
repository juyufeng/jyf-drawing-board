
import dotline01 from "@/assets/pngs/dotline01.png";
import dotline02 from "@/assets/pngs/dotline02.png";
import dotline03 from "@/assets/pngs/dotline03.png";
import dotline04 from "@/assets/pngs/dotline04.png";
import dotline05 from "@/assets/pngs/dotline05.png";
import dotline06 from "@/assets/pngs/dotline06.png";
import dotline07 from "@/assets/pngs/dotline07.png";

export default {
  data() {
    return {
      dotlineList: [
        dotline01,
        dotline02,
        dotline03,
        dotline04,
        dotline05,
        dotline06,
        dotline07,
      ]
    }
  },
  methods: { 
    //  划线类型组件功能
    DrawLineDotTypeClick(item, refresh = false) {
      if (
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineStyle ===
        "直线"
      ) {
        return;
      }
      let unitBarWidth =
        this.toolArray[this.currentLeftSqClickIndex].StateDrawWidth;
      if (
        this.toolArray[this.currentLeftSqClickIndex].hasOwnProperty(
          "StateDrawLineCap"
        )
      ) {
        if (
          this.toolArray[this.currentLeftSqClickIndex].StateDrawLineCap[0] ===
          "圆端"
        ) {
          unitBarWidth =
            this.toolArray[this.currentLeftSqClickIndex].StateDrawWidth * 4;
        }
      }
      if (!refresh) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotChecked =
          item ? [item] : ["等间线X1"];
      }

      let currentCheckedLine = "";
      if (
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotChecked
      ) {
        currentCheckedLine =
          this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotChecked;
      }

      if (currentCheckedLine.toString() === ["等间线X1"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth,
        ];
      }
      if (currentCheckedLine.toString() === ["宽间线X2"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth * 2,
          unitBarWidth,
        ];
      }
      if (currentCheckedLine.toString() === ["宽间线X3"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth * 3,
          unitBarWidth,
        ];
      }
      if (currentCheckedLine.toString() === ["宽间线X4"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth * 4,
          unitBarWidth,
        ];
      }
      if (currentCheckedLine.toString() === ["宽虚线X2"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth,
          unitBarWidth * 2,
        ];
      }
      if (currentCheckedLine.toString() === ["宽虚线X3"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth,
          unitBarWidth * 3,
        ];
      }
      if (currentCheckedLine.toString() === ["宽虚线X4"].toString()) {
        this.toolArray[this.currentLeftSqClickIndex].StateDrawLineDotArray = [
          unitBarWidth,
          unitBarWidth * 4,
        ];
      }
    }
  }
}
