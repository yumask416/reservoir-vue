<template>
  <div id="main">
    <div id="warning_center">
      <div id="real_time_video">
        <h3>视频播放</h3>
        <div id="real_img">
          <!-- <img src="/static/images/logo.png"/> -->
          <img :src="realTimeImg" />
          <!-- <img src="/static/images/camera_default.png" width="100%" height="100%"/> -->
        </div>
      </div>
      <div id="warning_info">
        <h3>告警配置</h3>

        <div class="warning_detail">
          <div class="add_new">
            <div style="margin-top: 4px">
              <img
                src="/static/images/Icon/add.png"
                alt=""
                width="20px"
                height="20px"
              />
            </div>
            <span>新增</span>
          </div>
          <!-- 方案二 列表编辑的模式 -->
          <div class="table">
            <div id="table-div" class="table-div">
              <table border="0" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>告警事件</th>
                    <th>禁止时间</th>
                    <th>是否启用</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-bind:class="{
                      offline: cam['Status'] === 0,
                      online: cam['Status'] === 1,
                      run_ai: cam['Status'] === 2
                    }"
                    v-for="(cam, index) in tableData"
                    v-bind:key="index"
                  >
                    <td>{{ cam["id"] }}</td>
                    <td>{{ cam["event"] }}</td>
                    <td>{{ cam["forbidtime"] }}</td>
                    <td>{{ cam["Status"] }}</td>
                    <td>
                      <div class="operate">
                        <div
                          class="not_option_button"
                          @click="opendialog(cam.id)"
                        >
                          配置
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div
                          class="not_option_button"
                          @click="deletEvent(cam.id)"
                        >
                          删除
                        </div>
                      </div>

                      <!-- <button v-else class="config tb_button" @click="ClickConfig(cam['ID'])">配置</button> -->
                      <!-- <button v-if="cam['Status'] !== 2" class="not_option_button">还原</button> -->
                      <!-- <button v-else class="reduction tb_button" @click="ReductionCamera(cam['ID'])">还原</button> -->

                      <!-- <button v-else @click="DeleteCamera(cam['ID'])" class="delete tb_button">删除</button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- <div
          class="warning_card"
          v-for="(img_info, index) in ImgInfo"
          :key="index"
        >
          <img :src="img_info.imgpath" /><br />
          <span class="event_info"> {{ img_info.eventtype }} </span><br />
          <span class="event_info"> {{ img_info.time }} </span>
        </div> -->
      </div>
    </div>

    <!-- 设置弹窗 -->
    <div class="dialog">
      <el-dialog
        title="告警事件配置"
        :visible.sync="dialogFormVisible"
        width="900px"
      >
        <div class="form" :v-model="form">
          <!-- 发生的事件列表 -->
          <div class="event_list">
            <ul>
              <li v-for="(it, index) in items" :key="index">
                <div
                  @click="activeIt(index)"
                  :class="
                    activeindex == index ? 'li_button_active' : 'li_button'
                  "
                >
                  <div class="inner">
                    <div class="icon_img">
                      <img :src="it.img" alt="" width="28px" height="28px" />
                    </div>
                    <div class="lable">{{ it.lable }}</div>
                  </div>
                </div>
                <!-- <el-radio v-model="form.event" label="it">{{it}}</el-radio> -->
              </li>
            </ul>
          </div>
          <div class="time_launch">
            <!-- 时间布控 -->
            <div class="time" ref="time" id="time">
              <div
                class="timeplan_days"
                onselectstart="return false;"
                style="-moz-user-select:none;"
              >
                <div
                  class="timeplan_day"
                  v-for="itemDay in dayTimePlan"
                  :key="itemDay.day"
                  day="0"
                >
                  <div class="timeplan_dayname" :day="itemDay.day">
                    <label :ref="itemDay.dayId" :title="itemDay.title">{{
                      itemDay.title
                    }}</label>
                  </div>
                  <div class="timeplan_daydraw">
                    <div class="block">
                      <el-slider v-model="itemDay.value" range :marks="marks" :min="min" :max="max">
                      </el-slider>
                    </div>
                    <!-- <div
                      :ref="itemDay.planId"
                      :day="itemDay.day"
                      class="timeplan_daytimeplan"
                    ></div> -->
                  </div>
                  <div
                    class="timeplan_copyto"
                    day="0"
                    style="display: none;"
                  ></div>
                </div>
              </div>
            </div>
            <!-- 是否启用 -->
            <div class="launch">
              <div>是否启用：</div>
              <span class="radio"
                ><el-radio v-model="form.Status" label="是">是</el-radio>
                <el-radio v-model="form.Status" label="否">否</el-radio></span
              >
            </div>
          </div>
          <!-- <div class="left">
            <span>告警事件：</span>
            <span>禁止时间：</span>
            <span>是否启用：</span>
          </div> -->
          <!-- 展示 -->
          <!-- <div class="right">
            <span>{{ form.event }}</span>
            <span>{{ dateFormat(form.forbidtime) }}</span>
            <span>{{ form.Status }}</span>
          </div> -->
          <!-- 修改 -->
          <!-- <div class="right" v-if="!isUpdate"> -->
          <!-- 下拉框 -->
          <!-- <span style="position: relative; display: inline-block;">
              <div
                style="margin-top: 11px"
                class="select_input"
                @click="selectOption()"
              >
                {{ form.event }}
              </div>
              <ul style="position: absolute" id="options" ref="options">
                <li v-for="it in items" :key="it" @click="changeOption(it)">
                  {{ it }}
                </li>
              </ul>
            </span> -->
          <!-- 时间轴 -->
          <!-- <span class="timePicker">
              <template>
                <el-time-picker
                  is-range
                  v-model="form.forbidtime"
                  range-separator="至"
                  start-placeholder="07:00:00"
                  end-placeholder="18:00:00"
                  placeholder="选择时间范围"
                  size="mini"
                >
                </el-time-picker>
              </template>
            </span> -->
          <!-- 单选 -->
          <!-- <span class="radio"
              ><el-radio v-model="form.Status" label="是">是</el-radio>
              <el-radio v-model="form.Status" label="否">否</el-radio></span
            > -->
          <!-- </div> -->
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="buttony" v-if="isUpdate" @click="formUpdate()">修改</div>
          <div class="buttony" v-else @click="formSureUpdate()">保存</div>
          <div class="buttonn" @click="cancel()">取消</div>
        </div>
      </el-dialog>
    </div>

    <div id="camera_list">
      <h3>摄像头列表</h3>
      <div class="camera_list">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#041E2B"
          text-color="#fff"
          :default-openeds="openeds"
        >
          <el-submenu v-for="item in menuData" :key="item.id" :index="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.lable }}</span>
            </template>
            <el-menu-item-group
              v-for="childred in item.child"
              :key="childred.lable"
            >
              <template slot="title">{{ childred.lable }}</template>
              <el-menu-item
                v-for="camera in childred.cameraChild"
                :key="camera.id"
                :index="camera.id"
                >{{ camera.lable }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
// import  { TimePlan }  from "/static/images/timeplan2"

import {
  MENU_DATA,
  ITEMS,
  TABLE_DATA,
  DAY_TIME_PLAN
} from "@/components/SingleWarningVideo";
export default {
  data() {
    return {
      value: [0, 0],
      min: 0,
      max: 24,
      marks: {
        // 0:'0',
        // 12:'12',
        // 24:'24'
      },
      menuData: MENU_DATA,
      tableData: TABLE_DATA,
      dayTimePlan: DAY_TIME_PLAN,
      tableDataId: 0,
      openeds: ["1"],
      isIndeterminate: true,
      isUpdate: true,
      checkAll: false,
      checkedItem: ["用手机"],
      items: ITEMS,
      selectValue: "教学楼",
      selectOptions: [
        { value: "1", label: "教学楼" },
        { value: "2", label: "食堂" },
        { value: "3", label: "东大门" }
      ],
      dialogFormVisible: false,
      form: {
        event: "",
        forbidtime: "",
        Status: ""
      },
      activeindex: 1,
      per: 10,
      cam_list: [],
      CameraList: [
        {
          value: "ipc1"
        },
        {
          value: "ipc2"
        },
        {
          value: "ipc3"
        },
        {
          value: "ipc4"
        }
      ],
      ImgInfo: [
        {
          imgpath: "/static/images/camera_default.png",
          time: "Time1",
          eventtype: "EventType1"
        },
        {
          imgpath: "/static/images/camera_default.png",
          time: "Time2",
          eventtype: "EventType2"
        },
        {
          imgpath: "/static/images/camera_default.png",
          time: "Time3",
          eventtype: "EventType3"
        },
        {
          imgpath: "/static/images/camera_default.png",
          time: "Time4",
          eventtype: "EventType4"
        }
      ],
      realTimeImg: "/static/images/camera_default.png"
    };
  },
  methods: {
    dateFormat(time) {
      if (time instanceof Array) {
        let date1 = new Date(time[0]);
        let date2 = new Date(time[1]);
        let sta =
          date1.getHours() +
          ":" +
          date1.getMinutes() +
          ":" +
          date1.getSeconds();
        let end =
          date2.getHours() +
          ":" +
          date2.getMinutes() +
          ":" +
          date2.getSeconds();
        return `${sta}-${end}`;
      } else {
        return time;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCheckAllChange() {},
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.items.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.items.length;
    },
    selectOption() {
      console.log("展开");
      this.$refs.options.style.display = "block";
    },
    //更改select选择的选项
    changeOption(val) {
      console.log(val);
      this.form.event = val;
      console.log(this.form.event);
      this.$refs.options.style.display = "none";
    },
    // 打开id为id的表单
    opendialog(id) {
      this.dialogFormVisible = true;
      this.tableDataId = id - 1;
      console.log(id);
      // 给表单赋值
      this.form.event = this.tableData[id - 1].event;
      // if(this.items[id].lable === this.form.event){
      // this.activeindex = this.items.indexOf(this.form.event);
      // }
      this.activeindex = this.items.findIndex(
        item => item.lable === this.form.event
      );
      this.form.forbidtime = this.tableData[id - 1].forbidtime;
      this.form.Status = this.tableData[id - 1].Status;
      console.log(
        "this.form.event",
        this.form.event,
        "this.activeindex",
        this.activeindex
      );
      // $("#time").TimePlan({sectionNum :4})
      // 写接口发请求
    },
    // 删除id为id的表单
    deleteEvent(id) {
      console.log(id);
      // 写接口发请求
    },
    formUpdate() {
      this.isUpdate = false;
    },
    formSureUpdate() {
      this.dialogFormVisible = false;
      this.isUpdate = true;
      // 发送保存数据
    },
    cancel() {
      this.dialogFormVisible = false;
      this.isUpdate = true;
    },
    activeIt(index) {
      this.activeindex = index;
    }
  },
  created() {
    //  document.addEventListener('click',(e)=>{
    //      if(this.$refs.options){
    //          let isSelf = this.$refs.options.contains(e.target)
    //          if(!isSelf){
    //             this.$refs.options.style.display = "none";
    //          }
    //      }
    //  })
  }
};
</script>

<style scoped>
/* @import "css/ui.css"; */
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
  width: 100%;
  height: 27%;
  top: 1%;
  border: 1px solid #8adeff;
  border-radius: 4px;
  overflow: hidden;
  /* overflow-y: scroll;
    overflow-x: hidden;
    display: inline-block; */
}
.warning_detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background-color: #8adeff; */
  /* margin: 5%; */
}

.add_new {
  margin-top: 10px;
  margin-right: 10px;
  width: 80px;
  height: 28px;
  background-color: #3dbaf1;
  color: white;
  border-radius: 5px;
  line-height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.add_new span {
  font-size: 12px;
}

/* .warning_detail .select select {
  font-family: "微软雅黑";
  background-color: #0D425C;
  width: 100px;
  height: 28px;
  font-size: 14px;
  color: white;
  text-align: center;
  border: 0;
  border-radius: 3px;
  line-height: 28px;
} */

/* .warning_detail .select option{
    color: #fff;
    background: #0D425C;
    line-height: 28px;
    height: 28px;
    border: 0;
    border-radius: 0;
} */

.select {
  margin-left: 10px;
}

.select >>> .el-input--mini .el-input__inner {
  width: 100px;
  /* background-color: #10576f; */
  /* color: #fff; */
}

.select >>> .el-select-dropdown {
  background-color: #10576f !important;
  border: 0 !important;
}

.select
  >>> ::v-deep.el-select-dropdown__item.hover
  .el-select-dropdown__item:hover {
  background-color: #3dbaf1;
}

.select_input {
  /* display: inline-block; */
  /* line-height: 50px; */
  color: #fff;
  width: 100px;
  height: 28px;
  /* margin-top: 11px; */
  background-color: #10576f;
  text-align: center;
  line-height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 2px;
}

.el-icon-caret-bottom {
  margin-top: 5px;
}
#options {
  width: 100px;
  height: 120px;
  color: #fff;
  display: none;
  background-color: #10576f;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 100;
}
#options li {
  border-top: 1px solid #041e2b;
  text-align: center;
  line-height: 28px;
  list-style: none;
  padding: 0px;
  margin: 0px;
}
/* .select_input:hover + #options {
  /* background-color: #fff; */
/* display: block; */
/* } */
*/ #options:hover {
  display: block;
}

#options li:hover {
  background-color: #3dbaf1;
}

.table {
  width: 80%;
  height: 100%;
}

.table-div {
  width: 100%;
  height: 82%;
  /*background: antiquewhite;*/
  color: #8adeff;
}

.operate {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.el-divider--vertical {
  margin: 3px 8px;
}

.not_option_button {
  /* background-color: #0D425C; */
  color: #8adeff;
  font-size: 10px;
}

table {
  width: 100%;
}

tbody {
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

.tb_button {
  width: 70px;
  height: 35px;
  background: none;
  outline: none;
  border: 1px solid #5bc0de;
  border-radius: 5px;
  color: #8adeff;
  cursor: pointer;
}

.warning_bot {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.rang {
  width: 20%;
  height: 100%;
  text-align: right;
}
.check_box {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.check_box li {
  margin-top: 10px;
}
.rang li {
  margin-top: 10px;
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
#real_img img {
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
.cameralist:hover {
  background: rgba(32, 160, 199, 0.44);
}

.cameralist span {
  display: table-cell;
  width: 100%;
  text-align: center;
  vertical-align: middle;
}

.warning_card {
  width: 24%;
  height: 90%;
  float: left;
  top: 1%;
  margin-left: 1%;
  /* background: red; */
}
.warning_card img {
  width: 100%;
}
/* 滑动条 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: #5bc0de;
}
::-webkit-scrollbar-track {
  background-color: #053039;
}

.camera_list {
  width: 98%;
  height: 98%;
  margin: 0 auto;
  padding: 10px auto;
  /* background: url("../../static/images/CanvasBorder.png") no-repeat; */
  /* background: url("/static/images/CanvasBorder.png") no-repeat; */
  background-size: 100% 100%;
  overflow: hidden;
  /* padding: 10px auto; */
}

/* *修改全局的滚动条
/**滚动条的宽度*/
/* ::-webkit-scrollbar {
  width: 8px;

} */
/* 滚动条的滑块 */
/* ::-webkit-scrollbar-thumb {
  background-color: #0D425C;
  border-radius: 3px;
}  */

.el-menu-vertical-demo {
  width: 97%;
  height: 92%;
  top: 12px;
  border: 0;
  left: 1%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.dialog {
  background-image: url("../../static/images/inputBack.png");
}
.dialog >>> .el-dialog {
  background-color: #0d425c;
  border: 2px solid #5bc0de;
}
.dialog >>> .el-dialog .el-dialog__header .el-dialog__title {
  color: #5bc0de;
}
.dialog >>> .el-dialog .el-dialog__body {
  color: #5bc0de;
}
.dialog >>> .el-dialog .el-dialog__footer {
  text-align: center;
}

.dialog .form {
  width: 100%;
  /* height: 100%; */
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.dialog .form .event_list {
  width: 30%;
  height: 100%;
  /* background-color: #8adeff; */
}
.dialog .form .event_list ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dialog .form .event_list ul li {
  list-style: none;
  height: 50px;
  padding: 5px;
  width: 80%;

  /* background-color: orange; */
}

.inner {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
}

.icon_img {
  width: 28px;
  height: 28px;
  /* background-color: orange; */
  margin-top: 10px;
  margin-right: 10px;
}

.lable {
  font-size: 20px;
  color: #fff;
}

.dialog .form .event_list ul li .li_button {
  width: 100%;
  height: 100%;
  background-color: #69c0ff;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
}
.dialog .form .event_list ul li .li_button_active {
  width: 100%;
  height: 100%;
  background-color: #0050b3;
  text-align: center;
  font-size: 20px;
  color: #fff;
  line-height: 50px;
  border-radius: 5px;
}
.dialog .form .time_launch {
  width: 67%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: yellow; */
}
.dialog .form .time_launch .time {
  width: 100%;
  height: 80%;
  /* background-color: #f7f7f7; */
  /* background-color: yellowgreen; */
}
.timeplan_days {
  width: 100%;
  height: 100%;
  margin: 19px 0 13px 13px;
}
.timeplan_day {
  height: 41px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.timeplan_dayname {
  width: 8%;
  height: 41px;
  line-height: 41px;
  /* color: #656363; */
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.timeplan_daydraw {
  width: 85%;
  height: 30px;
  /* background: url(../../static/images/timeplan.png) 0 50% no-repeat; */
  background-size: 100% 100%;
}
.timeplan_copyto {
  display: none;
  width: 5%;
  height: 16px;
  margin: 17px 0 0 5px;
  background: url("../../static/images/config-icons.png") -110px 0 no-repeat;
}
.timeplan_copyto_top {
  height: 25px;
  line-height: 25px;
  margin: 0 5px;
  border-bottom: 1px solid #e6e6e6;
}
.timeplan_copyto_txt {
  font-weight: 900;
  padding-left: 3px;
}
.timeplan_copyto_checkall {
  display: inline-block;
  float: right;
  width: 90px;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.timeplan_checkboxs .timeplan_copyto_bottom {
  text-align: right;
  background-color: #f7f7f7;
}
.timeplan_daytimeplan {
  position: relative;
  width: 486px;
  height: 16px;
  margin-left: 1px;
  margin-top: 17px;
}
.dialog .form .time_launch .launch {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* background-color: orange; */
}
.dialog .form .left {
  width: 18%;
}
.dialog .form .left span {
  display: block;
  width: 100%;
  height: 61px;
  line-height: 50px;
  font-size: 16px;
  text-align: right;
}
.dialog .form .right {
  width: 30%;
}
.dialog .form .right span {
  display: block;
  width: 100%;
  height: 61px;
  line-height: 50px;
  font-size: 16px;
  text-align: left;
}

.dialog .dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.dialog .dialog-footer .buttony {
  width: 12%;
  height: 6%;
  margin-right: 10px;
  color: #fff;
  background-color: #5bc0de;
  border-radius: 3px;
}

.dialog .dialog-footer .buttonn {
  width: 12%;
  height: 6%;
  color: #fff;
  background-color: #5bc0de;
  border-radius: 3px;
}

.timePicker >>> .el-range-editor--mini.el-input__inner {
  width: 180px;
  background-color: #0d425c;
}

.timePicker >>> .el-range-editor--mini .el-range-input {
  background-color: #0d425c;
  color: #fff;
}
.timePicker >>> .el-date-editor .el-range-separator {
  background-color: #0d425c;
  color: #fff;
}
.radio >>> .el-radio {
  color: #fff;
}
</style>
