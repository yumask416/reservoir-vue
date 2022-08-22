<template>
  <div class="main">
    <div class="left_details">
      <!-- 数量统计 -->
      <div class="warning_count">
        <div class="day_week_month">
          <div class="dwm_button_active">
            今天
          </div>
          <div class="dwm_button">
            本周
          </div>
          <div class="dwm_button">
            本月
          </div>
        </div>
        <div class="allin">
          <div class="allin_text">告警数量：</div>
          <div class="allin_count">16</div>
        </div>
        <div class="every">
          <div class="severity">
            <div class="top_count" style="color:#770708">3</div>
            <div class="bottom_text">严重告警</div>
          </div>
          <div class="danger">
            <div class="top_count" style="color:#F55004">6</div>
            <div class="bottom_text">紧急告警</div>
          </div>
          <div class="warning">
            <div class="top_count" style="color:#F5A002">7</div>
            <div class="bottom_text">一般告警</div>
          </div>
        </div>
      </div>
      <!-- 统计条形图 与 统计列表 -->
      <div class="echarts_table">
        <div class="et_event">
          <div class="et_title">告警事件图像统计</div>
          <div class="et_chart" ref="etecs" style="width: 290px;height:361px;">
            <!-- <img src="../../static/images/echarts.png" alt=""> -->
          </div>
        </div>
        <div class="et_event">
          <div class="et_title">告警事件表格统计</div>
          <div class="et_table">
            <div class="table">
              <div id="table-div" class="table-div">
                <table border="0" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th>告警事件名称</th>
                      <th>数量统计</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>用手机</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>有老鼠</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>着火</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>无人看守</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>违停</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td>吸烟</td>
                      <td>3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 2*2 3*3 4*4 的摄像头布局  -->
      <div class="bottom_button">
        <div class="et_title">布局选择</div>
        <div class="et_radio">
          <el-radio-group v-model="radio">
            <el-radio :label="2">2*2布局</el-radio>
            <el-radio :label="3">3*3布局</el-radio>
            <el-radio :label="4">4*4布局</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="right_camera">
      <!-- 2*2 布局 -->
      <div class="isbox" v-show="radio == 2">
        <div class="istow">
          <div class="istowinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="istowinner">
            <div class="innertitle">
              摄像头二
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="istow">
          <div class="istowinner">
            <div class="innertitle">
              摄像头三
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="istowinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
      </div>
      <!-- 3*3 布局 -->
      <div class="isbox" v-show="radio == 3">
        <div class="isthree">
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="isthree">
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="isthree">
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头七
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头七
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isthreeinner">
            <div class="innertitle">
              摄像头七
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
      </div>
      <!-- 4*4 布局 -->
      <div class="isbox" v-show="radio == 4">
        <div class="isfour">
          <div class="isfourinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头二
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头三
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="isfour">
          <div class="isfourinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头二
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头三
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="isfour">
          <div class="isfourinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头二
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头三
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
        <div class="isfour">
          <div class="isfourinner">
            <div class="innertitle">
              摄像头一
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头二
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头三
            </div>
            <div class="innercontent"></div>
          </div>
          <div class="isfourinner">
            <div class="innertitle">
              摄像头四
            </div>
            <div class="innercontent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import * as echarts from "echarts";

// let ColorList = new Map();
// let NameList = new Map();
// ColorList.set("Y01", "#15e3d3");
// NameList.set("Y01", "人员离岗");
// ColorList.set("Y02", "#9115e3");
// NameList.set("Y02", "打电话");
// ColorList.set("Y03", "#e36b15");
// NameList.set("Y03", "抽烟");
// ColorList.set("Y04", "#FF0000");
// NameList.set("Y04", "明火");
// ColorList.set("Y05", "#f8be00");
// NameList.set("Y05", "烟雾");
// ColorList.set("Y06", "#1aff00");
// NameList.set("Y06", "灭火器");
// function timeout_shadow(obj, num, key){
//     // $(obj).css({"box-shadow": ColorList.get(key)+" 0px 0px "+num+"px "+num+"px"})
// }
// function loop_ts(obj, key){
//     for (let j=0; j<3; j++) {
//         for (let i = 1; i <= 10; i++) {
//             setTimeout(function () {
//                 $(obj).css({"box-shadow": ColorList.get(key)+" 0px 0px "+i+"px "+i+"px"})
//             }, i * 15);
//         }
//         let num = 1;
//         for (let i = 9; i >= 0; i--) {
//             // setTimeout(timeout_shadow, num * 15 + 150, obj, i, key);
//             setTimeout(function () {
//                 $(obj).css({"box-shadow": ColorList.get(key)+" 0px 0px "+i+"px "+i+"px"})
//             }, num * 15 + 150);
//
//             num += 1
//         }
//     }
// }
let tmp_ws = new WebSocket(
  "ws://" + window.location.host + "/api/v1/report/ws/start"
);
// let tmp_ws = new WebSocket("ws://10.10.10.101:4000/api/v1/report/ws/start");
export default {
  name: "WarningCenterS",
  data() {
    return {
      radio: 2,
      ColorList: new Map(),
      NameList: new Map(),
      Info_lockReconnect: false,
      Info_ws: null,
      Info_wsUrl: "ws://" + window.location.host + "/api/v1/report/ws/start",
      // Info_wsUrl: "ws://10.10.10.101:4000/api/v1/report/ws/start",
      ws: tmp_ws,
      // Info_wsUrl: "/api/v1/report/ws/start",
      number_mean: [],

      image_img: $(".image-img"),
      // _this: this,
      canvasHeartCheckDeviceInfo: {
        // timeout: 1000,        //1分钟发一次心跳
        timeout: 1000, //1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,

        reset: function() {
          clearTimeout(this.timeoutObj);
          clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function(_this) {
          var self = this;
          this.timeoutObj = setTimeout(function() {
            _this.Info_ws.send("ping");
            // self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
            //     Info_ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            // }, self.timeout)
            self.serverTimeoutObj = setTimeout(function() {
              //如果超过一定时间还没重置，说明后端主动断开了
              _this.Info_lockReconnect = false;
              _this.Info_ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, 60000);
          }, this.timeout);
        }
      }
    };
  },
  mounted() {
    let chartDom = this.$refs.etecs;
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      xAxis: {
        type: "category",
        nameTextStyle: { fontSize: "10px" },
        splitLine: {
          //去除网格线
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff"
          }
        },
        data: ["用手机", "有老鼠", "着火", "无人看守", "违停", "吸烟"]
      },
      yAxis: {
        type: "value",
        show: true,
        splitLine: {
          //去除网格线
          show: false
        },
        axisLabel: {
          textStyle: {
            show: true,
            fontFamily: "微软雅黑",
            color: "#fff"
          }
        }
      },
      grid: {
        x: 20,
        y: 40,
        x2: 20,
        y2: 20,
        borderWidth: 1
      },
      series: [
        {
          data: [2, 1, 0, 4, 6, 3],
          type: "bar",

          itemStyle: {
            normal: {
              color: function(params) {
                // build a color map as your need.
                var colorList = [
                  "#C1232B",
                  "#B5C334",
                  "#FCCE10",
                  "#E87C25",
                  "#27727B",
                  "#FE8463",
                  "#9BCA63",
                  "#FAD860",
                  "#F3A43B",
                  "#60C0DD",
                  "#D7504B",
                  "#C6E579",
                  "#F4E001",
                  "#F0805A",
                  "#26C0C0"
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: true,
                position: "top",
                //                             formatter: '{c}'
                formatter: "{b}\n{c}"
              }
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: "#031822"
          },
          barWidth: 20
        }
      ]
    };
    option && myChart.setOption(option);

    this.image_img = $(".image-img");
    this.ColorList.set("Y01", "#15e3d3");
    this.NameList.set("Y01", "人员离岗");
    this.ColorList.set("Y02", "#9115e3");
    this.NameList.set("Y02", "打电话");
    this.ColorList.set("Y03", "#e36b15");
    this.NameList.set("Y03", "抽烟");
    this.ColorList.set("Y04", "#FF0000");
    this.NameList.set("Y04", "明火");
    this.ColorList.set("Y05", "#f8be00");
    this.NameList.set("Y05", "烟雾");
    this.ColorList.set("Y06", "#1aff00");
    this.NameList.set("Y06", "灭火器");

    // 连接websocket
    this.canvasReconnect(this.Info_wsUrl);
    // this.ws.onopen = function (event) {
    //     console.log("连接" + event)
    // };
    //
    // this.ws.onmessage = function (event) {
    //     var data_wain = JSON.parse(event.data);
    //     if(data_wain === ""){
    //
    //     }
    // };
    // this.ws.onerror = function (event) {
    //     // alert(event.data);
    //     console.log(event.data);
    //     // print("错误："+event.data)
    // };
  },
  methods: {
    LoopTS(obj, key) {
      // console.log("loop ts key: ", key);
      let _this = this;
      for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 10; i++) {
          setTimeout(function() {
            $(obj).css({
              "box-shadow":
                _this.ColorList.get(key) + " 0px 0px " + i + "px " + i + "px"
            });
          }, i * 15);
        }
        let num = 1;
        for (let i = 9; i >= 0; i--) {
          setTimeout(function() {
            $(obj).css({
              "box-shadow":
                _this.ColorList.get(key) + " 0px 0px " + i + "px " + i + "px"
            });
          }, num * 15 + 150);
          num += 1;
        }
      }
    },

    canvasReconnect(url) {
      let _this = this;
      if (this.Info_lockReconnect) return;
      this.Info_lockReconnect = true;
      setTimeout(function() {
        //没连接上会一直重连，设置延迟避免请求过多
        // _this.canvasCreateWebSocket(_this.Info_wsUrl);
        _this.Info_lockReconnect = false;
      }, 2000);
    },
    canvasInitEventHandle() {
      let _this = this;
      this.Info_ws.onclose = function() {
        _this.canvasReconnect(this.Info_wsUrl);
        console.log("websocket 连接关闭");
      };
      this.Info_ws.onerror = function() {
        _this.canvasReconnect(this.Info_wsUrl);
        console.log("websocket 连接错误");
        // console.log("canvas llws连接错误!");
      };
      this.Info_ws.onopen = function() {
        _this.canvasHeartCheckDeviceInfo.reset().start(_this);
        console.log("websocket 连接成功"); //心跳检测重置
        // console.log("canvas llws连接成功!"+new Date().toLocaleString());
      };
      this.Info_ws.onmessage = function(event) {
        //如果获取到消息，心跳检测重置
        _this.canvasHeartCheckDeviceInfo.reset().start(_this); //拿到任何消息都说明当前连接是正常的
        // console.log("event.data: ", event.data);
        if (event.data !== "pong") {
          // try {
          let data = JSON.parse(event.data);
          // console.log(data);
          // console.log(_this.image_img.eq(parseInt(data["thread_id"])-1).parent().html());
          // _this.image_img.eq(data["thread_id"]-1).attr("src", "http://10.10.10.101:4000/"+data["image"]);
          _this.image_img
            .eq(data["thread_id"] - 1)
            .attr("src", "/" + data["image"]);
          $(".warning-type")
            .eq(data["thread_id"] - 1)
            .html(
              '<span style="color: ' +
                _this.ColorList.get(data["event_type"]) +
                '">' +
                _this.NameList.get(data["event_type"]) +
                "</span>"
            );
          if (data["event_off"] === "1") {
            for (let i = 0; i < 1; i++) {
              setTimeout(
                _this.LoopTS,
                i * 500,
                $(".warning-div-bf").eq(data["thread_id"] - 1),
                data["event_type"]
              );
            }
          } else if (data["event_off"] === "2") {
            _this.image_img
              .eq(data["thread_id"] - 1)
              .attr("src", "/static/images/camera_default.png");
          }
          // } catch (e) {
          //
          // }
        }
      };
    },
    canvasCreateWebSocket(url) {
      try {
        if ("WebSocket" in window) {
          console.log(url);
          this.Info_ws = new WebSocket(this.Info_wsUrl);
        }
        this.canvasInitEventHandle();
      } catch (e) {
        this.canvasReconnect(url);
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  color: #00d8ff;
  position: relative;
}

html,
body,
.main {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  /*top: -5%;*/
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.left_details {
  width: 19%;
  height: 100%;
  /* background-color: #00d8ff; */
  border: 1px solid #00d8ff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.warning_count {
  width: 100%;
  height: 20%;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.day_week_month {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: #8adeff;
}

.dwm_button {
  width: 20%;
  text-align: center;
  color: #8adeff;
}
.dwm_button_active {
  width: 20%;
  text-align: center;
  background-color: #053039;
  color: #fff;
}

.allin {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #053039;
}

.allin_text {
  width: 35%;
  height: 100%;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  margin-left: 5px;
}

.allin_count {
  width: 20%;
  height: 100%;
  color: orange;
  font-size: 30px;
}

.every {
  width: 100%;
  height: 49%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #053039;
}

.severity {
  width: 30%;
  height: 100%;
  background-image: linear-gradient(#053039, rgb(133, 3, 3));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.danger {
  width: 30%;
  height: 100%;
  background-image: linear-gradient(#053039, rgb(250, 80, 2));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.warning {
  width: 30%;
  height: 100%;
  background-image: linear-gradient(#053039, orange);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.top_count {
  width: 100%;
  height: 70%;
  font-size: 30px;
  text-align: center;
}

.bottom_text {
  width: 100%;
  height: 30%;
  font-size: 12px;
  color: #fff;
  text-align: center;
}

.echarts_table {
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: red; */
}

.et_event {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: red; */
}

.et_title {
  width: 97.5%;
  height: 14%;
  font-size: 14px;
  color: #fff;
  background-color: #053039;
  padding: 6px 0 0 7px;
}

.et_chart img {
  width: 100%;
  height: 70%;
}

.et_chart {
  width: 97.5%;
  height: 86%;
}

.et_table {
  /* padding-left: 10px; */
}

.table {
  width: 100%;
  height: 100%;
}

.table-div {
  width: 100%;
  height: 82%;
  /*background: antiquewhite;*/
  color: #8adeff;
}

table {
  width: 100%;
}

tbody {
  overflow: hidden;
  overflow-y: scroll;
}

tr {
  height: 25px;
}

td {
  text-align: center;
  border-top: 1px solid #5bc0de;
  font-size: 1vw;
  /*border-bottom: 1px solid #5bc0de;*/
}

.bottom_button {
  width: 100%;
  height: 20%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: blue; */
}
.et_radio {
  padding: 20px 0 0 30px;
}
.et_radio >>> .el-radio__label {
  padding-left: 3px;
}
.right_camera {
  width: 80%;
  height: 100%;
  /* background-color: red; */
}

.isbox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: red; */
}

.istow {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.istowinner {
  width: 500px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: #00d8ff; */
}

.isthree {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.isthreeinner {
  width: 350px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.isfour{
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.isfourinner{
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.innertitle {
  width: 100%;
  height: 10%;
  color: #fff;
  font-size: 15px;
  background-image: linear-gradient(to right, #00d8ff, #053039);
}
.innercontent {
  width: 100%;
  height: 90%;
  background-image: url(../../static/images/camera_default.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.main-div-bf {
  width: 100%;
  height: 100%;
  top: 0%;
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.1);
}

.warning-div,
.warning-div-bf {
  width: 33.33%;
  height: 33.33%;
  float: left;
  position: relative;
}
.img-div,
.img-div-bf {
  width: 99%;
  height: 99%;
  left: 0.5%;
  top: 0.5%;
  background: #053039;
}
.img-div {
  background: #053039;
}
.warning-type {
  width: 30%;
  height: 20%;
  background: rgba(0, 0, 0, 0.5);
  display: table;
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  text-align: center;
}
.warning-type span {
  display: table-cell;
  vertical-align: middle;
  margin: auto;
}
</style>
