<template>
  <div
    :style="Style()['Base']"
    @mouseenter="flowboard_mouseenter"
    @mouseleave="flowboard_mouseleave"
  >
    <!-- 头像 -->
    <div v-show="!currentViewIsEdit" class="middleRow">
      <van-image
        v-if="userInfo.avatar"
        fit="cover"
        round
        width="60px"
        height="60px"
        :src="userInfo.avatar"
      />
      <div class="lineRow">
        <div style="margin-right: 5px" v-if="!userInfo.sex">性别未知</div>
        <van-image
          v-if="userInfo.sex"
          style="margin-top: 5px"
          fit="cover"
          round
          width="20"
          height="20"
          :src="userInfo.sex === '男' ? m : w"
        />
        <div style="line-height: 20px">{{ userInfo.nickname }}</div>
      </div>
      <div>手机号 {{ phone }}</div>
    </div>
    <!-- 编辑头像 -->
    <div v-show="currentViewIsEdit" class="middleRow">
      <div v-if="showCut && src" class="cut">
        <vue-picture-cut :src="src" @on-change="cutChange" />
      </div>
      <!-- 上传 -->
      <van-uploader
        :max-count="1"
        :preview-image="true"
        :preview-full-image="false"
        v-model="fileList"
        accept="image/png,image/jpeg,image/jpg,image/bmp,image/gif"
        :before-read="beforeRead"
      />
      <div style="margin-bottom: 5px">
        <van-radio-group style="display: flex" v-model="uploadModel.sex">
          <van-radio style="margin-right: 10px" name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </div>
      <van-field
        maxlength="10"
        placeholder="请输入昵称"
        v-model="uploadModel.nickname"
        label="昵称"
      />
      <van-field
        placeholder="请输入年龄"
        maxlength="3"
        v-model="uploadModel.age"
        type="number"
        label="年龄"
      />
    </div>
    <div
      v-show="whenMoseIn"
      @click="clickEdit"
      :style="
        `position: absolute;
        font-size: 12px;
        top: 3px;
        right: 6px;
        cursor: pointer;` +
        (!currentViewIsEdit
          ? 'color: gray;'
          : 'color: red;font-weight:700;font-size:15px;')
      "
    >
      {{ !currentViewIsEdit ? "编辑" : "提交修改" }}
    </div>
  </div>
</template>
<script>
import { StaticUserUrl } from "@/utils/config.js";
import { UploadBase4Image } from "@/api/file.js";
import { userInfo, editUserInfo } from "@/api/user.js";
import w from "@/assets/svgs/w.svg";
import m from "@/assets/svgs/m.svg";
import {
  Icon,
  Image,
  Uploader,
  RadioGroup,
  Radio,
  Field,
  Tag,
  Toast,
} from "vant";
import { VuePictureCut } from "vue-picture-cut";

import moment from "moment";
export default {
  components: {
    [Tag.name]: Tag,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Uploader.name]: Uploader,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    VuePictureCut,
  },
  data() {
    return {
      showCut: true,
      src: undefined,
      phone: undefined,
      fileList: [],
      whenMoseIn: false,
      currentViewIsEdit: false,
      userInfo: {
        baseYear: undefined,
        age: undefined,
        sex: undefined,
        nickname: undefined,
        avatar: StaticUserUrl(),
      },
      uploadModel: {
        baseYear: moment().format("YYYY"),
        age: undefined,
        sex: undefined,
        nickname: undefined,
        avatar: undefined,
      },

      isCover: false,
      m: m,
      w: w,
    };
  },
  props: {
    // base
    // isSelected: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  computed: {},
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      userInfo().then((res) => {
        this.userInfo.baseYear = res.data.baseYear;
        this.userInfo.age = parseInt(res.data.age);
        this.userInfo.sex = res.data.sex;
        this.userInfo.nickname = res.data.nickname
          ? res.data.nickname
          : "无昵称";
        this.userInfo.avatar = res.data.avatar
          ? res.data.avatar
          : StaticUserUrl();
        this.phone = res.data.phone;
      });
    },
    flowboard_mouseenter() {
      this.isCover = true;
      this.whenMoseIn = true;
    },
    flowboard_mouseleave() {
      this.isCover = false;
      this.whenMoseIn = false;
    },
    beforeRead(file) {
      this.src = URL.createObjectURL(file);
      return true;
    },
    cutChange(res) {
      //调用方法
      Toast.loading({
        message: "压缩中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      // base64参数就是图像字符串，
      // w宽度
      // rate是压缩率0~1 一般是0.6较好
      // minkb
      // maxkb
      // callback是回调方法
      this.$jyf.cutImageBase64(res.base64, 200, 0.6, 20, 50, (base64) => {
        UploadBase4Image({
          base64_img: base64,
        }).then((res) => {
          Toast.loading({
            message: "压缩完成",
            forbidClick: true,
            loadingType: "spinner",
          });
          this.showCut = false;
          this.uploadModel.avatar = res.data;
          this.fileList = [{ url: res.data }];
        });
      });
    },
    clickEdit() {
      this.currentViewIsEdit = !this.currentViewIsEdit;
      if (!this.currentViewIsEdit) {
        // 点击[修改提交]

        let objAge = this.uploadModel.age
          ? {
              age: this.uploadModel.age,
              baseYear: this.uploadModel.baseYear,
            }
          : {};

        let objSex = this.uploadModel.sex
          ? {
              sex: this.uploadModel.sex,
            }
          : {};

        let objNickName = this.uploadModel.nickname
          ? {
              nickname: this.uploadModel.nickname,
            }
          : {};

        let objAvatar = this.uploadModel.avatar
          ? {
              avatar: this.uploadModel.avatar,
            }
          : {};

        let req = {
          ...objAge,
          ...objSex,
          ...objNickName,
          ...objAvatar,
        };

        editUserInfo(req).then((res) => {});
      } else {
        // 点击进入[编辑]
        this.uploadModel = this.userInfo;
      }
    },
    Style() {
      let Base = `
        font-size: 14px;
        padding: 5px;
        width: 330px;
        position:relative;

        background-color:${
          !this.currentViewIsEdit ? "white" : "rgb(244,245,255)"
        };
      `;

      return {
        Base,
      };
    },
  },
};
</script>

<style scoped>
@import "~vue-picture-cut/lib/vue-picture-cut.css";
.middleRow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lineRow {
  color: gray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.cut {

  outline: 1px solid white;
  width: 330px;
  height: 330px;
  margin-bottom: 15px;
  margin-top: 25px;
}
</style>
