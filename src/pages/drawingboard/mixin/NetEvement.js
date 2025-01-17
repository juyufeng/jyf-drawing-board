export default {
  data() {
    return {
        showNoNetView: false,
    }
  },
  mounted(){
    window.addEventListener("online", () => {
      this.showNoNetView = false;
    });
    window.addEventListener("offline", () => {
      this.showNoNetView = true;
    });
  },
  computed: {

  },
  methods: { 
    
  }
}
