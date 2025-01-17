import { MessagePost } from "@/api/message.js"

export default {
  data() {
    return {
      NoteLoadingText: '',
      NoteLoading: false,
      Note: ''
    }
  },
  computed: {

  },
  methods: {
    ClickNote() {
      if (this.Note.trim()) {
        this.NoteLoading = true;
        MessagePost({
          Note: this.Note
        }).then(res => {
          this.NoteLoadingText = '发送成功';
          setTimeout(() => {
            this.NoteLoading = false;
            this.Note = '';
          }, 500);
        });
      }
    },

  }
}
