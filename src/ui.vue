<template lang="pug">
//- div
//- 	button.button.button--primary(@click='createNode') Create a TEST node
//- 	p.type.type--pos-small-normal {{message}}
//- div

<div>
//- <input v-model="message" placeholder="edit me">
//- <p>Message is: {{ message }}</p>
<button class='button button--primary' @click='createNode(message)'>Label</button> 
</div>
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
// Add these lines to import the interactive figma-ui components as needed.
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";

export default {
  data() {
    return {
      message: [
        {
          autor: "ntoporcov",
          date: "2019-01-18 06:21:37",
          content:
            "I created a web app for photographers who use Google Drive to send photos to clients but wish they had a better looking page to send to clients.",
          link: "https://www.reddit.com/r/Nikon/comments/ah7lvu/i_created_a_web_app_for_photographers_who_use/",
          origin: "Reddit",
          suborigin: "nikon",
          result: true,
          Selector: "i created",
          selectorShort: "create",
          MarkedSent:
            "-----> i !!!  -----> created !!!  a web app for photographers who use google drive to send photos to clients but wish they had a better looking page to send to clients.",
          sortedWord: "None",
          Identifyer: null,
          identifyer: 1248,
          year: "2019",
          id: 0,
        },
      ],
    };
  },
  mounted() {
    // Add these lines to initialize the interactive figma-ui components as needed.
    window.selectMenu.init();
    window.iconInput.init();
    window.disclosure.init();

    // The following shows how messages from the main code can be handled in the UI code.
    handleEvent("nodeCreated", (nodeID) => {
      this.message = `Node ${nodeID} was created!`;
    });
  },
  methods: {
    createNode(message) {
      // console.log(message, "test");
      // let numbers = message.split(",").map((x) => +x);
      dispatch("createNode", message);
    },
  },
};
</script>

<style lang="scss">
@import "./figma-ui/figma-plugin-ds";
</style>
