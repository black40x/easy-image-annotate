<template>
  <div :class="{
        'drag-and-drop': true,
        'drag-and-drop--hover': isHover
    }"
       @dragover="dragover"
       @dragleave="dragleave"
       @drop="drop">
    <input type="file"
           multiple
           class=""
           @change="onChange"
           ref="file"
           accept=".jpg,.jpeg,.png"/>
    <span>Drag PNG, JPG, JPEG here!..</span>
  </div>
</template>

<script>
export default {
  name: 'DragAndDropFiles',
  data () {
    return {
      isDragOver: false,
      count: 0,
      filelist: [],
      watchEl: null
    }
  },
  computed: {
    isHover () {
      return this.isDragOver
    }
  },
  mounted () {
    this.watchEl = document

    this.watchEl.addEventListener('dragover', this.dragover)
    this.watchEl.addEventListener('dragleave', this.dragleave)
    this.watchEl.addEventListener('drop', this.drop)
  },
  methods: {
    async onChange () {
      this.filelist = [...this.$refs.file.files]
      this.$emit('change', this.filelist)
    },
    remove (i) {
      this.filelist.splice(i, 1)
    },
    dragover (event) {
      event.preventDefault()
      this.isDragOver = true
      this.$emit('drag-over', true)
    },
    dragleave (event) {
      this.isDragOver = false
      this.$emit('drag-over', false)
    },
    drop (event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange()
      this.isDragOver = false
    },
    select () {
      this.$refs.file.click()
    }
  },
  destroyed () {
    this.watchEl.removeEventListener('dragover', this.dragover)
    this.watchEl.removeEventListener('dragleave', this.dragleave)
    this.watchEl.removeEventListener('drop', this.drop)
  }
}
</script>

<style scoped lang="scss">
.drag-and-drop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
  background-color: #000000de;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 0.1s ease-in;

  input {
    display: none;
  }

  &--hover {
    opacity: 1;
  }
}
</style>
