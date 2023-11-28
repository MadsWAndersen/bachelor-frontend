<template>
  <div class="container">
    <div class="container-row">
      <h1 class="col-span-2">Insert components here</h1>

      <highlightCard
        v-for="(card, index) in data"
        :key="index"
        v-if="data"
        :title="card.title"
        :bodyText="card.bodyText"
        :url="card.url"
      />
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
</script>
