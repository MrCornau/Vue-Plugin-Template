<template lang="pug">

<div>
  <div v-if="!loading">
  <div id="app"   v-cloak @drop.prevent @dragover.prevent>
  <div class="dropfield" @drop="onFileDopped">
  </div>
  <button class="btn btn-info" @click="onPickFile">Upload profile picture</button>
  <input type="file" @change="onFilePicked" ref="fileInput" accept="application/JSON"  style="display: none">
  </div>
  </div>
  <div v-if="loading">
  <Spinner/>
<div>loaded {{this.done}}/{{this.count}} posts</div>
<div class="container">
  <div class="loading-bar">
    <div class="percentage" :style="{'width': percentage + '%'}">
    </div>
  </div>
</div>

  </div>

  
</div>


</template>

<style lang="scss">
@import "./figma-ui/figma-plugin-ds";

.dropfield {
  height: 200px;
  background-color: saddlebrown;
}

.loading-bar {
  position: relative;
  width: 200px;
  height: 10px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: 0.4), 0 -1px 1px #fff,
    0 1px 0 #fff;
  .percentage {
    position: absolute;
    top: 1px;
    right: 1px;
    left: 1px;
    display: block;
    height: 100%;
    width: 50%;
    background-color: #a5df41;
    background-image: linear-gradient(
      135deg,
      rgba($color: #fff, $alpha: 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba($color: #fff, $alpha: 0.15) 50%,
      rgba($color: #fff, $alpha: 0.15) 75%,
      transparent 75%,
      transparent
    );
    animation: animate-stripes 3s linear infinite;
  }
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
</style>

//
<button
  class="button button--primary"
  @click="createNode(message)"
>Label</button>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
// Add these lines to import the interactive figma-ui components as needed.
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";
import Spinner from "./LoadingSpinner.vue";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      loading: false,
      percentage: 0,
      count: 0,
      done: 0,
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
    onFileDopped(event) {
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.dataTransfer.files[0]);
      // this.onFilePicked(event.dataTransfer.files);
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.target.files.FIle[0]);
    },
    onReaderLoad(event) {
      var obj = JSON.parse(event.target.result);
      console.log(obj);
      this.createNode(obj);
    },

    async createNode(message) {
      let Cards = [];
      this.loading = true;
      this.count = message.length;
      let step = 100 / message.length;
      for await (let comment of message) {
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
        comment["imagehash"] = metaTags;
        Cards.push(comment);
        this.percentage += step;
        this.done += 1;
      }

      this.loading = false;
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
