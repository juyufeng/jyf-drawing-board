<template>
    <div class="zpc-alpha">
        <div class="zpc-alpha-checkboard-wrap">
            <div class="zpc-alpha-checkboard-wrap__bg" :style="transparentBg" />
        </div>

        <div class="zpc-alpha-gradient" :style="{background: gradientColor}" />

        <div class="zpc-alpha-container" ref="container"
             @mousedown.left="handleMouseDown"
             @touchmove="handleChange"
             @touchstart="handleChange"
        >
            <div class="zpc-alpha-pointer" :style="{left: alphaValue + '%'}">
                <div class="zpc-alpha-picker" tabindex="0" />
            </div>
        </div>
    </div>
</template>

<script>
import { throttle, renderTransparentBg } from '../../helpers';

export default {
    name: 'Alpha',

    props: {
        color: {
            type: Object,
            required: true
        },

        alphaValue: {
            type: Number,
            required: true
        }
    },

    computed: {
        transparentBg() {
            return {
                backgroundImage: `url(${renderTransparentBg()})`
            };
        },

        gradientColor () {
            const { r, g, b } = this.color.rgba;
            const rgbStr = [r, g, b].join(',');

            return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
        }
    },

    created () {
        this.handleChange = throttle(this.handleChange, 30, {
            leading: true,
            trailing: true
        });
    },

    methods: {
        handleChange(e, skip) {
            !skip && e.preventDefault();

            var container = this.$refs.container;

            if (!container) {
                // for some edge cases, container may not exist. see #220
                return;
            }
            var containerWidth = container.clientWidth;

            var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
            var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
            var left = pageX - xOffset;

            var alpha;

            if (left < 0) {
                alpha = 0;
            } else if (left > containerWidth) {
                alpha = 100;
            } else {
                alpha = Math.round(left / containerWidth * 100); // %
            }

            this.$emit('change', alpha);
        },

        handleMouseDown (e) {
            this.handleChange(e, true);
            window.addEventListener('mousemove', this.handleChange);
            window.addEventListener('mouseup', this.handleMouseUp);
        },

        handleMouseUp () {
            this.unbindEventListeners();
        },

        unbindEventListeners () {
            window.removeEventListener('mousemove', this.handleChange);
            window.removeEventListener('mouseup', this.handleMouseUp);
        }
    }
};
</script>

<style>
.zpc-alpha {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.zpc-alpha-checkboard-wrap {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.zpc-alpha-checkboard-wrap__bg {
  height: 100%;
  background-size: contain;
}
.zpc-alpha-gradient {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.zpc-alpha-container {
  cursor: pointer;
  position: relative;
  z-index: 2;
  height: 100%;
  margin: 0 1px;
}
.zpc-alpha-pointer {
  z-index: 2;
  position: absolute;
}
.zpc-alpha-picker {
  box-sizing: border-box;
  cursor: pointer;
  width: 5px;
  height: 12px;
  background: transparent;
  border: 2px solid #fff;
  transform: translate(-2.5px, -2px);
}
.zpc-alpha-picker:active,
.zpc-alpha-picker:focus {
  outline: none;
}
</style>
