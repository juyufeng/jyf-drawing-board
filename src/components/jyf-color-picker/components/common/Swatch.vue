<template>
    <button
        :aria-label="ariaLabel"
        @click="onSwatchClick"
        type="button"
    >
        <span class="zpc-presets-color-wrap-in" :style="swatchStyle" />
    </button>
</template>

<script>
import { ColorModel } from '../../models';
import { renderTransparentBg } from '../../helpers';

export default {
    name: 'Swatch',

    props: {
        color: {
            type: String,
            required: true
        }
    },

    computed: {
        isTransparent() {
            return ColorModel.isTransparent(this.color);
        },

        swatchStyle() {
            if (this.isTransparent) {
                return {
                    backgroundImage: `url(${renderTransparentBg()})`
                };
            }

            return {
                backgroundColor: this.color
            };
        },

        ariaLabel() {
            return `Color:${this.color}`;
        }
    },

    methods: {
        onSwatchClick() {
            this.$emit('selected', this.color);
        }
    }
};
</script>

<style>
.zpc-presets-color-wrap-in {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
}
</style>
