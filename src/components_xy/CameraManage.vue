<template>
  <div class="main">
    <div class="config-div">
        <div class="p-div" id="p_div">
            <div class="exit-div">
                <div id="exit-preview" @click="ExitConfig">
                    <span>X</span>
                </div>
            </div>
            <div class="camera-show-div" id="camera_show_div">
                <div class="camera-img">
                    <img src="/static/images/background.png" alt="" width="100%" height="100%">
                </div>
                <div class="camera-canvas" id="camera_canvas">
                    <canvas class="canvas" id="people_area"></canvas>
                    <canvas class="canvas" id="cellphone_area"></canvas>
                    <canvas class="canvas" id="smoking_area"></canvas>
                    <canvas class="canvas" id="fire_area"></canvas>
                    <canvas class="canvas" id="smoke_area"></canvas>
                    <canvas class="canvas" id="extinguisher_area"></canvas>
                </div>
            </div>
            <div class="param-div">
                <div class="radio-div">
                    <label class="radio-input"><input type="radio" class="radio" name="ai" value="1" @click="RadioClick(1)">人员离岗</label>
                    <label class="radio-input"><input type="radio" class="radio" name="ai" value="2" @click="RadioClick(2)">打电话</label>
                    <label class="radio-input"><input type="radio" class="radio" name="ai" value="3" @click="RadioClick(3)">抽烟</label>
                    <label class="radio-input"><input type="radio" class="radio" name="ai" value="4" @click="RadioClick(4)">明火</label>
                    <label class="not-radio-input"><input type="radio" class="not-radio" name="ai" value="5">烟雾</label>
                    <label class="radio-input"><input type="radio" class="radio" name="ai" value="6" @click="RadioClick(6)">灭火器</label>
                    <label class="not-radio-input"><input type="radio" class="not-radio" name="ai" value="7">静电</label>
                </div>
                <div class="button-div">
                    <!--                <button class="reduction">还原</button>-->
                    <button class="determine" @click="Determine">确定</button>
                </div>
            </div>
        </div>
    </div>

      <div class="show-main">
        <div class="left">
            <div class="left-title">
                <h4>摄像头管理</h4>
            </div>
            <div class="left-main">
                <div class="table-button"></div>
                <div id="table-div" class="table-div">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>名称</th>
                            <th>IP</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-bind:class="{offline:cam['Status'] === 0,online:cam['Status'] === 1,run_ai:cam['Status'] === 2}"
                            v-for="(cam, index) in cam_list" v-bind:key="index">
                            <td>{{ cam["ID"] }}</td>
                            <td>{{ cam["NoteName"] }}</td>
                            <td>{{ cam["IP"] }}</td>
                            <td>{{ CameraAI[cam["AIIndex"]] }}</td>
                            <td>
                                <button v-if="cam['Status'] === 2" class="not_option_button">配置</button>
                                <button v-else class="config tb_button" @click="ClickConfig(cam['ID'])">配置</button>
                                <button v-if="cam['Status'] !== 2" class="not_option_button">还原</button>
                                <button v-else class="reduction tb_button" @click="ReductionCamera(cam['ID'])">还原</button>
                                <button v-if="cam['Status'] === 2" class="not_option_button">删除</button>
                                <button v-else @click="DeleteCamera(cam['ID'])" class="delete tb_button">删除</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-page">
                    <div id="PageDiv"></div>
                </div>
            </div>
        </div>

        <div class="right">
            <div class="right-bottom">
                <div class="right-title">
                    <h4 style="left: 5%">手动添加</h4>
                </div>
                <div class="right-input-div">
                    <label class="r-label">名称：<input id="camera-name" type="text" class="camera-input"
                                                     autocomplete="off" v-model="add_name"></label><br/>
                    <label class="r-label">地址：<input id="camera-addr" type="text" class="camera-input"
                                                     autocomplete="off" v-model="add_addr"></label><br/>
                </div>
                <div class="right-button-div">
                    <button id="add-ok" class="right-button ri-determine" @click="AddCamera">确定</button>
                </div>
            </div>
            <!--        <div class="option-log">-->
            <!--            <div class="log-dev"><span></span></div>-->
            <!--        </div>-->
        </div>
    </div>
  </div>

</template>

<script>
    import ajax from 'axios'
    import $ from 'jquery'

    let CZ_Index = 12;
    let YXCanvas = [1, 2, 3, 4, 5 ,6];        // 运行画框的算法
    // let curr_algorithm = $("#curr_algorithm");
    // let curr_camera = $("#curr_camera");
    let FlagLoad = false;
    let conf_flag = 0;
    let curr_config = null;

    export default {
        name: "CameraManage",
        data() {
            return {
                cam_list: [],
                CameraStatus: ["离线", "在线", "运行算法"],
                CameraAI: ["无算法", "人员离岗", "打电话", "抽烟", "明火", "烟雾", "灭火器", "静电"],
                StatusClass: ["offline", "online", "run_ai"],

                add_name: "204",
                add_addr: "rtsp://admin:A1234567@10.10.10.204:554/stream1",

                curr_algorithm: 0,
                curr_camera: 0,

                CanvasMap: new Map(),
                ContextMap: new Map(),
                CanvasJquery: new Map(),
                ColorMap: new Map(),
                FillMap:new Map(),

                CoordinateArr: [],
            }
        },
        mounted() {
            let PeopleCanvas = document.getElementById("people_area");
            let PeopleCtx = PeopleCanvas.getContext("2d");
            let CellphoneCanvas = document.getElementById("cellphone_area");
            let CellphoneCtx = CellphoneCanvas.getContext("2d");
            let SmokingCanvas = document.getElementById("smoking_area");
            let SmokingCtx = SmokingCanvas.getContext("2d");
            let FireCanvas = document.getElementById("fire_area");
            let FireCtx = FireCanvas.getContext("2d");
            let SmokeCanvas = document.getElementById("smoke_area");
            let SmokeCtx = SmokeCanvas.getContext("2d");
            let ExtinguisherCanvas = document.getElementById("extinguisher_area");
            let ExtinguisherCtx = ExtinguisherCanvas.getContext("2d");

            this.CanvasMap.set(1, PeopleCanvas);
            this.CanvasMap.set(2, CellphoneCanvas);
            this.CanvasMap.set(3, SmokingCanvas);
            this.CanvasMap.set(4, FireCanvas);
            this.CanvasMap.set(5, SmokeCanvas);
            this.CanvasMap.set(6, ExtinguisherCanvas);

            this.ContextMap.set(1, PeopleCtx);
            this.ContextMap.set(2, CellphoneCtx);
            this.ContextMap.set(3, SmokingCtx);
            this.ContextMap.set(4, FireCtx);
            this.ContextMap.set(5, SmokeCtx);
            this.ContextMap.set(6, ExtinguisherCtx);

            this.CanvasJquery.set(1, $("#people_area"));
            this.CanvasJquery.set(2, $("#cellphone_area"));
            this.CanvasJquery.set(3, $("#smoking_area"));
            this.CanvasJquery.set(4, $("#fire_area"));
            this.CanvasJquery.set(5, $("#smoke_area"));
            this.CanvasJquery.set(6, $("#extinguisher_area"));

            this.ColorMap.set(1, "#15e3d3");
            this.ColorMap.set(2, "#9115e3");
            this.ColorMap.set(3, "#e36b15");
            this.ColorMap.set(4, "#FF0000");
            this.ColorMap.set(5, "#f8be00");
            this.ColorMap.set(6, "#1aff00");

            this.FillMap.set(1, "rgba(21,227,211,0.5)");
            this.FillMap.set(2, "rgba(145,21,227,0.5)");
            this.FillMap.set(3, "rgba(227,107,21,0.5)");
            this.FillMap.set(4, "rgba(255,0,0,0.5)");
            this.FillMap.set(5, "rgba(248,190,0,0.5)");
            this.FillMap.set(6, "rgba(26,255,0,0.5)");

            this.Ready();
        },
        methods: {
            Ready(){
                let param = {page: 1, pageSize: 10};
                let _this = this;
                ajax.get("/api/v1/camera/list", {params: param}).then(function (res) {
                    let data = res.data;
                    if (data.code === 2200) {
                        _this.cam_list = data.data.list;
                    }
                })
            },
            // 添加摄像头  rtsp://admin:A1234567@10.10.10.204:554/stream1
            AddCamera() {
                let param = {name: this.add_name, addr: this.add_addr};
                let _this = this;
                ajax.get("/api/v1/camera/add", {params: param}).then(function (res) {
                    let data = res.data;
                    if (data.code === 2200) {
                        console.log(data);
                        _this.Ready();

                    } else {
                        console.log(res);
                    }
                });
                console.log(this.add_name);
            },
            // 还原摄像头
            ReductionCamera(id) {
                if (confirm("确定恢复ID为："+id+" 的摄像头吗？")) {
                    let _this = this;
                    let param = {id: id};
                    ajax.get("/api/v1/camera/reduction", {params: param}).then(function (res) {
                        let data = res.data;
                        if (data.code === 2200) {
                            console.log(data);
                            _this.Ready();
                        }
                    });
                }
            },
            // 删除摄像头
            DeleteCamera(id) {
                if (confirm("确定删除ID为："+id+" 的摄像头吗？")) {
                    let _this = this;
                    let param = {id: id};
                    ajax.get("/api/v1/camera/delete", {params: param}).then(function (res) {
                        let data = res.data;
                        if (data.code === 2200) {
                            console.log(data);
                            _this.Ready();
                        }
                    });
                }
            },

            // 点击配置按钮
            /**
             * @return {boolean}
             */
            ClickConfig(id) {
                if (conf_flag){
                    alert("频繁点击，请稍后再试...");
                    return false;
                }
                conf_flag = 1;
                $("body").css("cursor", "progress");
                let _this = this;
                let param = {"id": id};
                // console.log("config camera id: ", id);
                this.curr_camera = id;

                ajax.get("/api/v1/camera/get_info", {params: param}).then(function (res) {
                    conf_flag = 0;
                    let data = res.data;
                    $('body').css('cursor', 'default');
                    if (data.code === 2200){
                        // console.log(data);
                        $(".config-div").css("display", "block");
                        // $(".camera-img").html('<img src="http://10.10.10.101:4000/'+data["data"]["Image"]+'" alt="" width="100%" height="100%">');
                        $(".camera-img").html('<img src="/'+data["data"]["Image"]+'" alt="" width="100%" height="100%">');
                    }
                });
            },

            // 开始画图
            RadioClick(id) {
                let camera_canvas = document.getElementById("camera_canvas");
                let canvas_w = camera_canvas.offsetWidth;
                let canvas_h = camera_canvas.offsetHeight;

                // console.log();
                // console.log(this.CanvasMap.get(id).offsetWidth);
                for (let i=0; i<YXCanvas.length; i++){
                    // console.log(i);
                    this.ContextMap.get(YXCanvas[i]).clearRect(0, 0, canvas_w, canvas_h);
                }
                this.curr_algorithm = id;
                // 允许画框
                CZ_Index += 1;
                let obj = this.CanvasJquery.get(id);
                // ContextMap.get(id).fillStyle="#FF0000";
                obj.css("z-index", CZ_Index);
                obj.prevAll().css("z-index", 1);
                obj.nextAll().css("z-index", 1);

                obj.css("width", canvas_w+"px");
                obj.css("height", canvas_h+"px");

                this.CoordinateArr = [];
                // 鼠标事件
                // 鼠标按下事件
                let num = 0;
                let Flag = false;
                let prev_x = 0;
                let prev_y = 0;
                let _this = this;
                _this.CanvasMap.get(id).onmousedown = function(event){  // 按下鼠标时，初始化处理
                    // let left = document.getElementById("camera_show_div").offsetLeft;
                    // let top = document.getElementById("camera_show_div").offsetTop;
                    // let left2 = document.getElementById("p_div").offsetLeft;
                    // let top2 = document.getElementById("p_div").offsetTop;
                    let x = event.offsetX;
                    let y = event.offsetY;
                    // let x = event.x - left - left2;
                    // let y = event.y - top - top2;
                    // console.log(x, y, event.x, event.y);
                    if (x >= 0 && x <= canvas_w && y >= 0 && y <= canvas_h) {
                        if (FlagLoad){
                            _this.CoordinateArr = [];
                            FlagLoad = false;
                            num = 0;
                        }
                        if (Flag === false){
                            _this.CoordinateArr = [];
                            num = 0;
                        }
                        if (x && y) {
                            if (x !== prev_x && y !== prev_y) {
                                console.log(456);
                                _this.CoordinateArr[num] = [x, y];
                                prev_x = x;
                                prev_y = y;
                                num += 1;
                                Flag = true;
                            }
                        }
                    }
                };
                _this.CanvasMap.get(id).onmousemove = function (event){
                    if (Flag) {
                        let x = event.offsetX;
                        let y = event.offsetY;
                        // console.log("move: ", x, y);
                        // 画线
                        _this.ContextMap.get(id).clearRect(0, 0, canvas_w, canvas_h);
                        _this.CanvasMap.get(id).width = canvas_w;
                        _this.CanvasMap.get(id).height = canvas_h;
                        _this.ContextMap.get(id).strokeStyle = _this.ColorMap.get(id);
                        if (_this.CoordinateArr.length !== 0) {
                            _this.ContextMap.get(id).moveTo(_this.CoordinateArr[0][0], _this.CoordinateArr[0][1]);
                            if (_this.CoordinateArr.length > 1){
                                for (let i = 1; i < _this.CoordinateArr.length; i++) {
                                    _this.ContextMap.get(id).lineTo(_this.CoordinateArr[i][0], _this.CoordinateArr[i][1]);
                                }
                            }
                        }
                        _this.ContextMap.get(id).lineTo(x, y);
                        _this.ContextMap.get(id).stroke();
                    }
                };
                // 双击
                _this.CanvasMap.get(id).ondblclick = function (event) {
                    let x = event.offsetX;
                    let y = event.offsetY;
                    if (x >= 0 && x <= canvas_w && y >= 0 && y <= canvas_h) {
                        if (x && y) {
                            // CoordinateArr[num] = [x, y];
                            num += 1;
                            _this.ContextMap.get(id).clearRect(0, 0, canvas_w, canvas_h);
                            _this.CanvasMap.get(id).width = canvas_w;
                            _this.CanvasMap.get(id).height = canvas_h;
                            _this.ContextMap.get(id).strokeStyle = _this.ColorMap.get(id);
                            if (_this.CoordinateArr.length !== 0) {
                                _this.ContextMap.get(id).moveTo(_this.CoordinateArr[0][0], _this.CoordinateArr[0][1]);
                                for (let i = 1; i < _this.CoordinateArr.length; i++) {
                                    _this.ContextMap.get(id).lineTo(_this.CoordinateArr[i][0], _this.CoordinateArr[i][1]);
                                }
                            }
                            _this.ContextMap.get(id).lineTo(x, y);
                            _this.ContextMap.get(id).lineTo(_this.CoordinateArr[0][0], _this.CoordinateArr[0][1]);
                            _this.ContextMap.get(id).fillStyle = _this.FillMap.get(id);
                            _this.ContextMap.get(id).closePath();
                            _this.ContextMap.get(id).fill();
                            _this.ContextMap.get(id).stroke();

                            Flag = false;
                        }

                    }
                }
            },

            // 确定配置
            /**
             * @return {boolean}
             */
            Determine() {
                if (this.CoordinateArr.length === 0){
                    alert("请先划区域");
                    return false;
                }
                let camera_canvas = document.getElementById("camera_canvas");
                let canvas_w = camera_canvas.offsetWidth;
                let canvas_h = camera_canvas.offsetHeight;

                console.log(this.CoordinateArr);
                let area = "[";
                let area2 = "";
                for (let i=0; i<this.CoordinateArr.length; i++){
                    if (!isNaN(this.CoordinateArr[i][0])) {
                        if (i === this.CoordinateArr.length - 1) {
                            area += "[" + (this.CoordinateArr[i][0] / canvas_w) + "," + (this.CoordinateArr[i][1] / canvas_h) + "]";
                            area2 += (this.CoordinateArr[i][0] / canvas_w) + "," + (this.CoordinateArr[i][1] / canvas_h);
                        } else {
                            area += "[" + (this.CoordinateArr[i][0] / canvas_w) + "," + (this.CoordinateArr[i][1] / canvas_h) + "],";
                            area2 += (this.CoordinateArr[i][0] / canvas_w) + "," + (this.CoordinateArr[i][1] / canvas_h) + ",";
                        }
                    }
                }
                area += ']';
                for (let i=0; i<YXCanvas.length; i++){
                    this.ContextMap.get(YXCanvas[i]).clearRect(0, 0, canvas_w, canvas_h);
                }
                console.log(area);
                let _this = this;
                let param =  {"area": area, "area2": area2, "algorithm": this.curr_algorithm, "id": this.curr_camera};
                console.log(param);
                ajax.get("/api/v1/camera/config", {params: param}).then(function (res) {
                    let data = res.data;
                    if (data.code === 2200){
                        // console.log(data);
                        $(".config-div").css("display", "none");
                        _this.Ready();
                    } else {
                        console.log("配置失败", res);
                        alert("配置失败");
                    }
                });
            },

            ExitConfig() {
                $(".config-div").css("display", "none");
            },
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        /*cursor: url(/static/images/pointer.png) 8 3, auto !important;*/
        position: relative;

        /*color: #0bc4e9;*/
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        position: absolute
    }

    ::-webkit-scrollbar-thumb {
        background-color: #5bc0de
    }

    ::-webkit-scrollbar-track {
        background-color: #053039
    }

    html, body {
        /*width: 100%;*/
        /*height: 100%;*/
        /*background: url("/static/images/bg.png") no-repeat;*/
        background: rgba(4, 32, 45, 0.91);
        background-size: 100% 100%;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        /*min-width: 1200px;*/
    }

    .main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /*background: rgba(0, 0, 0, 0.5);*/
    }
    .show-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /*background: rgba(0, 0, 0, 0.5);*/
    }

    .left {
        width: 68%;
        height: 100%;
        float: left;
        left: 0.5%;
        overflow: hidden;
    }

    .right {
        width: 31%;
        height: 100%;
        float: right;
        right: 0.5%;
        border-left: 1px solid #5bc0de;
        /*background: #5bc0de;*/
    }

    .left-title {
        width: 100%;
        height: 5%;
        /*fl*/
    }

    h4 {
        /*width: 15%;*/
        font-size: 1.3vw;
        /*left: -50%;*/
        left: 2%;
        top: 35%;
        color: #8adeff;
        /*text-indent: 10px;*/
    }

    .left-main {
        width: 100%;
        height: 95%;
    }

    .table-button, .table-page {
        width: 100%;
        height: 9%;
    }

    .table-div {
        width: 100%;
        height: 82%;
        /*background: antiquewhite;*/
        color: #8adeff;
    }

    .camera-button {
        width: 12%;
        height: 60%;
        background: none;
        outline: none;
        border: 1px solid #5bc0de;
        border-radius: 5px;
        color: #8adeff;
        cursor: pointer;
        top: 20%;
        left: 2%;
    }

    .not_option_button {
        width: 70px;
        height: 35px;
        background: none;
        outline: none;
        border: 1px solid rgba(91, 192, 222, 0.53);
        border-radius: 5px;
        /*color: #8adeff;*/
        /*background: none;*/
        color: rgba(91, 192, 222, 0.53);
        background: rgba(35, 35, 35, 0.51);
        cursor: no-drop;
        /*color: #8adeff;*/
        /*cursor: pointer;*/
    }

    /*analysis*/
    /*#refresh:hover,.config:hover, .analysis:hover, .ri-determine:hover {*/
    /*    background: rgba(0, 128, 0, 0.7);*/
    /*}*/
    .config:hover {
        /*background: rgba(0, 255, 217, 0.67);*/
        background: rgba(0, 128, 0, 0.7);
    }

    .preview:hover {
        background: rgba(0, 123, 255, 0.67);
    }

    .reduction:hover {
        background: rgba(255, 38, 0, 0.67);
    }

    .modify:hover {
        background: rgba(255, 123, 0, 0.67);
    }

    #batch-remove:hover, .delete:hover, .ri-cancel:hover {
        background: rgba(255, 0, 0, 0.71);
    }

    table {
        width: 100%;
    }

    tr {
        height: 50px;
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

    .right-top {
        width: 100%;
        height: 33%;
        border-bottom: 1px solid #5bc0de;
    }

    .right-bottom {
        width: 100%;
        height: 33%;
        border-bottom: 1px solid #5bc0de;
        font-size: 1.3vw;
    }

    .option-log {
        width: 100%;
        height: 66.6%;
        background: #0a640a;
    }

    .right-2-bottom {
        width: 100%;
        height: 33%;
    }

    .right-title {
        width: 100%;
        height: 16%;
        font-size: 1.3vw;
    }

    .right-input-div {
        width: 100%;
        height: 50%;
        /*background: #4d7c8e;*/
    }

    .r-label {
        left: 5%;
        font-size: 1vw;
        color: #8adeff;
    }

    .camera-input {
        width: 70%;
        height: 35%;
        outline: none;
        background: none;
        border: 1px solid #5bc0de;
        border-radius: 5px;
        margin-top: 2%;
        text-indent: 5px;
        font-size: 1vw;
        color: #8adeff;
    }

    .right-button-div {
        width: 100%;
        height: 34%;
        /*background: #053039;*/
    }

    .right-button {
        width: 25%;
        height: 44%;
        top: 10%;
        left: 17%;
        outline: none;
        background: none;
        border: 1px solid #5bc0de;
        border-radius: 5px;
        color: #8adeff;
        cursor: pointer;
    }

    /*------------------------*/

    .preview-div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 9;
        /*font-size: 10vw;*/
        display: none;
        /*align-content: center;*/
    }

    .p-div {
        width: 80%;
        height: 80%;
        background: rgba(4, 32, 45, 1);
        top: 5%;
        left: 5%;
        border: 2px solid #5bc0de;
    }

    .exit-div {
        width: 100%;
        height: 5%;
        /*background: #8adeff;*/
    }

    #exit-preview {
        width: 4%;
        height: 100%;
        /*background: aliceblue;*/
        float: right;
        right: 0.5%;
        /*text-align: center;*/
        display: table;
        font-size: 1.2vw;
        color: #8adeff;
    }

    #exit-preview span {
        display: table-cell;
        vertical-align: middle;
    }

    #exit-preview:hover {
        font-size: 1.3vw;
        color: red;
    }

    .camera-show-div {
        width: 94%;
        height: 90%;
        left: 3%;
        background: black;
    }

    .config-div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 9;
        /*font-size: 10vw;*/
        display: none;
        /*align-content: center;*/
    }

    .p-div {
        width: 80%;
        height: 90%;
        background: rgba(4, 32, 45, 1);
        top: 2%;
        left: 5%;
        border: 2px solid #5bc0de;
    }

    .exit-div {
        width: 100%;
        height: 5%;
        /*background: #8adeff;*/
    }

    #exit-preview {
        width: 4%;
        height: 100%;
        /*background: aliceblue;*/
        float: right;
        right: 0.5%;
        /*text-align: center;*/
        display: table;
        font-size: 1.2vw;
        color: #8adeff;
    }

    #exit-preview span {
        display: table-cell;
        vertical-align: middle;
    }

    #exit-preview:hover {
        font-size: 1.3vw;
        color: red;
    }

    .camera-show-div {
        width: 94%;
        height: 75%;
        left: 3%;
        background: black;
    }

    .param-div {
        width: 94%;
        height: 20%;
        left: 3%;
        /*background: #d69935;*/
    }

    .radio-div {
        width: 100%;
        height: 30%;
        /*background: #00d8ff;*/
    }

    .radio-input {
        top: 25%;
        /*left: 2%;*/
        margin-left: 1%;
        color: #00d8ff;
    }

    .camera-img {
        width: 100%;
        height: 100%;
    }

    .camera-canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
    }

    .canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 11;
        top: 0;
        left: 0;
    }

    #people_area {
        z-index: 12;
        width: 100%;
        height: 100%;
        /*background: rgba(0, 255, 255, 0.3);*/
    }

    /*#fire_area{*/
    /*    background: rgba(255, 0, 0, 0.3);*/
    /*}*/
    /*#smoke_area{*/
    /*    background: rgba(255, 255, 0, 0.3);*/
    /*}*/
    /*#extinguisher_area{*/
    /*    background: rgba(255, 0, 255, 0.3);*/
    /*}*/

    .button-div {
        width: 100%;
        height: 50%;
    }

    .determine {
        width: 15%;
        height: 50%;
        top: 25%;
        background: none;
        border: 1px solid #8adeff;
        color: #8adeff;
    }

    /*.reduction:hover{*/
    /*    background: darkred;*/
    /*}*/
    /*.determine:hover{*/
    /*    background: #0a640a;*/
    /*}*/

    .not-radio-input {
        top: 25%;
        /*left: 2%;*/
        margin-left: 1%;
        /*color: #00d8ff;*/
        cursor: no-drop;
        color: rgba(138, 222, 255, 0.59);
    }

    .not-radio {
        cursor: no-drop;
    }

    .offline {
        color: #888585;
    }

    .online {
        color: #00d8ff;
    }

    .run_ai {
        color: #ffb700;
    }
</style>
