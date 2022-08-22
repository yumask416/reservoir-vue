<template>
    <div class="main">
        <div class="header">
            <div class="h-left-title"><span>{{ curr_title }}</span></div>
            <div class="title_name"><span style="font-size: 2.2vw"> {{ SystemTitle }} </span></div>
            <div class="h-right-user">
                <div class="user-help" data-title="帮助"></div>
                <div class="user-button" data-title="管理员-admin"></div>
            </div>
        </div>
        <div class="main-bottom">
            <div class="menu-div">
                <h4 class="menu-h4">功能与服务</h4>
                <div class="menu-guide">
                    <div class="menu-cell" @click="ToSingle(0)" @mouseenter="BackGround(0)" @mouseleave="BackGroundOut(0)" v-bind:style="{background: MenuColor[0].color}"><span>实时告警</span></div>
                    <div class="menu-cell" @click="ToSecurity(1)" @mouseenter="BackGround(1)" @mouseleave="BackGroundOut(1)" v-bind:style="{background: MenuColor[1].color}"><span>安全卸油</span></div>
                    <div class="menu-cell" @click="ToWarning(2)" @mouseenter="BackGround(2)" @mouseleave="BackGroundOut(2)" v-bind:style="{background: MenuColor[2].color}"><span>告警中心</span></div>
                    <div class="menu-cell" @click="ToHistory(3)" @mouseenter="BackGround(3)" @mouseleave="BackGroundOut(3)" v-bind:style="{background: MenuColor[3].color}"><span>历史事件</span></div>
                    <div class="menu-cell" @click="ToPTZ(4)" @mouseenter="BackGround(4)" @mouseleave="BackGroundOut(4)" v-bind:style="{background: MenuColor[4].color}"><span>云台球机</span></div>
                </div>
                <h4 class="menu-h4">配置与管理</h4>
                <div class="menu-setting">
                    <div class="menu-cell" @click="ToCamera(5)" @mouseenter="BackGround(5)" @mouseleave="BackGroundOut(5)" v-bind:style="{background: MenuColor[5].color}"><span>通道管理</span></div>
                    <div class="menu-cell" @click="ToNetwork(6)" @mouseenter="BackGround(6)" @mouseleave="BackGroundOut(6)" v-bind:style="{background: MenuColor[6].color}"><span>网络配置</span></div>
                    <div class="menu-cell" @click="ToReport(7)" @mouseenter="BackGround(7)" @mouseleave="BackGroundOut(7)" v-bind:style="{background: MenuColor[7].color}"><span>上报配置</span></div>
                    <div class="menu-cell" @click="ToSystemSetting(8)" @mouseenter="BackGround(8)" @mouseleave="BackGroundOut(8)" v-bind:style="{background: MenuColor[8].color}"><span>系统设置</span></div>
                </div>
                <h4 class="menu-h4">操作指南</h4>
                <div class="menu-guide">
                    <div class="menu-cell" @click="ToNo" @mouseenter="BackGround(9)" @mouseleave="BackGroundOut(9)" v-bind:style="{background: MenuColor[9].color}"><span>使用手册</span></div>
                    <div class="menu-cell" @click="ToNo" @mouseenter="BackGround(10)" @mouseleave="BackGroundOut(10)" v-bind:style="{background: MenuColor[10].color}"><span>操作视频</span></div>
                </div>
            </div>

            <div class="main-show">
    <!--            <iframe id="iframe-1" src="/api/v1/camera" frameBorder="0" class="right-hidden iframe-label"></iframe>-->
    <!--            <iframe id="iframe-2" src="/api/v1/warning" frameBorder="0" class="right-visible iframe-label"></iframe>-->
                <component :is="template"></component>
            </div>
        </div>
    </div>
</template>

<script>
    import SingleWarningVideo from "@/components/SingleWarningVideo";
    import SecurityOilDischarge from "@/components/SecurityOilDischarge";
    import WarningCenter from "@/components/WarningCenter";
    import HistoryEvent from "@/components/HistoryEvent";
    import PTZmanage from "@/components/PTZmanage";

    import CameraManage from "@/components/CameraManage";
    import NetworkSetting from "@/components/NetworkSetting";
    import DataReport from "@/components/DataReport";
    import SystemSetting from "@/components/SystemSetting";

    import Monitor from "@/components/Monitor"
    // import TestElementPlus from "./TestElementPlus"
    // import CameraManage from "/components/CameraManage";
    export default {
        name: "MenuManage",
        components: {
            SingleWarningVideo,
            SecurityOilDischarge,
            WarningCenter,
            HistoryEvent,
            PTZmanage,
            CameraManage,
            NetworkSetting,
            DataReport,
            SystemSetting,
            Monitor,
            // TestElementPlus
        },
        data() {
            return {
                template: "SingleWarningVideo",
                // SystemTitle: "智慧加油站系统",
                SystemTitle: "",
                curr_title: "系统主页",
                MenuColor : [
                    {
                        "color": "rgba(32, 160, 199, 0.64)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                    {
                        "color": "rgba(32, 160, 199, 0.24)"
                    },
                ],
                curr_menu : 0,
                username: "admin",
                login_out: null,

            }
        },
        mounted() {
            // 判断是否登录
            let username = localStorage.getItem('user_name');
            // console.log("username: ", username);
            // console.log("this.username: ", this.username);
            if (username === null) {
                // 跳转到登录页面
                // this.$message.warning("没有登录！");
                // this.$router.push({path: '/api/v1'});
            } else if (username !== this.username){
                this.username = username;
            }
            this.login_out = setInterval(this.LoginOut, 600000);
            this.SystemTitle =  localStorage.getItem("system_name")

        },
      methods:{
            // 判断时间
            LoginOut(){
                // 判断是否超时
                let timestamp = localStorage.getItem('timestamp');
                let times = new Date().getTime();
                if((times - parseInt(timestamp)) >= 3600000) {
                    if (this.login_out !== null) {
                        clearInterval(this.login_out);
                        this.login_out = null;
                    }
                    this.$message.warning("登录超时！");
                    this.$router.push({path: '/api/v1'});
                }
            },
            BackGround(num){
                for (let i=0; i<this.MenuColor.length; i++){
                    if (i === this.curr_menu){
                        continue;
                    }
                    this.MenuColor[i].color = "rgba(32, 160, 199, 0.24)";
                }
                if (num !== this.curr_menu) {
                    this.MenuColor[num].color = "rgba(32, 160, 199, 0.44)";
                }
            },
            BackGroundOut(num){
                if (num !== this.curr_menu) {
                    this.MenuColor[num].color = "rgba(32, 160, 199, 0.24)";
                }
            },
            BackClick(num){
                this.curr_menu = num;
                for (let i=0; i<this.MenuColor.length; i++){
                    if (i === this.curr_menu){
                        continue;
                    }
                    this.MenuColor[i].color = "rgba(32, 160, 199, 0.24)";
                }
                this.MenuColor[num].color = "rgba(32, 160, 199, 0.64)";
            },
            ToSingle(num){
                this.template = "SingleWarningVideo";
                this.curr_title = "实时告警";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToSecurity(num){
                this.template = "SecurityOilDischarge";
                this.curr_title = "安全卸油";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToWarning(num){
                this.template = "WarningCenter";
                this.curr_title = "告警中心";
                this.BackClick(num);
                this.LoginOut();
            },
            ToHistory(num){
                this.template = "HistoryEvent";
                this.curr_title = "历史事件";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToPTZ(num){
                this.template = "PTZmanage";
                this.curr_title = "云台球机";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToCamera(num){
                this.template = "CameraManage";
                this.curr_title = "通道管理";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToNetwork(num){
                this.template = "NetworkSetting";
                this.curr_title = "网络配置";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToReport(num){
                this.template = "DataReport";
                this.curr_title = "上报配置";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToSystemSetting(num){
                this.template = "SystemSetting";
                this.curr_title = "系统设置";
                this.BackClick(num);
                // this.LoginOut();
            },
            ToNo(num) {
                this.$message.warning("暂时没有此功能！");
                // this.LoginOut();
                // this.template = "Monitor";
            }
        },
    }
</script>

<style scoped>
*{
    margin: 0; padding: 0;
    /*cursor: url(/static/images/pointer.png) 8 3, auto !important;*/
    position: relative;

    /*color: #0bc4e9;*/
}
::-webkit-scrollbar {width:5px;height:5px;position:absolute}
::-webkit-scrollbar-thumb {background-color:#5bc0de}
::-webkit-scrollbar-track {background-color: #053039}

.main{
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    /*background: rgba(0, 0, 0, 0.5);*/
}

.header{
    width: 98%;
    height: 15%;
    background: url("/static/images/head.png") no-repeat;
    background-size: 100% 100%;
    left: 1%;
    color: white;
}
.main-bottom{
    width: 100%;
    height: 89%;
    top: -5%;
}
.h-left-title{
    width: 30.5%;
    height: 40%;
    font-size: 1vw;
    float: left;
    display: table;
    color: #8adeff;
    text-align: center;
}
.h-left-title span{
    display: table-cell;
    vertical-align: middle;
}
.title_name{
    width: 40%;
    height: 40%;
    display: table;
    text-align: center;
    font-size: 1.9vw;
    font-weight: 400;
    /*text-shadow: 0 0 .3vw #00d8ff;*/
    text-shadow: -2px -2px .3vw #00d8ff;
    float: left;
}
.title_name span{
    display: table-cell;
    vertical-align: middle;
}
.h-right-user{
    width: 18%;
    height: 40%;
    /*background: white;*/
    float: right;
    right: 6%;
}
.user-button{
    top: 35%;
    right: 6%;
    width: 8%;
    height: 50%;
    background: url("/static/images/PPT/user_h.png") no-repeat;
    background-size: 100% 100%;
    float: right;
}
.user-help{
    top: 35%;
    right: 4%;
    width: 8%;
    height: 50%;
    background: url("/static/images/PPT/help_h.png") no-repeat;
    background-size: 100% 100%;
    float: right;
}
.user-button:hover{
    background: url("/static/images/PPT/user.png") no-repeat;
    background-size: 100% 100%;
}
.user-help:hover{
    background: url("/static/images/PPT/help.png") no-repeat;
    background-size: 100% 100%;
}
.user-button:hover:after{
    position:absolute;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    top:30px;
    left:0;
    font-size: 0.8vw;
    content:attr(data-title);
    color: white;
    border:1px solid #00d8ff;
    border-radius:5px ;
    background-color: rgba(0, 0, 0, 0.6);
}
.user-help:hover:after{
    position:absolute;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    top:30px;
    left:0;
    font-size: 0.8vw;
    content:attr(data-title);
    color: white;
    border:1px solid #00d8ff;
    border-radius:5px ;
    background-color: rgba(0, 0, 0, 0.6);
}


.menu-div{
    width: 20%;
    height: 100%;
    float: left;
    background: rgba(4, 32, 45, 0.91);
    left: 0.5%;
    color: #8adeff;
    border-radius: 5px;
}
.menu-h4{
    font-size: 1.1vw;
    margin: 5%;
    /* overflow:auto; */
}

.menu-setting{
    width: 80%;
    height: 30%;
    left: 10%;
}
.menu-guide{
    width: 80%;
    height: 30%;
    left: 10%;
    overflow:auto;
}
.menu-cell{
    width: 100%;
    height: 23%;
    /*background: rgba(32, 160, 199, 0.24);*/
    display: table;
    text-indent: 20%;
    margin-top: 1%;
    font-size: 1vw;
}
/*.menu-cell:hover{*/
/*    background: rgba(32, 160, 199, 0.44);*/
/*}*/
.menu-cell span{
    display: table-cell;
    vertical-align: middle;
}


.main-show{
    width: 78.5%;
    height: 100%;
    float: right;
    right: 0.5%;
    background: rgba(4, 32, 45, 0.91);
    color: #8adeff;
    border-radius: 5px;
    /*border-radius:5px ;*/
    position: relative;
    overflow: hidden;
}


/*===================== 右侧显示的画面 =====================*/
.right-visible{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: block;
}

.right-hidden{
    width: 100%;
    height: 100%;
    display: none;
}

/**{*/
/*    margin: 0; padding: 0;*/
/*    position: relative;*/
/*}*/
/*.main{*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    overflow: hidden;*/
/*    background: rgba(0, 0, 0, 0.5);*/
/*}*/

/*.header{*/
/*    width: 98%;*/
/*    height: 15%;*/
/*    background: url("/static/images/head.png") no-repeat;*/
/*    background-size: 100% 100%;*/
/*    left: 1%;*/
/*    color: white;*/
/*}*/
/*.main-bottom{*/
/*    width: 100%;*/
/*    height: 89%;*/
/*    top: -5%;*/
/*}*/
/*.h-left-title{*/
/*    width: 30.5%;*/
/*    height: 40%;*/
/*    font-size: 1vw;*/
/*    float: left;*/
/*    display: table;*/
/*    color: #8adeff;*/
/*    text-align: center;*/
/*}*/
/*.h-left-title span{*/
/*    display: table-cell;*/
/*    vertical-align: middle;*/
/*}*/
/*.title_name{*/
/*    width: 40%;*/
/*    height: 40%;*/
/*    display: table;*/
/*    text-align: center;*/
/*    font-size: 1.9vw;*/
/*    font-weight: 400;*/
/*    !*text-shadow: 0 0 .3vw #00d8ff;*!*/
/*    text-shadow: -2px -2px .3vw #00d8ff;*/
/*    float: left;*/
/*}*/
/*.title_name span{*/
/*    display: table-cell;*/
/*    vertical-align: middle;*/
/*}*/
/*.h-right-user{*/
/*    width: 18%;*/
/*    height: 40%;*/
/*    !*background: white;*!*/
/*    float: right;*/
/*    right: 6%;*/
/*}*/
/*.user-button{*/
/*    top: 35%;*/
/*    right: 6%;*/
/*    width: 8%;*/
/*    height: 50%;*/
/*    background: url("/static/images/PPT/user_h.png") no-repeat;*/
/*    background-size: 100% 100%;*/
/*    float: right;*/
/*}*/
/*.user-help{*/
/*    top: 35%;*/
/*    right: 4%;*/
/*    width: 8%;*/
/*    height: 50%;*/
/*    background: url("/static/images/PPT/help_h.png") no-repeat;*/
/*    background-size: 100% 100%;*/
/*    float: right;*/
/*}*/
/*.user-button:hover{*/
/*    background: url("/static/images/PPT/user.png") no-repeat;*/
/*    background-size: 100% 100%;*/
/*}*/
/*.user-help:hover{*/
/*    background: url("/static/images/PPT/help.png") no-repeat;*/
/*    background-size: 100% 100%;*/
/*}*/
/*.user-button:hover:after{*/
/*    position:absolute;*/
/*    width: 100px;*/
/*    height: 30px;*/
/*    text-align: center;*/
/*    line-height: 30px;*/
/*    top:30px;*/
/*    left:0;*/
/*    font-size: 0.8vw;*/
/*    content:attr(data-title);*/
/*    color: white;*/
/*    border:1px solid #00d8ff;*/
/*    border-radius:5px ;*/
/*    background-color: rgba(0, 0, 0, 0.6);*/
/*}*/
/*.user-help:hover:after{*/
/*    position:absolute;*/
/*    width: 50px;*/
/*    height: 30px;*/
/*    text-align: center;*/
/*    line-height: 30px;*/
/*    top:30px;*/
/*    left:0;*/
/*    font-size: 0.8vw;*/
/*    content:attr(data-title);*/
/*    color: white;*/
/*    border:1px solid #00d8ff;*/
/*    border-radius:5px ;*/
/*    background-color: rgba(0, 0, 0, 0.6);*/
/*}*/


/*.menu-div{*/
/*    width: 20%;*/
/*    height: 100%;*/
/*    float: left;*/
/*    background: rgba(4, 32, 45, 0.91);*/
/*    left: 0.5%;*/
/*    color: #8adeff;*/
/*    border-radius: 5px;*/
/*}*/
/*.menu-h4{*/
/*    font-size: 1.1vw;*/
/*    margin: 5%;*/
/*    width: 40%;*/
/*}*/
/*.menu-setting{*/
/*    width: 80%;*/
/*    height: 30%;*/
/*    left: 10%;*/
/*}*/
/*.menu-guide{*/
/*    width: 80%;*/
/*    height: 30%;*/
/*    left: 10%;*/
/*}*/
/*.menu-cell{*/
/*    width: 100%;*/
/*    height: 23%;*/
/*    background: rgba(32, 160, 199, 0.24);*/
/*    display: table;*/
/*    !*text-indent: 20%;*!*/
/*    margin-top: 1%;*/
/*}*/
/*.menu-cell:hover{*/
/*    background: rgba(32, 160, 199, 0.44);*/
/*}*/
/*.menu-cell span{*/
/*    display: table-cell;*/
/*    vertical-align: middle;*/
/*}*/
/*.main-show{*/
/*    width: 78.5%;*/
/*    height: 100%;*/
/*    float: right;*/
/*    right: 0.5%;*/
/*    background: rgba(4, 32, 45, 0.91);*/
/*    color: #8adeff;*/
/*    border-radius: 5px;*/
/*    !*border-radius:5px ;*!*/
/*    position: relative;*/
/*    overflow: hidden;*/
/*}*/


/*!*===================== 右侧显示的画面 =====================*!*/
/*.right-visible{*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    position: absolute;*/
/*    left: 0;*/
/*    top: 0;*/
/*    display: block;*/
/*}*/

/*.right-hidden{*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    display: none;*/
/*}*/

</style>
