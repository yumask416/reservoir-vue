<template>
    <div id="main">
        <div id="IndexMain">
            <div id="div_title">
                <div class="title_cell_div">
                    <label>事件:
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="state"
                            :fetch-suggestions="querySearch"
                            @select="handleSelect">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                            </template>
                        </el-autocomplete>
                    </label>
                </div>
                <div class="title_cell_div">
                    <label>摄像头:
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="state2"
                            :fetch-suggestions="querySearch2"
                            @select="handleSelect2">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                            </template>
                        </el-autocomplete>
                    </label>
                </div>
                <div class="title_cell_div">
                    <label>姓名:
                        <el-input v-model="inputName"></el-input>
                    </label>
                </div>
                <div class="title_cell_div">
                    <label>
                        <el-button type="primary" plain @click="query">查询</el-button>
                    </label>
                </div>
            </div>
            <div id="div_show">
                <div id="event_show">
                    <div id="table_show">
                        <table id="table_1">
                            <thead id="thead_1">
                                <tr>
                                    <th>底库</th>
                                    <th>图片</th>
                                    <th>姓名</th>
                                    <th>摄像头</th>
                                    <th>事件</th>
                                    <th>ID</th>
                                    <th>日期</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_1">
                                <tr v-for="faceData,index in dataList" :key="index" @click="information(faceData)">
                                    <td v-if="faceData['Picture'] != ''">
                                        <!-- <img v-bind:src='"http://10.10.10.121:3000/" + faceData["Picture"]' class="event_img" alt="">  -->
                                        <img v-bind:src='"/" + faceData["Picture"]' class="event_img" alt="">
                                        <!-- <input class="orgImgPath" v-bind:value='faceData["OriginImagePath"]' style="display: none" /> -->
                                    </td>
                                    <td v-else-if="faceData['Picture'] == ''">
                                        <!-- <img src='../../static/images/no_face.png' class="event_img" alt="">  -->
                                        <img src='/static/images/no_face.png' class="event_img" alt="">
                                        <!-- <input class="orgImgPath" v-bind:value='faceData["OriginImagePath"]' style="display: none" /> -->
                                    </td>
                                    <td>
                                        <!-- <img v-bind:src='"http://10.10.10.121:3000/" + faceData["ImagePath"]' class="event_img" alt="">  -->
                                        <img v-bind:src='"/" + faceData["ImagePath"]' class="event_img" alt="">
                                        <input class="orgImgPath" v-bind:value='faceData["OriginImagePath"]' style="display: none" />
                                    </td>
                                    <td>{{ faceData["UserName"] }}</td>
                                    <td>{{ faceData["CameraName"].split("%")[0] }}</td>
                                    <td>{{ faceData["EventType"] }}</td>
                                    <td>{{ faceData["TrackId"] }}</td>
                                    <td>{{ faceData["Timestamp"] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="picture_show">
                    <h3>记录图片</h3>
                    <div id="big_pic_show" @dblclick="dblclick">
                        <!-- <img v-bind:src='"http://10.10.10.121:3000/" + infoList["img_path"]' id="big_pic" alt=""> -->
                        <canvas id="Area" class="aaaa"></canvas>
                    </div>
                    <!-- <img v-bind:src='"http://10.10.10.121:3000/" + infoList["img_path"]' style="display:none" id="big_pic2"> -->
                    <img v-bind:src='"/" + infoList["img_path"]'  style="display:none" id="big_pic2">
                    <h3 style="top: 5%">详细信息</h3>
                    <div id="det_info">
                        <table class="table_2">
                            <tbody class="tbody_2">
                                <!-- <tr>
                                    <td class="tdName" id="name">姓名</td>
                                    <td class="tdName">{{ infoList["UserName"] }}</td>
                                    <td class="tdName" id="score">分数</td>
                                    <td class="tdName">{{ infoList["score"] }}</td>
                                </tr> -->
                                <tr>
                                    <td class="tdName" id="camera_name">摄像头</td>
                                    <td class="tdName">{{ infoList["camera_name"] }}</td>
                                    <td class="tdName" id="startTime">开始时间</td>
                                    <td class="tdName">{{ infoList["startTime"] }}</td>
                                </tr>
                                <tr>
                                    <td class="tdName" id="eventType">事件类型</td>
                                    <td class="tdName">{{ infoList["eventType"] }}</td>
                                    <td class="tdName" id="endTime">结束时间</td>
                                    <td class="tdName">{{ infoList["endTime"] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="FPageButton">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="params.page"
                    :page-size="params.pageSize"
                    background
                    layout="prev, pager, next"
                    :total="total" id="PagingDiv">
                </el-pagination>
            </div>
        </div>
        <div id="content_Popup">
            <div class="Info_show">
                <div class="Info_img">
                    <!-- <img :src="'http://10.10.10.30:3000/' + Infoimg_path" alt="" style="width:100%;height:100%;"> -->
                    <img :src="'/' + infoList['img_path']" alt="" style="width:100%;height:100%;">
                </div>
                <div class="Info_text">
                    <div class="Popup_info">
                        <h3>事件详情</h3>
                        <div class="Popup_text">设备：{{ infoList["camera_name"] }}</div>
                        <div class="Popup_text">类型：{{ infoList["eventType"] }}</div>
                        <!-- <div class="Popup_text">姓名：{{ infoList["UserName"] }}</div>
                        <div class="Popup_text" v-if="infoList['AisleNum'] != 0">人数：{{ infoList['AisleNum'] }}</div> -->
                        <div class="Popup_text">时间：{{ infoList["startTime"] }}</div>
                    </div>
                    <div class="Popup_button">
                        <el-button type="success" plain  @click="ExitDiv">确定</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from "axios"
// import * as API from '@/api/Event/';
import { Notification } from 'element-ui';

export default ({
    data(){
        return{
            total:10,
            params:{page:1, pageSize:10},
            restaurants: [],
            state: '',
            restaurants2: [],
            state2: '',
            dataList:[],
            inputName:'',
            infoList:{
                img_path:'',
                UserName:'undefined',
                score:'88',
                camera_name:'ipc 11',
                startTime:'15:33:66',
                eventType:'人脸识别',
                endTime:'15:35:33'
            },
            Ipc_name:[{ "value": "全部" }],
            camera_id:"",
            cameraid_list:["全部"],
            IP_List:[{ "value": "全部" }],
            camera_IP:"",
            Info_content:{},
        }
    },
    mounted:function(){
        this.restaurants = this.loadAll();
        this.restaurants2 = this.loadAll2();
        var form = this.params;
        this.state = "";
        this.state2 = "";
        this.inputName = "";
        // API.getEvent(form).then((res) => {
        //     this.dataList = res["data"]["list"]
        //     this.total = res["data"]["total"]
        //     if(res["data"]["pageSize"]!=0){
        //     }
        // })
    },
    methods:{
        read_list(){
            this.restaurants = this.loadAll();
            this.restaurants2 = this.loadAll2();
            var form = this.params
            this.state = ""
            this.state2 = ""
            this.inputName = ""
            // API.getEvent(form).then((res) => {
            //     this.dataList = res["data"]["list"]
            //     this.total = res["data"]["total"]
            //     if(res["data"]["pageSize"]!=0){
            //         this.params.pageSize = res["data"]["pageSize"]
            //     }
            // })
        },
        notify: function (title,msg,err_type) {
            Notification({title: title, message: msg, type: err_type});
        },
        handleSizeChange(val) {
            // console.log('每页' + val + '条');
        },
        handleCurrentChange(val) {
            // console.log('当前页: ' + val)
            this.params.page = val
            if(this.camera_id == ""){
                axios.get('/api/v1/event/list',{params:{"events": this.state, "cameras": this.state2, "names": this.inputName, "page":this.params.page,"pageSize":this.params.pageSize}}).then((res) => {
                    if(res["data"]["code"] === 2200){
                        if (res["data"]["pageSize"] === 0) {
                            return false;
                        }
                        this.dataList = res["data"]["data"]["list"]
                        this.total = res["data"]["data"]["total"]
                        if(res["data"]["pageSize"]!=0){
                            this.params.pageSize = res["data"]["pageSize"]
                        }
                    }
                })
            }else {
                // var data = { "events": this.state, "cameras": this.state2, "names": this.inputName }
                axios.get('/api/v1/event/list',{params:{"events": this.state, "camera_id": this.camera_id, "names": this.inputName, "page":this.params.page,"pageSize":this.params.pageSize}}).then((res) => {
                    if(res["data"]["code"] === 2200){
                        if (res["data"]["pageSize"] === 0) {
                            return false;
                        }
                        this.dataList = res["data"]["data"]["list"]
                        this.total = res["data"]["data"]["total"]
                        if(res["data"]["pageSize"]!=0){
                            this.params.pageSize = res["data"]["pageSize"]
                        }
                    }
                })
            }
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch2(queryString, cb) {
            var restaurants = this.restaurants2;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        createFilter2(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                // "A01": "人脸抓拍",
                // "A02": "特定姿态识别",
                // "A03": "火焰识别",
                // "A04": "爬围墙识别",
                // "A05": "入侵检测",
                // "A06": "过道拥挤",
                // "A07": "物品乱放识别",
                // "A08": "口罩识别",
                // "A09": "入侵检测-隧道",
                // "A10": "盒子跌落",
                // "A11": "停车",
                // "A12": "车牌识别",
                // "A13":"危险区域识别",
                // "A14":"低头玩手机行为识别",
            { "value": "全部" },
            // 安防2.0
            // { "value": "人脸抓拍" },
            // { "value": "特定姿态识别" },
            // { "value": "火焰识别" },
            // { "value": "爬围墙识别" },
            // { "value": "入侵检测" },
            // { "value": "过道拥挤" },
            // { "value": "物品乱放识别" },
            // { "value": "口罩识别" },
            // { "value": "入侵检测-隧道" },
            // { "value": "停车" },
            // { "value": "车牌识别" },
            // 安井
            { "value": "危险区域识别" },
            { "value": "低头玩手机行为识别" },
            { "value": "安全帽识别" },
            { "value": "行人不走斑马线" },
            { "value": "人数统计" },
            { "value": "防毒面具" },
            ];
        },
        loadAll2() {
            this.Ipc_name = [{ "value": "全部" }]
            axios.get('/api/v1/camera/namelist').then((res) => {
                if(res["data"]["code"] == 2200){
                    for(let i = 0; i < res["data"]["data"]["total"]; i++){
                        var name = res["data"]["data"]["list"][i]["Name"]
                        var nameId = res["data"]["data"]["list"][i]["CameraId"]
                        var camera_IP = res["data"]["data"]["list"][i]["Ip"]
                        this.Ipc_name.push({"value":name})
                        this.IP_List.push({"value":camera_IP})
                        this.cameraid_list.push(nameId)
                    }
                }
            });
            return this.Ipc_name
        },
        handleSelect(item) {
            // console.log(item.value);
        },
        handleSelect2(item) {
            this.camera_IP = this.IP_List[this.Ipc_name.indexOf(item)]
            this.camera_id = this.cameraid_list[this.Ipc_name.indexOf(item)]
        },
        query(){
            if(this.camera_id == ""){
                var data = { "events": this.state, "cameras": this.state2, "names": this.inputName }
            }else {
                var data = { "events": this.state, "camera_id": this.camera_id, "names": this.inputName }
            }
            // API.query(data).then((res) => {
            //     if(res['code'] === 2200){
            //         if (res["data"]["pageSize"] === 0) {
            //             this.notify("提示","没有找到相关信息！","info")
            //             return false;
            //         }
            //         this.dataList = res['data']["list"]
            //         this.total = res["data"]["total"]
            //         if(res["data"]["pageSize"]!=0){
            //             this.params.pageSize = res["data"]["pageSize"]
            //             this.params.page = 1
            //         }
            //     }else{
            //         this.notify("提示","没有找到相关信息！","info")
            //         return false;
            //     }
            // }).catch(error => console.log(error))
        },
        information(data){
            var list2 = data
            this.infoList.img_path = list2["OriginImagePath"]
            this.infoList.UserName = list2["UserName"]
            this.infoList.camera_name = list2["CameraName"].split("%")[0]
            this.infoList.startTime = list2["Timestamp"]
            this.infoList.eventType = list2["EventType"]
            this.infoList.endTime = list2["Timestamp"]
            $("#big_pic_show").css({
                // "background": "url(" + "http://10.10.10.121:3000/" + list2["OriginImagePath"] + ") no-repeat",
                "background": "url(/" + list2["OriginImagePath"] + ") no-repeat",
                "background-size": "100% 100%"
            });
            var Box = list2["Box"]
            // 画框
            setTimeout(this.draw, 100, Box);
        },
        // 画框
        draw(Box) {
            var canvas = document.getElementById("Area");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height, 1);
            var BoxList = Box.split(",")
            var wNum = canvas.width / parseInt($("#big_pic2").width())
            var hNum = canvas.height / parseInt($("#big_pic2").height())
            var x = parseInt(parseInt(BoxList[0]) * wNum)
            var y = parseInt(parseInt(BoxList[1]) * hNum)
            var w = parseInt(parseInt(BoxList[2]) * wNum)
            var h = parseInt(parseInt(BoxList[3]) * hNum)
            var canvas = document.getElementById("Area");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height, 1);
            context.strokeStyle = "red";
            context.lineWidth = 0.5;
            context.strokeRect(x, y, w, h);
        },
        ExitDiv(){
            $("#content_Popup").css("display", "none");
        },
        // 双击放大
        dblclick(){
            $("#content_Popup").css("display", "block");
        },
    },

})
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
#IndexMain {
    width: 99%;
    height: 99%;
}

#div_title {
    width: 100%;
    height: 10%;
    color: rgb(32, 165, 206);
    ;
}

#div_show {
    width: 100%;
    height: 85%;
    overflow: hidden;
}

#event_show {
    width: 59%;
    height: 100%;
    display: inline-block;
    float: left;
}

#picture_show {
    width: 40%;
    height: 100%;
    display: inline-block;
    float: right;
}

#table_show {
    width: 98%;
    height: 96%;
    border: 1px solid rgba(32, 165, 206, 0.6);
    border-radius: 1%;
    position: relative;
    top: 2%;
    left: 1%;
    overflow-y: auto;
}

#table_1 {
    width: 100%;
    border-collapse: collapse;
}

#thead_1 tr {
    border-bottom: 1px solid rgba(32, 165, 206, 0.6);
    color: rgb(32, 165, 206);
}

.event_color_1 {
    border-bottom: 1px solid rgba(32, 165, 206, 0.6);
    color: rgb(32, 165, 206);
}

.event_color_2 {
    border-bottom: 1px solid rgba(32, 165, 206, 0.6);
    color: rgb(206, 32, 38);
}

#tbody_1 tr:hover {
    background: rgba(26, 83, 114, 0.6);
}

#tbody_1 tr td {
    width: 16.66%;
    align-content: center;
    text-align: center;
    cursor: default;
}

.unFace,
.event_img {
    width: 90px;
    height: 90px;
    position: relative;
    margin: 0 auto;
    border-radius: 10px;
}

.event_img {
    top: 2px;
}

.unFace svg {
    width: 50%;
    height: 50%;
    position: relative;
    top: 22%;
}

h3 {
    color: rgb(32, 165, 206);
    position: relative;
    top: 1%;
    left: 2%;
}

#big_pic_show {
    width: 96.5%;
    height: 62.6%;
    border: 1px solid rgba(32, 165, 206, 0.6);
    position: relative;
    top: 3%;
}

#big_pic {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}
#Area {
    width: 100%;
    height: 100%;
}

#det_info {
    width: 96.5%;
    height: 20%;
    position: relative;
    top: 6%;
    color: rgb(32, 165, 206);
    ;
}

.table_2 {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
}


.tbody_2 tr td {
    text-align: center;
    border: 1px solid rgba(32, 165, 206, 0.6);
}

.title_cell_div {
    width: 15%;
    height: 100%;
    float: left;
    position: relative;
}
.title_cell_div button {
    position: relative;
    background:rgba(0, 0, 0, 0.4);
    color: rgb(32, 165, 206);
    border: 1px solid rgba(32, 165, 206, 0.6);
}

.title_cell_div label {
    position: relative;
    top: 35%;
    left: 5%;
}

.title_cell_div label input {
    width: 40%;
    height: 60%;
    position: relative;
    z-index: 2;
    left: 5%;
    top: -1%;
    outline: none;
    text-indent: 5px;
    border: 1px solid rgba(32, 165, 206, 0.6);
    border-radius: 5px;
    color: rgb(32, 165, 206);
    background-color: black;
}

.el-autocomplete {
    width: 60%;
    height: 60%;
    top: -1%;
}
.el-input {
    width: 60%;
    height: 80%;
}
.title_cell_div >>>.el-input__inner {
    color: rgb(32, 165, 206);
    background-color: black;
    border: 1px solid rgba(32, 165, 206, 0.6);
}


#event_select_dev,
#camera_select_dev {
    width: 60%;
    position: absolute;
    z-index: 5;
    left: 31.5%;
    top: 100%;
    border: 1px solid rgba(32, 165, 206, 0.6);
    border-radius: 5px;
    display: none;
    background-color: black;
}

#camera_select_dev {
    left: 40%;
}

.eve_sel,
.camera_sel {
    width: 100%;
    height: 30px;
    position: relative;
    text-indent: 10px;
    line-height: 30px;
    border-bottom: 1px solid rgba(32, 165, 206, 0.6);
    font-size: 13px;
    cursor: pointer;
}

.eve_sel:hover,
.camera_sel:hover {
    background: rgba(32, 165, 206, 0.6);
}

.hidden_td {
    display: none;
}
#FPageButton {
    width: 100%;
    height: 5%;
    text-align: center;
}

#PagingDiv {
    width: 100%;
    height: 60%;
}

/*详细信息弹窗 */
    #content_Popup {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        display: none;
    }
    .Info_show {
        width: 90%;
        height: 100%;
        position: relative;
        /* top: 6%;
        left: 8%; */
        border-radius: 10px 10px 10px 10px;
	    background: rgba(24, 61, 76, 0.9);
        border: 2px solid rgba(32, 165, 206, 0.6);
    }
    .Info_img {
        width: 80%;
        height: 80%;
        top: 10%;
        position: relative;
        float: left;
        border-top: 2px solid rgba(32, 165, 206, 0.6);
        border-bottom: 2px solid rgba(32, 165, 206, 0.6);
    }
    .Info_text {
        width: 19.5%;
        height: 100%;
        position: relative;
        float: left;
        border-left: 2px solid rgba(32, 165, 206, 0.6);
    }

    .Popup_info {
        width: 100%;
        height: 59.5%;
        top: 10%;
        position: relative;
        float: left;
        border-top: 2px solid rgba(32, 165, 206, 0.6);
        border-bottom: 2px solid rgba(32, 165, 206, 0.6);
    }

    .Popup_button {
        width: 100%;
        height: 20%;
        top: 10%;
        position: relative;
        float: left;
        /* background: rgb(25, 90, 90);  */
        border-bottom: 2px solid rgba(32, 165, 206, 0.6);
    }
    .Popup_button button {
        position: relative;
        top: 20%;
        left: 25%;
        background: rgba(0, 0, 0, 0.4);
        color: rgb(32, 165, 206);
        border: 1px solid rgba(32, 165, 206, 0.6);
    }

    .Popup_text {
        position: relative;
        width: 80%;
        height: 18%;
        left: 8%;
    }


/*重写element分页样式*/
#FPageButton >>> button,
#FPageButton >>> .el-pager li{
  background-color: transparent !important;
  color: #B4C2DC !important;
  border: 1px solid #0672C4;
}
#FPageButton >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0672C4 !important;
}
/* 滑动条 */
    ::-webkit-scrollbar {width:5px;height:5px;position:absolute}
    ::-webkit-scrollbar-thumb {background-color:#5bc0de}
    ::-webkit-scrollbar-track {background-color: #053039}

</style>
