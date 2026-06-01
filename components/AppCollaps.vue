<template>
  <div class="py-[1.875rem] gap-2 flex relative z-20 justify-between cursor-pointer items-center w-full"
    :class="[{ 'bg-gray-800 text-white px-[1.5rem] md:px-[4.5rem] rounded-2xl border-b-4 border-b-[#4749e3]': !noStyleBg }, { 'pr-3 pl-[1.688rem] xl:px-[4.5rem]': noStyleBg }, backgroundClassTitle]"
    @click="toggle" v-bind="$attrs">
    <slot name="title" :is-open="isOpen"></slot>
    <div class="min-w-6">
      <IconsCollapsArrowDown v-if="withTitleIcon && !isOpen"></IconsCollapsArrowDown>
      <IconsCollapsArrowUp v-if="withTitleIcon && isOpen"></IconsCollapsArrowUp>
    </div>
    <!-- <div class="mr-3" v-if="withTitleIcon">{{ isOpen ? "-" : "+" }}</div> -->
  </div>
  <div ref="target" class=" z-10 h-0 overflow-y-hidden w-full bg-gray-200 rounded-b-lg px-[1rem] md:px-[4.5rem]"
    :class="[{ 'bg-gray-100 mt-[-20px] rounded-b-lg': !noStyleBg }, backgroundClassContent]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, unref } from "vue";
import { gsap } from "gsap";
import { useDebounceFn, useEventListener } from "@vueuse/core";
export default defineComponent({
  props: {
    backgroundClassTitle: {
      type: [String, Object, Array],
      default: "",
    },
    backgroundClassContent: {
      type: [String, Object, Array],
      default: "false",
    },
    noStyleBg: {
      type: Boolean,
      default: false,
    },
    withTitleIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const target = ref<any>(null);
    const progress = ref(0);
    let animation: any;
    const setAnimation = () => {
      animation = gsap.to(unref(target), {
        height: "auto",
        overflow: "hidden",
        paused: true,
        duration: 0.5,
        onUpdate() {
          progress.value = animation.progress();
        },
      });
    };
    onMounted(() => {
      setAnimation();
    });

    const toggle = () => {
      if (animation.progress() === 0) {
        animation?.play();
      } else {
        animation?.reverse();
      }
    };
    const isOpen = computed(() => unref(progress) !== 0);
    //  const removeProps = () => {
    //   gsap.set(unref(target), { clearProps: "all" });
    // };
    const debouncedFn = useDebounceFn(() => {
      animation.progress(0).invalidate();
    }, 500);
    useEventListener("resize", debouncedFn);
    return { target, toggle, isOpen };
  },
});
</script>

<style scoped>
/* .card-bg {
  background: #fff;
  /* background: linear-gradient(0deg, #171717 0%, #262626 100%); */
  /* border-top: 1px solid rgba(103, 103, 103, 1);
} */ 
</style>