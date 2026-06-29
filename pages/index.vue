<template>
    <div id="top-of-page" class="w-full h-full flex flex-col items-center justify-center">
        <div class="relative flex flex-col w-full overflow-hidden items-center justify-center h-[25rem] sm:h-[20rem] xl:h-[40rem]">
            <div class="absolute z-0 -inset-4 contrast-125 head">
            <div class="flex flex-col w-full h-full lg:grid lg:grid-cols-12 p-10">
               <div class="flex flex-col gap-4 lg:col-span-6 w-full h-full items-center mr-16">
                   <h1 class="text-sm lg:text-md xl:text-[2.25rem] text-white font-bold mt-24 ">معماری و ساختار سازمانی مخابرات ایران</h1>
                   <h6 class="text-white text-xl font-bold mt-6 mr-8">معاونت راهبرد و توسعه کسب و کار</h6>
                   <p class="text-base xl:text-md 2xl:text-[1.8rem] text-white font-bold mr-8">
                     اداره کل سرآمدی و معماری سازمانی
                </p>
                <nuxt-link to="/top-chart" class="bg-[#0048FF] text-white text-lg rounded-lg border-2 border-[#000057] px-8 py-2 mr-16 mt-2">تاپ چارت</nuxt-link>
               </div>
               <div class="flex w-full h-full lg:col-span-6"></div>
            </div>
            

            <div
                class=" lg:flex lg:flex-row h-[40rem] sm:h-[40rem] xl:h-[45rem] w-full flex flex-col max-w-[100rem] px-4 pb-8 pt-8 lg:pt-0 lg:px-10 gap-16 lg:gap-4 overflow-x-hidden">
                    
            </div>
        </div>
        </div>


        <section class="bg-gray-100 h-[20rem] w-full flex flex-col items-center justify-center py-8 lg:py-0">
            
             <!--<div class="w-full flex max-w-[100rem]" id="types-of-docs">
                <div class="p-10 overflow-hidden">
                    <app-slider :items="items">
                        <template #item="{ item }">
                            <card :item="item"></card>
                        </template>
                    </app-slider>
                </div>
            </div> -->
            
            

            <!-- <div class="relative w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
                    <path fill="#adb5bd" fill-opacity="1"
                        d="M0,192L34.3,202.7C68.6,213,137,235,206,224C274.3,213,343,171,411,165.3C480,160,549,192,617,202.7C685.7,213,754,203,823,176C891.4,149,960,107,1029,90.7C1097.1,75,1166,85,1234,74.7C1302.9,64,1371,32,1406,16L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                    </path>
                </svg>
            </div>
            <div class="bg-[#adb5bd] w-full -mt-1 p-4"> -->
            <!-- <div class="flex flex-col gap-10 lg:gap-24 items-center justify-center w-full ">
                <div
                    class="w-full flex flex-col gap-4 items-start justify-center relative px-8 lg:px-[5rem] 2xl:px-[12rem] pb-20">
                    <h2 class="text-md font-bold sm:text-xl lg:text-2xl mb-10 mr-10">سوالات متداول</h2>
                    <app-collaps>
                        <template #title>
                            <p class="text-sm font-bold sm:text-md xl:text-lg">اقدام اصلاحی و پیشگیرانه چیست؟</p>
                        </template>
                        <div class="flex flex-col gap-2 w-full text-xs sm:text-sm xl:text-base py-10 ">
                            <p class="">اقدام اصلاحی: اقدامی برای برطرف سازی علت عدم انطباق و یا شرایط نامطلوب
                                بالفعل که
                                به‌منظور
                                جلوگیری از وقوع آن‌ها انجام می‌گیرد .</p>
                            <p class="">اقدام پیشگیرانه: اقدامی برای حذف علل به وجود آورنده عدم انطباق بالقوه و یا
                                سایر
                                شرایط نامطلوب
                                بالقوه و به‌منظور پیشگیری از وقوع مجدد آن‌ها.

                            </p>
                        </div>
                    </app-collaps>
                    <app-collaps>
                        <template #title>
                            <p class="text-sm font-bold sm:text-md xl:text-lg">اگر فرایند یا زیر فرایند مشخص شده با
                                وظایف
                                ساختار مربوطه مطابقت نداشته باشد چه باید کرد؟</p>
                        </template>
                        <div class="flex flex-col gap-2 w-full text-xs sm:text-sm xl:text-base py-10 ">
                            <p class="">در صورتی که در واحدهای مجری فرایند با بررسی
                                و تحلیل فرایندها، اصلاح یا حذف یک فرایند، ادغام چند فرایند و یا پیشنهاد فرایند جدید
                                را مفید
                                تشخیص دادند
                                ضروری است مسئول فرایند و یا مسئول کنترل کیفیت فرایند(ضمن هماهنگی با مسئول فرآیند
                                ذی‌ربط)،
                                اقدام به تنظیم
                                پیشنهاد درآخرین نسخه فرم اقدام اصلاحی و پیشگیرانه با کد FR-SBD-05 و ارسال آن به
                                اداره کل
                                کیفیت و فرایند
                                نماید. بدین منظور لازم است، هر پیشنهاد در فرمی مجزا از آخرین ویرایش معتبر از فرم
                                اقدام
                                اصلاحی و
                                پیشگیرانه با کد FR-SBD-05 تکمیل و ارسال گردد.
                                در صورت ضرورت اصلاح در شاخص‌ها، معیار اندازه‌گیری، ضوابط امتیاز دهی شاخص‌ها و یا
                                پیشنهاد
                                شاخص جدید، از
                                فرمت خام آخرین نسخه فرم پایش و ارزیابی خروجی فرایند با کد FR-SBD-01 استفاده گردد.
                                این فرم
                                نیز می بایست
                                ضمن هماهنگی با مسئول فرایند و نیز مالک فرایند تنظیم، امضاء و ارسال شود.
                            </p>
                        </div>
                    </app-collaps>
                    <app-collaps>
                        <template #title>
                            <p class="text-sm font-bold sm:text-md xl:text-lg">آیا بعد از اقدام اصلاحی ارزیابی ها بر
                                اساس
                                تغییرات جدید صورت میگیرد؟</p>
                        </template>
                        <div class="flex flex-col gap-2 w-full text-xs sm:text-sm xl:text-base py-10 ">
                            <p class="">تا زمانیکه اصلاحات و پیشنهادات ارسال شده به اداره کل کیفیت و فرایند به تصویب
                                نرسد،
                                پایش فرایندها
                                و شاخص‌ها بر مبنای مصوبات و توافقات پیشین خواهد بود. </p>
                        </div>
                    </app-collaps>
                    <app-collaps>
                        <template #title>
                            <p class="text-sm font-bold sm:text-md lg:text-lg">ارزیابی فرایندی بر چه اساسی صورت
                                میگیرد؟</p>
                        </template>
                        <div class="flex flex-col gap-2 w-full text-xs sm:text-sm xl:text-base py-10 ">
                            <p class="">فرایندهای حوز‌ه‌های ستادی، سالانه دو نوبت (مهرماه و فروردین‌ماه) توسط اداره
                                کل کیفیت
                                و فرایند
                                معاونت راهبرد و توسعه کسب‌وکار مورد پایش و ارزیابی قرار خواهد گرفت. دستورالعمل
                                اجرائی پایش
                                فرایندهای
                                حوزه‌های ستادی به کد فرایندی IN-SBD-11-01 دستورالعمل اجرائی پایش
                                فرایندهای
                                حوزه‌های ستادی، به منظور ایجاد رویه مشترک در حین مراحل مختلف پایش، شفاف کردن مسیر
                                ارزیابی و
                                نیز کاستن از
                                ابهامات و پرسش‌های احتمالی تدوین شده است تا مسئولین فرایندها، مدیران مجری فرایند و
                                کارشناسان
                                حوزه‌های
                                مختلف ستادی با همکاری و تعامل مناسب با مسئولان کنترل کیفیت فرایندها به فراهم‌سازی
                                مستندات و
                                تنظیم دقیق
                                فرم‌ها، مطابق مفاد ذکر شده در این دستورالعمل مبادرت نمایند.</p>

                        </div>
                    </app-collaps>
                    <app-collaps>
                        <template #title>
                            <p class="text-sm font-bold sm:text-md lg:text-lg">اقدام اصلاحی و پیشگیرانه چیست؟</p>
                        </template>
                        <div class="flex flex-col gap-2 w-full text-xs sm:text-sm xl:text-base py-10 ">
                            <p class="">اقدام اصلاحی: اقدامی برای برطرف سازی علت عدم انطباق و یا شرایط نامطلوب
                                بالفعل که
                                به‌منظور
                                جلوگیری از وقوع آن‌ها انجام می‌گیرد .</p>
                            <p class="">اقدام پیشگیرانه: اقدامی برای حذف علل به وجود آورنده عدم انطباق بالقوه و یا
                                سایر
                                شرایط نامطلوب
                                بالقوه و به‌منظور پیشگیری از وقوع مجدد آن‌ها.

                            </p>
                        </div>
                    </app-collaps>
                </div>

            </div> -->

            <!-- </div> -->
        </section>
    </div>
    
</template>

<script setup lang="ts">
// import { gsap } from 'gsap';
// import { Form } from "vee-validate"
// import { useSearchService } from '~/composables/home/home.service';
// import { ToastEnum } from '~/types';
// import VersionControl from "~~/components/icons/slider/VersionControl.vue"

const resultSearch = ref(false)
const items = [
    {
        title: "روش های اجرایی",
        to: "/procedures?docType=procedures",
        description: 840,
        image: "/images/slider/undraw_version_control_re_mg66.svg",
        action: "لیست روش های اجرایی",
        icon: "/images/slider/small-picture/workflow.svg"
    },
    {
        title: "فرایندها",
        to: "/processes",
        description: 260,
        image: "/images/slider/undraw_thought_process_re_om58.svg",
        action: "لیست  فرایندها",
        icon: "/images/slider/small-picture/process1.svg"
    },
    {
        title: "زیر فرایندها",
        to: "/sub-processes",
        description: 520,
        image: "/images/slider/undraw_detailed_analysis_re_tk6j.svg",
        action: "لیست  زیر فرایندها",
        icon: "/images/slider/small-picture/process.svg"
    },
    {
        title: "دستورالعمل ها",
        to: "/procedures?docType=instruction",
        description: 89,
        image: "/images/slider/undraw_our_solution_re_8yk6.svg",
        action: "لیست  دستورالعمل ها",
        icon: "/images/slider/small-picture/instruction2.svg"
    },
    {
        title: "فرم ها",
        to: "/procedures?docType=form",
        description: 31,
        image: "/images/slider/undraw_folder_files_re_2cbm.svg",
        action: "لیست  فرم ها",
        icon: "/images/slider/small-picture/instruction2.svg"
    },
    {
        title: "آئین نامه ها",
        to: "/procedures?docType=regulation",
        description: 10,
        image: "/images/slider/undraw_folder_re_apfp(1).svg",
        action: "لیست  آئین نامه ها",
        icon: "/images/slider/small-picture/instruction1.svg"
    },
    {
        title: "قرارداد ها",
        to: "/procedures?docType=contract",
        description: 9,
        image: "/images/slider/undraw_filing_system_re_56h6.svg",
        action: "لیست  قرارداد ها",
        icon: "/images/slider/small-picture/instruction2.svg"
    },

]
const docDefItems = [
    {
        title: "فرایند",
        description: "مجموعه ای از  زیرفرایندهای مرتبط به¬هم یا متعامل که جهت ارائه نتیجه موردنظر از دروندادها استفاده می کند.",
        eng_title: "Process"
    },
    {
        title: "زیر فرایند",
        description: "مجموعه ای از  فعالیت های مرتبط به¬هم یا متعامل که جهت ارائه نتیجه موردنظر از دروندادها استفاده می کند.",
        eng_title: "Sub Process"
    },
    {
        title: "روش اجرایی",
        description: "مستندی که طریقه مشخص برای انجام یک فعالیت یا فرآیند را بیان می کند.",
        eng_title: "Procedure"
    },
    {
        title: "آیین نامه ",
        description: "مقرراتی است که توسط مقامات صلاحیت دار وضع و در معرض اجرا قرار می گیرند. در واقع مجموعه  قوانینی است که در جهت رسیدن به اهداف سازمان برای اجرای فعالیت¬ها تدوین می گردد. این سند یا داخلی است که توسط مقام ارشد سازمان (مدیرعامل و اعضای هیئت مدیره) تصویب می شود و یا خارجی است که از سازمان های بالا دستی ابلاغ می گردد. ",
        eng_title: "Regulation"
    },
    {
        title: "قرارداد",
        description: "توافق تعهدآور",
        eng_title: "Contract"
    },
    {
        title: "فرم",
        description: "جدول تنظیم شده از موارد خاص مورد نیاز جهت درخواست یا اقدامات",
        eng_title: "Form"
    },
]
const loading = ref(false)
const data = ref<any>()
onMounted(() => {
    // let tl = gsap.timeline();

    

})

const backToHome = () => {
    resultSearch.value = false
}
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // اسکرول نرم
    })
}


</script>

<style scoped>
.head {
   
    background-image: url("/public/images/home-mobile.jpg");
    background-size: 100% 100%;

} 
@media (min-width: 868px) {
    .head {
        background-image: url('/public/images/theme2.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
}
.en-font {
    font-family: 'Times New Roman', serif;
}

/* .wave-container {
  position: relative;
}
.wave-container svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px; /* ارتفاع موج */
/* } */
.content {
    padding-top: 80px;
    /* فاصله از موج */
}
</style>