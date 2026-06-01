<template>
  <div class="">
    <div class="" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
      <label v-if="label !== ''" class="flex justify-between items-center px-1 pb-1.5" :for="name">
        <span class="label-text">{{ label }}</span>
        <slot name="leftLabel"></slot>
      </label>
      <date-picker display-format="jYYYY/jMM/jDD" format="jYYYY/jMM/jDD" type="date" v-model="inputValue" :name="name" inputClass="rounded-lg"
        @change="changeDate" @blur="handleBlur"></date-picker>
      <!-- <date-picker :name="name" v-model="inputValue" @change="changeDate"
        @blur="handleBlur"></date-picker> -->
      <label class="flex items-center min-h-[1.4rem] px-1">
        <span class="label-text-alt leading-3 text-error text-2xs">{{ errorMessage || successMessage }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { defineComponent } from "vue";
import moment from "moment-jalaali";

// const displayDate = ref("")
export default defineComponent({

  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: null,
    },
    successMessage: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {

    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
      setValue,
    } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      validateOnValueUpdate: false,
    });
    const changeDate = (date) => {
      // const formattedDate = moment(date).format('jYYYY/jMM/jDD'); // یا هر فرمت دیگری که نیاز دارید
      setValue(date._d);
      // handleChange(date)
      console.log("formattedDate",date)
      // emit("update:modelValue", date);
    };
    // watchEffect(() => {
    //   emit("update:modelValue", unref(inputValue))
    // })
    watch(inputValue, (newValue) => {
      // const formattedDate = moment(newValue).format('YYYY-MM-DD');
      // emit("update:modelValue", newValue);
    });

    watch(() => props.modelValue, (value) => {
      setValue(value)
    })
    return { errorMessage, inputValue, handleChange, handleBlur, meta, changeDate };
  },
});
</script>

<style scoped>
.custom {
  height: 48px;
  border-radius: 0.5rem 0 0 0.5rem,

}

.custom-label {
  margin-bottom: 0;
}

.custom-placeholder {
  color: blue;
  font-size: 11px;
}
</style>