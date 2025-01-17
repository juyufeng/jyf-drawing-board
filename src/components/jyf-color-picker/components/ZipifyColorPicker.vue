<template>
  <div ref="kksPickerWrapper">
    <slot name="activator" :toggle="toggle" :open="open" />
    <transition
      name="zpc-animate"
      :duration="{ enter: durationEnter, leave: durationLeave }"
      @after-leave="completeClose"
    >
      <div
        role="application"
        ref="colorPicker"
        aria-label="Zipify color picker"
        class="zpc"
        :class="colorPickerClasses"
        v-if="isVisible"
      >
        <div class="zpc-saturation-wrap">
          <Saturation :value="colorModel" @change="onSaturationChanged" />
        </div>

        <div class="zpc-controls">
          <div class="zpc-sliders">
            <div class="zpc-hue-wrap">
              <Hue v-model="colorModel" @change="onHueChange" />
            </div>
            <div class="zpc-alpha-wrap">
              <Alpha
                :color="colorModel"
                :alpha-value="alphaValue"
                @change="changeAlpha"
              />
            </div>
          </div>
        </div>

        <div class="zpc-field">
          <!-- rgba -->
          <div class="zpc-field--double">
            <div class="zpc-editable-input">
              <span class="zpc-input__label">HEX</span>
              <input
                aria-labelledby="hex"
                class="zpc-input__input"
                :value="colorModel.hex"
                @change="onHexChanged"
                @keydown.enter.prevent="onHexChanged"
              />
            </div>
          </div>
          <div class="zpc-field--single">
            <EditableInput
              label="r"
              :value="colorModel.r"
              :min="0"
              :max="255"
              @change="changeR"
            />
          </div>
          <div class="zpc-field--single">
            <EditableInput
              label="g"
              :value="colorModel.g"
              :min="0"
              :max="255"
              @change="changeG"
            />
          </div>
          <div class="zpc-field--single">
            <EditableInput
              label="b"
              :value="colorModel.b"
              :min="0"
              :max="255"
              @change="changeB"
            />
          </div>
          <div class="zpc-field--single">
            <EditableInput
              label="Alpha"
              :value="alphaValue"
              :min="0"
              :max="100"
              @change="changeAlpha"
            />
          </div>
        </div>

        <div
          class="zpc-presets"
          role="group"
          aria-label="A color preset, pick one to set as current color"
          v-if="presetColors.length"
        >
          <Swatch
            v-for="color in presetColors"
            :key="generateKeyForSwatch(color)"
            :color="color"
            @selected="handlePreset"
            class="zpc-presets-color"
            :class="isCurrentColor(color)"
          />
        </div>

        <div
          class="zpc-presets"
          role="group"
          aria-label="A color preset, pick one to set as current color"
          v-if="palette.length"
        >
          <div style="color: rgb(190, 190, 190); font-size: 12px">历史颜色</div>
          <Swatch
            v-for="color in palette"
            :key="generateKeyForSwatch(color)"
            :color="color"
            @selected="handlePreset"
            class="zpc-presets-color"
            :class="isCurrentColor(color)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Alpha, EditableInput, Swatch, Saturation, Hue } from "./common/";
import { ColorModel } from "../models";
import { uniquIDs, popperCreator } from "../helpers";

export default {
  name: "ZipifyColorPicker",

  components: {
    Saturation,
    Hue,
    Alpha,
    EditableInput,
    Swatch,
  },

  model: {
    prop: "color",
  },

  props: {
    showPicker: {
      type: Boolean,
      required: false,
    },

    color: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: false,
      default: "rgba",
    },

    paletteKey: {
      type: String,
      required: false,
      default: "colorpicker.palate",
    },

    maxPaletteColors: {
      type: Number,
      required: false,
      default: 14,
    },

    presetColors: {
      type: Array,
      required: false,
      default: () => [],
    },

    isOverTop: {
      type: Boolean,
      required: false,
      default: false,
    },

    durationEnter: {
      type: Number,
      required: false,
      default: 150,
    },

    durationLeave: {
      type: Number,
      required: false,
      default: 100,
    },

    placement: {
      type: String,
      required: false,
      default: "bottom-end",
    },
  },

  data: () => ({
    isVisible: false,
    colorModel: {},
    oldValue: "",
    palette: [],
  }),

  computed: {
    alphaValue() {
      return Math.round(this.colorModel.alpha * 100);
    },

    colorPickerClasses() {
      return this.isOverTop ? "zpc-highest" : null;
    },
  },

  watch: {
    color: {
      immediate: true,

      handler(value) {
        if (value !== this.oldValue) {
          this.colorModel = this.parseColor(value);
          this.emitEvent();
        }
      },
    },
  },

  created() {
    this.colorPickerId = `zpc-${uniquIDs()}`;
    this.loadPalette();
    this.emitEvent();

    document.body.addEventListener("click", this.onOutsideClick);
  },

  destroyed() {
    document.body.removeEventListener("click", this.onOutsideClick);

    if (this._popperInstance) {
      this._popperInstance.destroy();
    }
  },

  methods: {
    onOutsideClick(event) {
      if (!this.isVisible) {
        return;
      }

      this.$emit("outsideClick", event);
    },

    loadPalette() {
      // const storageData  = window.localStorage.getItem(this.paletteKey);

      // if (storageData === null || storageData === '') {
      //     this.palette = this.presetColors;
      // } else {
      //     this.palette = storageData.split(';').reverse();
      // }
      const storageData = window.localStorage.getItem(this.paletteKey);
      if (storageData === null || storageData === "") {
      } else {
        this.palette = storageData
          .split(";")
          .reverse()
          .filter((v, index) => index <= 6);
      }
    },

    addColorToPalette(color) {
      // Color selected from palette
      if (this.palette.includes(color)) {
        return;
      }

      this.palette = [
        color,
        ...this.palette.slice(0, this.maxPaletteColors - 1),
      ];

      window.localStorage.setItem(
        this.paletteKey,
        Array.from(this.palette).reverse().join(";")
      );
    },

    toggle(targetEl) {
      this.isVisible ? this.close(this.color) : this.open(targetEl);
    },

    async open(targetEl) {
      this.loadPalette();
      this.isVisible = true;

      await this.$nextTick();
      this._popperInstance = popperCreator(
        targetEl,
        this.$refs.colorPicker,
        this.placement
      );
      document.addEventListener("click", this.listenerPickerWrapper);
    },
    listenerPickerWrapper(e){
        if (this.$refs.kksPickerWrapper) {
          let isSelf = this.$refs.kksPickerWrapper.contains(e.target);
          if (!isSelf) {
           this.close(this.color)
          }
        }
    },
    close(newColor) {
      this.addColorToPalette(newColor);
      this.isVisible = false;
      document.removeEventListener("resize", this.listenerPickerWrapper);
    },

    completeClose() {
      this._popperInstance.destroy();
    },

    parseColor(color) {
      return ColorModel.create(color);
    },

    handlePreset(color) {
      this.colorModel = this.parseColor(color);
      this.emitEvent();
    },

    setAlphaIfTransparent(color) {
      if (this.colorModel.isTransparent(color)) {
        this.colorModel.setAlpha(1);
      }
    },

    onSaturationChanged(components) {
      this.setAlphaIfTransparent(components);
      this.colorModel.updateHsv(components);
      this.emitEvent();
    },

    onHexChanged(event) {
      const hex = event.target.value;

      this.colorModel = this.parseColor(hex);
      this.emitEvent();
    },

    onHueChange(hue) {
      this.setAlphaIfTransparent(hue);
      this.colorModel.updateHsv({ h: hue });
      this.emitEvent();
    },

    changeR(r) {
      this.setAlphaIfTransparent(r);
      this.colorModel.updateRgb({ r });
      this.emitEvent();
    },

    changeG(g) {
      this.setAlphaIfTransparent(g);
      this.colorModel.updateRgb({ g });
      this.emitEvent();
    },

    changeB(b) {
      this.setAlphaIfTransparent(b);
      this.colorModel.updateRgb({ b });
      this.emitEvent();
    },

    emitEvent() {
      const colorString =
        this.colorModel.alpha === 1
          ? this.colorModel.toHexString()
          : this.colorModel.toRgbaString();

      this.oldValue = colorString;

      this.$emit("input", colorString);
    },

    changeAlpha(alpha) {
      this.colorModel.setAlpha(alpha / 100);
      this.emitEvent();
    },

    generateKeyForSwatch(color) {
      return `${this.colorPickerId}-${color}`;
    },

    isCurrentColor(color) {
      return color === this.color ? "focus" : "";
    },
  },
};
</script>

<style>
.zpc {
  position: absolute;
  box-sizing: border-box;
  width: 214px;
  padding: 8px;
  background: #3b3b3b;
  box-shadow: 0 2px 8px 0 #0d0d0d;
  z-index: 2;
}

.zpc-highest {
  z-index: 10001;
}

.zpc-animate-enter-active {
  transition: opacity 0.15s ease-out;
}

.zpc-animate-enter,
.zpc-animate-leave-to {
  opacity: 0;
}

.zpc-animate-leave-active {
  transition: opacity 0.1s ease-in;
}

.zpc-saturation-wrap {
  width: 100%;
  padding-bottom: 70.71%;
  position: relative;
}

.zpc-controls {
  display: flex;
}

.zpc-sliders {
  padding: 10px 0;
  flex: 1;
}

.zpc-hue-wrap {
  position: relative;
  height: 8px;
  margin-bottom: 12px;
}

.zpc-alpha-wrap {
  position: relative;
  height: 8px;
  margin-top: 12px;
}

.zpc-field {
  display: flex;
}

.zpc-field .zpc-input__input {
  box-sizing: border-box;
  width: 100%;
  padding: 2px 1px 2px 4px;
  border: 1px solid #999;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  line-height: 16px;
  background: #3b3b3b;
  color: #c4c4c4;
  margin-bottom: 8px;
}

.zpc-field .zpc-input__label {
  display: block;
  text-align: left;
  font-size: 10px;
  line-height: 1.6;
  color: #c4c4c4;
  padding-bottom: 4px;
  text-transform: capitalize;
}

.zpc-field--single {
  flex: 1;
  padding-left: 4px;
}

.zpc-field--double {
  flex: 2;
}

.zpc-presets {
  padding: 11px 0 6px 8px;
  margin: 0 -8px;
  border-top: 1px solid rgba(151, 151, 151, 0.15);
}

.zpc-presets-color {
  position: relative;
  margin: 0 5px 2px 0;
  cursor: pointer;
  border: 0;
  width: 24px;
  height: 24px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC");
}

.zpc-presets-color::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: 28px;
  height: 28px;
}

.zpc-presets-color:focus,
.zpc-presets-color:focus-within,
.zpc-presets-color.focus {
  outline: 1px solid #ce9a0f;
}
</style>
