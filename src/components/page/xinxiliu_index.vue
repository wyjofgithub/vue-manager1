<template>
  <div>
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
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="banner.img" :src="banner.img" class="avatar" style="max-height: 690px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
      <!------------------------------------------------------------------------->
      <el-tab-pane label="OPPO信息流" name="second">
        
        <div style="float:right;margin-right:100px;">
          <el-link type="primary" @click="dialogVisible=true">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-add" />
            </svg>
            新增
          </el-link>
        </div>
        <br />
        <br />
        <!-- @selection-change="handleSelectionChange" -->
        <el-table :data="oppoxxl.img" border style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <img :src="scope.row.imageUrl" style="max-width:800px;max-height:800px;" />
                <div slot="reference" class="name-wrapper">
                  <img :src="scope.row.imageUrl" style="max-width:80px;max-height:100px;" />
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="dataTime" label="上传时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!------------------------------------------------------------------------------------------------>
      <el-tab-pane label="广告形式丰富" name="third" style="height: 100%;">
        <br />
        <br />
        <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="ggxsff.img" :src="ggxsff.img" class="avatar" style="max-height: 690px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
      <!----------------------------------------------------------------------------------------------->
      <el-tab-pane label="多场景、多路径融合" name="fourth" style="height: 100%;">
        
        <div style="float:right;margin-right:100px;">
          <el-link type="primary" @click="dialogVisible2=true">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-add" />
            </svg>
            新增
          </el-link>
        </div>
        <br />
        <br />
        <el-table :data="dcj.img" border style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <img :src="scope.row.imageUrl" style="max-width:800px;max-height:800px;" />
                <div slot="reference" class="name-wrapper">
                  <img :src="scope.row.imageUrl" style="max-width:80px;max-height:100px;" />
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="dataTime" label="上传时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deletedcjRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-----------------------------开发流程-------------------------------->
    <el-tab-pane label="开发流程" name="fifth" style="height: 100%;">
      <br />
        <br />
          <el-upload
          class="avatar-uploader"
          style="height: 92%;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="BeforeAvatarUpload"
        >
          <img v-if="kflc.img" :src="kflc.img" class="avatar" style="max-height: 690px;" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-tab-pane>
    </el-tabs>
    
    <!----------------------------------------------模态框信息流------------------------------------------------------------------->
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <span>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-upload
            style="height: 100%;"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-close="handleClose2"
            :before-upload="beforeAvatarUpload2"
          >
            <img
              v-if="ruleForm.imageUrl"
              :src="ruleForm.imageUrl"
              class="avatar"
              style="width: 30%;"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBanner()" :loading="savaBannerFlg">确认保存</el-button>
      </span>
    </el-dialog>

    <!----------------------------------------------模态框多场景----------------------------------------------------------------->
    <el-dialog :visible.sync="dialogVisible2" width="50%">
      <span>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-upload
            style="height: 100%;"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-close="handleClose2"
            :before-upload="beforeAvatarUpload2"
          >
            <img
              v-if="ruleForm.imageUrl"
              :src="ruleForm.imageUrl"
              class="avatar"
              style="width: 100%;"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveBanner()" :loading="savaBannerFlg">确认保存</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      dialogVisible2: false,
      savaBannerFlg: false,
      ossSign: {},
      ruleForm: {
        imageUrl: "",
        dataTime: ""
      },
      activeName: "first",
      index: 0,
      banner: {}, //Banner图
      oppoxxl: {}, //OPPO信息流
      ggxsff: {}, //广告形式丰富
      dcj: {}, //多场景、多路径融合
      kflc:{} //开发流程
    };
  },
  created() {
    this.getByType();
    this.getOssSign();
  },
  methods: {
    getOssSign() {
      let url = "/ossSign";
      this.$axios.get(url).then(result => {
        this.ossSign = result.data.data;
      });
    },
    handleClick(tab, event) {
      this.index = parseInt(tab.index);
      this.getByType();
    },
    handleClose2(tab, event) {},
    getByType() {
      let url = "/oppoXinxiliu/getByType";
      this.$axios.post(url, { type: this.index + 1 }).then(result => {
        console.log(result);
        if (result.data.code == 200) {
          if (result.data.data.type == 1) {
            this.banner = result.data.data;
          }
          if (result.data.data.type == 2) {
            this.oppoxxl = result.data.data;
            this.oppoxxl.img = JSON.parse(this.oppoxxl.img);
          }
          if (result.data.data.type == 3) {
            this.ggxsff = result.data.data;
          }
          if (result.data.data.type == 4) {
            this.dcj = result.data.data;
            this.dcj.img = JSON.parse(this.dcj.img);
          }
          if (result.data.data.type == 5) {
            this.kflc = result.data.data;
          }
        }
      });
    },
    beforeAvatarUpload2(file) {
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
          console.log(result);

          _that.ruleForm.imageUrl = result.url;
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    },
    saveBanner() {
      if (this.ruleForm.imageUrl == "") {
        error("请上传首页图片");
        return;
      }
      this.savaBannerFlg = true;
      //   this.$axios .post("/oppoIndexBanner/save", { img: this.ruleForm.imageUrl }) .then(result => {
      //       if (result.data.code == 200) {
      //         this.dialogVisible = false;
      //         this.select();
      //         this.savaBannerFlg = false;
      //       }
      //     });
      var param = {};
      if (this.index + 1 == 2) {
        this.oppoxxl.img.push(this.ruleForm);
        this.oppoxxl.img = JSON.stringify(this.oppoxxl.img);
        param = this.oppoxxl;
      } else {
        this.dcj.img.push(this.ruleForm);
        this.dcj.img = JSON.stringify(this.dcj.img);
        param = this.dcj;
      }
      this.$axios.post("/oppoXinxiliu/update", param).then(result => {
        if (result.data.code == 200) {
          this.dialogVisible = false;
          this.savaBannerFlg = false;
          this.dialogVisible2 = false;
          this.ruleForm.img = "";
          this.getByType();
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
              .post("/oppoXinxiliu/update", _that.banner)
              .then(result => {});
          }
          if (_that.index + 1 == 3) {
            _that.ggxsff.img = result.url;
            _that.$axios
              .post("/oppoXinxiliu/update", _that.ggxsff)
              .then(result => {});
          }
          if (_that.index + 1 == 5) {
            _that.kflc.img = result.url;
            _that.$axios
              .post("/oppoXinxiliu/update", _that.kflc)
              .then(result => {});
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      return true;
    },
    /****-----------------------------oppo信息流 ------------------------------------------------*/
    deleteRow(index, row) {
      this.$confirm("是否要删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.oppoxxl.img.splice(index, 1);
          this.oppoxxl.img = JSON.stringify(this.oppoxxl.img);
          this.$axios
            .post("/oppoXinxiliu/update", this.oppoxxl)
            .then(result => {
              if (result.data.code == 200) {
                this.getByType();
              }
            });
        })
        .catch(() => {});
    },
    /***--------------------------------------多场景融合------------------------------------------------------ */
    deletedcjRow(index, row) {
      this.$confirm("是否要删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dcj.img.splice(index, 1);
          this.dcj.img = JSON.stringify(this.dcj.img);
          this.$axios
            .post("/oppoXinxiliu/update", this.dcj)
            .then(result => {
              if (result.data.code == 200) {
                this.getByType();
              }
            });
        })
        .catch(() => {});
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