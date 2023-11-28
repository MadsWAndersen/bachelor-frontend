<template>
  <NuxtLink
    class="  "
    :class="buttonStyling()"
    :to="url"
    :target="target"
    :style="style"
    >{{ title }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  target: {
    type: String,
  },
  style: {
    type: String,
    validator(value) {
      return ["dark", "light", "neutral"].includes(value);
    },
  },
});

const buttonStyling = () => {
  let bgColor = "";

  switch (props.style) {
    case "dark":
      bgColor =
        "bg-um-blue text-um-palepink border-um-blue hover:bg-um-white hover:text-um-blue hover:border-um-blue ";
      break;
    case "light":
      bgColor =
        "bg-um-palepink text-um-blue  border-um-palepink hover:bg-um-white hover:text-um-palepink";
      break;
    case "neutral":
      bgColor =
        "bg-transparent text-um-blue border-um-blue hover:bg-um-blue hover:text-um-white";
      break;
    default:
      bgColor =
        "bg-um-blue text-um-palepink border-um-blue hover:bg-um-white hover:text-um-blue hover:border-um-blue ";
      break;
  }

  return `rounded-sm px-6 py-2 border-2 ${bgColor} font-bold`;
};
</script>
