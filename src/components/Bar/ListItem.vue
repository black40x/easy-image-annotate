<template>
  <div
    :class="{'list-item': true, 'list-item--active': active}"
    @click="handleClick"
    @dblclick="handleDblClick"
  >
    <div class="list-item__inner">
      <span
        v-if="color"
        class="list-item__color"
        :style="{backgroundColor: color}"
      ></span>
      <span class="list-item__name">{{ name }}</span>
      <span class="list-item__remove" @click="handleRemove">[X]</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileItem',
  props: {
    name: String,
    color: String,
    active: Boolean
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = this.active
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleDblClick () {
      this.$emit('dblclick')
    },
    handleRemove (e) {
      e.stopPropagation()
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang="scss">
.list-item {
  &--active {
    background-color: #004db7;
  }

  &__inner {
    padding: 5px 10px;
    display: flex;
    align-items: baseline;
    position: relative;

    &:hover {
      background: #2c3547;

      .list-item__remove {
        display: block;
      }
    }
  }

  &__color {
    width: 8px;
    height: 8px;
    background: #bbbbbb;
    display: inline-block;
    border-radius: 50%;
    flex: 0 0 8px;
    margin-right: 8px;
  }

  &__name {
    font-size: 0.8rem;
    cursor: default;
    word-break: break-word;
  }

  &__remove {
    font-size: 0.7rem;
    position: absolute;
    right: 3px;
    top: 3px;
    color: #a9a9a9;
    text-decoration: underline;
    cursor: pointer;
    background: #2c3547;
    padding: 2px 4px;
    display: none;
  }
}
</style>
