<template>
  <div class="main">
    <!-- <div class="param-div">
      <div class="select-div">
        <span>事件：</span>
        <div class="n_input">
          <el-select v-model="event_val" class="m-2" placeholder="Select" size="small">
            <el-option
              v-for="item in event_opt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="select-div">
        <span>通道：</span>
        <div class="n_input">
          <el-select v-model="camera_val" class="m-2" placeholder="Select" size="small">
            <el-option
              v-for="item in camera_opt"
              :key="item.ID"
              :label="item.NoteName"
              :value="item.ThreadID"
            />
          </el-select>
        </div>
      </div>
      <div class="select-div">
        <span class="demonstration">日期时间：</span>
        <div class="n_input">
          <el-date-picker
            v-model="datetime"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd hh:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          >
          </el-date-picker>
        </div>
      </div>
      <el-button class="search" @click="SearchClick" size="mini">搜索</el-button>
      <el-button class="search" @click="ExportTable" size="small">生成报表</el-button>
    </div> -->
    <div class="table-div">
      <table class="table">
        <thead id="thead_1">
          <tr>
            <th>图片</th>
            <th>事件</th>
            <th>通道</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody id="tbody_1">
          <tr v-for="(item, index) in table_tr" v-bind:key="index">
            <td><img :src="item.imgPath" width="310px" height="200px" alt="" /></td>
            <td>{{ item.eventType }}</td>
            <td>{{ item.channel }}</td>
            <td>{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-div"></div>
  </div>
</template>

<script>
import ajax from 'axios'
import * as API from '@/api/event/'
import * as CAMERAAPI from '@/api/camera/'
import { Notification } from 'element-ui'
import { wsEvent } from '../service/ws-api'

export const download = (data, name) => {
  let fileName = name
  let link = document.createElement('a')
  // 设置下载文件名
  link.setAttribute('download', fileName)
  link.style.display = 'none'
  let blob = new Blob([data], {
    type: ' application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=utf-8',
  })
  link.href = window.URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
}

export default {
  name: 'HistoryEvent',
  data() {
    return {
      ws: null,
      event_val: '全部',
      event_opt: [
        {
          value: '全部',
          label: '全部',
        },
        {
          value: '人员离岗',
          label: '人员离岗',
        },
        {
          value: '打电话',
          label: '打电话',
        },
        {
          value: '抽烟',
          label: '抽烟',
        },
        {
          value: '明火',
          label: '明火',
        },
        {
          value: '烟雾',
          label: '烟雾',
        },
        {
          value: '灭火器',
          label: '灭火器',
        },
      ],
      event_map: new Map(),
      camera_val: '全部',
      camera_opt: [
        {
          AIIndex: 0,
          Area: '',
          Area2: '',
          CreatedAt: '',
          ID: 0,
          IP: '',
          NoteName: '全部',
          Report: '',
          RtspAddr: '',
          Status: 0,
          ThreadID: '全部',
          UpdatedAt: '',
        },
      ],
      camera_map: new Map(),
      table_tr: [
        {
          imgPath: 1,
          eventType: '入侵检测',
          channel: 2,
          time: 3,
        },
        {
          imgPath: 1,
          eventType: '入侵检测',
          channel: 2,
          time: 3,
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      datetime: [],
      // 按下搜索按钮之后需要保存的变量
      start_time: '',
      end_time: '',
      event: '',
      camera: '',
      // 分页
      page_size: 10,
      total: 0,
      download_excel: '',
      download_is_click: 0,
    }
  },

  async mounted() {
    // TODO
    let res = await API.getEvent()
    console.log(res)
    res = res.data.list
    if (res) {
      table_tr = res.map(item => {
        return {
          imgPath: item.image_path,
          eventType: '入侵检测',
          channel: item.camera_id,
          time: item.timestamp,
        }
      })
    }

    // this.event_map.set('Y00', '全部')
    // this.event_map.set('Y01', '人员离岗')
    // this.event_map.set('Y02', '打电话')
    // this.event_map.set('Y03', '抽烟')
    // this.event_map.set('Y04', '明火')
    // this.event_map.set('Y05', '烟雾')
    // this.event_map.set('Y06', '灭火器')
    // this.ws = wsEvent.start(this.wsMsgHandler)

    //
    // for (let i=0; i<10; i++){
    //   this.table_tr.push({
    //     imgPath: "/static/images/camera_default.png",
    //     eventType: "人员离岗",
    //     channel: "204",
    //     time: "2022-04-18T13:57:22",
    //   });
    // }

    let _this = this
    let param = { page: 1, page_size: 10 }
    CAMERAAPI.listCam(param)
      .then(res => {
        // console.log(res)
        // let data = res.data;
        if (res.code === 2200) {
          _this.cam_list = res.data.list
          for (let i = 0; i < res.data.total; i++) {
            _this.camera_opt.push({
              AIIndex: res.data.list[i]['algorithm'],
              Area: res.data.list[i]['area'],
              // Area2: res.data.list[i]["Area2"],
              CreatedAt: res.data.list[i]['created_at'],
              ID: res.data.list[i]['id'],
              IP: res.data.list[i]['ip'],
              NoteName: res.data.list[i]['name'],
              // Report: res.data.list[i]["Report"],
              RtspAddr: res.data.list[i]['main_stream'],
              Status: res.data.list[i]['status'],
              ThreadID: res.data.list[i]['id'],
              // UpdatedAt: res.data.list[i]["UpdatedAt"],
            })
            _this.camera_map.set(res.data.list[i]['id'], res.data.list[i]['name'])
          }
        } else {
          _this.$message.error('获取摄像头列表失败！')
        }
      })
      .catch(error => console.log(error))

    this.SearchClick()
  },
  methods: {
    wsMsgHandler: function(e) {
      // if (!e.data) {
      //   return
      // }
      let data = JSON.parse(e.data)
      console.log(data)
      if (data.is_warning) {
        console.log(data.is_warning)
        //   // TODO push into array
        this.table_tr.push({
          imgPath: '/' + data.image_path,
          eventType: '人员离岗',
          channel: '204',
          time: data.timestamp,
        })
      }
    },
    // 提示弹窗
    notify: function(title, msg, err_type) {
      Notification({ title: title, message: msg, type: err_type })
    },
    /**
     * @return {boolean}
     */
    SearchClick() {
      console.log(this.datetime)
      console.log(this.camera_val)
      if (this.datetime.length < 2) {
        // this.$message.error("请选择时间！");
        // return false;
        this.start_time = 'all'
        this.end_time = 'all'
      } else {
        this.start_time = this.datetime[0]
        this.end_time = this.datetime[1]
      }
      this.camera = this.camera_val // 线程ID
      this.event = this.event_val

      let _this = this
      let param = {
        page: 1,
        page_size: 10,
        camera_id: this.camera,
        event: this.event,
        start_time: this.start_time,
        end_time: this.end_time,
      }
      API.getEvent(param)
        .then(res => {
          if (res['code'] === 2200) {
            _this.total = res.data.total
            _this.table_tr = []

            if (res.data.page_size === 0) {
              _this.$message.warning('没有搜索出数据！')
            } else {
              for (let i = 0; i < res.data.page_size; i++) {
                console.log('run push')

                _this.table_tr.push({
                  imgPath: '/' + res.data.list[i]['image_path'],
                  // eventType: _this.event_map.get(data.data.list[i]["Type"]),
                  eventType: res.data.list[i]['event_type'],
                  channel: _this.camera_map.get(res.data.list[i]['camera_id']),
                  // time: moment(res.data.list[i]["CreatedAt"]).format('YYYY-MM-DD HH:mm:ss'),
                  time: res.data.list[i]['timestamp'],
                })
              }
            }
            sucess
          } else if (res['code'] === 4404) {
            // _this.notify("搜索成功", res["msg"], "sucess");
            _this.table_tr = []
          } else {
            _this.notify('搜索失败', res['msg'], 'error')
          }
        })
        .catch(error => console.log(error))
    },
    /**
     * @return {boolean}
     */
    ExportTable() {
      // if (this.download_is_click === 1){
      //   this.$message.warning("点击频繁！");
      //   return false;
      // }
      let _this = this
      let param = {
        camera_id: this.camera,
        event: this.event,
        start_time: this.start_time,
        end_time: this.end_time,
      }
      this.download_is_click = 1
      ajax.get('/api/v1/event/export', { params: param }).then(function(res) {
        let data = res.data
        if (data.code === 2200) {
          console.log(data)
          // _this.download_excel = "/"+data["data"];
          // $(".download").click();

          // 第一种下载方法
          // let names = data["data"].split("/");
          // download("/"+data["data"],  names[names.length - 1]);
          // 第二种下载方法
          // http://10.10.10.39:4000/excel/2022-04-26_09:21:46.xlsx
          window.location.href = 'http://' + window.location.host + '/' + data['data']
        } else {
          // _this.$message.error("导出报表错误！");
          _this.notify('导出失败', data['msg'], 'error')
        }
      })
    },
    handleCurrentChange(val) {
      let _this = this
      let param = {
        page: val,
        pageSize: 10,
        thread_id: this.camera,
        event: this.event,
        start_time: this.start_time,
        end_time: this.end_time,
      }
      // ajax.get("/api/v1/history/search", {params: param}).then(function (res) {
      //     let data = res.data;
      //     if (data.code === 2200){
      //         console.log(data);
      //         _this.table_tr = [];
      //         for (let i=0; i<data.data.pageSize;i++){
      //           _this.table_tr.push({
      //             imgPath: "/"+data.data.list[i]["ImgPath"],
      //             eventType: data.data.list[i]["Type"],
      //             channel: data.data.list[i]["ThreadID"],
      //             time: data.data.list[i]["CreatedAt"],
      //           });
      //         }
      //     } else {
      //         _this.$message.error("没有搜索出数据！");
      //     }
      // });
      API.getEvent(param)
        .then(res => {
          if (res['code'] === 2200) {
            _this.total = res.data.total
            _this.table_tr = []

            if (res.data.page_size === 0) {
              _this.$message.warning('没有搜索出数据！')
            } else {
              for (let i = 0; i < res.data.page_size; i++) {
                console.log('run push')

                _this.table_tr.push({
                  imgPath: '/' + res.data.list[i]['image_path'],
                  // eventType: _this.event_map.get(data.data.list[i]["Type"]),
                  eventType: res.data.list[i]['event_type'],
                  channel: _this.camera_map.get(res.data.list[i]['camera_id']),
                  // time: moment(res.data.list[i]["CreatedAt"]).format('YYYY-MM-DD HH:mm:ss'),
                  time: res.data.list[i]['timestamp'],
                })
              }
            }
          } else {
            _this.notify('错误', res['msg'], 'error')
          }
        })
        .catch(error => console.log(error))
    },
  },
  beforeDestory() {
    wsEvent.end(this.ws)
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

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

.param-div {
  width: 97%;
  /* height: 13%; */
  margin: 2% 0;
  display: flex;
  align-content: space-around;
  /*background: #8adeff;*/
}

.select-div {
  height: 100%;
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin-left: 2%;
}

/* .select-div .n_input {
  width: 60%;
  float: left;
  left: 5%;
  top: 9%;
} */
.el-button + .el-button {
  margin-left: 1%;
  height: 30%;
}
.search {
  /* width: 30%; */
  /* height: 30%; */
  /* top: 15%;
  left: 3%; */
  margin-left: 2%;
}
.table-div {
  width: 96%;
  height: 75%;
  left: 2%;
  /*background: #0a640a;*/
  border-collapse: collapse;
  overflow-y: scroll;
}

.table {
  width: 100%;
}

#thead_1 tr {
  border-bottom: 1px solid rgba(32, 165, 206, 0.6);
  color: rgb(32, 165, 206);
  height: 40px;
  background: #0a640a;
}

#tbody_1 tr {
  height: 100px;
}

#tbody_1 tr:hover {
  background: rgba(26, 83, 114, 0.6);
}

td {
  text-align: center;
}

.page-div {
  width: 100%;
  height: 12%;
}
</style>
