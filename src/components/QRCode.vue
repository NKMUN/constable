<template>
  <canvas class="qr-code" ref="canvas" />
</template>

<script>
import QRCode from 'qrcode'
export default {
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value() {
      this.drawCode(this.value)
    }
  },
  data() {
    return {
      width: '300px'
    }
  },
  methods: {
    drawCode(val) {
      if (val) {
        QRCode.toCanvas(this.$refs.canvas, val, { width: parseInt(this.width, 10) })
      }
    }
  },
  mounted() {
    this.width = window.getComputedStyle(this.$refs.canvas).width
    this.drawCode(this.value)
  }
}
</script>