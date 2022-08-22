<template>
<div class="main">
  <div class="param-div">
    <div class="select-div">
      <span>事件：</span>
      <div class="n_input">
        <el-select v-model="event_val" class="m-2" placeholder="Select" size="large">
            <el-option
            v-for="item in event_opt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </div>
      <button class="search" @click="SearchClick">搜索</button>
      <button class="search">生成报表</button>
    </div>
    <div class="select-div">
      <span>通道：</span>
      <div class="n_input">
        <el-select v-model="camera_val" class="m-2" placeholder="Select" size="large">
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
      <span class="demonstration">日期时间</span>
      <div class="n_input">
        <el-date-picker
          v-model="datetime"
          type="datetimerange"
          :picker-options="pickerOptions"
          value-format='yyyy-MM-dd hh:mm:ss'
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          >
        </el-date-picker>
      </div>
    </div>

  </div>
  <div class="table-div">
    <table class="table">
      <thead id="thead_1">
      <tr>
        <th>图片</th>
        <th>事件</th>
        <th>通道</th>
        <th>时间</th>
<!--        <th>操作</th>-->
      </tr>
      </thead>
      <tbody id="tbody_1">
      <tr v-for="(item,index) in table_tr" v-bind:key="index">
        <td><img :src="item.imgPath" width="310px" height="200px" alt=""></td>
        <td>{{ item.eventType }}</td>
        <td>{{ item.channel }}</td>
        <td>{{ item.time }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="page-div">
    <el-pagination
      style="top: 5%"
      background
      layout="prev, pager, next"
      :page-size="page_size"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</div>
</template>

<script>
  import ajax from "axios"

	export default {
		name: "HistoryEvent",
    data(){
		  return {
		    event_val: "全部",
		    event_opt : [
		      {
            value: '全部',
            label: '全部',
          },{
            value: 'Y01',
            label: '人员离岗',
          },{
            value: 'Y02',
            label: '打电话',
          },{
            value: 'Y03',
            label: '抽烟',
          },{
            value: 'Y04',
            label: '明火',
          },{
            value: 'Y05',
            label: '烟雾',
          },{
            value: 'Y06',
            label: '灭火器',
          },
        ],
        event_map : new Map(),
        camera_val: "全部",
        camera_opt: [
          {
            AIIndex: 0,
            Area: "",
            Area2: "",
            CreatedAt: "",
            ID: 0,
            IP: "",
            NoteName: "全部",
            Report: "",
            RtspAddr: "",
            Status: 0,
            ThreadID: "全部",
            UpdatedAt: "",
          }
        ],
        camera_map : new Map(),
        table_tr: [
          // {
          //   imgPath: "/static/images/camera_default.png",
          //   eventType: "人员离岗",
          //   channel: "204",
          //   time: "2022-04-18 13:57:22",
          // }
        ],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datetime: [],
        // 按下搜索按钮之后需要保存的变量
        start_time: "",
        end_time: "",
        event: "",
        camera: "",
        // 分页
        page_size:10,
        total: 0,

      }
    },
    mounted() {
		  this.event_map.set("Y00", "全部");
		  this.event_map.set("Y01", "人员离岗");
		  this.event_map.set("Y02", "打电话");
		  this.event_map.set("Y03", "抽烟");
		  this.event_map.set("Y04", "明火");
		  this.event_map.set("Y05", "烟雾");
		  this.event_map.set("Y06", "灭火器");


		  //
      // for (let i=0; i<10; i++){
      //   this.table_tr.push({
      //     imgPath: "/static/images/camera_default.png",
      //     eventType: "人员离岗",
      //     channel: "204",
      //     time: "2022-04-18T13:57:22",
      //   });
      // }

      let _this = this;
      let param = {"page": 1, "pageSize": 10};
      ajax.get("/api/v1/camera/list", {params: param}).then(function (res) {
          let data = res.data;
          if (data.code === 2200){
              for (let i=0; i<data.data.total; i++){
                  _this.camera_opt.push({
                      AIIndex: data.data.list[i]["AIIndex"],
                      Area: data.data.list[i]["Area"],
                      Area2: data.data.list[i]["Area2"],
                      CreatedAt: data.data.list[i]["CreatedAt"],
                      ID: data.data.list[i]["ID"],
                      IP: data.data.list[i]["IP"],
                      NoteName: data.data.list[i]["NoteName"],
                      Report: data.data.list[i]["Report"],
                      RtspAddr: data.data.list[i]["RtspAddr"],
                      Status: data.data.list[i]["Status"],
                      ThreadID: data.data.list[i]["ThreadID"],
                      UpdatedAt: data.data.list[i]["UpdatedAt"],
                  });
                  _this.camera_map.set(data.data.list[i]["ThreadID"], data.data.list[i]["NoteName"]);
              }
          }
      });
    },
    methods: {
		  /**
       * @return {boolean}
       */
      SearchClick(){
        console.log(this.datetime);
        console.log(this.camera_val);
        if (this.datetime.length < 2){
          // this.$message.error("请选择时间！");
          // return false;
          this.start_time = "all";
          this.end_time = "all";
        }else {
          this.start_time = this.datetime[0];
          this.end_time = this.datetime[1];
        }
        this.camera = this.camera_val;  // 线程ID
        this.event = this.event_val;

        let _this = this;
        let param = {
          "page": 1,
          "pageSize": 10,
          "thread_id": this.camera,
          "event": this.event,
          "start_time": this.start_time,
          "end_time": this.end_time
        };
        ajax.get("/api/v1/history/search", {params: param}).then(function (res) {
            let data = res.data;
            _this.table_tr = [];
            if (data.code === 2200){
                // console.log(data);
                _this.total = data.data.total;
                for (let i=0; i<data.data.pageSize;i++){
                  _this.table_tr.push({
                    imgPath: "/"+data.data.list[i]["ImgPath"],
                    eventType: _this.event_map.get(data.data.list[i]["Type"]),
                    channel: _this.camera_map.get(data.data.list[i]["ThreadID"]),
                    time: data.data.list[i]["CreatedAt"],
                  });
                }
            } else {
                _this.total = 0;
                _this.$message.warning("没有搜索出数据！");

            }
            // console.log(_this.table_tr);
        });
      },
		  handleCurrentChange(val){
		    let _this = this;
        let param = {
          "page": val,
          "pageSize": 10,
          "thread_id": this.camera,
          "event": this.event,
          "start_time": this.start_time,
          "end_time": this.end_time
        };
        ajax.get("/api/v1/history/search", {params: param}).then(function (res) {
            let data = res.data;
            if (data.code === 2200){
                console.log(data);
                _this.table_tr = [];
                for (let i=0; i<data.data.pageSize;i++){
                  _this.table_tr.push({
                    imgPath: "/"+data.data.list[i]["ImgPath"],
                    eventType: data.data.list[i]["Type"],
                    channel: data.data.list[i]["ThreadID"],
                    time: data.data.list[i]["CreatedAt"],
                  });
                }
            }
        });
      }
    }
	}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
    overflow: hidden;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
::-webkit-scrollbar {width:5px;height:5px;position:absolute}
::-webkit-scrollbar-thumb {background-color:#5bc0de}
::-webkit-scrollbar-track {background-color: #053039}

  .param-div{
    width: 100%;
    height: 13%;
    /*background: #8adeff;*/
  }
  .select-div {
    width: 26%;
    height: 100%;
    display: table;
    /* background: red; */
    float: left;
  }
  .select-div span{
    /*width:13%;*/
    display: table-cell;
    vertical-align: middle;
    float: left;
    left: 3%;
    position: relative;
    top: 18%;
  }
  .select-div .n_input {
    width: 60%;
    float: left;
    left: 5%;
    top: 9%;
  }
  .search{
    width: 30%;
    height: 40%;
    top: 15%;
    left: 3%;
  }
  .table-div{
    width: 96%;
    height: 75%;
    left: 2%;
    /*background: #0a640a;*/
    border-collapse: collapse;
    overflow-y: scroll;
  }
  .table{
    width: 100%;
  }
  #thead_1 tr {
    border-bottom: 1px solid rgba(32, 165, 206, 0.6);
    color: rgb(32, 165, 206);
    height: 40px;
    background: #0a640a;
  }
  #tbody_1 tr{
    height: 100px;
  }
  #tbody_1 tr:hover {
    background: rgba(26, 83, 114, 0.6);
  }
  td{
    text-align: center;
  }
  .page-div{
    width: 100%;
    height: 12%;
  }
</style>
