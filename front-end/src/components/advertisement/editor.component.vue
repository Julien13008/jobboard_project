<template>
  <div class="row mt-2" v-if="editor">
    <div class="col-6">
      <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" class="btn" :class="{ 'is-active': editor.isActive('bold') }">
        <font-awesome-icon icon="fa-solid fa-bold" />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" class="btn" :class="{ 'is-active': editor.isActive('italic') }">
        <font-awesome-icon icon="fa-solid fa-italic" />
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()" class="btn" :class="{ 'is-active': editor.isActive('underline') }">
        <font-awesome-icon icon="fa-solid fa-underline" />
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" class="btn" :class="{ 'is-active': editor.isActive('strike') }">
        <font-awesome-icon icon="fa-solid fa-strikethrough" />
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" class="btn" :class="{ 'is-active': editor.isActive('paragraph') }">
        <font-awesome-icon icon="fa-solid fa-paragraph" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" class="btn" :class="{ 'is-active': editor.isActive('bulletList') }">
        <font-awesome-icon icon="fa-solid fa-list-ul" />
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" class="btn" :class="{ 'is-active': editor.isActive('orderedList') }">
        <font-awesome-icon icon="fa-solid fa-list-ol" />
      </button>
    </div>
    <div class="col-6">
      <button @click="editor.chain().focus().setHardBreak().run()" class="btn">
        <font-awesome-icon class="rotate" icon="fa-solid fa-arrow-turn-down" />
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" class="btn border-0">
        <font-awesome-icon icon="fa-solid fa-rotate-left" />
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" class="btn border-0">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
      </button>
      <button @click="clear" class="btn">
        <font-awesome-icon icon="fa-solid fa-eraser" />
      </button>
    </div>
  </div>
  <hr/>
  <div class="editor-container">
    <editor-content :editor="editor" />
  </div>
  <div class="row">
    <div class="col-6 d-flex justify-content-center"><button class="btn blue-button mb-2 ps-5 pe-5" @click="cancelEdition" >Cancel</button></div>
    <div class="col-6 d-flex justify-content-center"><button class="btn yellow-button mb-2 ps-5 pe-5" @click="publishOffer">Publish</button></div>
  </div>

</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

export default {
  props: ['adContent'],
  components: { EditorContent},
  name: "editor.component",
  data() {
    return {
      editor: null,
      content: this.adContent
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.content,
      onUpdate: ({ editor }) => {this.content = editor.getHTML();},
      extensions: [ StarterKit, Underline ],
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods : {
    clear() {
      this.editor.chain().focus().unsetAllMarks().run();
      this.editor.chain().focus().clearNodes().run()
    },
    cancelEdition() {
      this.$router.push('/applications')
    },
    publishOffer() {
      this.$emit('update:content', this.content);
    }
  }
}
</script>