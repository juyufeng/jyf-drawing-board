export default {
  data() {
    return {
      showAdmin: false
    }
  },
  computed: {
   
  },
  created(){
    if(location.href.indexOf('localhost:8080')!==-1) {
      this.showAdmin = true;
    }
  },
  methods: { 
    ClickAdmin(){
     
    },
    
  }
}
