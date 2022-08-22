<template>
  <div class="ss-main">
    <div class="sys-top">
      <div class="datetime-div">
        <h4>设备基础信息</h4>
        <div class="name-input-show">
          <div class="input-name"><span>设备名称：</span></div>
          <!-- <div class="input-el"><el-input v-model="eq_name" style="width: 70%;"/></div> -->
          <div class="input-el"><span>{{show_device_name}}</span></div>
        </div>
        <!-- <div class="name-input-show">
          <div class="input-name"><span>设备编码：</span></div>
          <div class="input-el"><el-input v-model="eq_code" style="width: 70%;"/></div>
        </div> -->
        <div class="name-input-show">
          <div class="input-name"><span>设备语言：</span></div>
          <div class="input-el"><span>简体中文</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>产品型号：</span></div>
          <div class="input-el"><span>AIBOX-GAS@101-1.0</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>序列号：</span></div>
          <!-- <div class="input-el"><span>AOX0x00051201000</span></div> -->
          <div class="input-el"><span>{{device_sn}}</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>设备所在地区：</span></div>
          <!-- <div class="input-el"><span>AOX0x00051201000</span></div> -->
          <div class="input-el"><span>{{device_area}}</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>软件版本：</span></div>
          <!-- <div class="input-el"><span>AIBOX-GAS@AGW.release.1.0.0-20220414.agw</span></div> -->
          <div class="input-el"><span>{{device_version}}</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>运行时间：</span></div>
          <!-- <div class="input-el"><span>2022-04-14 10:37:45</span></div> -->
          <div class="input-el"><span>{{run_time}}</span></div>
        </div>
      </div>

      <div class="system-info-div">
        <h4>基本设置</h4>
        
        <div class="name-input-show">
          <div class="input-name"><span>系统名称：</span></div>
          <div class="input-el"><el-input v-model="system_name" style="width: 48%;"/></div>
        </div>

        <div class="name-input-show">
          <div class="input-name"><span>设备名称：</span></div>
          <div class="input-el"><el-input v-model="device_name" style="width: 48%;"/></div>
        </div>
        <!-- <h4>时间配置</h4> -->
        <div class="name-input-show">
          <div class="input-name"><span>网络时间：</span></div>
          <div class="input-el"><span>{{ CurrTime }}</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>设置时间：</span></div>
          <div class="input-el">
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </div>
        </div>
        <!-- <div class="name-input-show">
          <button class="save-info">保存</button>
        </div> -->
        <div class="name-input-show">
          <div class="input-name"><span>目标分数：</span></div>
          <div class="input-el"><el-input-number v-model="obj_thread" :precision="2" :step="0.1" :controls=false :max="1" :min="0" style="width: 48%;"/></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>检测阈值：</span></div>
          <div class="input-el"><el-input-number v-model="det_thread" :precision="2" :step="0.1" :controls=false :max="1" :min="0" style="width: 48%;"/></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>IOU阈值：</span></div>
          <div class="input-el"><el-input-number v-model="iou_thread" :precision="2" :step="0.1" :controls=false :max="1" :min="0" style="width: 48%;"/></div>
        </div>

        <!-- <h4>设备区域设置</h4> -->
        <div class="name-input-show">
          <div class="input-name"><span>区域：</span></div>
          <div class="input-el">
            <area-cascader
              type="code"
              size="large"
              v-model="selected"
              @change="areaChange"
              :level="1"
              :data="pcaa"
              style="margin-top:1%;"
            ></area-cascader>
              <!-- <button id="area_save" @click="SaveArea">保存</button> -->
          </div>
        </div>

        <el-button class="save-button" type="primary" size="large" @click="SaveInfo" style="margin-top:1%;">保存</el-button>
      </div>
    </div>
    <div class="sys-option">
      <div class="system-icon">
        <div class="icon-div" style="background: url('/static/images/PPT/reboot.png') no-repeat; background-size: 100% 100%"></div>
        <div class="icon-span">
          <button class="span">重启</button>
        </div>
      </div>
      <div class="system-icon">
        <div class="icon-div" style="background: url('/static/images/PPT/reduction.png') no-repeat; background-size: 100% 100%"></div>
        <div class="icon-span">
          <button class="span">恢复出厂设置</button>
        </div>
      </div>
      <div class="system-icon">
        <div class="icon-div" style="background: url('/static/images/PPT/update.png') no-repeat; background-size: 100% 100%"></div>
        <div class="icon-span">
          <input  class="span" type="file" ref="fileInput" v-on:change="getFile($event)" style="display: none">
          <button class="span" @click="$refs.fileInput.click()">升级</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from "axios"
  import { Message } from 'element-ui'
  import { pca, pcaa } from "area-data";
  import { Notification } from "element-ui";
  import * as API from "@/api/system/";

  const service = ajax.create({
      // baseURL: ajax.defaults.baseURL // api的base_url
    // baseURL:'http://10.10.10.101:4000'
  });
  service.interceptors.response.use(
    response => {
        return response
    }, error => {
        console.log('err' + error);// for debug
        Message({
            message: '对象存储服务访问超时，请检查链接是否能够访问。',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    });

    export function BatchesAdd(data) {
        return service({
            url: '/api/v1/system/upgrade',
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
            data
        })
    }

	export default {
		name: "SystemSetting",
    data(){
		  return {
		    eq_name: "AIBOX-GAS@101-1.0",
        eq_code: "AOX0x00051201000",
        value3: "",
        CurrTime: "",
        ObjThread: 0.5,
        DetThread: 0.5,
        IOUThread: 0.5,
        Version : "",
        Flag : 0,
        IsPing: 0,
        selected: [],
        pca: pca,
        pcaa: pcaa,

        system_name: "",
        show_device_name: "",
        device_name: "",
        device_sn:"",
        device_version:"",
        device_area:"",
        run_time:"",
        obj_thread: 0.5,
        det_thread: 0.5,
        iou_thread: 0.5,

      }
    },
    mounted() {

      // console.log("ppp:", pca["86"]["110000"])
      // console.log("ppp1:", pcaa["110000"]["110100"])
      // console.log("ppp2:", pcaa["110100"]["110101"])

		  setInterval(this.Ping, 2000);
		  setInterval(this.getCurrentTime, 1000);
      // this.AreaSelect();
      this.system_name = localStorage.getItem("system_name")
      this.GetDeviceInfo(true);
    },
    methods : {
      notify: function(title, msg, err_type) {
        Notification({ title: title, message: msg, type: err_type });
      },
		  getFile(event) {
        event.preventDefault();
        let formData = new FormData();
        let file = this.$refs.fileInput.files[0];
        formData.append('file',file);
        console.log(file.name);
        let lists_ = file.name.split(".");
        if (lists_[lists_.length-1] !== "zip"){
          alert("请上传zip格式的升级包");
          return false
        }
        //调用接口
        let _this = this;
        // let param = {"file": formData};
        _this.IsPing = 1;
        BatchesAdd(formData).then(function (res) {
            let data = res.data;
            if (data.code === 2200){
                console.log(data);
                _this.$refs.fileInput.value='';
                _this.IsPing = 1;
            } else {
                _this.$message.error("升级失败！");
                _this.IsPing = 0;
            }
        });
      },
      GetDeviceInfo(init_bool){
        let _this = this
        var data = {}
        API.DeviceInfo(data).then((res) =>{
          if(res["code"] == "2200"){
            _this.device_name = res["data"]["device_name"]
            _this.device_sn = res["data"]["sn"]
            _this.device_version = res["data"]["version"]
            _this.device_area = res["data"]["province_name"] + res["data"]["city_name"] + res["data"]["county_name"] 
            _this.run_time = res["data"]["run_time"]
            _this.obj_thread = res["data"]["obj_thread"]
            _this.det_thread = res["data"]["det_thread"]
            _this.iou_thread = res["data"]["iou_thread"]
            _this.show_device_name = _this.device_name
            _this.selected = [res["data"]["province"],res["data"]["city"],res["data"]["county"]]
            if (localStorage.getItem("system_name") !== res["data"]["system_name"] && !init_bool){
              localStorage.setItem("system_name", res["data"]["system_name"])
              this.$router.go(0)    
            }

          }else{
            console.log("获取设备信息失败!")
          }
        }).catch(error => console.log("get info error:",  error))
      },
      areaChange(val) {
        console.log("val: ", val)
      },
      SaveInfo(){
        let _this = this
        if (_this.system_name === ""){
            _this.notify("失败","请设置系统名称！","error")
          return
        }
        let province_name = ""
        let city_name = ""
        let county_name = ""
        if (_this.selected.length !== 3) {
          // this.notify("错误","请配置完整的设备所在地区","error")
          // return
          _this.selected.push("")
          _this.selected.push("")
          _this.selected.push("")
        } else {
          province_name = pca["86"][_this.selected[0]]
          city_name = pcaa[_this.selected[0]][_this.selected[1]]
          county_name = pcaa[_this.selected[1]][_this.selected[2]]
        }
        var data = {
          device_name: _this.device_name,
          system_time: _this.value3,
          obj_thread: _this.obj_thread,
          det_thread: _this.det_thread,
          iou_thread: _this.iou_thread,
          province: _this.selected[0],
          city: _this.selected[1],
          county: _this.selected[2],
          province_name: province_name,
          city_name: city_name,
          county_name: county_name,
          system_name: _this.system_name
        }
        API.UpDate(data).then((res) =>{

          if(res["code"] == "2200"){
            _this.GetDeviceInfo(false)
            _this.notify("设置成功",res["msg"],"success")
            // location.reload()
          } else {
            _this.notify("设置失败",res["msg"],"error")
          }
        }).catch(error => console.log("update info error:", error))

      },

      SaveThread(){
		    let param = {"obj": this.ObjThread, "det": this.ThreadID, "iou": this.IOUThread};
		    ajax.get("/api/v1/", {params: param}).then(function (res) {
		        let data = res.data;
		        if (data.code === 2200){
		            console.log(data);
		        } else {
                        _this.$message.error("保存阈值失败！");
                    }
		    });
      },
      SaveArea(){
          if (this.selected.length !== 3) {
            this.notify("错误","请配置完整的设备所在地区","error")
            return
          }
          // console.log(pca["86"][this.selected[0]])
          // console.log(pcaa[this.selected[0]][this.selected[1]])
          // console.log(pcaa[this.selected[1]][this.selected[2]])
          var data = {
            province: this.selected[0],
            city: this.selected[1],
            county: this.selected[2],
            province_name: pca["86"][this.selected[0]],
            city_name: pcaa[this.selected[0]][this.selected[1]],
            county_name: pcaa[this.selected[1]][this.selected[2]],
          }
          API.SaveArea(data).then((res) =>{
          if (res["code"] === 2200){
              // this.equ_list = res["list"]
              this.notify("成功","修改完成！","success")
          }else{
              this.notify("错误",res["msg"],"error")
          }

         }).catch(error => console.log(error))

      },
      // AreaSelect() {     
      //   var data =  {
      //   }
      //   API.ListArea(data).then((res) => { 
      //     if (res["code"] === 2200){
      //         console.log(res["data"]["province"])
      //         this.selected[0] = res["data"]["province"];
      //         this.selected[1] = res["data"]["city"];
      //         this.selected[2] = res["data"]["county"];
      //       }
      //   }).catch(error => console.log(error))
      // },
      Ping(){
		    // ping服务端
        let _this = this;
        let param = {};
        if (this.IsPing === 1) {
          ajax.get("/api/v1/ping", {params: param}).then(function (res) {
            let data = res.data;
            if (data.code === 200) {
              console.log(data);
              if (_this.Flag === 0) {
                _this.Flag = 1;
                _this.Version = data["data"];
                console.log("_this.Version: ", _this.Version);
              }
              if (_this.Flag === 1) {
                if (_this.Version !== data["data"]) {
                  _this.Version = data["data"];
                  _this.$message.success("更新成功！" + data["data"]);
                  _this.IsPing = 0;
                }
              }
            }
          });
        }
      },
      getCurrentTime() {
        //获取当前时间并打印
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        this.CurrTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
      },
    },
	}
</script>

<style scoped>
.ss-main{
  width: 100%;
  height: 100%;
}
  .sys-top{
    width: 100%;
    height: 78%;
    border-bottom: 1px solid #8adeff;
  }
  .sys-option{
    width: 100%;
    height: 20%;
  }
  .datetime-div{
    width: 49.5%;
    height: 100%;
    float: left;
    border-right: 1px solid #8adeff;
  }
  .system-info-div{
    width: 50%;
    height: 100%;
    float: right;
  }
  .system-icon{
    width: 15%;
    height: 70%;
    float: left;
    border: 1px solid #8adeff;
    margin-left: 15%;
    margin-top: 4%;
  }
  .system-icon:hover{
    background: rgba(29, 57, 63, 0.5);
  }
  .icon-div{
    width: 40%;
    height: 45%;
    background: #0a640a;
    left: 30%;
    top: 20%;
  }
  .icon-span{
    width: 100%;
    height: 30%;
    top: 20%;
    /*background: #0a640a;*/
    /*display: table;*/
    /*text-align: center;*/
  }
  .span{
    width: 60%;
    height: 70%;
    left: 20%;
    top: 25%;
    background: none;
    color: #8adeff;
    border: 1px solid #8adeff;
    cursor: pointer;
  }
  .span:hover{
    background: rgba(70, 113, 130, 0.5);
  }

  h4{
    left: 3%;
    top: 2%;
  }
  .name-input-show{
    width: 100%;
    height: 9%;
    margin-top: 1.5%;
    font-size: 0.9vw;
  }
  .input-name{
    width: 20%;
    height: 100%;
    float: left;
    display: table;
    text-align: center;
  }
  .input-name span{
    display: table-cell;
    vertical-align: middle;
  }
  .input-el{
    width: 80%;
    height: 100%;
    float: left;
    display: table;
  }
  .input-el span{
    display: table-cell;
    vertical-align: middle;
  }
  .save-info{
    width: 15%;
    height: 80%;
    left: 42.5%;
    border-radius: 5px;
    border: 1px solid #8adeff;
    background: none;
    color: #8adeff;
    cursor: pointer;
  }
  .save-info:hover{
    background: rgba(9, 142, 22, 0.5);
  }
 
  .input-el >>> .area-cascader-wrap {
    background-size: 100% 100%;
    outline: none;
    color: rgb(32, 165, 206);
    border: none;
}

  .save-button {
  display:block;
  margin:0 auto;
}
</style>
