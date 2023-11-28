<template>
  <div
    class="relative lg:col-span-3 col-span-full p-5 mt-4 rounded-sm min-h-[350px] flex flex-col justify-end bg-opacity-75"
    :class="containerStyling()"
  >
    <img
      class="w-full h-full absolute left-0 top-0 rounded-sm -z-10 bg-cover"
      :src="image"
      alt="background image"
    />
    <img
      class="absolute h-[30px] w-[30px] top-0 right-0 m-5 bg-cover"
      :alt="headline"
      :src="icon"
    />

    <h3 class="font-bold text-2xl mb-3 capitalize">{{ headline }}</h3>
    <p class="text-sm pr-8 mb-5 line-clamp-3">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  icon: {
    type: String,
  },
  style: {
    type: String,
    validator(value) {
      return ["dark", "light"].includes(value);
    },
  },
});

const containerStyling = () => {
  let containerColor = "";

  switch (props.style) {
    case "dark":
      containerColor = "bg-um-blue text-um-palepink";
      break;
    case "light":
      containerColor = "bg-um-palepink text-um-blue ";
      break;
    default:
      containerColor = "bg-um-blue text-um-palepink";
      break;
  }

  return `${containerColor}`;
};
</script>
