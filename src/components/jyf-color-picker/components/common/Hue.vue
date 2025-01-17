<template>
    <div :class="['zpc-hue', directionClass]">
        <div class="zpc-hue-container"
             role="slider"
             :aria-valuenow="color.h"
             aria-valuemin="0"
             aria-valuemax="360"
             ref="container"
             @mousedown.left="handleMouseDown"
             @touchmove="handleChange"
             @touchstart="handleChange"
        >
            <div class="zpc-hue-pointer" :style="{top: pointerTop, left: pointerLeft}" role="presentation">
                <div class="zpc-hue-picker" tabindex="0" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hue',
    props: {
        // eslint-disable-next-line vue/require-default-prop
        value: Object,
        direction: {
            type: String,
            // [horizontal | vertical]
            default: 'horizontal'
        }
    },
    data () {
        return {
            oldHue: 0,
            pullDirection: ''
        };
    },
    computed: {
        color () {
            const h = this.value.h;

            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';

            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.oldHue = h;

            return this.value;
        },
        directionClass () {
            return {
                'zpc-hue--horizontal': this.direction === 'horizontal',
                'zpc-hue--vertical': this.direction === 'vertical'
            };
        },
        pointerTop () {
            if (this.direction === 'vertical') {
                if (this.color.h === 0 && this.pullDirection === 'right') return 0;

                return `${-((this.color.h * 100) / 360) + 100}%`;
            } else {
                return 0;
            }
        },
        pointerLeft () {
            if (this.direction === 'vertical') {
                return 0;
            } else {
                if (this.color.h === 0 && this.pullDirection === 'right') return '100%';

                return `${(this.value.h * 100) / 360}%`;
            }
        }
    },
    methods: {
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
            var left = pageX - xOffset;
            var top = pageY - yOffset;

            var hue;
            var percent;

            if (this.direction === 'vertical') {
                if (top < 0) {
                    hue = 360;
                } else if (top > containerHeight) {
                    hue = 0;
                } else {
                    percent = -(top * 100 / containerHeight) + 100;
                    hue = (360 * percent / 100);
                }

                this.$emit('change', hue);
            } else {
                if (left < 0) {
                    hue = 0;
                } else if (left > containerWidth) {
                    hue = 360;
                } else {
                    percent = left * 100 / containerWidth;
                    hue = (360 * percent / 100);
                }

                this.$emit('change', hue);
            }
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
.zpc-hue {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.zpc-hue--horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.zpc-hue--vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.zpc-hue-container {
  cursor: default;
  margin: 0 1px;
  position: relative;
  height: 100%;
}
.zpc-hue-pointer {
  z-index: 2;
  position: absolute;
}
.zpc-hue-picker {
  box-sizing: border-box;
  cursor: pointer;
  width: 5px;
  height: 12px;
  background: transparent;
  border: 2px solid #fff;
  transform: translate(-2.5px, -2px);
}
.zpc-hue-picker:active,
.zpc-hue-picker:focus {
  outline: none;
}
</style>
