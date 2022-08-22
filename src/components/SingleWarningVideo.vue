<template>
    <div id="main">
        <div id="warning_center">
            <div id="real_time_video">
                <h3>视频播放</h3>
                <div id="real_img">
                    <!-- <img src="../assets/logo.png"/> -->
                    <img :src="realTimeImg">
                  <div class="event-warning">
<!--                    <h3 clacss="event-h3" v-else  style="color: red">是否检测灭火器：{{ isExtinguisher }}</h3>-->
                  </div>
                    <!-- <img src="../assets/camera_default.png" width="100%" height="100%"/> -->
                </div>
            </div>
            <div id="warning_info">
                <h3>告警信息</h3>
                <div class="warning_card" v-for="(img_info,index) in ImgInfo" :key=index>
                    <img :src="img_info.imgpath"><br />
                    <span class="event_info"> {{img_info.eventtype}} </span><br />
                    <span class="event_info"> {{img_info.time}} </span>
                </div>

            </div>
        </div>

        <div id="camera_list">
            <h3>摄像头列表</h3>
            <div class="cameralist" v-for="(item,index) in CameraList" :key=index @dblclick="DBClick(item.thread_id)">
                <span>{{item.value}} </span>
              <label>
                <input v-model="item.thread_id" style="display: none" />
              </label>
            </div>
        </div>
    </div>
</template>

<script scoped>
  import ajax from "axios"
  import $ from "jquery";
  import * as API from '@/api/camera/';
  import { Notification } from 'element-ui';

  // let tmp_ws = new WebSocket("ws://" + window.location.host + "/api/v1/realtime/ws/start");
    // let tmp_ws = new WebSocket("ws://10.10.10.39:4000/api/v1/realtime/ws/start");

    export default {
        data() {
            return {
                CameraList: [],
                ImgInfo :[
                    {
                        imgpath: "/static/images/camera_default.png",
                        time: "Time1",
                        eventtype: "EventType1",
                    },{
                        imgpath: "/static/images/camera_default.png",
                        time: "Time2",
                        eventtype: "EventType2",
                    },{
                        imgpath: "/static/images/camera_default.png",
                        time: "Time3",
                        eventtype: "EventType3",
                    },{
                        imgpath: "/static/images/camera_default.png",
                        time: "Time4",
                        eventtype: "EventType4",
                    }
                ],
                // ImgIndex: 0,
                realTimeImg: "/static/images/camera_default.png",
                number_mean: [],

                image_img: $(".image-img"),
                // _this: this,
                show_event_type: [],
                // NameList: new Map(),


                ws: null, //建立的连接
                lockReconnect: false, //是否真正建立连接
                timeout: 5 * 1000, //5秒一次心跳
                timeoutObj: null, //心跳心跳倒计时
                serverTimeoutObj: null, //心跳倒计时
                timeoutnum: null, //断开 重连倒计时
                reconnect_num: 0, // 重连次数
                isDestroyed: false, // 关闭或切换页面，是否断开
                db_num:0, // 双击次数(不跳页面第一次双击初始化websocket，后续不需要重新创建websocket)
            }
        },
      mounted() {
          // 获取摄像头列表
        let _this = this;
        let param = {page: 1, page_size: 10};
        API.listCam(param).then(res => {
          if (res.code === 2200) {
            _this.CameraList = [];
            console.log("single list cam",res)
            // _this.show_event_type = [];
            for (let i = 0; i < res.data.page_size; i++) {
              if (res.data.list[i].status === 3){
                console.log("run",res.data.list[i].status)
                _this.show_event_type.push(res.data.list[i].algorithm);
                _this.CameraList.push(
                  {
                    "value": res.data.list[i]["name"],
                    "thread_id": res.data.list[i]["id"]

                  }
                )
                // _this.CameraList[i-1] = {
                //   "value": res.data.list[i]["name"],
                //   "thread_id": res.data.list[i]["id"]
                // }
                console.log(_this.CameraList)
                console.log("run over",res.data.list[i].status)

              }

            }
          }else {
            _this.$message.error("获取摄像头列表失败！");
          }
        }).catch(error => console.log(error));
        if (_this.db_num !== 0) {
          _this.monitorWebsocket(); // websocket 监听事件
        }
        // _this.NameList.set("Y01", "人员离岗");
        // _this.NameList.set("Y02", "打电话");
        // _this.NameList.set("Y03", "抽烟");
        // _this.NameList.set("Y04", "明火");
        // _this.NameList.set("Y05", "烟雾");
        // _this.NameList.set("Y06", "灭火器");
      },
      created() {
        // //页面刚进入时开启长连接
        // this.initWebSocket();
      },
      destroyed() {
        console.log("切换页面关闭连接");
        this.isDestroyed = true;
        if (this.db_num !== 0) {
          this.ws.close();
        }
        //页面销毁时关闭长连接
        // this.wsReconnect();
        // window.addEventListener('beforeunload', e => this.wsReconnect(e))

      },
      beforeDestroy() {
        this.isDestroyed = true;
        if (this.db_num !== 0) {
          this.ws.close();
        }
        // window.addEventListener('beforeunload', e => this.wsReconnect())
      },

      methods: {
        // 提示弹窗
        notify: function (title,msg,err_type) {
            Notification({title: title, message: msg, type: err_type});
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
            that.timeoutnum = setTimeout(function() {
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
            self.timeoutObj = setTimeout(function() {
                //这里发送一个心跳，后端收到后，返回一个心跳消息
                if (self.ws.readyState == 1) {
                    //如果连接正常
                    self.ws.send("ping");
                } else {
                    //否则重连
                    console.log("readyState is ", self.ws.readyState)
                    self.wsReconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    console.log("超时关闭!")
                    if (this.db_num !== 0) {
                      self.ws.close();
                    }
                }, 10000);
            }, 5000);
        },
        monitorWebsocket() {
          var _this = this
          this.ws.onopen = function (event) {
              console.log("连接" + event)
              _this.heartBeatStart(); // 开启心跳
          };
          this.ws.onmessage = function (event) {
            if (event.data === "pong") {
              console.log(event.data)
              //收到服务器信息，心跳重置
                _this.heartBeatReset();
              return
            }
            let data = JSON.parse(event.data);
            if(data == ""){
                return
            }
            _this.heartBeatReset();
            if (data["is_single"]===false){
              return
            }
            // console.log(data["event_type"]);
            // _this.realTimeImg = "http://10.10.10.119:10225/" + data["image_path"];
            _this.realTimeImg = "/" + data["image_path"];

            if(data["stop_image"].length>0){
              _this.realTimeImg = "/" + data["stop_image"];

            }
            // if (data["is_warning"] === true ){
            // console.log("event_type", data["event_type"]);
            // console.log("show_event_type", _this.show_event_type);

            let env_color_list = data["event_type"].split(",");
            let env_list = _this.show_event_type[0].split(" ");
            // console.log("env_color_list",env_color_list);
            // console.log("event_off：", data["event_off"]);
            if (data["event_off"] === 1 ){
              // if (data["save_off"] === "1") {

              // }

              // let env_list = _this.show_event_type;
              // console.log("env list", env_list);
              // console.log(data[""])
              let str = "";
              for (let i=0; i<env_list.length; i++){
                if (env_list[i] === "人员离岗"){
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "人员离岗"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">是否检测到人员离岗：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">是否检测到人员离岗：否</h3>';
                  }
                }else if (env_list[i] === "打电话"){
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "打电话"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">是否检测到打电话：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">是否检测到打电话：否</h3>';
                  }
                }else if (env_list[i] === "抽烟"){
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "抽烟"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">是否检测到抽烟：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">是否检测到抽烟：否</h3>';
                  }
                }else if (env_list[i] === "明火"){
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "明火"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">是否检测到明火：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">是否检测到明火：否</h3>';
                  }
                }else if (env_list[i] === "灭火器"){
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "灭火器"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">是否没有灭火器：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">是否没有灭火器：否</h3>';
                  }
                }else if (env_list[i] === "入侵检测-人员") {
                  let flag = false;
                  for (let j=0; j<env_color_list.length; j++){
                    if (env_color_list[j] === "入侵检测-人员"){
                      flag = true;
                    }
                  }
                  if (flag){
                    str += '<h3 class="event-h3" style="color: red">人员是否入侵：是</h3>';
                  }else{
                    str += '<h3 class="event-h3">人员是否入侵：否</h3>';
                  }
                }
              }
              $(".event-warning").html(str);
              // console.log("event_type",data["event_type"]);

              if (data["is_save_db"]){
                console.log("in is_save_db");
                _this.ImgInfo[3].imgpath = _this.ImgInfo[2].imgpath;
                _this.ImgInfo[3].eventtype = _this.ImgInfo[2].eventtype;
                _this.ImgInfo[3].time = _this.ImgInfo[2].time;

                _this.ImgInfo[2].imgpath = _this.ImgInfo[1].imgpath;
                _this.ImgInfo[2].eventtype = _this.ImgInfo[1].eventtype;
                _this.ImgInfo[2].time = _this.ImgInfo[1].time;

                _this.ImgInfo[1].imgpath = _this.ImgInfo[0].imgpath;
                _this.ImgInfo[1].eventtype = _this.ImgInfo[0].eventtype;
                _this.ImgInfo[1].time = _this.ImgInfo[0].time;

                // _this.ImgInfo[0].imgpath = "http://10.10.10.119:10225/" + data["image_path"];
                _this.ImgInfo[0].imgpath = "/" + data["image_path"];
                // for (let idx=0; idx<env_color_list.length; idx++){
                //   _this.ImgInfo[0].eventtype += env_color_list[idx];
                // }
                // _this.ImgInfo[0].eventtype = "";
                // _this.ImgInfo[0].time = "";
                _this.ImgInfo[0].eventtype = data["event_type"];
                _this.ImgInfo[0].time = data["timestamp"];
                
              }
            } else {
              // let env_list = _this.show_event_type;                        
              // let env_list = _this.show_event_type[0].split(" ");
              let str = "";
              for (let i=0; i<env_list.length; i++){
                if (env_list[i] === "人员离岗"){
                  str += '<h3 class="event-h3">是否检测到人员离岗：否</h3>';
                }else if (env_list[i] === "打电话"){
                  str += '<h3 class="event-h3">是否检测到打电话：否</h3>';
                }else if (env_list[i] === "抽烟"){
                  str += '<h3 class="event-h3">是否检测到抽烟：否</h3>';
                }else if (env_list[i] === "明火"){
                  str += '<h3 class="event-h3">是否检测到明火：否</h3>';
                }else if (env_list[i] === "灭火器"){
                  str += '<h3 class="event-h3">是否没有灭火器：否</h3>';
                }else if (env_list[i] === "入侵检测-人员"){
                  str += '<h3 class="event-h3">人员是否入侵：否</h3>';
                }
              }
              $(".event-warning").html(str);

            }

          }
          this.ws.onerror = function (event) {
            // alert(event.data);
            console.log("错误："+event)
            _this.wsReconnect();
            // print("错误："+event.data)
          };
          this.ws.onclose = function (event) {
            //连接关闭事件
            //提示关闭
            console.log("isDestroyed: ", _this.isDestroyed)
            if (!_this.isDestroyed){
              console.log("连接已关闭:", event.code + ' ' + event.reason + ' ' + event.wasClean);
              _this.reconnect_num += 1;
              var err_str = "网络服务差, 正在执行第" + _this.reconnect_num.toString() + "次重连！";
              _this.notify("错误", err_str, "error");
            }
            //重连
            _this.wsReconnect();
          };
        },

        DBClick(thread_id){
          if (this.db_num == 0) {
            this.initWebSocket();
          }
          this.db_num += 1;
          let _this = this;
          let param = {"id": thread_id};
          _this.show_event_type = [];
          API.playAiCam(param).then(res => {
              console.log(res);
              if (res["code"] === 2200) {
                _this.show_event_type.push(res.data)
              } else {
                _this.$message.error("播放失败！");
              }
              // console.log("show_event_type", _this.show_event_type);
            }).catch(error => console.log(error));
          },     
      }
    }
</script>

<style scoped>

#main {
    width: 97%;
    height: 98%;
    position: relative;
    left: 2%;
    top: 1%;
    /* background: black; */
}

#warning_center {
    width: 80%;
    height: 98%;
    float: left;
}

#camera_list {
    width: 19%;
    height: 98%;
    float: left;
    left: 1%;
    border: 1px solid #8adeff;
    border-radius: 4px;
    /* display: table; */
}

#real_time_video {
    width: 100%;
    height: 72%;
    border: 1px solid #8adeff;
    border-radius: 4px;
    /* background: red; */
}

#warning_info {
    width:100%;
    height: 27%;
    top: 1%;
    border: 1px solid #8adeff;
    border-radius: 4px;
    overflow: hidden;
    /* overflow-y: scroll;
    overflow-x: hidden;
    display: inline-block; */
}
h3 {
    text-align: center;
}
#real_img {
    width: 90%;
    height: 90%;
    top: 2%;
    margin: auto;
    /* background: red; */
}
#real_img img{
    width: 100%;
    height: 100%;
}
.cameralist {
    width: 100%;
    height: 5%;
    display: table;
    float: left;
    /* position: relative; */
    top: 2%;
    margin-top: 1%;
    background: rgba(32, 160, 199, 0.24);
}
.cameralist:hover{
    background: rgba(32, 160, 199, 0.44);
}

.cameralist span {
    display:table-cell;
    width: 100%;
    text-align: center;
    vertical-align: middle;
}

.warning_card {
    width:24%;
    height: 90%;
    float: left;
    top: 1%;
    margin-left: 1%;
    /* background: red; */
}
.warning_card img{
    width: 100%;
}
/* 滑动条 */
/* ::-webkit-scrollbar {width:5px;height:5px;position:absolute}
::-webkit-scrollbar-thumb {background-color:#5bc0de}
::-webkit-scrollbar-track {background-color: #053039} */

  .event-warning{
    width: 30%;
    height:30%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
  }
  .event-h3{
    /*width: 100%;*/
    height: 20%;
    left: 2%
  }
</style>
