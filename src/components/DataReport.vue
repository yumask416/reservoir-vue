<template>
    <div id="main">

        <div id="report_pattern"> 
            <div id="socket_pattern">
                <h3 style="left:1%">云端HTTP模式
                    <!-- <el-switch
                        v-model="socket_button"
                        class="mt-2"
                        style="left:2%"
                        inline-prompt
                    /> -->
                </h3> 
                <div ip="socket_report_addr" class="d_cell">
                    <span>推送地址:</span>
                    <div class="d_input" >
                        <!-- <el-input v-model="ws_input" placeholder="ws://ip:port/url" /> -->
                        <el-input v-model="ws_input" placeholder="http://ip:port/url" />
                    </div>
                    <div class="d_button">
                        <el-button type="primary" @click="WsCheck">网络检测</el-button>
                    </div>
                </div>
                    <!-- <div ip="socket_img_data" class="d_cell">
                        <span>上传图片数据:</span>
                        <div class="d_input" >
                            <el-radio v-model="socket_radio" label="1" size="large">开启</el-radio>
                            <el-radio v-model="socket_radio" label="2" size="large">关闭</el-radio>
                        </div>
                    </div> -->
            </div>
            <div id="http_pattern">
                <h3 style="left:1%">转发HTTP模式
                    <!-- <el-switch
                        v-model="http_button"
                        class="mt-2"
                        style="left:2%"
                        inline-prompt
                    /> -->
                </h3>
                <div ip="http_report_addr" class="d_cell">
                    <span>推送地址:</span>
                    <div class="d_input" >
                        <!-- <el-input v-model="http_input" placeholder="http(s)://ip:port/url" /> -->
                        <el-input v-model="http_input" placeholder="http://ip:port/url" />
                    </div>
                    <div class="d_button">
                        <el-button type="primary" @click="HttpCheck">网络检测</el-button>
                    </div>
                </div>
                <!-- <div ip="http_img_data" class="d_cell">
                    <span>上传图片数据:</span>
                    <div class="d_input" >
                        <el-radio v-model="http_radio" label="1" size="large">开启</el-radio>
                        <el-radio v-model="http_radio" label="2" size="large">关闭</el-radio>
                    </div>
                </div> -->
                <!-- <div ip="http_pdf_report" class="d_cell">
                    <span>PDF URL:</span>
                    <div class="d_input" >
                        <el-input v-model="pdf_input" placeholder="http(s)://ip:port/url" />
                    </div>
                    <div class="d_button">
                        <el-button type="primary" >网络检测</el-button>
                    </div>
                </div> -->
                <!-- <div ip="http_pdf_data" class="d_cell">
                    <span>上传PDF数据:</span>
                    <div class="d_input" >
                        <el-radio v-model="pdf_radio" label="1" size="large">开启</el-radio>
                        <el-radio v-model="pdf_radio" label="2" size="large">关闭</el-radio>
                    </div>
                </div> -->
            </div>
        </div>

        <div id="report_config">
            <!-- <div id="http_alive">
                <h3 style="left:1%">HTTP/HTTPS保活
                    <el-switch
                        v-model="alive_button"
                        class="mt-2"
                        style="left:2%"
                        inline-prompt
                    />
                </h3> 
                <div ip="http_alive_addr" class="d_cell">
                    <span>推送地址:</span>
                    <div class="d_input" >
                        <el-input v-model="alive_input" placeholder="http(s)://ip:port/url" />
                    </div>
                    <div class="d_button">
                        <el-button type="primary" >网络检测</el-button>
                    </div>
                </div>
                <div ip="alive_time" class="d_cell">
                    <span>保活时间:</span>
                    <div class="d_input">
                        <el-input-number
                            v-model="alive_num"
                            :min="1"
                            :max="50"
                            controls-position="right"
                            @change="handleChange"
                        />
                    </div><span>秒</span>
                </div>
            </div> -->
            <!-- <div id="report_interval">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="camera_name" label="摄像头名称" width="180" />
                    <el-table-column label="上传时间间隔(min)" width="180">
                        <template #default="scope">
                            <el-input-number v-model="scope.row.report_interval" :min="1" :max="30" @change="handleChange" />
                        </template>
                    </el-table-column>
                    <el-table-column label="间隔使用">
                        <template #default="scope">
                            <el-switch v-model="scope.row.use_interval" class="mt-2" style="left:2%" inline-prompt />
                        </template>
                    </el-table-column>  
                </el-table>
            </div> -->
        </div>
        <div id="report_set_save">
            <el-button id="save_button" type="primary" size="large" @click="Save">保存</el-button>
        </div>
    </div>
</template>

<script>
import * as API from '@/api/system/';
import axios from 'axios'
import { Collapse, Notification } from 'element-ui';

    export default {
        data() {
            return {
                socket_button: false,
                http_button: false,
                alive_button:false,
                socket_radio: "2",
                http_radio: "2",
                pdf_radio:"2",
                alive_num: 1,
                tableData: [
                    {
                        camera_name: 'IPC1',
                        report_interval: 10,
                        use_interval: false,
                    },{
                        camera_name: 'IPC2',
                        report_interval: 10,
                        use_interval: false,
                    },{
                        camera_name: 'IPC3',
                        report_interval: 10,
                        use_interval: false,
                    },{
                        camera_name: 'IPC4',
                        report_interval: 10,
                        use_interval: false,
                    },{
                        camera_name: 'IPC5',
                        report_interval: 10,
                        use_interval: false,
                    },
                    
                ],
                ws_input: "",
                http_input: "",
            }
        },
        mounted() {
            this.GetUrlInfo();
        },
        methods: {
            // 提示弹窗
            notify: function (title,msg,err_type) {
                Notification({title: title, message: msg, type: err_type});
            },
            GetUrlInfo() {
                let _this = this
                var data = {}
                API.DeviceInfo(data).then((res) => {
                    if(res["code"] == "2200"){
                        console.log(res)
                        _this.ws_input = res["data"]["cloud_addr"]
                        _this.http_input = res["data"]["user_event_forward_url"]
                        this.$forceUpdate()
                    } else {
                        console.log("获取上报地址失败!")
                    }
                }).catch(error => console.log(error))
            },
            Save() {
                var data =  {
                    cloud_addr: this.ws_input,
                    user_event_forward_url: this.http_input,
                }
                API.UpDate(data).then((res) => {
                    if(res["code"] == "2200"){
                        this.GetUrlInfo()
                        this.notify("成功",res["msg"],"success")
                    } else {
                        this.notify("配置错误",res["msg"],"error")
                    }
                }).catch(error => console.log(error))

            },
            UrlTest(url) {
                axios
                    .post(url)
                    .then((res) => {
                        console.log(res)
                        this.notify("成功", "网络测试成功","success")
                    })
                    .catch((error) => {
                        try {
                            console.log(error.response.status)
                            if (error.response.status === 500) {
                                this.notify("成功", "网络测试成功","success")
                            } else {
                                this.notify("失败", "网络测试失败","error")
                            }
                        } catch (e) {
                            console.log("error:", error.toString())
                            if (error.toString().indexOf('Error: Network Error') !== -1) {
                                this.notify("失败", "网络请求错误","error")
                
                            } else {
                                this.notify("失败", "网络测试失败","error")
                            }
                        }
                    })
            },
            WsCheck() {
                this.UrlTest(this.ws_input)
            },
            HttpCheck() {
                this.UrlTest(this.http_input)
            }
        },
    }
</script>

<style scoped>
#main {
    width: 95%;
    height: 92%;
    position: relative;
    left: 2%;
    top: 3%;
    /* background: #f00056; */
}

#report_pattern {
    width: 50%;
    height: 92%;
    /* background: #44cef6; */
    float: left;
}
#report_config {
    width: 50%;
    height: 92%;
    /* background: aqua; */
    float: left;
}

#socket_pattern {
    width: 90%;
    height: 25%;
    /* background: blue; */
    left: 2%;
    top: 2%;
    display: table;
}

#http_pattern {
    width: 90%;
    height: 50%;
    /* background: blue; */
    left: 2%;
    margin-top: 10%;
    display: table;
}

#http_pattern .d_cell {
    height: 10%;
}

.d_cell{
    width: 100%;
    height: 20%;
    display: table-cell;
    /* background: red; */
    float: left;
    left: 2%;
    top: 10%;
    margin-top: 5%;
}
.d_cell span{
    width:18%;
    height: 100%;
    float: left;
    left: 1%;
    position: relative;
    top: 25%;
    font-size: 92%;
}
.d_input{
    width: 50%;
    float: left;
    left: 10%;
}
.d_button{
    width: 20%;
    float: left;
    left: 11%;
}

#http_alive {
    width: 90%;
    height: 25%;
    /* background: blue; */
    left: 2%;
    top: 2%;
    display: table;
}

#report_interval{
    width: 98%;
    height: 50%;
    /* background: blue; */
    left: 2%;
    margin-top: 10%;
    display: table;
}

/*设置table的背景色*/
#report_interval >>> .el-table .el-table__expanded-cell {
    background: rgba(32, 160, 199, 1);
}

#report_interval >>> .el-table th, .el-table tr {
    background: rgba(32, 160, 199, 1);
    color: #8adeff;
}

#report_set_save {
  width: 100%;
  height: 8%;
  float: left;
  /* background: red; */
}
#save_button {
  display:block;
  margin:0 auto;
}
</style>