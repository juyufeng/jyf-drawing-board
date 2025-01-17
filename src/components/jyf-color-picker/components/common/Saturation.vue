<template>
    <div class="zpc-saturation"
         :style="{background: bgColor}"
         ref="container"
         @mousedown.left="handleMouseDown"
         @touchmove="handleChange"
         @touchstart="handleChange"
    >
        <div class="zpc-saturation-gradient" />
        <div class="zpc-saturation-pointer" :style="{top: pointerTop, left: pointerLeft}">
            <div class="zpc-saturation-circle" tabindex="0" />
        </div>
    </div>
</template>

<script>
import { clamp, throttle } from '../../helpers';

export default {
    name: 'Saturation',
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    computed: {
        colors () {
            return this.value;
        },
        bgColor () {
            return `hsl(${this.colors.h}, 100%, 50%)`;
        },
        pointerTop () {
            return `${(1 - (this.colors.v * 100)) + 100}%`;
        },
        pointerLeft () {
            return `${this.colors.s * 100}%`;
        }
    },
    methods: {
        throttle: throttle((fn, data) => {
            fn(data);
        }, 20),
        handleChange (e, skip) {
            !skip && e.preventDefault();
            var container = this.$refs.container;

            if (!container) {
                // for some edge cases, container may not exist. see #220
                return;
            }
            var containerWidth = container.clientWidth;
            var containerHeight = container.clientHeight;

            var xOffset = container.getBoundingClientRect().left + window.pageXOffset;
            var yOffset = container.getBoundingClientRect().top + window.pageYOffset;
            var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
            var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
            var left = clamp(pageX - xOffset, 0, containerWidth);
            var top = clamp(pageY - yOffset, 0, containerHeight);
            var saturation = left / containerWidth;
            var bright = clamp(1 - (top / containerHeight), 0, 1);

            this.throttle(this.onChange, {
                s: saturation,
                v: bright
            });
        },
        onChange (param) {
            this.$emit('change', param);
        },
        handleMouseDown (e) {
            this.handleChange(e, true);
            window.addEventListener('mousemove', this.handleChange);
            window.addEventListener('mouseup', this.handleChange);
            window.addEventListener('mouseup', this.handleMouseUp);
        },
        handleMouseUp () {
            this.unbindEventListeners();
        },
        unbindEventListeners () {
            window.removeEventListener('mousemove', this.handleChange);
            window.removeEventListener('mouseup', this.handleChange);
            window.removeEventListener('mouseup', this.handleMouseUp);
        }
    }
};
</script>

<style>
.zpc-saturation,
.zpc-saturation-gradient,
.zpc-saturation-gradient::before,
.zpc-saturation-gradient::after {
  cursor: default;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.zpc-saturation-gradient::before,
.zpc-saturation-gradient::after {
  content: '';
}
.zpc-saturation-gradient::before {
  background: linear-gradient(to right, #fff, rgba(255,255,255,0));
}
.zpc-saturation-gradient::after {
  background: linear-gradient(to top, #000, rgba(0,0,0,0));
}
.zpc-saturation-pointer {
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -73%);
}
.zpc-saturation-circle {
  box-sizing: border-box;
  cursor: pointer;
  width: 8px;
  height: 8px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 2px solid #fff;
}
.zpc-saturation-circle:active,
.zpc-saturation-circle:focus {
  outline: none;
}
</style>
