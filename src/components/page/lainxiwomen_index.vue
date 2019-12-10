<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Banner图" name="first">
        <br />
        <br />
        <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="lainxiwomenBeforeAvatarUpload"
        >
          <img
            v-if="lainxiwomen.img"
            :src="lainxiwomen.img"
            class="avatar"
            style="max-height: 690px;"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>

      <el-tab-pane label="联系方式" name="second">
        <br />
        <br />
        <el-form
          style="margin-left:100px;"
          :model="lzfs"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司名称" prop="img.gs">
            <el-input v-model="lzfs.img.gs" style="margin-left: 0px;width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="img.dz">
            <el-input v-model="lzfs.img.dz" style="margin-left: 0px;width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="img.dh">
            <el-input v-model="lzfs.img.dh" style="margin-left: 0px;width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="img.yx">
            <el-input v-model="lzfs.img.yx" style="margin-left: 0px;width:50%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OSS from "ali-oss";
import { request } from "http";
export default {
  data() {
    return {
      ossSign: {},
      lainxiwomen: {},
      activeName: "first",
      type: 0,
      lzfs: {
         id:'',
         type:'',
        img: {
         
          gs: "",
          dz: "",
          dh: "",
          yx: ""
        }
      },
      rules: {
        "img.gs": [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        "img.dz": [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
        "img.dh": [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        "img.yx": [
          { required: true, message: "请输入联系邮箱", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.select();
    this.getOssSign();
  },
  methods: {
    handleClick(tab, event) {
      this.type = parseInt(tab.index);
      this.select();
    },
    getOssSign() {
      let url = "/ossSign";
      this.$axios.get(url).then(result => {
        this.ossSign = result.data.data;
      });
    },
    select() {
      var a = this.type + 1;
      let url = "/oppoLianxiwomen/select?type=" + a;
      this.$axios.get(url).then(result => {
        if (this.type == 0) {
          this.lainxiwomen = result.data.data;
        } else {
          this.lzfs.id = result.data.data.id;
          this.lzfs.type = result.data.data.type;
          if (result.data.data.img != null) {
            
            this.lzfs.img = JSON.parse(result.data.data.img);
          }
        }
      });
    },
    lainxiwomenBeforeAvatarUpload(file) {
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
          _that.lainxiwomen.img = result.url;
          _that.$axios
            .post("/oppoLianxiwomen/sava", _that.lainxiwomen)
            .then(result => {});
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    },
    /***提交简介 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.lzfs.img = JSON.stringify(this.lzfs.img);
          this.$axios
            .post("/oppoLianxiwomen/sava", this.lzfs)
            .then(result => {
              this.select();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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