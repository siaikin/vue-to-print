<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import image from "./img.png";

import "./example.css";

const props = defineProps({
  text: String
});
const { text } = toRefs(props);

const checked = ref(false);
const canvasEl = ref();

const handleCheckboxOnChange = () => {
  checked.value = !checked.value;
};

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
          <td>Image: Local Import</td>
          <td>
            <img alt="A test" :src="image" width="200" />
          </td>
        </tr>
        <tr>
          <td>Image: URL</td>
          <td>
            <img
              alt="Google logo"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              width="200"
            />
          </td>
        </tr>
        <tr>
          <td>Input</td>
          <td>
            <input />
          </td>
        </tr>
        <tr>
          <td>Input: Checkbox</td>
          <td>
            <input :checked="checked" @change="handleCheckboxOnChange" type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>Input: Date</td>
          <td>
            <input type="date" />
          </td>
        </tr>
        <tr>
          <td>Input: Radio</td>
          <td>
            Blue <input type="radio" id="blue" name="color" value="blue" /> Red
            <input type="radio" id="red" name="color" value="red" />
          </td>
        </tr>
        <tr>
          <td>Select</td>
          <td>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>TextArea</td>
          <td>
            <textarea></textarea>
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
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
