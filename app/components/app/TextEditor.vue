<script setup lang="ts">
import Quill from 'quill'

const editor = useTemplateRef('editor')

let quill: Quill

onMounted(() => {
  quill = new Quill(editor.value!, {
    theme: 'snow',
  })
})
</script>

<template>
  <div ref="editor" v-bind="$attrs" />
  <slot v-bind="quill" />
</template>
