<template>
    <div>
       <div class="flex flex-col gap-10 lg:gap-24 items-center justify-center w-full ">
                    <h2 class="text-md font-bold sm:text-xl lg:text-2xl">نمودارهای ارزیابی فرایندی حوزه های ستادی</h2>
                    <ClientOnly>
                        <app-tabs :tabs="tabItems">
                            <template #tab-0>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="data1402" :labels="label1402" :style="'architec'"></Chart>
                                        <ChartMob v-else :data="data1402" :labels="label1402" :style="'architec'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                            <template #tab-1>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="data1402" :labels="label1402" :style="'architec'"></Chart>
                                        <ChartMob v-else :data="data1402" :labels="label1402" :style="'architec'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                            <template #tab-2>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="data1402" :labels="label1402" :style="'architec'"></Chart>
                                        <ChartMob v-else :data="data1402" :labels="label1402" :style="'architec'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                        </app-tabs>
                    </ClientOnly>
                    <ClientOnly>
                        <app-tabs :tabs="tabItems">
                            <template #tab-0>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></Chart>
                                        <ChartMob v-else :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                            <template #tab-1>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></Chart>
                                        <ChartMob v-else :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                            <template #tab-2>
                                <div>
                                    <div class="flex items-center justify-center">
                                        <Chart v-if="isLargeScreen" :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></Chart>
                                        <ChartMob v-else :data="dataProcess1402" :labels="labelProcess1402" :style="'process'"></ChartMob>
                                    </div>
                                </div>
                            </template>
                        </app-tabs>
                    </ClientOnly>
                </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin"
})
const tabItems = [
    { label: 'ارزیابی سال 1400' },
    { label: 'ارزیابی سال 1401' },
    { label: 'ارزیابی سال 1402' },
]
const data1402 = [35, 55, 68, 28, 31, 22, 21, 28, 27, 0]
const label1402 = ['معاونت شبکه', 'معاونت تنظیم مقررات', 'معاونت توسعه سرمایه انسانی', 'معاونت راهبرد و توسعه کسب و کار','معاونت تجاری و خدمات مشتریان','معاونت فنادری اطلاعات','معاونت پشتیبانی و زنجیره تامین','معاونت مالی', 'اداره کل ارتباطات و امور بین الملل']
const labelProcess1402 = ['برنامه‌ریزی نیروی انسانی و امور کارکنان', 'توسعه سازمان', 'مدیریت عملکرد و جبران خدمت', 'رفاه و سلامت', 'آموزش و توسعه شایستگی فردی', 'استراتژی بازاریابی و فروش', 'توسعه محصول جدید', 'فروش خانگی', 'فروش عمده', ' فروش تجاری', 'عملیات و پشتیبانی از کانال‌های فروش و خدمات پس از فروش', 'مدیریت تجربه مشتری', 'ارزیابی کیفیت محصولات و خدمات', 'مدیریت صورتحساب و وصول مطالبات', 'مطالعات و برنامه‌ریزی راهبردی', 'مدیریت عملکرد راهبردی', 'مدیریت پروژه', 'برنامه و بودجه', 'کنترل و تضمین درآمد', 'بهره‌برداری از بازار سرمایه و امور سهام', 'حسابداری مالی', 'حسابداری مدیریت', 'خزانه‌داری و تأمین مالی', 'راهبرد و حاکمیت فناوری اطلاعات', 'پشتیبانی سیستم‌های سازمانی', 'پشتیبانی سیستم‌های عملیاتی', 'پشتیبانی سیستم‌های کسب‌وکار', 'درگاه‌ها و خدمات دیجیتال', 'زیرساخت و شبکه فناوری اطلاعات', 'راهبرد و معماری شبکه', 'طراحی شبکه', 'نظارت، آزمایش و تحویل', 'مدیریت عملیات شبکه', 'تضمین کیفیت خدمات شبکه', 'پشتیبانی عملیات شبکه', 'تنظیم مقررات', 'نظارت', 'ارتباط با مجامع و بررسی استاندارد', 'برنامه‌ریزی راهبردی زنجیره تأمین', 'مدیریت معاملات', 'پشتیبانی و مدیریت دارائي‌ها و اموال', 'ارتباطات و امور بین‌الملل']
const isLargeScreen = ref()
const recalculate = () => {
  isLargeScreen.value = useMediaQuery('(min-width: 1024px)').value
}
onMounted(() => {
  isLargeScreen.value = useMediaQuery('(min-width: 1024px)').value
  useEventListener("resize", useDebounceFn(()=>{
    recalculate()
    console.log("resize", useMediaQuery('(min-width: 1024px)').value)
  }));
});
const dataProcess1402 = [68, 59, 78, 74, 48, 20, 40, 36, 27, 35, 20, 0, 35, 40, 19, 42, 31, 17.5, 36, 33, 20, 26, 22.5, 0, 11, 49.2, 42.9, 22.6, 12.2, 35, 20, 42, 48, 31, 0, 61, 63, 46, 33, 26, 24, 0]
</script>

<style scoped>
</style>