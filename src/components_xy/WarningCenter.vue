<template>

<div class="main">
    <div class="main-div">
        <div v-for="(item, index) in ImgInfo" :key=index class="warning-div">
            <div class="img-div">
                <img :src="item.imgPath" class="image-img" alt="" width="100%" height="100%">
            </div>
            <div class="warning-type"><span style="display: table-cell; vertical-align: middle;"></span></div>
        </div>
    </div>
    <div class="main-div-bf">
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
        <div class="warning-div-bf"><div class="img-div-bf"></div></div>
    </div>
</div>

</template>

<script>
    import $ from 'jquery';
    import ajax from 'axios'
    export default {
        name: "WarningCenter",
        data() {
            return {
                ColorList: new Map(),
                NameList: new Map(),
                Info_lockReconnect: false,
                Info_ws: null,
                Info_wsUrl: "ws://" + window.location.host + "/api/v1/report/ws/start",
                // ws: tmp_ws,
                // Info_wsUrl: "/api/v1/report/ws/start",
                number_mean: [],

                image_img: $(".image-img"),
                // _this: this,
                canvasHeartCheckDeviceInfo :{
                    // timeout: 1000,        //1分钟发一次心跳
                    timeout: 1000,        //1分钟发一次心跳
                    timeoutObj: null,
                    serverTimeoutObj: null,

                    reset: function () {
                        clearTimeout(this.timeoutObj);
                        clearTimeout(this.serverTimeoutObj);
                        return this;
                    },
                    start: function (_this) {
                        var self = this;
                        this.timeoutObj = setTimeout(function () {
                            _this.Info_ws.send("ping");
                            self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
                                _this.Info_lockReconnect = false;
                                _this.Info_ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                            }, 60000)
                        }, this.timeout)
                    }
                },

                ImgInfo: [
                  {
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  },{
                    imgPath: "/static/images/camera_default.png",
                    // value: "",
                  }
                ]

            }
        },
        mounted() {
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

            // 多路新号
            this.CellStream();
        },
        methods: {
            LoopTS(obj, key){
                // console.log("loop ts key: ", key);
                let _this = this;
                for (let j=0; j<3; j++) {
                    for (let i = 1; i <= 10; i++) {
                        setTimeout(function () {
                            $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                        }, i * 15);
                    }
                    let num = 1;
                    for (let i = 9; i >= 0; i--) {
                        setTimeout(function () {
                            $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                        }, num * 15 + 150);
                        num += 1
                    }
                }
            },

            canvasReconnect(url) {
                let _this = this;
                if (this.Info_lockReconnect) return;
                this.Info_lockReconnect = true;
                setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                    _this.canvasCreateWebSocket(_this.Info_wsUrl);
                    _this.Info_lockReconnect = false;
                }, 2000);
            },
            canvasInitEventHandle() {
                let _this = this;
                this.Info_ws.onclose = function () {
                    _this.canvasReconnect(this.Info_wsUrl);
                    console.log("websocket 连接关闭");
                };
                this.Info_ws.onerror = function () {
                    _this.canvasReconnect(this.Info_wsUrl);
                    console.log("websocket 连接错误");
                    // console.log("canvas llws连接错误!");
                };
                this.Info_ws.onopen = function () {

                    _this.canvasHeartCheckDeviceInfo.reset().start(_this);
                    console.log("websocket 连接成功");    //心跳检测重置
                    // console.log("canvas llws连接成功!"+new Date().toLocaleString());
                };
                this.Info_ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
                    _this.canvasHeartCheckDeviceInfo.reset().start(_this);      //拿到任何消息都说明当前连接是正常的
                    // console.log("event.data: ", event.data);
                    if (event.data !== 'pong') {
                        // try {
                            let data = JSON.parse(event.data);
                            // console.log(data);
                            // console.log(_this.image_img.eq(parseInt(data["thread_id"])-1).parent().html());
                            // _this.image_img.eq(data["thread_id"]-1).attr("src", "http://10.10.10.101:4000/"+data["image"]);
                            _this.ImgInfo[data["thread_id"]-1].imgPath = "/"+data["image"];
                            // _this.ImgInfo[data["thread_id"]-1].value = _this.ColorList.get(data["event_type"]);
                            $(".warning-type").eq(data["thread_id"]-1).html('<span style="color: '+_this.ColorList.get(data["event_type"])+'">'+_this.NameList.get(data["event_type"])+'</span>');
                            if (data["event_off"] === "1"){
                                for (let i=0; i<1; i++){
                                    setTimeout(_this.LoopTS, i*500, $(".warning-div-bf").eq(data["thread_id"]-1), data["event_type"]);
                                }
                            } else if (data["event_off"] === "2"){
                                _this.image_img.eq(data["thread_id"]-1).attr("src", "/static/images/camera_default.png");
                            }
                        // } catch (e) {
                        //
                        // }
                    }
                };
            },
            canvasCreateWebSocket(url) {
                try {
                    if ('WebSocket' in window) {
                      console.log(url);
                      // _this.canvasReconnect(this.Info_wsUrl);
                        this.Info_ws = new WebSocket(this.Info_wsUrl);
                    }
                    this.canvasInitEventHandle();
                } catch (e) {
                    this.canvasReconnect(url);
                }
            },

            CellStream() {
                let _this = this;
                let param = {};
                ajax.get("/api/v1/report/play", {params: param}).then(function (res) {
                    let data = res.data;
                    if (data.code === 2200){
                        console.log(data);
                    }
                });
            }
        }
    }
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    color: #00d8ff;
    position: relative;
}

html, body, .main, .main-div{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    /*top: -5%;*/
    overflow: hidden;
}
.main-div-bf{
    width: 100%;
    height: 100%;
    top: 0%;
    position: absolute;
    z-index: 2;
    background: rgba(0, 0, 0, 0.1);
}

.warning-div, .warning-div-bf{
    width: 33.33%;
    height: 33.33%;
    float: left;
    position: relative;
}
.img-div, .img-div-bf{
    width: 99%;
    height: 99%;
    left: 0.5%;
    top: 0.5%;
    /*background: #053039;*/
}
.img-div{
    background: #053039;
}
.warning-type{
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
.warning-type span{
    display: table-cell;
    vertical-align: middle;
   margin: auto;
}
</style>
