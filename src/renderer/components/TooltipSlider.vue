<template>
  <div class="slider-parent" :class="{'disable' : !window.clickable}">
    <div class="fa no-drag">
      <font-awesome-icon :icon="icon"/>
    </div>
    <div class="slider-hover" v-if="window.clickable">
      <div class="slider">
        <div class="slider-content">
          <vue-slider
          ref="slider"
          v-model="val"
          direction="vertical"
          height="100%"
          :width="7"
          class="slider-input"
          :dotSize="16"
          :slider-style="{
            'box-shadow': '0px 10px 30px -3px rgb(0,0,0)'
          }"
          :style="{
          }"
          :bgStyle="{
            'background': 'rgba(255, 255, 255, .1)'
          }"
          :processStyle="{
            'background': 'white'
          }"
          :min="min"
          :max="max"
          :interval="interval"
          :tooltip="false">
          </vue-slider>
        </div>
        <div class="slider-ball"></div>
        <div class="slider-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import VueSlider from 'vue-slider-component'
  import { mapGetters } from 'vuex'

  export default {
    name: 'tooltip-slider',
    props: ['icon', 'get', 'set', 'min', 'max', 'interval'],
    computed: {
      ...mapGetters(['window']),
      val: {
        get () { return this.get },
        set (newVal) { this.set(newVal) }
      }
    },
    components: {
      FontAwesomeIcon,
      VueSlider
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/global.scss';

  .slider-parent {
    position: relative;
    &:hover, &:focus, &:active, &:target {
      .slider-hover {
        opacity: 1;
        pointer-events: all;
      }
    }
    .slider-hover {
      opacity: 0;
      transition: all .3s;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 250px;
      pointer-events: none;
      .slider {
        box-shadow: 0px 11px 61px -8px rgba(0, 0, 0, .45);
        border-radius: 15px;
        top: 0;
        bottom: 50px;
        position: absolute;
        width: 70%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(to bottom, #505050 0%,#4b4b4b 100%);
        padding: .8em 0;
        .slider-content {
          position: relative;
          height: 100%;
          width: 100%;
          .slider-input {
            cursor: pointer;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
</style>
