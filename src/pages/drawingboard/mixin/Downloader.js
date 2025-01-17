import moment from "moment";
// import Canvas2Image from "@/components/canvas2image/canvas2image.js";

export default {
  data() {
    return {
      canvasDownloadImageType: 'png'
    }
  },
  methods: {
    downloadByFabric() {
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      let url = this.canvas.toDataURL("image/" + this.canvasDownloadImageType); //得到图片的base64编码数据
      alert(JSON.stringify(url));
      // let a = document.createElement("a"); // 生成一个a元素
      // let event = new MouseEvent("click"); // 创建一个单击事件
      // a.download = "夸克画板" + moment(new Date).format('YYYYMMDDHHmmss'); // 设置图片名称
      // a.href = url; // 将生成的URL设置为a.href属性
      // a.target = "_Blank";
      // a.dispatchEvent(event); // 触发a的单击事件


      // Canvas2Image.saveAsImage("c", this.www, this.hhh, this.canvasDownloadImageType);

    },
    checkDownloader(tab) {
      this.toolArray[this.currentLeftSqClickIndex].DownloaderType = [
        tab,
      ];
      this.canvasDownloadImageType = tab;
    }
  }
}
