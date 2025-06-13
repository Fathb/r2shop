<template>
  <div class="testimoni-gallery">
    <h1>Galeri Testimoni</h1>
    <div class="gallery">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image['Link Embed']"
        @click="openImage(index)"
        class="thumbnail"
		:alt="image['Link Embed']"
      />
    </div>

<!-- Modal dengan Transisi -->
    <transition name="fade">
      <div v-if="selectedImage" class="modal" @click.self="closeImage">
        <button class="nav-btn left" @click.stop="prevSlide">‹</button>
        <img :src="selectedImage" class="modal-image" />
        <button class="nav-btn right" @click.stop="nextSlide">›</button>
      </div>
    </transition>

    <!-- <div v-if="selectedImage" class="modal" @click="closeImage">
      <img :src="selectedImage" class="modal-image" />
	</div>-->
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

let images = ref([]);
async function getImg(){
  let imgsObj = await axios.get('https://script.google.com/macros/s/AKfycbw10SsWDkywsltqPWkTItEbfMMvinPhzVCeThuXePsl1_p6uX2oF71IKvQOE-lpbxBB/exec?sheet='+encodeURI('testim img'));
  imgsObj = await imgsObj.data;
  images.value = imgsObj;
}

getImg()

//ref([
  // Ganti URL ini dengan gambar testimoni kamu
  //'https://via.placeholder.com/400x300?text=Testimoni+1',
  //'https://via.placeholder.com/400x300?text=Testimoni+2',
  //'https://via.placeholder.com/400x300?text=Testimoni+3',
//])

const selectedImage = ref(null)
let currentIndex = ref(null)

function openImage(i) {
  currentIndex.value = i;
  selectedImage.value = images.value[i]["Link Embed"]+"&sz=w400"
}

function prevSlide() {
  currentIndex.value -= 1
  selectedImage.value = images.value[currentIndex.value]["Link Embed"]+"&sz=w400"
  
}

function nextSlide() {
  currentIndex.value += 1
  selectedImage.value = images.value[currentIndex.value]["Link Embed"]+"&sz=w400"
}

function closeImage() {
  selectedImage.value = null
  currentIndex.value = null
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
}

.thumbnail {
  width: 200px;
  height: 250px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 0 10px #fff;
  transition: transform 0.2s;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.nav-btn {
  position: absolute;
  top: 50%;
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  z-index: 1001;
  transform: translateY(-50%);
  padding: 0 15px;
}
.left {
  left: 10px;
}
.right {
  right: 10px;
}
.modal-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 10px;
  box-shadow: 0 0 10px #fff;
  transition: transform 0.3s ease;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

