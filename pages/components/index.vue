<template>
  <div class="container">
    <div class="container-row">
      <LinkButton
        url="https://github.com/MadsWAndersen/bachelor-frontend/branches"
        target="_blank"
        title="Read more"
        :style="'dark'"
      />

      <highlightCard
        v-for="(card, index) in data"
        :key="index"
        v-if="data"
        :title="card.title"
        :bodyText="card.bodyText"
        :url="card.url"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M12.1 2a9.8 9.8 0 0 0-5.4 1.6l6.4 6.4a2.1 2.1 0 0 1 .2 3a2.1 2.1 0 0 1-3-.2L3.7 6.4A9.84 9.84 0 0 0 2 12.1a10.14 10.14 0 0 0 10.1 10.1a10.9 10.9 0 0 0 2.6-.3l6.7 6.7a5 5 0 0 0 7.1-7.1l-6.7-6.7a10.9 10.9 0 0 0 .3-2.6A10 10 0 0 0 12.1 2Zm8 10.1a7.61 7.61 0 0 1-.3 2.1l-.3 1.1l.8.8l6.7 6.7a2.88 2.88 0 0 1 .9 2.1A2.72 2.72 0 0 1 27 27a2.9 2.9 0 0 1-4.2 0l-6.7-6.7l-.8-.8l-1.1.3a7.61 7.61 0 0 1-2.1.3a8.27 8.27 0 0 1-5.7-2.3A7.63 7.63 0 0 1 4 12.1a8.33 8.33 0 0 1 .3-2.2l4.4 4.4a4.14 4.14 0 0 0 5.9.2a4.14 4.14 0 0 0-.2-5.9L10 4.2a6.45 6.45 0 0 1 2-.3a8.27 8.27 0 0 1 5.7 2.3a8.49 8.49 0 0 1 2.4 5.9Z"
        />
      </svg>

      <img :src="svgUrl" alt="Description of the image" />
    </div>
  </div>
</template>

<script setup>
const svgUrl = "https://api.iconify.design/carbon:tools.svg";

const data = [
  {
    title: "CMS - reset 2FA",
    bodyText:
      "But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Slack sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Accounting - how to set up payment",
    bodyText:
      "But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Slack sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    url: "documentation",
  },
];

const image =
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
</script>
