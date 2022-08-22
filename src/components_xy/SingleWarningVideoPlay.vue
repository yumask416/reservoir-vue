<template>
    <div id="main">
        <div id="warning_center">
            <div id="real_time_video">
                <h3>视频播放</h3>
                <div id="real_img">
                    <!-- <img src="../assets/logo.png"/> -->
                    <img :src="realTimeImg">
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
                <input v-model="item.thread_id" style="display: none"></input>
              </label>
            </div>
        </div>
    </div>
</template>

<script scoped>
  import ajax from "axios"
  import $ from "jquery";
    let tmp_ws = new WebSocket("ws://" + window.location.host + "/api/v1/realtime/ws/start");

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
                Info_lockReconnect: false,
                Info_ws: null,
                Info_wsUrl: "ws://" + window.location.host + "/api/v1/realtime/ws/start",
                // Info_wsUrl: "ws://10.10.10.101:4000/api/v1/report/ws/start",
                ws: tmp_ws,
                // Info_wsUrl: "/api/v1/report/ws/start",
                number_mean: [],

                image_img: $(".image-img"),
                // _this: this,
                canvasHeartCheckDeviceInfo :{
                    // timeout: 1000,        //1分钟发一次心跳
                    timeout: 1000,        //1分钟发一次心跳
                    timeoutObj: null,
                    serverTimeoutObj: null,

                    reset: function () {
                        clearTimeout(this.timeoutObj);
                        clearTimeout(this.serverTimeoutObj);
                        return this;
                    },
                    start: function (_this) {
                        var self = this;
                        this.timeoutObj = setTimeout(function () {
                            _this.Info_ws.send("ping");
                            // self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
                            //     Info_ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                            // }, self.timeout)
                            self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
                                _this.Info_lockReconnect = false;
                                _this.Info_ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                            }, 60000)
                        }, this.timeout)
                    }
                }
            }
        },
      mounted() {
          // 获取摄像头列表
        let _this = this;
        let param = {};
        ajax.get("/api/v1/camera/list", {params: param}).then(function (res) {
            let data = res.data;
            if (data.code === 2200){
                console.log(data);
                _this.CameraList = [];
                for (let i=0; i<data.data.list.length;i++){
                  console.log(data.data.list[i]["IP"]);
                  _this.CameraList[i] = {
                    "value":data.data.list[i]["NoteName"],
                    "thread_id": data.data.list[i]["ThreadID"]
                  }
                }
            }
        });

        // 连接websocket
        this.canvasReconnect(this.Info_wsUrl);

      },
      methods: {
          DBClick(thread_id){
            let _this = this;
            let param = {"id": thread_id};
            ajax.get("/api/v1/realtime/play", {params: param}).then(function (res) {
                let data = res.data;
                if (data.code === 2200){
                    console.log(data);
                }
            });
          },

          canvasReconnect(url) {
              let _this = this;
              if (this.Info_lockReconnect) return;
              this.Info_lockReconnect = true;
              setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                  _this.canvasCreateWebSocket(_this.Info_wsUrl);
                  _this.Info_lockReconnect = false;
              }, 2000);
          },
          canvasInitEventHandle() {
              let _this = this;
              this.Info_ws.onclose = function () {
                  _this.canvasReconnect(this.Info_wsUrl);
                  console.log("websocket 连接关闭");
              };
              this.Info_ws.onerror = function () {
                  _this.canvasReconnect(this.Info_wsUrl);
                  console.log("websocket 连接错误");
                  // console.log("canvas llws连接错误!");
              };
              this.Info_ws.onopen = function () {

                  _this.canvasHeartCheckDeviceInfo.reset().start(_this);
                  console.log("websocket 连接成功");    //心跳检测重置
                  // console.log("canvas llws连接成功!"+new Date().toLocaleString());
              };
              this.Info_ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
                  _this.canvasHeartCheckDeviceInfo.reset().start(_this);      //拿到任何消息都说明当前连接是正常的
                  // console.log("event.data: ", event.data);
                  if (event.data !== 'pong') {
                      let data = JSON.parse(event.data);
                      // _this.image_img.eq(data["thread_id"]-1).attr("src", "/"+data["image"]);
                      // $(".warning-type").eq(data["thread_id"]-1).html('<span style="color: '+_this.ColorList.get(data["event_type"])+'">'+_this.NameList.get(data["event_type"])+'</span>');
                      if (data["event_off"] === "-1") {
                        _this.realTimeImg = "/" + data["image"];
                      }
                      if (data["event_off"] === "1"){
                        _this.ImgInfo[3].imgpath = _this.ImgInfo[2].imgpath;
                        _this.ImgInfo[3].eventtype = _this.ImgInfo[2].eventtype;
                        _this.ImgInfo[3].time = _this.ImgInfo[2].time;

                        _this.ImgInfo[2].imgpath = _this.ImgInfo[1].imgpath;
                        _this.ImgInfo[2].eventtype = _this.ImgInfo[1].eventtype;
                        _this.ImgInfo[2].time = _this.ImgInfo[1].time;

                        _this.ImgInfo[1].imgpath = _this.ImgInfo[0].imgpath;
                        _this.ImgInfo[1].eventtype = _this.ImgInfo[0].eventtype;
                        _this.ImgInfo[1].time = _this.ImgInfo[0].time;

                        _this.ImgInfo[0].imgpath = "/"+data["image"];
                        _this.ImgInfo[0].eventtype = "";
                        _this.ImgInfo[0].time = "";

                        // _this.ImgIndex = (_this.ImgIndex+1)%1;
                          // for (let i=0; i<1; i++){
                          //     setTimeout(_this.LoopTS, i*500, $(".warning-div-bf").eq(data["thread_id"]-1), data["event_type"]);
                          // }
                      }
                      // else if (data["event_off"] === "2"){
                      //     _this.image_img.eq(data["thread_id"]-1).attr("src", "/static/images/camera_default.png");
                      // }
                  }
              };
          },
          canvasCreateWebSocket(url) {
              try {
                  if ('WebSocket' in window) {
                    console.log(url);
                      this.Info_ws = new WebSocket(this.Info_wsUrl);
                  }
                  this.canvasInitEventHandle();
              } catch (e) {
                  this.canvasReconnect(url);
              }
          }
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
</style>
