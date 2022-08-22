<template>
  <div class="sod-main">
    <div class="event_left">
      <div class="main-top">
        <div class="left">
          <div class="video-title"><span>告警画面一</span></div>
          <div class="video-show">
            <img
              :src="camera_1"
              style="margin: 0 auto"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
          <div class="video-button">
            <!-- 进度条 -->
            <div class="pros">
              <div class="play" id="play" v-if="isplay">
                <img src="/static/images/bofang.png" alt="" />
              </div>
              <div class="play" id="stop" v-else>
                <img src="/static/images/zanting.png" alt="" />
              </div>
              <div class="prosbar">
                <div class="inner"></div>
              </div>
            </div>
            <!-- 时间和声音 -->
            <div class="timeandvoice">
              <div class="timepros">
                15:00/30:00
              </div>
              <div class="voice">
                <div class="play" id="play" v-if="isplay">
                  <img src="/static/images/havevoice.png" alt="" />
                </div>
                <div class="play" id="stop" v-else>
                  <img src="/static/images/novoice.png" alt="" />
                </div>
                <div class="prosbar">
                  <div class="inner"></div>
                </div>
              </div>
            </div>
            <!-- 功能 -->
            <div class="feature">
              <div class="featbutton">
                暂停
              </div>
              <div class="featbutton">
                倒放
              </div>
              <div class="featbutton">
                后退十秒
              </div>
              <div class="featbutton">
                前进10秒
              </div>
              <div class="featbutton">
                暂停
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="video-title"><span>告警详情</span></div>
          <div class="detail">
            <ul class="detail_title">
              <li>时间:</li>
              <li>地点:</li>
              <li>摄像头:</li>
              <li>事件:</li>
              <li>严重程度:</li>
            </ul>
            <ul class="detail_content">
              <li>07:30-7:40</li>
              <li>教学楼</li>
              <li>摄像头三</li>
              <li>用手机</li>
              <li>低<i class="el-icon-warning"></i></li>
            </ul>
          </div>
          <div class="detail_select">
            <el-checkbox v-model="timerangchecked">时间范围</el-checkbox>
            <div class="time_title">开始时间:</div>
            <div class="time_box">2021 7-21 07:30:00</div>
            <div class="time_tilte">结束时间：</div>
            <div class="time_box">2021 7-21 07:40:00</div>
          </div>

          <!-- <div class="video-show">
            <img :src="camera_2" width="100%" height="100%" alt="" />
          </div>
          <div class="video-button">
            <button class="play">播放</button>
            <button class="stop">暂停</button>
          </div>-->
        </div>
      </div>
      <div class="main-middle">
        <h3>告警事件列表</h3>
      </div>
      <div class="main-bottom" @mousewheel="handleScroll" ref="scrollBox">
        <div class="scrollBox">
          <div class="event_div" v-for="(item, i) in ImgInfo" :key="i">
            <div class="top_div">{{ item.name }}</div>
            <div class="bottom_div"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list_right">
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
// import ajax from "axios"
import { MENU_DATA } from "./SingleWarningVideo";

export default {
  name: "SecurityOilDischarge",
  data() {
    return {
      timerangchecked: false,
      isplay: true,
      menuData: MENU_DATA,
      openeds: ["1"],
      camera_1: "/static/images/camera_default.png",
      camera_2: "/static/images/camera_default.png",
      ImgInfo: [
        {
          name: "告警画面一",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面二",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面三",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面四",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面五",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面六",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面七",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面八",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面九",
          path: "/static/images/PPT/camera.png",
          type: 1
        },
        {
          name: "告警画面十",
          path: "/static/images/PPT/camera.png",
          type: 1
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleScroll(e) {
      // console.log(e);
      // event_div
      let scrollNum = this.$refs.scrollBox;
      scrollNum.scrollLeft = scrollNum.scrollLeft + e.deltaY;
    }
  }
};
</script>

<style scoped>
.sod-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /*background: black;*/
  /*background: #8adeff;*/
}
.event_left {
  width: 78%;
}
.list_right {
  width: 19%;
  height: 98%;
  border: 1px solid #8adeff;
  border-radius: 4px;
  text-align: center;
}
.detail {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #0d425c;
  border-top: 1px solid #8adeff;
  border-bottom: 1px solid #8adeff;
}

.detail ul li {
  /* width: 80%; */
  list-style: none;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.el-icon-warning {
  color: orange;
  margin-left: 10px;
}
.detail_title {
  width: 40%;
  text-align: right;
}
.detail_content {
  width: 60%;
  text-align: left;
  margin-left: 20px;
}
.camera_list {
  width: 98%;
  height: 98%;
  margin: 0 auto;
  padding: 10px auto;
  /* background: url("/static/images/CanvasBorder.png") no-repeat; */
  /* background: url("/static/images/CanvasBorder.png") no-repeat; */
  background-size: 100% 100%;
  overflow: hidden;
  /* padding: 10px auto; */
}
.el-menu-vertical-demo {
  width: 97%;
  height: 92%;
  top: 12px;
  border: 0;
  left: 1%;
  overflow-y: scroll;
  overflow-x: hidden;
}
/* *修改全局的滚动条
/**滚动条的宽度*/
/* ::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条的滑块 */
/* ::-webkit-scrollbar-thumb {
  background-color: #0d425c;
  border-radius: 3px;
}*/
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
.main-top {
  width: 100%;
  height: 70%;
  background: #8adeff;
  /*background: #0a640a;*/
}
.main-middle {
  text-align: center;
  width: 100%;
  height: 5%;
  border-bottom: 1px solid #8adeff;
}
.main-bottom {
  top: 1%;
  width: 100%;
  height: 20.5%;
  /* background: #8adeff; */
  overflow: hidden;
  overflow-x: scroll;
  /* position: relative; */
}
.scrollBox {
  width: 1200px;
  height: 120px;
  /* position: absolute; */
}
.event_div {
  width: 117.5px;
  height: 124px;
  float: left;
  margin-right: 1px;
  background: rgba(4, 32, 45, 1);
}
.left {
  width: 69.9%;
  height: 99.5%;
  float: left;
  background: rgba(4, 32, 45, 1);
}
.right {
  width: 29.9%;
  height: 99.5%;
  float: right;
  /* background: rgba(4, 32, 45, 1); */
  background-color: #0D425C;
}
.video-title {
  width: 100%;
  height: 10%;
  display: table;
  text-align: center;
  background-color: #0D425C;
}
.video-title span {
  display: table-cell;
  vertical-align: middle;
}
.detail_select{
  width: 100%;
  height: 40%;
  /* background-color: red; */
  color: #8adeff;
}
.detail_select >>> .el-checkbox{
  color: #8adeff;
  margin: 5px;
}
.time_title{
  color: #8adeff;
  margin: 5px;
  font-size: 12px;
}
.time_box{
  color: #fff;
  width: 60%;
  margin: 5px;
  border: 1px solid #8adeff;
  font-size: 12px;
}
.video-show {
  width: 100%;
  height: 70%;
}
.video-button {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.pros {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* background-color: red; */
}
.play {
  width: 15px;
  height: 15px;
  margin-top: 3px;
}
.play img {
  width: 100%;
  height: 100%;
}
.prosbar {
  width: 94%;
  height: 10px;
  margin-top: 8px;
  border-radius: 5px;
  background-color: #fff;
}
.inner {
  width: 50%;
  height: 100%;
  border-radius: 5px 0 0 5px;
  background-color: #8adeff;
}
.timeandvoice {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* background-color: yellowgreen; */
}
.timepros {
  width: 20%;
  font-size: 10px;
  margin-top: 3px;
  margin-right: 230px;
  /* height: 100%; */
  text-align: center;
  color: #fff;
}
.voice {
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.feature {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* background-color: antiquewhite; */
}
.featbutton{
  /* width: 50px; */
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #8adeff;
  border: 1px solid #8adeff;
  margin: 3px;
  border-radius: 3px;
  padding: 0 4px;
}
/* .play {
  width: 15%;
  height: 40%;
  left: 30%;
  top: 10%;
  cursor: pointer;
  background: none;
  border: 1px solid #8adeff;
  border-radius: 5px;
  color: #8adeff;
}
.play:hover {
  background: rgba(70, 203, 100, 0.51);
} */
/* .stop {
  width: 15%;
  height: 40%;
  left: 30%;
  top: 10%;
  cursor: pointer;
  background: none;
  border: 1px solid #8adeff;
  border-radius: 5px;
  color: #8adeff;
}
.stop:hover {
  background: rgba(203, 0, 10, 0.51);
} */

.sod-div {
  width: 12.5%;
  height: 100%;
  float: left;
  margin-left: 0.05%;
  margin-right: 0.05%;
  background: rgba(4, 32, 45, 1);
  /*border-right: 1px solid #8adeff;*/
}
.top_div {
  width: 100%;
  height: 30%;
  display: table;
  text-align: center;
}
.bottom_div {
  width: 100%;
  height: 70%;
  background: url("/static/images/PPT/camera.png") no-repeat;
  background-size: 100% 100%;
}
.sod-top {
  width: 100%;
  height: 30%;
  display: table;
  text-align: center;
}
.sod-top span {
  display: table-cell;
  vertical-align: middle;
}
.sod-bottom {
  width: 100%;
  height: 70%;
  background: url("/static/images/PPT/camera.png") no-repeat;
  background-size: 100% 100%;
}
</style>
