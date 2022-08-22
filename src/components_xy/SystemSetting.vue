<template>
  <div class="ss-main">
    <div class="sys-top">
      <div class="datetime-div">
        <h4>基础配置</h4>
        <div class="name-input-show">
          <div class="input-name"><span>设备名称：</span></div>
          <div class="input-el"><el-input v-model="eq_name" style="width: 70%;"/></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>设备编码：</span></div>
          <div class="input-el"><el-input v-model="eq_code" style="width: 70%;"/></div>
        </div>
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
          <div class="input-el"><span>AOX0x00051201000</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>软件版本：</span></div>
          <div class="input-el"><span>AIBOX-GAS@AGW.release.1.0.0-20220414.agw</span></div>
        </div>
        <div class="name-input-show">
          <div class="input-name"><span>运行时间：</span></div>
          <div class="input-el"><span>2022-04-14 10:37:45</span></div>
        </div>
        <div class="name-input-show">
          <button class="save-info">保存</button>
        </div>
      </div>
      <div class="system-info-div">
        <h4>时间配置</h4>
        <div class="name-input-show">
          <div class="input-name"><span>系统时间：</span></div>
          <div class="input-el"><span>2022-04-14 10:37:45</span></div>
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
<!--            </div>-->
          </div>
        </div>
        <div class="name-input-show">
          <button class="save-info">保存</button>
        </div>

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
            url: '/api/v1/setting/update',
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
        value3: ""
      }
    },
    methods : {
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
        BatchesAdd(formData).then(function (res) {
            let data = res.data;
            if (data.code === 2200){
                console.log(data);
                _this.$refs.fileInput.value='';
            }
        });
      }
    }
	}
</script>

<style scoped>
.ss-main{
  width: 100%;
  height: 100%;
}
  .sys-top{
    width: 100%;
    height: 60%;
    border-bottom: 1px solid #8adeff;
  }
  .sys-option{
    width: 100%;
    height: 38%;
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
    width: 20%;
    height: 70%;
    float: left;
    border: 1px solid #8adeff;
    margin-left: 9%;
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
    height: 10%;
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
</style>
