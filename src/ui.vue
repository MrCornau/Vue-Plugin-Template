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
          link: "https://www.reddit.com/r/ErgoMechKeyboards/comments/q067kc/my_little_colemak_dactyl_manuform_and_custom/",
          origin: "Reddit",
          suborigin: "nikon",
          result: true,
          Selector: "i created",
          selectorShort: "create",
          MarkedSent:
            "-----> i !!!  -----> created !!! a web app for photographers who use google drive to send photos to clients but wish they had a better -----> looking !!! page to send to clients.",
          sortedWord: "None",
          Identifyer: null,
          identifyer: 1248,
          year: "2019",
          tag: "",
          rating: 3,
          heading: "A Web App for Photographs",
          description: "Great Webapp, for Photographs",
          id: 0,
          media: "https://i.redd.it/0df5rp1suh981.jpg",
        },
        {
          autor: "Manuel Neuer",
          date: "2019-01-18 06:21:37",
          content:
            "I created a web app for photographers who use Google Drive to send photos to clients but wish they had a better looking page to send to clients.",
          link: "https://www.reddit.com/r/photography/comments/rvg4j2/a_friendly_reminder/",
          origin: "Reddit",
          suborigin: "nikon",
          result: true,
          Selector: "i created",
          selectorShort: "create",
          MarkedSent:
            "-----> Wenn !!! es zwei zu eins steht, dann ist ein zwei zu -----> null !!! nicht mehr möglich.",
          sortedWord: "None",
          Identifyer: null,
          identifyer: 1248,
          year: "2019",
          tag: "running",
          rating: 4,
          heading: "A Web App for Photographs",
          description: "Great Webapp, for Photographs",
          id: 0,
          media: "https://i.redd.it/0df5rp1suh981.jpg",
        },
        {
          autor: "Manuel Alter",
          date: "2019-01-18 06:21:37",
          content:
            "I created a web app for photographers who use Google Drive to send photos to clients but wish they had a better looking page to send to clients.",
          link: "https://www.reddit.com/r/photography/comments/rvg4j2/a_friendly_reminder/",
          origin: "Reddit",
          suborigin: "nikon",
          result: true,
          Selector: "i created",
          selectorShort: "create",
          MarkedSent:
            "-----> Wenn !!! es zwei zu eins steht, dann ist ein zwei zu -----> null !!! nicht mehr möglich.",
          sortedWord: "None",
          Identifyer: null,
          identifyer: 1248,
          year: "2019",
          tag: "running",
          rating: 4,
          heading: "A Web App for Photographs",
          description: "Great Webapp, for Photographs",
          id: 0,
          media: "https://i.redd.it/0df5rp1suh981.jpg",
        },

        {
          autor: "Manuel Neuer",
          date: "2019-01-18 06:21:37",
          content:
            "I created a web app for photographers who use Google Drive to send photos to clients but wish they had a better looking page to send to clients.",
          link: "https://www.reddit.com/r/robotics/comments/n21giz/a_closer_look_at_acorn_our_open_source_farming/",
          origin: "Reddit",
          suborigin: "nikon",
          result: true,
          Selector: "i created",
          selectorShort: "create",
          MarkedSent:
            "-----> Wenn !!! es zwei zu eins steht, dann ist ein zwei zu -----> null !!! nicht mehr möglich.",
          sortedWord: "None",
          Identifyer: null,
          identifyer: 1248,
          year: "2019",
          tag: "communication",
          rating: 2,
          heading: "A Web App for Photographs",
          description: "Great Webapp, for Photographs",
          id: 0,
          media: "https://i.redd.it/0df5rp1suh981.jpg",
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
    async createNode(message) {
      let Cards = [];

      for (let comment of message) {
        let imagelink = await this.fetchMetaTags(comment.link);
        console.log(imagelink);
        let metaTags = "None";
        if (imagelink != "No image found") {
          let imageData = await this.getEncodedImageFromURL(imagelink);
          metaTags = {
            data: imageData.data,
            url: imageData.img.src,
            width: imageData.img.naturalWidth,
            height: imageData.img.naturalHeight,
          };
        }

        console.log(metaTags, "test");
        comment["imagehash"] = metaTags;
        Cards.push(comment);
      }

      dispatch("createNode", Cards);
    },

    async fetchMetaTags(url) {
      return new Promise(function (resolve, reject) {
        let fetchUrl = `https://cors-anywhere.herokuapp.com/${url.replace(
          /http(s)?:\/\//,
          ""
        )}`;

        fetch(fetchUrl)
          .then(function (response) {
            // The API call was successful!
            return response.text();
          })
          .then(async (html) => {
            let metaTags = {};

            // This is the HTML from our response as a text string
            let head = document.createElement("div");
            let headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
            let headHTML = headMatch !== null ? headMatch[1] : html;
            headHTML.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
            head.innerHTML = headHTML;
            // get image3
            let image = head.querySelector(
              'meta[property="og:image"],meta[name="twitter:image"]'
            );

            if (!image) {
              resolve("No image found");
              return;
            }

            resolve(image.getAttribute("content"));
          })
          .catch(function (err) {
            // There was an error
            console.warn("Something went wrong.", err);

            reject("Something went wrong.");
          });
      });
    },

    getEncodedImageFromURL: (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        // Some websites will allow loading of images into a canvas if set to Anonymous
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            let blobBuffer = await blob.arrayBuffer();
            resolve({
              img: img,
              data: new Uint8Array(blobBuffer),
            });
          });
        };
        // If an Anonymous image does not load, attempt to load it
        // cross origin using cors-anywhere
        img.onerror = () => {
          if (img.src.indexOf("cors-anywhere") === -1) {
            img.src = `https://cors-anywhere.herokuapp.com/${url.replace(
              /http(s)?:\/\//,
              ""
            )}`;
          } else {
            reject("Error fetching image");
          }
        };

        img.src = url;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./figma-ui/figma-plugin-ds";
</style>
