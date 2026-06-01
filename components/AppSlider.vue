<template>
  <div class="flex flex-col w-full gap-10">
    <template v-if="arrows">
      <div class="flex justify-between items-center">
        <h1 class="text-base lg:text-xl xl:text-2xl text-gray-800 font-bold">انواع مستندات فرایندی
          </h1>
        <div class="hidden lg:flex gap-4">
          <button class="hidden lg:flex w-10 h-12 bg-indigo-600 text-white rounded-md items-center justify-center"
            @click="clickPrev">
            <div classs="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>

            </div>
          </button>
          <button class="hidden lg:flex w-10 h-12 bg-indigo-600 text-white rounded-md items-center justify-center"
            @click="clickNext">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

          </button>


        </div>

      </div>

    </template>
    <div class="relative">

      <div class="overflow-x-hidden">
        <div class="flex" ref="sliderWrapperRef">
          <template v-for="(item, index) in items" :key="index">
            <div :class="[
              { 'px-1.5 py-2 first:pr-3 last:pl-3': defaultPadding },
              itemContainerClass,
            ]" :ref="(el) => setChildrenRef(el, index)">
              <slot name="item" :item="item" :index="index"></slot>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/outline";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { useEventListener } from "@vueuse/core"
export default defineComponent({
  components: { ChevronRightIcon, ChevronLeftIcon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    arrows: {
      type: Boolean,
      default: () => true,
    },
    defaultPadding: {
      type: Boolean,
      default: () => true,
    },
    itemContainerClass: {
      type: [Array, Object, String],
      default: () => "",
    },
    config: {
      type: Object,
      default: () => ({
        ease: "power1",
        duration: 1,
      }),
    },
    middle: {
      type: Number,
      default: -1,
    },
    start: {
      type: Number,
      default: -1,
    },
    end: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const sliderWrapperRef = ref<Element | null>(null);
    const childrenRef = ref<Element[]>([]);
    const setChildrenRef = (el: Element, index: number) => {
      if (el) childrenRef.value[index] = el;
    };
    onBeforeUpdate(() => {
      childrenRef.value = [];
    });
    const getConfig = () => {
      const el = unref(sliderWrapperRef);
      const maxX: number = el!.scrollWidth - el!.clientWidth;
      return { el, maxX };
    };
    const recalculate = () => {
      const { el, maxX } = getConfig();
      Draggable.get(unref(el)).applyBounds({ minX: 0, maxX });
    };
    onMounted(() => {
      gsap.registerPlugin(Draggable);
      const { el, maxX } = getConfig();
      Draggable.create(unref(el), {
        type: "x",
        edgeResistance: 0.9,
        bounds: { minX: 0, maxX },
      });
      useEventListener("resize", recalculate);
    });
    onUpdated(() => {
      recalculate();
    });
    const getValidX = (x: number) => {
      const { maxX } = getConfig();
      if (x < 0) return 0;
      if (x > maxX) return maxX;
      return x;
    };
    const getPrevItemsWidth = (activeIndex: number): number => {
      let xDistance = 0;
      for (let i = 0; i < activeIndex; i++) {
        xDistance += childrenRef.value[i].clientWidth;
      }
      return xDistance;
    };
    const setActiveIndexStart = (activeIndex: number) => {
      if (childrenRef.value[activeIndex]) {
        const xDistance = getPrevItemsWidth(activeIndex);
        const { el } = getConfig();
        gsap.to(unref(el), {
          x: getValidX(xDistance),
          ...props.config,
        });
      }
    };
    const setActiveIndexEnd = (activeIndex: number) => {
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack =
          (unref(el)?.clientWidth || 0) -
          childrenRef.value[activeIndex].clientWidth;
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack),
          ...props.config,
        });
      }
    };
    const setActiveIndexMiddle = (activeIndex: number) => {
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack =
          (unref(el)?.clientWidth || 0) -
          childrenRef.value[activeIndex].clientWidth;
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack / 2),
          ...props.config,
        });
      }
    };
    watch(
      () => props.start,
      (value) => {
        setActiveIndexStart(value);
      }
    );
    watch(
      () => props.end,
      (value) => {
        setActiveIndexEnd(value);
      }
    );
    watch(
      () => props.middle,
      (value) => {
        setActiveIndexMiddle(value);
      }
    );
    const clickNext = () => {
      const { el } = getConfig();
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(+currentX + plusX),
        ...props.config,
      });
    };
    const clickPrev = () => {
      const { el } = getConfig();
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(+currentX - plusX),
        ...props.config,
      });
    };
    return { sliderWrapperRef, setChildrenRef, clickNext, clickPrev };
  },
});
</script>


<style scoped></style>