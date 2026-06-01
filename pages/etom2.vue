<template>
    <div class="w-full overflow-x-auto flex items-center justify-center py-10 px-20 pt-[10rem]">
        <div ref="grid" class="wrapper flex flex-col w-full items-center justify-center min-w-full" @mousemove="onMove"
            @mouseleave="onLeave">

            <div class="glow " :style="glowStyle" />

            <div class="etom w-full">
                <div class="flex flex-1 h-8 w-full gap-2">
                    <div class="w-full h-full bg-red-200 flex items-center justify-center rounded-md">
                        <h3 class="text-sm font-bold">عملیات</h3>
                    </div>
                    <div class="w-full h-full bg-blue-200 flex items-center justify-center rounded-md">
                        <h3 class="text-sm font-bold">استراتژی</h3>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-2 p-2 h-full relative">
                    <div
                        class="col-span-2 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">صورتحساب</h3>
                    </div>
                    <div
                        class="col-span-1 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">تضمین</h3>
                    </div>
                    <div
                        class="col-span-2 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">اجرا</h3>
                    </div>
                    <div
                        class="col-span-3 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">عملیات آمادگی و پشتیبانی</h3>
                    </div>
                    <div
                        class="col-span-2 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">توسعه کسب و کار</h3>
                    </div>
                    <div
                        class="col-span-1 w-full h-[100rem] flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">قابلیت تحویل</h3>
                    </div>
                    <div class="col-span-1 w-full flex items-start justify-center bg-gray-400 rounded-md p-2">
                        <h3 class="text-sm font-bold">مدیریت استراتژی</h3>
                    </div>
                    <div class="absolute left-1 inset-y-[3rem] flex flex-col gap-2">
                        <div class="w-full h-[20rem] bg-red-500 rounded-md left-1 inset-y-[3rem]">
                            <div class="flex w-full items-center justify-center p-2">
                                <h3 class="text-base font-bold">Market Sales Domain</h3>
                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('17')" 
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-2 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        حسابداری فروش و بازاریابی<img src="/images/etom/17.png" v-if="activeImage === '17'"
                                            class="absolute max-w-[40rem] -top-32 left-4 rounded-md z-10" />

                                    </button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('121')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        عملکرد فروش<img src="/images/etom/121.png" v-if="activeImage === '121'"
                                            class="absolute max-w-[40rem] -top-64 right-28 rounded-md z-10" />
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('120')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        ارتباط/رهبری/خریدار احتمالی<img src="/images/etom/120.png" v-if="activeImage === '120'"
                                            class="absolute max-w-[40rem] -top-60 left-56 rounded-md z-10" />
                                    </button>
                                </div>
                                <div
                                    class="col-span-3 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('19')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        برنامه وفاداری<img src="/images/etom/19.png" v-if="activeImage === '19'"
                                            class="absolute max-w-[50rem] -top-60 left-56 rounded-md z-10" />
                                    </button>
                                    <button @click="clickForShowImage('123')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        کانال<img src="/images/etom/123.png" v-if="activeImage === '123'"
                                            class="absolute max-w-[70rem] -top-60 left-32 rounded-md  z-10" />
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('13')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        توسعه فروش <img src="/images/etom/13.png" v-if="activeImage === '13'"
                                            class="absolute max-w-[40rem] -top-64 left-56 rounded-md z-10" /></button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('12')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        تحقیق بازار<img src="/images/etom/12.png" v-if="activeImage === '12'"
                                            class="absolute max-w-[45rem] -top-[18rem] left-32 rounded-md z-10" /></button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('11')"
                                        class="relative group bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-xl border border-gray-400 rounded-md">مدیریت
                                        استراتژی فروش<img src="/images/etom/11.png" v-if="activeImage === '11'"
                                            class="absolute max-w-[40rem] -top-60 left-4 rounded-md z-10"/></button>
                                </div>
                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('127')"
                                        class="relative bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        مشکل بازاریابی<img src="/images/etom/127.png" v-if="activeImage === '127'"
                                            class="absolute max-w-[40rem] -top-[17rem] -left-40 rounded-md pointer-events-none z-10"/>
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('15')"
                                        class="relative bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">فروش<img src="/images/etom/15.png" v-if="activeImage === '15'"
                                            class="absolute max-w-[40rem] -top-[21rem] left-36 rounded-md pointer-events-none z-10"/>
                                    </button>
                                </div>
                                <div
                                    class="col-span-3 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">
                                    <button @click="clickForShowImage('14')"
                                        class="relative bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">آماده
                                        سازی و پشتیبانی بازاریابی فروش<img src="/images/etom/14.png" v-if="activeImage === '14'"
                                            class="absolute max-w-[40rem] -top-[21rem] left-56 rounded-md pointer-events-none"/>
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">

                                    <button @click="clickForShowImage('18')"
                                        class="relative bg-white flex items-center justify-center w-full h-10 shadow-lg rounded-md border border-gray-400 hover:bg-green-300">مدیریت
                                        استراتژی بازار<img src="/images/etom/18.png" v-if="activeImage === '18'"
                                            class="absolute max-w-[40rem] -top-[21rem] left-40 rounded-md z-10"/></button>
                                </div>
                            </div>

                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button @click="clickForShowImage('123')"
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        مشکل فروش<img src="/images/etom/123.png" v-if="activeImage === '123'"
                                            class="absolute max-w-[40rem] -top-[21rem] left-40 rounded-md z-10"/>
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-3 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <!-- <button @click="clickForShowImage('123')"
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        مدیریت کانال<img src="/images/etom/123.png" v-if="activeImage === '123'"
                                            class="absolute max-w-[40rem] -top-[21rem] left-40 rounded-md z-10"/>
                                    </button> -->
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">


                                    <button
                                        class=" bg-white flex items-center justify-center w-full h-10 shadow-lg rounded-md">پیش
                                        بینی فروش</button>
                                    <!-- <button class=" bg-white flex items-center justify-center w-full h-10 shadow-lg rounded-md">مدیریت برند</button> -->
                                </div>

                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        مشکل بازاریابی
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-5 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        مدیریت کمپین بازاریابی
                                    </button>
                                </div>
                                <!-- <div
                                class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                               
                            </div> -->
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">



                                    <button
                                        class=" bg-white flex items-center justify-center w-full h-10 shadow-lg rounded-md">مدیریت
                                        برند</button>
                                </div>

                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>

                                <div
                                    class="col-span-7 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        مدیریت ارتباطات بازاریابی
                                    </button>
                                </div>

                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>

                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-[0.5px]  bg-yellow-500 rounded-md left-1">
                            <div class="flex w-full items-center justify-center p-2">
                                <h3 class="text-base font-bold">Customer Domain</h3>
                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-2 h-10 shadow-lg rounded-md border border-gray-400">هندلینگ
                                        استعلام صورتحساب مشتری

                                    </button>
                                    <button
                                        class=" bg-white flex items-center justify-center px-2 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        دریافت صورتحساب مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        QoS/SLA مشتری
                                    </button>
                                </div>
                                <!-- <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    
                                </div> -->
                                <div
                                    class="col-span-7 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        پردازش سفارش مشتری
                                    </button>
                                </div>
                                <!-- <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    
                                </div> -->
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">ارائه
                                        قابلیت مدیریت مشتری
                                    </button>
                                </div>
                                <div
                                    class="  col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 text-xs font-bold">

                                    <button
                                        class="group relative bg-white hover:bg-green-300 flex items-center justify-center px-1 h-10 shadow-xl border border-gray-400 rounded-md">مدیریت
                                        استراتژی مشتری<img src="/images/etom/11.png"
                                            class="absolute max-w-[40rem] -top-60 left-4  rounded-md opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" /></button>
                                </div>
                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        صورتحساب مالی مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400">مدیریت
                                        مشکل مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>
                                <div
                                    class="col-span-3 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        محرمانگی مشتری

                                    </button>
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        فهرست موجودی مشتری

                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        تجربه مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>
                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-5 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        اطلاعات مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-3 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        آمادگی پشتیبانی مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-2 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">
                                        مجموعه تجربه مشتری و ارتباط
                                    </button>
                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>

                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-5 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        تعامل با مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-5 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">


                                </div>

                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>

                            </div>
                            <div class="grid grid-cols-12">
                                <div
                                    class="col-span-5 w-full flex gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                    <button
                                        class=" bg-white flex items-center justify-center px-1 h-10 shadow-lg rounded-md border border-gray-400 w-full">مدیریت
                                        رابطه با مشتری
                                    </button>
                                </div>
                                <div
                                    class="col-span-5 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">


                                </div>

                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">

                                </div>
                                <div
                                    class="col-span-1 w-full flex  gap-2 shadow-lg items-start justify-center rounded-md p-2 overflow-hidden text-xs font-bold">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-transparent w-full h-[78rem]"></div>








            </div>
        </div>
    </div>
</template>



<script setup lang="ts">

import { ref, computed } from "vue"
let activeImage = ref<String|null>(null)

const grid = ref()

const x = ref("50%")
const y = ref("50%")


const onMove = e => {

    const rect = grid.value.getBoundingClientRect()

    x.value = e.clientX - rect.left + "px"
    y.value = e.clientY - rect.top + "px"

}

const onLeave = () => {

    x.value = "50%"
    y.value = "50%"

}


const glowStyle = computed(() => ({

    background:

        `radial-gradient(
900px circle at ${x.value} ${y.value},
rgba(71,73,227,0.35),
transparent 60%
)`

}))
const clickForShowImage = (id:string)=>{
  if(activeImage.value == id){
    activeImage.value = null
    console.log(activeImage)
  }else{
    activeImage.value = id
  }
}
</script>



<style scoped>
.wrapper {
    background: #0b0b0b;
    padding: 8px;
    border-radius: 5px;
    position: relative;

}



.glow {

    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}



.etom {




    /* این مهم‌ترین بخش */


    z-index: 1;








}










.box {

    background: white;
    font-size: 11px;
    text-align: center;
    padding: 4px;

}



.empty {

    background: transparent;

}
</style>
