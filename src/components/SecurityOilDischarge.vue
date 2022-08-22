<template>
  <div class="main">
    <div class="main_left">
      <div class="real_time_video">
        <h3>视频播放</h3>
        <div class="real_img">
          <div class="camera_img">
            <img :src="camera_1" />
          </div>
        </div>
      </div>
      <div class="main-center">
        <div class="center-text1">
          <el-input
            size="small"
            v-model="ptzconfig.ip"
            placeholder="IP"
          ></el-input>
        </div>
        <div class="center-text2">
          <el-input
            size="small"
            v-model="ptzconfig.username"
            placeholder="IPC用户名"
          ></el-input>
        </div>
        <div class="center-text3">
          <el-input
            size="small"
            v-model="ptzconfig.password"
            placeholder="IPC密码"
          ></el-input>
        </div>
        <button class="button1" @click="GetUrlPTZ()">添加</button>
        <button class="button2" @click="">开始</button>
      </div>
      <div class="main-bottom">
        <div class="sod-div" v-for="(img_info, index) in ImgInfo" :key="index">
          <div class="sod-top">
            <span>{{ img_info.name }}</span>
          </div>
          <div class="sod-bottom">
            <img :src="img_info.path" alt="" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="main-right">
      <h3>卸油流程</h3>
      <div class="right1">
        <div class="right1-main">
          <el-scrollbar>
            <p v-for="(item,index) in DischargeOilInfo" :key="index" class="scrollbar-demo-item">{{ item }}</p>
          </el-scrollbar>
        </div>

      </div>
      <div class="right2">
        <h3>球机操作</h3>
        <div class="right2-control">
          <div class="right2-control-rows">
            <div
              class="item"
              @mousedown="ControlPTZ('q')"
              @mouseup="ControlStop()"
            >
              <img src="../../static/images/Icon/top-left.png" alt="" />
            </div>
            <div
              class="item"
              @mousedown="ControlPTZ('w')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-caret-top"></i>
            </div>
            <div
              class="item"
              @mousedown="ControlPTZ('e')"
              @mouseup="ControlStop()"
            >
              <img src="../../static/images/Icon/top-right.png" alt="" />
            </div>
          </div>
          <div class="right2-control-rows">
            <div
              class="item"
              @mousedown="ControlPTZ('a')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-caret-left"></i>
            </div>
            <div class="item">
              <img src="../../static/images/Icon/center.png" alt="" />
            </div>
            <div
              class="item"
              @mousedown="ControlPTZ('d')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-caret-right"></i>
            </div>
          </div>
          <div class="right2-control-rows">
            <div
              class="item"
              @mousedown="ControlPTZ('z')"
              @mouseup="ControlStop()"
            >
              <img src="../../static/images/Icon/bottom-left.png" alt="" />
            </div>
            <div
              class="item"
              @mousedown="ControlPTZ('x')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div
              class="item"
              @mousedown="ControlPTZ('c')"
              @mouseup="ControlStop()"
            >
              <img src="../../static/images/Icon/bottom-right.png" alt="" />
            </div>
          </div>
          <div class="right2-control-rows">
            <div
              class="item"
              @mousedown="ControlPTZ('2')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-minus"></i>
            </div>
            <div class="items"><i class="el-icon-back"></i></div>
            <div class="items"><span>焦距</span></div>
            <div class="items"><i class="el-icon-right"></i></div>
            <div
              class="item"
              @mousedown="ControlPTZ('1')"
              @mouseup="ControlStop()"
            >
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ajax from "axios"
import $ from "jquery";
import {
  ptzinitControl,
  ptzsendControl,
  ptzpresetControl,
  ptzipControl,
  ptzdownControl,
  ptzadd,
} from "@/api/ptz/";

export default {
  name: "SecurityOilDischarge",
  data() {
    return {
      camera_1: "/static/images/camera_default.png",
      ws: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 5 * 1000, //5秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      reconnect_num: 0, // 重连次数
      isDestroyed: false, // 关闭或切换页面，是否断开
      
      ptzconfig: {
        id: 0,
        ip: "10.10.10.219",
        url: "0.0.0.0:0",
        username: "admin",
        password: "AGvay+123456",
        add_name: "ptz",
        add_addr: "",
      },
      DischargeOilInfo:{
        text1_1: "1-1. 卸油流程开始，启动录像",
        text1_2: "1-2. 请检查场地是否有异物",
        text2_1: "2-1. 请引导油罐车停在指定卸油位置",
        text2_2: "2-2. 检查是否关闭引擎和电门，拉起手刹，提交钥匙",
        text2_3: "2-3. 请在车轮下放置三角木",
        text2_4: "2-4. 请检查油罐车安全状况",
        text3_1: "3-1. 检查静电接地夹装置是否完好,并与油罐车车体有效连接",
        text4_1: "4-1. 检查是否摆好警戒线、警示牌、消防器材",
        text4_2: "4-2. 稳油十五分钟",
        text5_1: "5-1. 请确认油罐车铅封完好",
        text5_2: "5-2. 请确认交运单上的加油站名、品种和数量与本站相符",
        text5_3: "5-3. 请确认加油机停止发油",
        text5_4: "5-4. 请确认地罐空容",
        text6_1: "6-1. 请计量油罐车油高、水高、油温,来油质量是否正常",
        text7_1: "7-1. 请将卸油管接在油罐车出油接口和接在指定卸油接头,进行双确认",
        text7_2: "7-2. 检查地罐计量孔等孔盖已经关闭严密",
        text8_1: "8-1. 请确认是否完成卸油",
        text8_2: "8-2. 请确认相关设备是否收好并施打反向铅封",
        text9_1: "9-1. 请引导油罐车出站,清理地面油污,收起相关器材",
        text9_2: "9-2. 稳油十五分钟",
        text9_3: "9-3. 请测量地罐后尺升数",
        text10_1: "10-1. 卸油流程结束",

      },
      DischargeOilOtherInfo:{
        text_record_wait: "正在记录，请稍等",
        text_record_success: "记录完成",
        text_record_fail: "记录失败",
        text_fail: "出现错误,卸油流程暂停",
        text_exceed_time: "超时",
        text_less_time: "未到最短时间",
        text_suspend: "卸油流程暂停",
        text_continue: "卸油流程继续",
        text_error: "卸油流程终止",
        text_end: "卸油流程结束",
        text_oil_star: "开始卸油",
      },
      ImgInfo: [
        {
          name: "油罐车入位",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "轮挡放置",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "放置安全装置",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "安全操作",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "油品接卸",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "油品留样",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "人员值守",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
        {
          name: "卸后确认",
          path: "/static/images/PPT/camera.png",
          type: 1,
        },
      ],
    };
  },
  methods: {
    GetUrlPTZ() {
      ptzipControl({
        ptzip: this.ptzconfig.ip,
      }).then((res) => {
        if (res.code === 2200) {
          (this.ptzconfig.url = res.data),
            console.log(res.data),
            console.log("获取url成功"),
            ptzinitControl({
              ptzurl: this.ptzconfig.url,
              ptzusername: this.ptzconfig.username,
              ptzpassword: this.ptzconfig.password,
            }).then((res) => {
              if (res.code === 2200) {
                (this.ptzconfig.add_addr = res.data),
                  console.log("初始化成功"),
                  console.log("获取流成功");
                // console.log(`rtsp://${this.ptzconfig.username}:${this.ptzconfig.password}@${this.ptzconfig.ip}`);
                ptzadd({
                  name: this.ptzconfig.add_name,
                  addr: this.ptzconfig.add_addr,
                }).then((res) => {
                  if (res.code === 2200) {
                    this.ptzconfig.id = res.data.id;
                    console.log(res.data.id);
                    console.log("摄像头添加成功");
                  } else {
                    this.$message.warning(res.msg);
                  }
                });
              } else {
                this.$message.warning(res.msg);
              }
            });
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    ControlStop() {
      ptzsendControl({ ptz: "s" }).then((res) => {
        if (res.code == 2200) {
          this.$message.success("发送成功");
        } else {
          this.$message.warning(res.msg);
        }
      });
    },

    ControlPTZ(key) {
      switch (key) {
        case "a":
          ptzsendControl({ ptz: "a" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "d":
          ptzsendControl({ ptz: "d" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "q":
          ptzsendControl({ ptz: "q" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "w":
          ptzsendControl({ ptz: "w" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "e":
          ptzsendControl({ ptz: "e" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "z":
          ptzsendControl({ ptz: "z" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "x":
          ptzsendControl({ ptz: "x" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "c":
          ptzsendControl({ ptz: "c" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "1":
          ptzsendControl({ ptz: "1" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
        case "2":
          ptzsendControl({ ptz: "2" }).then((res) => {
            if (res.code == 2200) {
              this.$message.success("发送成功");
            } else {
              this.$message.warning(res.msg);
            }
          });
          break;
      }
    },
    notify: function (title, msg, err_type) {
      Notification({ title: title, message: msg, type: err_type });
    },
    initWebSocket() {
      try {
        if ("WebSocket" in window) {
          //建立连接
          //初始化weosocket
          let wsuri = "ws://" + window.location.host + "/api/v1/event/ws";
          // let wsuri = "ws://10.10.10.119:10225/api/v1/event/ws";
          //建立连接
          this.ws = new WebSocket(wsuri);
        }
        this.monitorWebsocket();
      } catch (e) {
        this.wsReconnect();
      }
    },
    wsReconnect() {
      //websocket重新连接
      var that = this;
      if (that.lockReconnect || that.isDestroyed) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    heartBeatReset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.heartBeatStart();
    },
    heartBeatStart() {
      //开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息
        if (self.ws.readyState == 1) {
          //如果连接正常
          self.ws.send("ping");
        } else {
          //否则重连
          console.log("readyState is ", self.ws.readyState);
          self.wsReconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          console.log("超时关闭!");
          self.ws.close();
        }, 10000);
      }, 5000);
    },
    monitorWebsocket() {
      var _this = this;
      this.ws.onopen = function (event) {
        console.log("连接" + event);
        _this.heartBeatStart(); // 开启心跳
      };
      this.ws.onmessage = function (event) {
        if (event.data === "pong") {
          console.log(event.data);
          //收到服务器信息，心跳重置
          _this.heartBeatReset();
          return;
        }
        let data = JSON.parse(event.data);
        if (data == "") {
          return;
        }
        _this.heartBeatReset();
        _this.camera_1 = "/" + data["image_path"];
      };
      this.ws.onerror = function (event) {
        // alert(event.data);
        console.log("错误：" + event);
        _this.wsReconnect();
        // print("错误："+event.data)
      };
      this.ws.onclose = function (event) {
        //连接关闭事件
        //提示关闭
        console.log("isDestroyed: ", _this.isDestroyed);
        if (!_this.isDestroyed) {
          console.log(
            "连接已关闭:",
            event.code + " " + event.reason + " " + event.wasClean
          );
          _this.reconnect_num += 1;
          var err_str =
            "网络服务差, 正在执行第" +
            _this.reconnect_num.toString() +
            "次重连！";
          _this.notify("错误", err_str, "error");
        }
        //重连
        _this.wsReconnect();
      };
    },

    LoopTS(obj, key) {
      let _this = this;
      for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 10; i++) {
          setTimeout(function () {
            // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
            $(obj).css({
              "box-shadow": "red 0px 0px " + i + "px " + i + "px inset",
            });
          }, i * 15);
        }
        let num = 1;
        for (let i = 9; i >= 0; i--) {
          setTimeout(function () {
            // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
            $(obj).css({
              "box-shadow": "red 0px 0px " + i + "px " + i + "px inset",
            });
          }, num * 15 + 150);
          num += 1;
        }
      }
    },
  },
  mounted() {
    this.monitorWebsocket(); // websocket 监听事件
  },
  created() {
    // //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed() {
    console.log("切换页面关闭连接");
    this.isDestroyed = true;
    this.ws.close();
    //页面销毁时关闭长连接
    // this.wsReconnect();
    // window.addEventListener('beforeunload', e => this.wsReconnect(e))
  },
  beforeDestroy() {
    this.isDestroyed = true;
    this.ws.close();
    // window.addEventListener('beforeunload', e => this.wsReconnect())
  },

};
</script>

<style scoped>
.main {
  width: 99%;
  height: 99%;
  position: relative;
  left: 1%;
  top: 1%;
  /* background: black; */
}

.main .main_left {
  width: 75%;
  height: 98%;
  float: left;
}

.main .main_left .main-center {
  width: 100%;
  height: 8.5%;
}
.main .main_left .main-center .center-text1 {
  width: 12%;
  height: 50%;
  left: 0%;
  top: 29%;
  cursor: pointer;
  background: none;
  float: left;
}
.main .main_left .main-center .center-text2 {
  width: 12%;
  height: 50%;
  left: 1%;
  top: 28%;
  cursor: pointer;
  background: none;
  float: left;
}
.main .main_left .main-center .center-text3 {
  width: 12%;
  height: 50%;
  left: 2%;
  top: 28%;
  cursor: pointer;
  background: none;
  float: left;
}
.main .main_left .main-center .button1 {
  width: 10%;
  height: 50%;
  left: 4%;
  top: 28%;
  cursor: pointer;
  background: none;
  border: 1px solid #8adeff;
  border-radius: 5px;
  color: #8adeff;
  float: left;
}
.main .main_left .main-center .button2 {
  width: 10%;
  height: 50%;
  left: 5%;
  top: 29%;
  cursor: pointer;
  background: none;
  border: 1px solid #8adeff;
  border-radius: 5px;
  color: #8adeff;
  float: left;
}
.main .main_left .real_time_video {
  width: 100%;
  height: 72%;
  border: 1px solid #8adeff;
  border-radius: 4px;
  overflow: hidden;
}

.main .main_left .real_time_video .real_img {
  width: 100%;
  height: 98%;
}
.main .main_left .real_time_video .real_img .camera_img {
  width: 100%;
  height: 98%;
  text-align: center;
}
.main .main-right {
  width: 23%;
  height: 98%;
  float: left;
  left: 1%;
  border: 1px solid #8adeff;
  border-radius: 4px;
}
.main .main-right .right1 {
  width: 100%;
  height: 50%;
  /* border: 1px solid #8adeff;
  border-radius: 4px; */
}

.main .main-right .right1 .right1-main {
  height: 100%;
}

.main .main-right .right1 .right1-main >>> .el-scrollbar {
  height: 100%;
}


.main .main-right .right2 {
  width: 100%;
  height: 46%;
  top: 0.5%;
  border-top: 1px solid #8adeff;
  /* border-radius: 4px; */
}
.main .main-right .right2 .right2-control {
  width: 100%;
  height: 100%;
}

.main .main-right .right2 .right2-control .right2-control-rows {
  width: 100%;
  height: 23%;
  background-color: #15718e;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.main .main-right .right2 .right2-control .right2-control-rows .item {
  width: 30%;
  height: 80%;
  /* background-color: #15718e; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.main .main-right .right2 .right2-control .right2-control-rows .item i {
  color: #041e2b;
  font-size: 4vw;
}

.main .main-right .right2 .right2-control .right2-control-rows .item img {
  width: 60%;
  height: 60%;
}

.main .main-right .right2 .right2-control .right2-control-rows .items {
  /* width: 33%; */
  /* height: 99%; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  background-color: #15718e;
}
.main .main-right .right2 .right2-control .right2-control-rows .items {
  font-size: 0.5vw;
}

h3 {
  text-align: center;
}

.main .main_left .main-bottom {
  top: 1%;
  width: 100%;
  height: 18%;
  border: 1px solid #8adeff;
  border-radius: 4px;
  background: #8adeff;
}
.main .main_left .main-bottom .sod-div {
  width: 12.4%;
  height: 100%;
  float: left;
  margin-left: 0.05%;
  margin-right: 0.05%;
  background: rgba(4, 32, 45, 1);
  /*border-right: 1px solid #8adeff;*/
}
.main .main_left .main-bottom .sod-div .sod-top {
  width: 100%;
  height: 30%;
  display: table;
  text-align: center;
}
.sod-top span {
  display: table-cell;
  vertical-align: middle;
}
.main .main_left .main-bottom .sod-div .sod-top .sod-bottom {
  width: 100%;
  height: 70%;
  background: url("/static/images/PPT/camera.png") no-repeat;
  background-size: 100% 100%;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4%;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

</style>