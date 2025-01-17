<template>
    <div class="zpc-editable-input">
        <label :for="labelId" class="zpc-input__label">{{ label }}</label>
        <input
            type="number"
            v-model="tempValue"
            class="zpc-input__input"
            @change="onChange"
            @keydown.enter.prevent="onChange"
            @keydown.exact.up.prevent="incrementValue(step)"
            @keydown.exact.down.prevent="decrementValue(step)"
            @keydown.shift.up.prevent="incrementValue($options.SHIFT_STEP)"
            @keydown.shift.down.prevent="decrementValue($options.SHIFT_STEP)"
            @keydown.ctrl.up.prevent="incrementValue($options.CTRL_STEP)"
            @keydown.ctrl.down.prevent="decrementValue($options.CTRL_STEP)"
            :id="labelId"
        >
    </div>
</template>

<script>
export default {
    name: 'EditableInput',

    SHIFT_STEP: 10,
    CTRL_STEP: 100,

    props: {
        value: {
            required: true,
            type: Number
        },

        min: {
            type: Number,
            required: false,
            default: null
        },

        max: {
            type: Number,
            required: false,
            default: null
        },

        step: {
            type: Number,
            required: false,
            default: 1
        },

        label: {
            type: String,
            required: true
        }
    },

    data: () => ({
        tempValue: 1
    }),

    computed: {
        maxNumberLength() {
            if (this.max) {
                return this.max.toString().length;
            }

            return null;
        },

        labelId () {
            return `input__label__${this.label}__${Math.random().toString().slice(2, 6)}`;
        }
    },

    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.tempValue = value;
            }
        }
    },

    methods: {
        emitEvent(value) {
            this.$emit('change', value);
        },

        onChange() {
            if (this.tempValue === '') {
                this.tempValue = Number.isInteger(this.min) ? this.min : 1;
            }

            const numericValue = Number.parseFloat(this.tempValue);
            const validatedNumber = this.validateNumber(numericValue);

            this.tempValue = this.roundNumber(validatedNumber);
            this.emitEvent(this.tempValue);
        },

        incrementValue(step) {
            const newValue = this.tempValue + step;
            const validatedNumber = this.validateNumber(newValue);

            this.tempValue = this.roundNumber(validatedNumber);
            this.emitEvent(this.tempValue);
        },

        decrementValue(step) {
            const newValue = this.tempValue - step;
            const validatedNumber = this.validateNumber(newValue);

            this.tempValue = this.roundNumber(validatedNumber);
            this.emitEvent(this.tempValue);
        },

        validateNumber(number) {
            if (Number.isInteger(this.min) && number < this.min) {
                return this.min;
            }

            if (Number.isInteger(this.max) && number > this.max) {
                return this.max;
            }

            return number;
        },

        roundNumber(number) {
            if (!Number.isInteger(this.maxNumberLength)) {
                return number;
            }

            return Number.parseFloat(number.toFixed(this.maxNumberLength + 1).substr(0, this.maxNumberLength));
        }
    }
};
</script>

<style>
.zpc-editable-input {
  position: relative;
}
.zpc-input__input {
  padding: 0;
  border: 0;
  outline: none;
  -moz-appearance: textfield;
}

.zpc-input__input::-webkit-outer-spin-button,
.zpc-input__input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
 }

.zpc-input__label {
  text-transform: capitalize;
}
</style>
