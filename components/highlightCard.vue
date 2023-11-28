<template>
  <div
    class="mb-4 overflow-hidden col-span-full bg-cover bg-left rounded-sm py-4 pr-4 pl-5 lg:pl-[33px] relative before:content-[''] before:h-full before:absolute before:bg-um-red before:w-[13px] before:left-0 before:top-0"
  >
    <div
      class="bg-[url('/assets/image/Pale__Full.png')] w-full h-full absolute top-0 -z-10 bg-cover bg-left left-0 bg-opacity-5"
    ></div>

    <div
      class="flex justify-between items-center cursor-pointer"
      @click="toggle"
    >
      <h3 class="text-um-blue font-bold">{{ title }}</h3>
      <Icon
        v-if="!isOpen"
        class="text-um-blue cursor-pointer"
        name="fa:chevron-down"
      />
      <Icon
        v-if="isOpen"
        class="text-um-blue font-bold cursor-pointer"
        name="fa:chevron-up"
      />
    </div>

    <div
      v-if="isOpen"
      class="text-um-black pt-3 lg:pr-[227px] flex flex-col gap-5"
    >
      {{ bodyText }}

      <NuxtLink class="text-um-blue" :href="url">Go to solution</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["bodyText", "title", "url"]);
const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>
