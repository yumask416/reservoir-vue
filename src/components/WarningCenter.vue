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
    import * as API from '@/api/camera/';
    import { Notification } from 'element-ui';

    export default {
        name: "WarningCenter",
        data() {
            return {
                ColorList: new Map(),
                NameList: new Map(),
                number_mean: [],
                show_event_type: [],
                event_name_list : new Map(),
                image_img: $(".image-img"),
                // _this: this,

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
                ],
                ws: null, //???????????????
                lockReconnect: false, //????????????????????????
                timeout: 5 * 1000, //5???????????????
                timeoutObj: null, //?????????????????????
                serverTimeoutObj: null, //???????????????
                timeoutnum: null, //?????? ???????????????
                reconnect_num: 0, // ????????????
                isDestroyed: false, // ????????????????????????????????????
            }
        },
        mounted() {
            this.monitorWebsocket(); // websocket ????????????

            this.image_img = $(".image-img");
            this.ColorList.set("Y01", "#15e3d3");
            this.NameList.set("Y01", "????????????");
            this.ColorList.set("Y02", "#9115e3");
            this.NameList.set("Y02", "?????????");
            this.ColorList.set("Y03", "#e36b15");
            this.NameList.set("Y03", "??????");
            this.ColorList.set("Y04", "#FF0000");
            this.NameList.set("Y04", "??????");
            this.ColorList.set("Y05", "#f8be00");
            this.NameList.set("Y05", "??????");
            this.ColorList.set("Y06", "#1aff00");
            this.NameList.set("Y06", "?????????");

            // ????????????
            this.CellStream();

            // ?????????????????????
            // let param = {page: 1, page_size: 10};
            // let _this = this;
            // API.listCam(param).then(res => {
            //   if (res.code === 2200) {
            //     _this.show_event_type = [];
            //     for (let i=0;i<res.data.page_size; i++){
            //       _this.show_event_type.push(data.data.list[i].algorithm)
            //     }
            //   } else {
            //     _this.$message.error("??????????????????????????????");
            //   }
            // }).catch(error => console.log(error));

        },
        
        created() {
            // //?????????????????????????????????
            this.initWebSocket();
        },
        destroyed() {
            console.log("????????????????????????");
            this.isDestroyed = true;
            this.ws.close();
            //??????????????????????????????
            // this.wsReconnect();
            // window.addEventListener('beforeunload', e => this.wsReconnect(e))

        },
        beforeDestroy() {
            this.isDestroyed = true;
            this.ws.close();
            // window.addEventListener('beforeunload', e => this.wsReconnect())
        },

        methods: {
            // ????????????
            notify: function (title,msg,err_type) {
                Notification({title: title, message: msg, type: err_type});
            },
            initWebSocket() {
                try {
                    if ("WebSocket" in window) {
                                    //????????????
                        //?????????weosocket
                        let wsuri = "ws://" + window.location.host + "/api/v1/event/ws";
                        // let wsuri = "ws://10.10.10.119:10225/api/v1/event/ws";
                        //????????????
                        this.ws = new WebSocket(wsuri);
                    }
                    this.monitorWebsocket();
                } catch (e) {
                    this.wsReconnect();
                }
            },
            wsReconnect() {
                //websocket????????????
                var that = this;
                if (that.lockReconnect || that.isDestroyed) {
                    return;
                }
                that.lockReconnect = true;
                //????????????????????????????????????????????????????????????
                that.timeoutnum && clearTimeout(that.timeoutnum);
                that.timeoutnum = setTimeout(function() {
                    //?????????
                    that.initWebSocket();
                    that.lockReconnect = false;
                }, 5000);
            },
            heartBeatReset() {
                //????????????
                var that = this;
                //????????????
                clearTimeout(that.timeoutObj);
                clearTimeout(that.serverTimeoutObj);
                //????????????
                that.heartBeatStart();
            },
            heartBeatStart() {
                //????????????
                var self = this;
                self.timeoutObj && clearTimeout(self.timeoutObj);
                self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
                self.timeoutObj = setTimeout(function() {
                    //?????????????????????????????????????????????????????????????????????
                    if (self.ws.readyState == 1) {
                        //??????????????????
                        self.ws.send("ping");
                    } else {
                        //????????????
                        console.log("readyState is ", self.ws.readyState)
                        self.wsReconnect();
                    }
                    self.serverTimeoutObj = setTimeout(function() {
                        //????????????
                        console.log("????????????!")
                        self.ws.close();
                    }, 10000);
                }, 5000);
            },
            monitorWebsocket() {
                var _this = this
                this.ws.onopen = function (event) {
                    console.log("??????" + event)
                    _this.heartBeatStart(); // ????????????
                    let param = {page: 1, page_size: 10};
                    // let _this = this;
                    API.listCam(param).then(res => {
                        let data = res.data;
                        _this.show_event_type = [];
                        if (res.code === 2200) {
                            for (let i=0;i<data.page_size; i++){
                                console.log("run",data.list[i].algorithm)
                                _this.event_name_list.set(data.list[i].id, data.list[i].algorithm)
                                _this.show_event_type.push(data.list[i].algorithm)
                            }
                            // _this.cam_list = data.data.list;
                        } else {
                            _this.$message.error("??????????????????????????????");
                        }
                    }).catch(error => console.log(error));
                };
                this.ws.onmessage = function (event) {
                    if (event.data === "pong") {
                    console.log(event.data)
                    //????????????????????????????????????
                        _this.heartBeatReset();
                    return
                    }
                    let data = JSON.parse(event.data);
                    if(data == ""){
                        return
                    }
                    _this.heartBeatReset();
                    // _this.ImgInfo[data["camera_id"]-1].imgPath = "data:image/jpeg;base64," +data["image_path"];
                    _this.ImgInfo[data["camera_id"]-1].imgPath = "/"+data["image_path"];
                    // _this.ImgInfo[data["camera_id"]-1].imgPath = "http://10.10.10.119:10225/"+data["image_path"];
                    let event_list = data["event_type"].split(",");
                    // console.log("event_type", data["event_type"]);
                    // console.log("show_event_type", _this.show_event_type[data["camera_id"]-1]);
                    // console.log("event_name_list", _this.event_name_list.get(data["camera_id"]));
                    console.log
                    let showStr = "";
                    for (let i=0; i<event_list.length; i++){
                        // showStr += (_this.NameList.get(event_list[i])+" ");
                        showStr += (event_list[i]+" ");
                    }
                    // $(".warning-type").eq(data["thread_id"]-1).html('<span style="color: '+_this.ColorList.get(data["event_type"])+'">'+_this.NameList.get(data["event_type"])+'</span>');
                    // {"event_type":"","image":"event_img/1/1/1650533602000629760.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.204:554/stream1","timestamp":"1650533602000629760","event_off":"-1","save_off":"-1","thread_id":"1"}

                    // $(".warning-type").eq(data["camera_id"]-1).html('<span style="color: red">'+_this.show_event_type[data["camera_id"]-1]+'</span>');
                    $(".warning-type").eq(data["camera_id"]-1).html('<span style="color: red">'+_this.event_name_list.get(data["camera_id"])+'</span>');
                    // {"event_type":"Y06,","image":"warning/2/1650536822000701440.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.213:554/stream1","timestamp":"1650536822000701440","event_off":"1","save_off":"1","thread_id":"2"}
                    // console.log("event_off: ", data["event_off"]);
                    if (data["event_off"] === 1){
                        for (let i=0; i<1; i++){
                            setTimeout(_this.LoopTS, i*500, $(".warning-div-bf").eq(data["camera_id"]-1), data["event_type"]);
                        }
                    } else if (data["event_off"] === 2){
                        _this.image_img.eq(data["camera_id"]-1).attr("src", "/static/images/camera_default.png");
                    }

                };
                this.ws.onerror = function (event) {
                    // alert(event.data);
                    console.log("?????????"+event)
                    _this.wsReconnect();
                    // print("?????????"+event.data)
                };
                this.ws.onclose = function (event) {
                    //??????????????????
                    //????????????
                    console.log("isDestroyed: ", _this.isDestroyed)
                    if (!_this.isDestroyed){
                    console.log("???????????????:", event.code + ' ' + event.reason + ' ' + event.wasClean);
                    _this.reconnect_num += 1;
                    var err_str = "???????????????, ???????????????" + _this.reconnect_num.toString() + "????????????";
                    _this.notify("??????", err_str, "error");
                    }
                    //??????
                    _this.wsReconnect();
                };
            },

            LoopTS(obj, key){
                let _this = this;
                for (let j=0; j<3; j++) {
                    for (let i = 1; i <= 10; i++) {
                        setTimeout(function () {
                            // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                            $(obj).css({"box-shadow": "red 0px 0px "+i+"px "+i+"px inset"})
                        }, i * 15);
                    }
                    let num = 1;
                    for (let i = 9; i >= 0; i--) {
                        setTimeout(function () {
                            // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                            $(obj).css({"box-shadow": "red 0px 0px "+i+"px "+i+"px inset"})
                        }, num * 15 + 150);
                        num += 1
                    }
                }
            },

            CellStream() {
                let _this = this;
                let param = {"type":3};
                API.playAiCam(param).then(res => {
                  console.log(res);
                  if (res["code"] === 2200) {
                    console.log(res);
                  } else {
                    _this.$message.error("???????????????");
                  }
                }).catch(error => console.log(error));
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
