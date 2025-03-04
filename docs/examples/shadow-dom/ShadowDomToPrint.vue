<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import image from "../img.png";

import "../example.css";

const props = defineProps({
  text: String
});
const { text } = toRefs(props);

const canvasEl = ref();

onMounted(() => {
  const ctx = canvasEl.value.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(85, 40, 20, 20);
    ctx.save();
  }
});
</script>

<template>
  <div class="relativeCSS">
    <component :is="'style'" type="text/css" media="print"> @page { size: landscape; } </component>
    <div class="flash"></div>
    <table class="testClass">
      <thead>
        <tr>
          <th class="column1">Test Name</th>
          <th>Test</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Canvass</td>
          <td>
            <canvas height="100" ref="canvasEl" width="200">
              Your browser does not support the HTML5 canvas tag.
            </canvas>
          </td>
        </tr>
        <tr>
          <td>Dynamic Content From Prop</td>
          <td>{{ text ?? "Custom Text Here" }}</td>
        </tr>
        <tr>
          <td>Fonts</td>
          <td>
            <div class="customFontText">Some Cool Font Text</div>
          </td>
        </tr>
        <tr>
          <td>
            Image: Local Import(with <a href="https://ionicframework.com/docs/api/img">ion-img</a>)
          </td>
          <td>
            <ion-img alt="A test" :src="image" style="width: 200px" />
          </td>
        </tr>
        <tr>
          <td>Image: URL(with <a href="https://ionicframework.com/docs/api/img">ion-img</a>)</td>
          <td>
            <ion-img
              alt="Google logo"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              style="width: 200px"
            />
          </td>
        </tr>
        <tr>
          <td>Input(with <a href="https://ionicframework.com/docs/api/input">ion-input</a>)</td>
          <td>
            <ion-input label="Default input" />
          </td>
        </tr>
        <tr>
          <td>
            Input: Checkbox(with
            <a href="https://ionicframework.com/docs/api/checkbox">ion-checkbox</a>)
          </td>
          <td>
            <ion-checkbox>I agree to the terms and conditions</ion-checkbox>
          </td>
        </tr>
        <tr>
          <td>
            Input: Date(with
            <a href="https://ionicframework.com/docs/api/datetime-button">ion-datetime-button</a>)
          </td>
          <td>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal>
              <ion-datetime id="datetime"></ion-datetime>
            </ion-modal>
          </td>
        </tr>
        <tr>
          <td>
            Input: Radio(with <a href="https://ionicframework.com/docs/api/radio">ion-radio</a>)
          </td>
          <td>
            <ion-radio-group value="blue">
              <ion-radio value="blue">Blue</ion-radio>
              <ion-radio value="red">Red</ion-radio>
            </ion-radio-group>
          </td>
        </tr>
        <tr>
          <td>Select(with <a href="https://ionicframework.com/docs/api/select">ion-select</a>)</td>
          <td>
            <ion-select label="Default label" placeholder="Favorite Fruit">
              <ion-select-option value="apple">Apple</ion-select-option>
              <ion-select-option value="banana">Banana</ion-select-option>
              <ion-select-option value="orange">Orange</ion-select-option>
            </ion-select>
          </td>
        </tr>
        <tr>
          <td>
            TextArea(with <a href="https://ionicframework.com/docs/api/textarea">ion-textarea</a>)
          </td>
          <td>
            <ion-textarea label="Regular textarea" placeholder="Type something here"></ion-textarea>
          </td>
        </tr>
        <tr>
          <td>SVG</td>
          <td>
            <svg height="100" width="100">
              <circle cx="50" cy="50" fill="yellow" r="40" stroke="green" stroke-width="4" />
            </svg>
          </td>
        </tr>
        <tr>
          <td>Video</td>
          <td>
            <video :src="'https://www.w3schools.com/html/mov_bbb.mp4'" width="200"></video>
          </td>
        </tr>
        <tr>
          <td>Video: With Poster</td>
          <td>
            <video
              poster="https://images.freeimages.com/images/large-previews/9a9/tuscany-landscape-4-1500765.jpg"
              :src="'https://www.w3schools.com/html/mov_bbb.mp4'"
              width="200"
            ></video>
          </td>
        </tr>
        <tr>
          <td>Broken Image</td>
          <td>
            <img
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              width="200"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
