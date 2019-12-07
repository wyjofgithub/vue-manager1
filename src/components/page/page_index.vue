<template>
  <div>
    <br />
    <br />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Banner图" name="first">
        <!--style="height:80px;background-color: #a9a9a921;display: flex;align-items: center;"-->
        <div style="float:right;margin-right:100px;">
          <el-link type="primary" @click="dialogVisible=true">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-add" />
            </svg>
            新增
          </el-link>
          <el-link type="danger" style="margin-left:10px;" @click="del()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu" />
            </svg>
            删除
          </el-link>
        </div>
        <br />
        <br />
        <br />
        <el-table
          :data="bannerList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="500"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <img :src="scope.row.img" style="max-width:700px;max-height:350px;" />
                <div slot="reference" class="name-wrapper">
                  <img :src="scope.row.img" style="width:200px;height:80px;" />
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="上传时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--------------------------------------------------------------------------->
      <el-tab-pane label="日均活跃" name="second">
        <br />
        <br />
        <el-form ref="indexNumForm" :model="indexNumForm" label-width="80px" size="mini">
          <table class="layui-table">
            <thead>
              <tr>
                <th class="th" style="text-align: center;background-color: white;">OS系统日均活跃用户</th>
                <th class="th" style="text-align: center;background-color: white;">浏览器日均活跃用户</th>
                <th class="th" style="text-align: center;background-color: white;">联盟日均活跃用户</th>
                <th class="th" style="text-align: center;background-color: white;">OPPO自有流量日均曝光</th>
                <th class="th" style="text-align: center;background-color: white;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <el-form-item
                    prop="osNum"
                    :rules="[{ required: true, message: 'OS系统日均活跃用户不能为空'}]"
                  >
                    <el-input v-model="indexNumForm.osNum"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    prop="llqNum"
                    :rules="[{ required: true, message: '浏览器日均活跃用户不能为空'}]"
                  >
                    <el-input v-model="indexNumForm.llqNum"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    prop="lmNum"
                    :rules="[{ required: true, message: 'OPPO自有流量日均曝光不能为空'}]"
                  >
                    <el-input v-model="indexNumForm.lmNum"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    prop="zyllNum"
                    :rules="[{ required: true, message: '联盟日均活跃用户不能为空'}]"
                  >
                    <el-input v-model="indexNumForm.zyllNum"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item style="margin-left: -40px;">
                    <el-button type="primary" @click="submitForm('indexNumForm')" :loading="flg">提交</el-button>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="品牌广告" name="third">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-close="handleClose"
          :before-upload="pinPaiBeforeAvatarUpload"
        >
          <img v-if="oppoIndexBrand.img" :src="oppoIndexBrand.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisible" width="40%">
      <span>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-upload
            style="height: 100%;"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-close="handleClose"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBanner()" :loading="savaBannerFlg">确认保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import OSS from "ali-oss";
import { request } from "http";
import { error } from "../../js/message";
import "../../../static/layui/layui.js";
import "../../../static/layui/css/layui.css";
export default {
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      flg: false,
      savaBannerFlg: false,
      oppoIndexBrand: {
        id: "",
        img: ""
      },
      bannerList: [],
      indexNumForm: {},
      delIdList: [],
      ossSign: {},
      ruleForm: {
        imageUrl: ""
      }
    };
  },
  created() {
    this.getOssSign();
    this.select();
    this.getIndexNum();
    this.getoppoIndexBrand();
  },
  methods: {
    handleClick() {},
    getOssSign() {
      let url = "/ossSign";
      this.$axios.get(url).then(result => {
        this.ossSign = result.data.data;
      });
    },
    handleClose(done) {
      this.ruleForm.imageUrl = "";
      done();
    },
    /**品牌广告 */
    getoppoIndexBrand(){
        this.$axios.get('/oppoIndexBrand/select').then(result=>{
            if(result.data.code==200){
                this.oppoIndexBrand=result.data.data;
            }
        })
    },
    pinPaiBeforeAvatarUpload(file) {
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
          _that.oppoIndexBrand.img = result.url;
          _that.$axios
            .post("/oppoIndexBrand/update", _that.oppoIndexBrand)
            .then(result => {});
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    },
    beforeAvatarUpload(file) {
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
          _that.ruleForm.imageUrl = result.url;
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    },
    select() {
      this.$axios.get("/oppoIndexBanner/select").then(result => {
        this.bannerList = result.data.data;
      });
    },
    saveBanner() {
      if (this.ruleForm.imageUrl == "") {
        error("请上传首页Banner图");
        return;
      }
      this.savaBannerFlg = true;
      this.$axios
        .post("/oppoIndexBanner/save", { img: this.ruleForm.imageUrl })
        .then(result => {
          if (result.data.code == 200) {
            this.dialogVisible = false;
            this.select();
            this.savaBannerFlg = false;
          }
        });
    },
    handleSelectionChange(val) {
      this.delIdList = [];
      val.forEach(element => {
        this.delIdList.push(element.id);
      });
    },
    handleDelete(index, row) {
      this.delIdList.push(row.id);
      this.del();
    },
    del() {
      if (this.delIdList.length == 0) {
        error("请选择要删除得内容");
        return;
      }
      this.$confirm("是否要删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/oppoIndexBanner/del", { ids: this.delIdList })
            .then(result => {
              if (result.data.code == 200) {
                this.select();
              }
            });
          this.delIdList = [];
        })
        .catch(() => {
          this.delIdList = [];
        });
    },
    /**数据统计**/
    getIndexNum() {
      this.$axios.get("/oppoIndexNum/select").then(result => {
        this.indexNumForm = result.data.data[0];
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.flg = true;
          this.$axios
            .post("/oppoIndexNum/update", this.indexNumForm)
            .then(result => {
              this.flg = false;
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

<style>
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
.el-tabs__nav {
  width: 100%;
}
.el-tabs__item {
  width: 33.33333%;
  text-align: center;
}
.el-tabs__active-bar .is-top {
  width: 100%;
}
.el-input {
  margin-left: -40px;
}
#pane-third {
  height: 400px;
}
</style>