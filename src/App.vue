<template>
  <div id="app">
    <annotation-view />
    <tool-bar />
  </div>
</template>

<script>
import ToolBar from '@/components/Bar/ToolBar'
import AnnotationView from '@/components/AnnotationView'
export default {
  name: 'App',
  components: { AnnotationView, ToolBar },
  mounted () {
    this.$store.dispatch('loadClasses')
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  position: relative;
  font-size: 16px;
}

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
}
</style>
