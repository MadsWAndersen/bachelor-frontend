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

      <UserPicture :image="image" />
    </div>
  </div>
</template>

<script setup>
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
