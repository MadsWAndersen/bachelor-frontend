<template>
  <div class="container">
    <div class="container-row">
      <h1>Insert components here</h1>
      <docButton
        url="https://github.com/MadsWAndersen/bachelor-frontend/branches"
        target="_blank"
        title="documentation"
        spanText="next"
        :btnStyle="'next'"

      />
      <linkButton
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

      <sectionCard
        v-for="(card, index) in data"
        v-if="data"
        :key="index"
        :headline="card.title"
        :description="card.bodyText"
        :image="card.image"
        :icon="card.svg"
        :style="'light'"
      >
        <linkButton
          class="z-20"
          url="https://github.com/MadsWAndersen/bachelor-frontend/branches"
          target="_blank"
          :title="'Go to ' + card.title"
          :style="'dark'"
        />
      </sectionCard>
    </div>
    </div>
</template>

<script setup>
const svgUrl = "https://api.iconify.design/carbon:tools.svg";

const data = [
  {
    title: "documentation",
    bodyText:
      "But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Slack sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image:
      "https://images.pexels.com/photos/1666068/pexels-photo-1666068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    svg: "https://api.iconify.design/material-symbols:edit-document-outline.svg?color=%23ffffff",
  },
  {
    title: "tools",
    bodyText:
      "But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Slack sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    url: "documentation",
    image:
      "https://media.umbraco.io/pba-webdev/mg4dnaxf/umbraco-patterns_pink_full.png",
    svg: "https://api.iconify.design/carbon:tools.svg?color=%23ffffff",
  },
];

const image =
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
</script>
