<template lang="pug">
//- div
//- 	button.button.button--primary(@click='createNode') Create a TEST node
//- 	p.type.type--pos-small-normal {{message}}
//- div

<div>
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
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
      message: "",
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
      console.log(message, "test");
      let numbers = message.split(",").map((x) => +x);
      dispatch("createNode", numbers);
    },
  },
};
</script>

<style lang="scss">
@import "./figma-ui/figma-plugin-ds";
</style>
