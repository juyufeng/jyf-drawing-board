export default {
  data() {
    return {
     
    }
  },
  computed: {
   
  },
  methods: { 
    ClickAdBand(){
      if(this.toolArray[this.currentLeftSqClickIndex].JumpType === '内部网页') {
        if(this.toolArray[this.currentLeftSqClickIndex].AdName === '充值VIP') {
          this.showPopup = false;
          setTimeout(() => {
            this.showPay = true;
          }, 500);
        }
      }
    },
    
  }
}
