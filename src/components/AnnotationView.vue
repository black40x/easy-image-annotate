<template>
  <div ref="annotate" class="annotation">
    <drag-and-drop-files
      @change="updateFiles"
      @drag-over="changeDragOver"
    />
    <annotation-editor
      ref="editor"
      v-show="files.length > 0 && activeFile !== null"
    />
    <div
      v-show="!dragOver && files.length === 0"
      class="annotation__empty"
    >
      <span>🤖</span><br />
      Drop me images to learn...
    </div>
  </div>
</template>

<script>
import DragAndDropFiles from '@/components/DragAndDropFiles'
import AnnotationEditor from '@/components/AnnotationEditor'
import { mapState } from 'vuex'
export default {
  name: 'AnnotationView',
  components: { AnnotationEditor, DragAndDropFiles },
  computed: {
    ...mapState({
      files: state => state.files,
      activeFile: state => state.activeFile
    })
  },
  data () {
    return {
      dragOver: false
    }
  },
  methods: {
    updateFiles (files) {
      this.dragOver = false

      for (let i = 0; i < files.length; i++) {
        this.$store.commit('addFile', files[i])
      }

      if (files.length > 0) {
        if (this.activeFile === null) {
          this.$store.commit('setActiveFile', 0)
        }
      }
    },
    changeDragOver (dragOver) {
      this.dragOver = dragOver
    }
  }
}
</script>

<style scoped lang="scss">
.annotation {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: #333;
  color: #FFF;

  &__empty {
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
    font-size: 1.5rem;
    text-align: center;
    padding: 10px;

    span {
      font-size: 7rem;
    }
  }
}
</style>
