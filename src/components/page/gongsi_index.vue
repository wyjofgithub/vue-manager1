<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <el-upload
      class="avatar-uploader"
      style="height: 92%;"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="oppoGongsiBeforeAvatarUpload"
    >
      <img v-if="oppoGongsi.img" :src="oppoGongsi.img" class="avatar" style="max-height: 690px;" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import OSS from "ali-oss";
import { request } from "http";
export default {
  data() {
    return {
      ossSign: {},
      oppoGongsi: {}
    };
  },
  created() {
    this.select();
    this.getOssSign();
  },
  methods: {
    getOssSign() {
      let url = "/ossSign";
      this.$axios.get(url).then(result => {
        this.ossSign = result.data.data;
      });
    },
    select() {
      let url = "/oppoGongsi/select";
      this.$axios.get(url).then(result => {
        this.oppoGongsi = result.data.data;
      });
    },
    oppoGongsiBeforeAvatarUpload(file) {
      console.log(this.ossSign);
      var storeAs = "upload-file";
      var suffx = file.name.substring(file.name.indexOf("."));
      var timestamp = this.ossSign.dir + new Date().getTime() + suffx;
      var client = new OSS({
        key: timestamp,
        policy: this.ossSign.policy,
        accessKeyId: this.ossSign.accessid,
        accessKeySecret: this.ossSign.accesssecret,
        bucket: this.ossSign.bucket,
        signature: this.ossSign.signature,
        region: "oss-cn-hangzhou"
      });
      const _that = this;
      client
        .put(timestamp, file)
        .then(function(result) {
          console.log(result);
          _that.oppoGongsi.img = result.url;
          _that.$axios .post("/oppoGongsi/save", _that.oppoGongsi) .then(result => {});
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    }
  }
};
</script>

<style >





.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  height: 100%;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 120%;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}


.el-input {
  margin-left: -40px;
}
#pane-third {
  height: 400px;
}
</style>