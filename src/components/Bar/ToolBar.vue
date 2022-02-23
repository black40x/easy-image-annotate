<template>
  <div class="left-bar">
    <div class="tabs">
      <span
        @click="currentTab = 'files'"
        :class="{'tabs__tab': true, 'tabs__tab--active': currentTab === 'files'}">
        Files
      </span>
      <span
        @click="currentTab = 'classes'"
        :class="{'tabs__tab': true, 'tabs__tab--active': currentTab === 'classes'}">
        Classes
      </span>
      <span
        @click="currentTab = 'annotation'"
        :class="{'tabs__tab': true, 'tabs__tab--active': currentTab === 'annotation'}">
        Annotation
      </span>
    </div>
    <div v-show="currentTab === 'classes'" class="tab tab__classes">
      <div class="tab-form">
        <div class="tab-row">
          <input
            class="editor-input"
            type="text"
            id="new-class"
            placeholder="New class name"
            @keyup.enter="handleNewClass"
            v-model="newClassName"
          />
          <input
            class="editor-color"
            type="color"
            v-model="newClassColor"
          />
        </div>
        <span class="tab-form__hint">Enter class name and press ENTER to create class.</span>
      </div>
      <div class="items-list">
        <list-item
          v-for="(cl, id) in classes"
          :key="id"
          :name="cl.name"
          :color="cl.color"
          :active="activeClass === id"
          @click="handleClassSelect(id)"
          @dblclick="handleClassRename(id)"
          @remove="handleClassRemove(id)"
        />
      </div>
      <span
        class="proto-link"
        @click="handleClearClasses"
      >
        Clear classes
      </span>
    </div>
    <div v-show="currentTab === 'annotation'" class="tab tab__annotation items-list">
      <list-item
        v-for="(annotation, id) in currentAnnotations"
        :key="id"
        :name="annotation.class ? annotation.class.name : 'Undefined'"
        :color="annotation.class ? annotation.class.color : 'Undefined'"
        :active="selectedAnnotate === id"
        @click="handleAnnotateSelect(id)"
        @remove="handleAnnotateRemove(id)"
      />
    </div>
    <div v-show="currentTab === 'files'" class="tab tab__files items-list">
      <list-item
        v-for="(file, id) in files"
        :key="id"
        :name="file.name"
        :active="activeFile === id"
        @click="handleFileSelect(id)"
        @remove="handleFileRemove(id)"
      />
    </div>
    <button
      v-show="files.length"
      class="download-json"
      @click="handleDownloadJson">
      Download meta
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from '@/components/Bar/ListItem'
import { LineString, Polygon, Point, Circle } from 'ol/geom'

export default {
  name: 'ToolBar',
  components: { ListItem },
  computed: {
    ...mapState({
      classes: state => state.classes,
      annotations: state => state.annotations,
      files: state => state.files,
      activeFile: state => state.activeFile,
      activeClass: state => state.activeClass,
      selectedAnnotate: state => state.selectedAnnotate,
      currentAnnotations: state => state.currentAnnotations
    })
  },
  data () {
    return {
      currentTab: 'classes',
      newClassName: '',
      newClassColor: ''
    }
  },
  mounted () {
    this.newClassColor = this.randomColor()
  },
  methods: {
    randomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    handleNewClass () {
      if (this.newClassName.length > 0) {
        this.$store.commit('addClass', {
          name: this.newClassName,
          color: this.newClassColor
        })
        this.newClassName = ''
        this.newClassColor = this.randomColor()
      }
    },
    handleFileSelect (id) {
      this.$store.commit('setActiveFile', id)
    },
    handleFileRemove (id) {
      if (confirm('Remove this file?')) {
        this.$store.commit('removeFile', id)
      }
    },
    handleClassRename (id) {
      const name = prompt(
        'Enter new class name:',
        this.classes[id].name
      )

      this.$store.commit('renameClass', {
        id: id,
        name: name
      })
    },
    handleClassSelect (id) {
      this.$store.commit('setActiveClass', id)
    },
    handleClassRemove (id) {
      if (confirm('Remove this class?')) {
        this.$store.commit('removeClass', id)
      }
    },
    handleAnnotateSelect (id) {
      this.$store.commit('selectAnnotation', id)
    },
    handleAnnotateRemove (id) {
      if (confirm('Remove this annotation?')) {
        this.$store.commit('removeAnnotation', id)
        this.$root.$emit('remove-feature', id)
      }
    },
    handleClearClasses () {
      if (confirm('Remove all classes?')) {
        this.$store.dispatch('clearClasses')
      }
    },
    handleDownloadJson () {
      const extentToBbox = (extent, img) => {
        return [
          [extent[0] / img.width, (img.height - extent[1]) / img.height],
          [extent[2] / img.width, (img.height - extent[3]) / img.height]
        ]
      }

      const featureToCoords = feature => {
        const img = feature.getProperties().image
        const geometry = feature.getGeometry()
        const coord = geometry.getCoordinates()

        if (geometry instanceof LineString) {
          return {
            type: 'Line',
            coordinates: coord.map(point => {
              return [point[0] / img.width, (img.height - point[1]) / img.height]
            }),
            bbox: extentToBbox(geometry.computeExtent(), img)
          }
        }
        if (geometry instanceof Polygon) {
          return {
            type: 'Polygon',
            coordinates: coord[0].map(point => {
              return [point[0] / img.width, (img.height - point[1]) / img.height]
            }),
            bbox: extentToBbox(geometry.computeExtent(), img)
          }
        }
        if (geometry instanceof Point) {
          return {
            type: 'Point',
            coordinates: [coord[0] / img.width, (img.height - coord[1]) / img.height]
          }
        }
        if (geometry instanceof Circle) {
          // eslint-disable-next-line no-case-declarations
          const center = geometry.getCenter()
          // eslint-disable-next-line no-case-declarations
          const radius = geometry.getRadius()
          return {
            type: 'Circle',
            center: [center[0] / img.width, (img.height - center[1]) / img.height],
            radius: radius / img.width,
            bbox: extentToBbox(geometry.computeExtent(), img)
          }
        }
      }

      const structure = {
        classes: this.classes,
        files: []
      }

      this.files.forEach((file, id) => {
        const chunk = {
          file_name: file.name,
          annotations: this.annotations[id].map(feature => {
            const clid = this.classes.findIndex(cl => cl.name === feature.getProperties().class.name)
            return {
              class_id: clid,
              geometry: featureToCoords(feature)
            }
          })
        }
        structure.files.push(chunk)
      })

      const element = document.createElement('a')
      const content = JSON.stringify(structure, null, 4)
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
      element.setAttribute('download', (new Date()).toLocaleDateString('es-CL') + '_annotation.json')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }
}
</script>

<style scoped lang="scss">
.left-bar {
  user-select: none;
  flex: 1 0 300px;
  background: #111;
  color: #FFFFFF;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 300px;

  .tabs {
    background-color: #1b1b1b;
    border-top: 1px solid #222;
    display: flex;

    &__tab {
      cursor: pointer;
      padding: 10px;
      text-transform: uppercase;
      color: #555;
      border-right: 1px solid #222;
      transition: all 0.15s ease-in;
      font-size: .9rem;

      &:hover {
        background: #111;
      }

      &--active {
        color: #888;
        background: #111;
        &:hover {
          background: #111;
        }
      }
    }
  }

  .tab {
    flex: 1;
    margin: 10px;

    &__classes {
      display: flex;
      flex-direction: column;

      .items-list {
        flex: 1;
      }
    }
  }

  .tab-form {
    margin-bottom: 10px;

    &__hint {
      font-size: .7rem;
      color: #555;
    }
  }

  .tab-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .items-list {
    background: #222;
    overflow: auto;
  }
}

.editor-input {
  background-color: #222;
  border: 1px solid transparent;
  color: #888;
  padding: 2px;
  outline: none;
  width: 100%;
  margin-right: 10px;
}

.editor-color {
  border: 0;
  width: 20px;
  height: 23px;
  background: #111;
  flex: 0 0 20px;
}

.proto-link {
  font-size: .7rem;
  margin-top: 9px;
  color: #bfbebe;
  text-decoration: underline;
  cursor: pointer;
}

.download-json {
  border: 0;
  background: #08f;
  color: #FFF;
  font-size: 1.1rem;
  padding: 15px 10px;
  cursor: pointer;
  outline: none;
}
</style>
