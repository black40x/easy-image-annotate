<template>
  <div class="annotation-editor">
    <div v-show="currentClass !== null" class="toolbar">
      <button
        @click="tool('Circle')"
        :class="{'toolbar__button': true, 'toolbar__button--active': currentTool === 'Circle'}"
        title="Annotate circle"
      >
        <img src="../assets/ic_circle.svg"/>
      </button>
      <button
        @click="tool('Box')"
        :class="{'toolbar__button': true, 'toolbar__button--active': currentTool === 'Box'}"
        class="toolbar__button"
        title="Annotate box"
      >
        <img src="../assets/ic_box.svg"/>
      </button>
      <button
        @click="tool('LineString')"
        :class="{'toolbar__button': true, 'toolbar__button--active': currentTool === 'LineString'}"
        class="toolbar__button"
        title="Annotate line"
      >
        <img src="../assets/ic_line.svg"/>
      </button>
      <button
        @click="tool('Polygon')"
        :class="{'toolbar__button': true, 'toolbar__button--active': currentTool === 'Polygon'}"
        class="toolbar__button"
        title="Annotate polygon"
      >
        <img src="../assets/ic_polygon.svg"/>
      </button>
      <button
        @click="tool('Point')"
        :class="{'toolbar__button': true, 'toolbar__button--active': currentTool === 'Point'}"
        class="toolbar__button"
        title="Annotate point"
      >
        <img src="../assets/ic_point.svg"/>
      </button>
    </div>
    <select
      v-if="classes.length > 0 && selectedAnnotate !== null"
      class="annotate-class"
      v-model="selectedAnnotateClass"
      @change="changeAnnotateClass"
    >
      <option
        v-for="(cl, id) in classes"
        :key="id"
        :value="id"
      >
        {{ cl.name }}
      </option>
    </select>
    <vl-map
      v-if="editor.ready"
      ref="openlayer"
      class="ol-editor"
      :default-controls="false"
      @mounted="onMapMounted"
      :style="{height: '100%', cursor: currentTool !== null ? 'crosshair' : 'pointer'}"
    >
      <vl-view
        :projection="editor.projection.getCode()"
        :center="editor.center"
        :zoom="2"
      />
      <vl-layer-image
        id="xkcd"
      >
        <vl-source-image-static
          :size="editor.size"
          :extent="editor.extent"
          :projection="editor.projection.getCode()"
          :url="editor.image.src"
        />
      </vl-layer-image>
      <vl-layer-vector ref="layer" :z-index="2">
        <vl-source-vector :features.sync="features"
                          ident="the-source-edit"></vl-source-vector>

        <vl-style-func :factory="styleFuncFactoryEdit"/>
      </vl-layer-vector>
      <vl-interaction-draw
        v-if="currentDraw !== null && currentClass !== null"
        ref="draw"
        :type="currentDraw"
        :active="currentDraw !== null && currentClass !== null"
        :geometryFunction="geometryFunction"
        @drawend="handleAnnotate"
        source="the-source-edit"
      >
        <vl-style-func :factory="styleFuncFactoryDraw"/>
      </vl-interaction-draw>
      <vl-interaction-modify
        source="the-source-edit"
      />
    </vl-map>
  </div>
</template>

<script>
import { addProj, createProj, createStyle } from 'vuelayers/lib/ol-ext'
import MultiPoint from 'ol/geom/MultiPoint'
import { createBox } from 'ol/interaction/Draw'
import { mapState } from 'vuex'
import { LineString, Polygon, Point, Circle } from 'ol/geom'

export default {
  name: 'AnnotationEditor',
  computed: {
    ...mapState({
      files: state => state.files,
      classes: state => state.classes,
      activeClass: state => state.activeClass,
      activeFile: state => state.activeFile,
      annotations: state => state.annotations,
      selectedAnnotate: state => state.selectedAnnotate
    }),
    currentClass () {
      if (this.activeClass === null) {
        return null
      }
      return this.classes[this.activeClass]
    },
    currentDraw () {
      if (this.currentTool === 'Box') {
        return 'Circle'
      }
      return this.currentTool
    }
  },
  watch: {
    features () {
      if (this.$refs.layer) {
        this.$store.commit('setAnnotations', {
          fileIndex: this.activeFile,
          // features: this.features,
          features: this.$refs.layer.getSource().getFeatures(),
          save: true
        })
      }
    },
    activeFile () {
      this.editor.ready = false
      if (this.activeFile !== null) {
        this.$nextTick(() => {
          this.loadImageFile(this.files[this.activeFile])
          this.features = this.annotations[this.activeFile]
        })
      }
    },
    selectedAnnotate () {
      if (this.selectedAnnotate !== null) {
        const cl = this.annotations[this.activeFile][this.selectedAnnotate]
        if (cl.properties !== null) {
          this.selectedAnnotateClass = this.classes.findIndex(c => c.name === cl.getProperties().class.name)
        }
      }
      this.$refs.layer.$layer.getSource().changed()
    }
  },
  data () {
    return {
      features: [],
      currentTool: null,
      geometryFunction: undefined,
      selectedAnnotateClass: null,

      editor: {
        ready: false,
        center: [0, 0],
        size: [0, 0],
        extent: {},
        projection: null,
        image: null
      }
    }
  },
  mounted () {
    this.$root.$on('remove-feature', (id) => {
      this.$refs.layer.getSource().removeFeature(this.$refs.layer.getSource().getFeatures()[id])
    })
  },
  methods: {
    loadImageFile (file) {
      this.editor.image = new Image()
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.editor.image.src = fileReader.result
      }
      this.editor.image.onload = () => {
        this.openEditor()
      }
      fileReader.readAsDataURL(file)
    },
    openEditor () {
      this.editor.size = [this.editor.image.width, this.editor.image.height]
      const extent = [0, 0, ...this.editor.size]

      this.editor.center = [this.editor.size[0] / 2, this.editor.size[1] / 2]
      this.editor.projection = createProj({
        axisOrientation: 'enu',
        code: 'xkcd-image',
        units: 'pixels',
        worldExtent: extent,
        getPointResolution: (resolution) => {
          return resolution
        },
        extent
      })
      addProj(this.editor.projection)
      this.editor.extent = extent
      this.editor.ready = true
    },
    onMapMounted () {},
    tool (slug) {
      if (slug === this.currentTool) {
        this.currentTool = null
      } else {
        this.currentTool = slug
      }

      if (this.currentTool === 'Box') {
        this.geometryFunction = createBox()
      } else {
        this.geometryFunction = undefined
      }
    },
    hexToRgb (hex) {
      const res = hex.match(/[a-f0-9]{2}/gi)
      return res && res.length === 3 ? res.map(function (v) { return parseInt(v, 16) }) : null
    },
    styleFuncFactoryDraw () {
      return (feature) => {
        let color = '#000000'

        if (this.currentClass) {
          color = this.currentClass.color
        }

        if (feature.getProperties().class && feature.getProperties().class.color) {
          color = feature.getProperties().class.color
        }

        return [
          createStyle({
            strokeColor: color,
            strokeWidth: 1,
            imageColor: [255, 255, 255, 0.5],
            imageRadius: 5,
            fillColor: [...this.hexToRgb(color), 0.3]
          })
        ]
      }
    },
    styleFuncFactoryEdit () {
      return (feature) => {
        let color = '#000000'

        if (this.currentClass) {
          color = this.currentClass.color
        }

        let strokeWidth = 0.8
        let opacity = 0.3

        if (feature.getProperties().class && feature.getProperties().class.color) {
          color = feature.getProperties().class.color
          if (this.selectedAnnotate === feature.getProperties().class.id) {
            opacity = 0.5
            strokeWidth = 2
          }
        }

        const style = [
          createStyle({
            strokeColor: color,
            strokeWidth: strokeWidth,
            imageColor: [255, 255, 255, 0.5],
            imageRadius: 10,
            fillColor: [...this.hexToRgb(color), opacity]
          }),
          createStyle({
            strokeColor: color,
            strokeWidth: 1,
            imageColor: [255, 255, 255, 0.5],
            imageRadius: 3,
            fillColor: color,
            geom: (feature) => {
              if (feature.getGeometry() instanceof Point || feature.getGeometry() instanceof Circle) {
                return null
              }
              if (feature.getGeometry() instanceof LineString) {
                return new MultiPoint(feature.getGeometry().getCoordinates())
              }
              if (feature.getGeometry() instanceof Polygon) {
                return new MultiPoint(feature.getGeometry().getCoordinates()[0])
              }
              return null
            }
          })
        ]

        return style
      }
    },
    handleAnnotate (event) {
      event.feature.set('class', {
        ...this.currentClass,
        id: this.features.length - 1
      })
      event.feature.set('image', {
        width: this.editor.image.width,
        height: this.editor.image.height
      })
      this.$store.commit('selectAnnotation', this.features.length - 1)
      this.selectedAnnotateClass = this.activeClass
    },
    changeAnnotateClass (e) {
      if (this.selectedAnnotate !== null) {
        const cl = this.classes[parseInt(this.selectedAnnotateClass)]
        this.annotations[this.activeFile][this.selectedAnnotate].getProperties().class.name = cl.name
        this.annotations[this.activeFile][this.selectedAnnotate].getProperties().class.color = cl.color
      }

      this.$refs.layer.$layer.getSource().changed()
    }
  }
}
</script>

<style scoped lang="scss">
.annotation-editor {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #333;

  .ol-editor {
    position: relative;
  }

  .annotate-class {
    z-index: 9;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #aaa;
    background-color: #222;
    border: 0;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    padding: 1px 3px;
    width: 120px;
  }

  .toolbar {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 32px;
    background: #eee;
    text-align: center;
    z-index: 9;

    &__button {
      height: 32px;
      color: #555;
      background-color: #222;
      border: 0;
      margin: 0;
      padding: 5px 8px;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      border-bottom: 1px solid #333232;

      &:hover {
        color: #ccc;
        background-color: #444;
      }

      &--active {
        background-color: #08f;
      }

      img {
        width: 16px;
        height: 16px;
        filter: invert(1);
        opacity: 0.5;
      }
    }
  }
}
</style>
