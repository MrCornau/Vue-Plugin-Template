<template lang="pug">

<div class="window">
  <div class="spacing">
  <p class="Text_color">To fetch images request temporary access to the <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank" >corse demo server</a></p>
  </div>
  <div class="dropfield" v-cloak @drop.prevent @dragover.prevent>
    <div class="dropcontainer" @drop="onFileDopped">
      <div class="info">
        <h1 class="Text_color">Drop your file or <span class="pointer signal_color" @click="onPickFile"> browse</span></h1>
        <input type="file" @change="onFilePicked" ref="fileInput" accept="application/JSON"  style="display: none">
        <p class="secondText_color">Search for LeadUser.json</p>
      </div>
      <FileIcon/>
    </div>

  <div v-if="loading" class="loadingcontainer">
    <h2 class="Text_color">Loading great Posts...</h2>
    <div class="progress">
      <div class="progress-description">
      <p class="signal_color">{{this.percentage}}%&nbsp</p><p class="secondText_color">· {{this.done}}/{{this.count}} Posts</p>
      </div>
      <div class="progressbar-container">
        <div class="loading-bar">
          <div class="percentage" :style="{'width': percentage + '%'}"></div>
        </div>
      </div>
      
    </div>
  </div>
  </div>


  

  
</div>
</template>

// <Spinner/>
//   <div>loaded {{this.done}}/{{this.count}} posts</div>
//   <div class="container">
//     <div class="loading-bar">
//       <div class="percentage" :style="{'width': percentage + '%'}">
//       </div>
//     </div>
  

//   </div>

<style lang="scss">
@import "./figma-ui/figma-plugin-ds";

body{
  background-color: #232425;
}

.Text_color {
  color: #d3d7d8;
}
.signal_color {
  color: #edf67d;
}

.secondText_color {
  color: #b0cdcf;
}

.pointer {
  cursor: pointer;
}

h1 {
  font-family: IBM Plex Serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #dbe5e6;
}

h2{
  //styleName: UI/Third_Text;
font-family: IBM Plex Mono;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: left;


}

p {
  font-family: IBM Plex Mono;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
}

a{
 color: #EDF67D
}

.dropfield {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
}

.spacing{
   padding: 0px 16px;
}

.dropcontainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  position: static;
  width: 472px;
  left: 8px;
  top: 0%;
  bottom: 0%;

  /* UI/Third_Text */

  border: 1px dashed #404e51;
  box-sizing: border-box;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 0px;
}

.loadingcontainer {
  /* Auto Layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px;

position: static;
 width: 472px;
  left: 8px;
top: 66.29%;
bottom: 0%;


/* UI/Fine_Contur */

background: #33373A;
/* UI/Third_Text */

border: 1px solid #404E51;
box-sizing: border-box;

/* Inside Auto Layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
margin: 10px 0px;
}


.progress-description{
display: flex;
flex-direction: row;
align-items: flex-start;

}






.loading-bar {
  position: relative;
  width: 420px;
  height: 4px;
  overflow: hidden;
  background-color: #DBE5E6;
  .percentage {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    display: block;
    height: 100%;
    width: 50%;
    background-color: #EDF67D;
    background-image: linear-gradient(
      135deg,
      rgba($color: #fff, $alpha: 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba($color: #33373A, $alpha: 0.55) 5%,
      rgba($color: #33373A, $alpha: 0.55) 75%,
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
    background-position: 420px 0;
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
import FileIcon from "./file-icon.vue";

export default {
  components: {
    Spinner,
    FileIcon,
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
    // window.selectMenu.init();
    // window.iconInput.init();
    // window.disclosure.init();

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
      console.log(event);
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(event.target.files[0]);
    },
    onReaderLoad(event) {
      var obj = JSON.parse(event.target.result);
      console.log(obj);
      dispatch("resize");
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
