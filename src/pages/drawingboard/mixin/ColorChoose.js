
export default {
  data() {
    return {
      maxPaletteColors: 28,
      color: "#E34F51", //画笔颜色
      presetColors: [
        // 1
        "rgb(113,191,249)",
        "rgb(147,241,230)",
        "rgb(163,247,106)",
        "rgb(253,241,113)",
        "rgb(242,155,145)",
        "rgb(242,154,200)",
        "rgb(213,213,213)",

        // 2
        "rgb(68,159,248)",
        "rgb(104,227,207)",
        "rgb(127,214,83)",
        "rgb(250,219,88)",
        "rgb(238,110,86)",
        "rgb(237,83,159)",
        "rgb(146,146,146)",

        // 3
        "rgb(47,116,181)",
        "rgb(73,169,143)",
        "rgb(81,174,50)",
        "rgb(243,177,62)",
        "rgb(220,59,38)",
        "rgb(196,49,117)",
        "rgb(94,94,94)",

        // 4
        "rgb(28,76,124)",
        "rgb(43,106,101)",
        "rgb(46,111,29)",
        "rgb(227,121,46)",
        "rgb(167,43,23)",
        "rgb(139,32,82)",
        "rgb(0,0,0)",
      ],
    }
  },
  computed: {
    lineColorPickerWrapper() {
      return this.$refs.lineColorPickerWrapper;
    },
    containerColorPickerWrapper() {
      return this.$refs.containerColorPickerWrapper;
    },
    wordColorPickerWrapper() {
      return this.$refs.wordColorPickerWrapper;
    },
    bgc() {
      return (color) => {
        return {
          width: "40px",
          height: "40px",
          backgroundColor: color,
        };
      };
    },
  },
  methods: { 
    
  }
}
