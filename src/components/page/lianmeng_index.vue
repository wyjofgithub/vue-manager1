<template>
  <div>
      <br><br>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!----------------------Banner图----------------------------------->
      <el-tab-pane label="Banner图" name="first">
        <br />
        <br />
        <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="banner.img" :src="banner.img" class="avatar" style="max-height: 690px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
      <!----------------------OPPO联盟----------------------------------->
      <el-tab-pane label="OPPO联盟" name="second">
        <br />
        <br />
        <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="lianmeng.img" :src="lianmeng.img" class="avatar" style="max-height: 690px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
      <!-------------------------核心优势-------------------------------->
      <el-tab-pane label="核心优势" name="third">
        <br />
        <br />
        <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="hxys.img" :src="hxys.img" class="avatar" style="max-height: 790px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import OSS from "ali-oss";
import { request } from "http";
import { parse } from "url";
import { error } from "../../js/message";
export default {
  data() {
    return {
      activeName: "first",
      index: 0,
      banner: {},
      lianmeng: {},
      hxys:{},
      ossSign:{}
    };
  },
  created() {
      this.getOssSign()
      this.select()
  },
  methods: {
    handleClick(tab, event) {
      this.index = parseInt(tab.index);
      this.select()
    },
    getOssSign() {
      let url = "/ossSign";
      this.$axios.get(url).then(result => {
        this.ossSign = result.data.data;
      });
    },
    select() {
      let url = "/oppoLianmeng/select";
      var param = { type: this.index + 1 };
      this.$axios.post(url, param).then(result => {
        
        if (result.data.code == 200) {
          if (this.index + 1 == 1) {
            this.banner = result.data.data;
          } else if(this.index+1==2){
            this.lianmeng = result.data.data;
          }else if(this.index+1==3){
            this.hxys=result.data.data;
          }
        }
      });
    },
    BeforeAvatarUpload(file) {
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
        region: "oss-cn-shanghai"
      });
      const _that = this;
      client
        .put(timestamp, file)
        .then(function(result) {
          //修改banner
          if (_that.index + 1 == 1) {
            _that.banner.img = result.url;
            _that.$axios
              .post("/oppoLianmeng/save", _that.banner)
              .then(result => {});
          }
          if (_that.index + 1 == 2) {
            _that.lianmeng.img = result.url;
            _that.$axios
              .post("/oppoLianmeng/save", _that.lianmeng)
              .then(result => {});
          }
          if (_that.index + 1 == 3) {
            _that.hxys.img = result.url;
            _that.$axios
              .post("/oppoLianmeng/save", _that.hxys)
              .then(result => {});
          }
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

/* .el-input {
  margin-left: -40px;
} */
#pane-third {
  height: 400px;
}
</style>