import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mapFeatures = features => features.filter(f => f.properties !== null).map((f, id) => {
  return {
    id: id,
    class: f.getProperties().class
  }
})

export default new Vuex.Store({
  state: {
    files: [],
    classes: [],
    annotations: [],
    currentAnnotations: [],
    activeFile: null,
    activeClass: null,
    selectedAnnotate: null
  },
  actions: {
    loadClasses ({ commit }) {
      const classes = localStorage.getItem('classes')

      if (classes) {
        commit('setClasses', JSON.parse(classes))
      }
    },
    clearClasses ({ commit }) {
      localStorage.setItem('classes', [])
      commit('setClasses', [])
    }
  },
  mutations: {
    setActiveFile (state, payload) {
      state.currentAnnotations = mapFeatures(state.annotations[payload])
      state.selectedAnnotate = null
      state.activeFile = payload
    },
    setActiveClass (state, payload) {
      state.activeClass = payload
    },
    setAnnotations (state, { fileIndex, features, save }) {
      state.annotations[fileIndex] = [...features]
      state.currentAnnotations = mapFeatures(features)
      if (save !== true) {
        state.selectedAnnotate = null
      }
    },
    selectAnnotation (state, payload) {
      state.selectedAnnotate = payload
    },
    removeAnnotation (state, payload) {
      if (state.selectedAnnotate === payload) {
        state.selectedAnnotate = null
      }
    },
    addFile (state, payload) {
      state.files.push(payload)
      state.annotations.push([])
    },
    removeFile (state, payload) {
      state.files.splice(payload, 1)
      state.annotations.splice(payload, 1)
      if (state.activeFile === payload) {
        state.activeFile = null
      }
    },
    setClasses (state, payload) {
      state.classes = payload
    },
    addClass (state, payload) {
      if (state.classes.find(c => c.name === payload.name) === undefined) {
        state.classes.push(payload)
      }

      localStorage.setItem('classes', JSON.stringify(state.classes))
    },
    removeClass (state, index) {
      const cl = state.classes[index]
      state.classes.splice(index, 1)
      state.annotations.forEach(group => {
        while (group.findIndex(c => c.properties.class.name === cl.name) !== -1) {
          const id = group.findIndex(c => c.properties.class.name === cl.name)
          group.splice(id, 1)
        }
      })
      if (state.activeClass === index) {
        state.activeClass = null
      }

      localStorage.setItem('classes', JSON.stringify(state.classes))
    },
    renameClass (state, payload) {
      state.currentAnnotations.forEach(annotate => {
        if (annotate.class.name === state.classes[payload.id].name) {
          annotate.class.name = payload.name
        }
      })
      state.classes[payload.id].name = payload.name
      localStorage.setItem('classes', JSON.stringify(state.classes))
    }
  }
})
