<template>
  <div class="mouseover-button" @mouseover="showButton" @mouseleave="hideButton">
    <div class="content">
      <slot></slot>
    </div>
    <button class="button" v-show="show">Click me!</button>
  </div>
</template>
 
<script>
import { ref } from 'vue'
 
export default {
  // eslint-disable-next-line no-empty-pattern
  setup({ }) {
    const show = ref(false)
 
    const showButton = () => {
      show.value = true
    }
 
    const hideButton = () => {
      show.value = false
    }
 
    return {
      show,
      showButton,
      hideButton
    }
  }
}
</script>
 
<style scoped>
.mouseover-button {
  position: relative;
  display: inline-block;
}
 
.content {
  display: inline-block;
}
 
.button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>