<template>
    <div class="content">
        <div class="left">
            <div class="left-top">
                <div class="title">
                    <div class="curent-msg">
                        <div class="msg-box" style="width: 40%">
                            <span>当前巡航线：</span><span>{{ CruiseLine }}</span>
                        </div>
                        <div class="msg-box" style="width: 60%">
                            <span>当前预置点：</span><span>东南角预置点</span>
                        </div>
                    </div>
                    <h3>云台时况</h3>
                </div>
                <div class="bigimg">
                    <div class="switch">
                        <el-switch style="display: block" v-model="isBigImg" active-color="#409EFF"
                            inactive-color="#409EFF" active-text="大图模式" inactive-text="信息模式">
                        </el-switch>
                    </div>
                    <div class="allimg" v-show="!isBigImg">
                        <img src="../../static/images/camera_default.png" alt="" />
                    </div>
                    <div class="img-div">
                        <img :src="ImgInfo.imgPath" class="image-img" alt="" width="100%" height="100%" />
                    </div>
                    <!-- <div class="warn-msg" v-show="!isBigImg">
                        <div class="msg-text" style="color: red">
                            <span>是否检测到打电话：</span><span>是</span>
                        </div>
                        <div class="msg-text" style="color: red">
                            <span>是否检测到危险入侵：</span><span>是</span>
                        </div>
                        <div class="msg-text">
                            <span>是否检测到明火：</span><span>否</span>
                        </div>
                    </div> -->
                </div>
                <!-- <div class="left-mid">
                    <div class="mid-box">
                        <template>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="打电话" @change="ClickConfig(2)" />
                            <el-checkbox label="抽烟" />
                            <el-checkbox label="明火" />
                            <el-checkbox label="烟雾" />
                            <el-checkbox label="灭火器" />
                        </el-checkbox-group>
                        </template>
                    </div>
                </div> -->
            </div>

            <div class="left-bottom">
                <div class="title">
                    <h3>事件列表</h3>
                </div>
                <div class="event-img-list">
                    <div class="img-box" v-for="item in warnArr">
                        <img :src="item.imgpath" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right-top">
                <!-- <div class="table-add" @click="savePreset(),printPreset()">
                    <i class="el-icon-plus"></i> 添加
                </div> -->
                <div class="PTZ-botton clearfix">
                    <div class="bottons-box">
                        <!-- <div class="title">
                            <el-divider direction="vertical"></el-divider>
                            <span>云台</span>
                        </div> -->
                        <div class="bottons">
                            <!-- 焦距方向盘 -->
                            <div class="bottons-left">
                                <div class="row">
                                    <div class="item" @mousedown="ControlPTZ('q')" @mouseup="ControlStop()">
                                        <img src="../../static/images/Icon/top-left.png" alt="" />
                                    </div>
                                    <div class="item" @mousedown="ControlPTZ('w')" @mouseup="ControlStop()">
                                        <i class="el-icon-caret-top"></i>
                                    </div>
                                    <div class="item" @mousedown="ControlPTZ('e')" @mouseup="ControlStop()">
                                        <img src="../../static/images/Icon/top-right.png" alt="" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="item" @mousedown="ControlPTZ('a')" @mouseup="ControlStop()">
                                        <i class="el-icon-caret-left"></i>
                                    </div>
                                    <div class="item">
                                        <img src="../../static/images/Icon/center.png" alt="" />
                                    </div>
                                    <div class="item" @mousedown="ControlPTZ('d')" @mouseup="ControlStop()">
                                        <i class="el-icon-caret-right"></i>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="item" @mousedown="ControlPTZ('z')" @mouseup="ControlStop()">
                                        <img src="../../static/images/Icon/bottom-left.png" alt="" />
                                    </div>
                                    <div class="item" @mousedown="ControlPTZ('x')" @mouseup="ControlStop()">
                                        <i class="el-icon-caret-bottom"></i>
                                    </div>
                                    <div class="item" @mousedown="ControlPTZ('c')" @mouseup="ControlStop()">
                                        <img src="../../static/images/Icon/bottom-right.png" alt="" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="item" @mousedown="ControlPTZ('2')" @mouseup="ControlStop()">
                                        <i class="el-icon-minus"></i>
                                    </div>
                                    <div class="items"><i class="el-icon-back"></i></div>
                                    <div class="items"><span>焦距</span></div>
                                    <div class="items"><i class="el-icon-right"></i></div>
                                    <div class="item" @mousedown="ControlPTZ('1')" @mouseup="ControlStop()">
                                        <i class="el-icon-plus"></i>
                                    </div>
                                </div>
                            </div>
                            <!-- input等 -->
                            <div class="bottons-right">
                                <div class="bottons-right-one">
                                    <el-input size="small" v-model="ptzconfig.ip" placeholder="IP"></el-input>
                                </div>
                                <div class="bottons-right-one">
                                    <el-input size="small" v-model="ptzconfig.username" placeholder="IPC用户名"></el-input>
                                </div>
                                <div class="bottons-right-one">
                                    <el-input size="small" v-model="ptzconfig.password" placeholder="IPC密码"></el-input>
                                </div>
                                <div class="bottons-right-two" @click="GetUrlPTZ()">
                                    <span>添加球机</span>
                                </div>
                                <div class="bottons-right-two" @click="ListCamera()">
                                    <span>删除球机</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 选择跟踪方式/请输入跟踪ID -->
                <div class="ctrl-bottons">
                    <div class="bottons-right-three">
                        <el-select size="small" v-model="choosetrackmodule" placeholder="选择跟踪方式" clearable>
                            <el-option v-for="item in choosetrackoptions" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="bottons-right-three">
                        <el-input size="small" v-model="autotrackid" placeholder="请输入跟踪ID" clearable>
                        </el-input>
                    </div>
                </div>
                <div class="ctrl-botton">
                    <!-- 增加预置点 -->
                    <div class="button" @click="printPreset(), (dialogPresetVisible = true)">
                        <span>增加预置点</span>
                    </div>
                    <template>
                        <el-dialog class="dialogPreset" @close="closeDialog" title="增加预置点"
                            :visible.sync="dialogPresetVisible" width="40%">
                            <div class="add_preset_style">
                                <span>预置点ID:</span>
                                <el-input v-model="preset_token" placeholder="预置点ID" size="small"></el-input>
                            </div>
                            <div class="add_preset_style">
                                <span>预置点名称:</span>
                                <el-input v-model="preset_name" placeholder="预置点名称" size="small"></el-input>
                            </div>
                            <div class="add_preset_style">
                                <span>预置点算法:</span>
                                <el-select v-model="preset_ai" multiple placeholder="预置点算法" size="small">
                                    <el-option v-for="item in AIalgorithm" :key="item.value" :label="item.label"
                                        :value="item.label"></el-option>
                                </el-select>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogPresetVisible = false" size="small">取 消</el-button>
                                <el-button type="primary" @click="addPreset(), (dialogPresetVisible = false)"
                                    size="small">确 定
                                </el-button>
                            </span>
                        </el-dialog>
                    </template>
                    <!-- 显示预置点 -->
                    <div class="button" @click="printPreset(), (PresetVisible = true)">
                        <span>显示预置点</span>
                    </div>
                    <template>
                        <el-dialog class="dialogPrint" title="显示预置点" :visible.sync="PresetVisible" width="40%">
                            <el-table :data="presetinfotableData2" class="table">
                                <el-table-column property="token" label="预置点ID" align="center" width="80">
                                    <template slot-scope="scope">
                                        <el-input size="small" v-model="scope.row.token" v-if="scope.row.show"
                                            placeholder="请输入内容" class="el-input-padding"></el-input>
                                        <span v-if="!scope.row.show">{{ scope.row.token }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="name" label="预置点名称" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="small" v-model="scope.row.name" v-if="scope.row.show"
                                            placeholder="请输入内容" class="el-input-padding"></el-input>
                                        <span v-if="!scope.row.show">{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column property="ai" label="预置点算法" align="center"></el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-tooltip class="item" effect="dark" content="调用" placement="top">
                                            <i class="el-icon-position" style="cursor: pointer"
                                                @click="gotoPreset(scope.row)"></i>
                                        </el-tooltip>
                                        <!-- <el-tooltip class="item" effect="dark" content="保存" placement="top">
                                            <i class="el-icon-document-copy" style="cursor: pointer"
                                                @click="savePreset(scope.row)"></i>
                                        </el-tooltip> -->
                                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                            <i class="el-icon-delete-solid" style="cursor: pointer"
                                                @click="deletePreset(scope.row)"></i>
                                        </el-tooltip>
                                        <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                            <i class="el-icon-s-claim" style="cursor: pointer"
                                                @click="editPreset(scope.row)"></i>
                                        </el-tooltip> -->
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-dialog>
                    </template>
                    <!-- 更改跟踪方式 -->
                    <div class="button" @click="downSendTrackIdInfo()"><span>更改跟踪方式</span></div>
                    <!-- 添加巡航线 -->
                    <div class="button" @click="printPreset(), (cruiseLineVisible = true)">
                        <span>添加巡航线</span>
                    </div>
                    <template>
                        <el-dialog :visible.sync="cruiseLineVisible" title="添加巡航线" width="50%" @close="closeDialog">
                            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                @change="handleCheckAllChange">全选</el-checkbox> -->
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedLines" @change="handleCheckedLinesChange">
                                <el-checkbox v-for="item in presetinfotableData2" :label="item" :key="item.token">{{
                                        item.token
                                }} {{ item.name }}</el-checkbox>
                            </el-checkbox-group>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cruiseLineVisible = false" size="small">取 消</el-button>
                                <el-button type="primary" @click="addCruiseLine(), (cruiseLineVisible = false)"
                                    size="small">确 定
                                </el-button>
                            </span>
                        </el-dialog>
                    </template>
                    <!-- 更改跟踪参数 -->
                    <div class="button" @click="trackIdparaVisible = true"><span>更改跟踪参数</span></div>
                    <template>
                        <el-dialog class="TrackIdparaDialog" :visible.sync="trackIdparaVisible" title="更改跟踪参数"
                            width="50%">
                            <el-form ref="form" :model="form">
                                <el-form-item label="累计帧数缩放图像阈值">
                                    <el-input v-model="form.large_small_count_threshold" size="small"
                                        placeholder="请输入累计帧数缩放图像阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="累计帧数移动云台阈值">
                                    <el-input v-model="form.autotrack_move_count_threshold" size="small"
                                        placeholder="请输入累计帧数移动云台阈值"></el-input>
                                </el-form-item>
                                <el-form-item label=" 图像放大宽阈值">
                                    <el-input v-model="form.width_large_threshold" size="small"
                                        placeholder="请输入图像放大宽阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="图像放大高阈值">
                                    <el-input v-model="form.height_large_threshold" size="small"
                                        placeholder="请输入图像放大高阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="图像放大面积阈值">
                                    <el-input v-model="form.area_large_threshold" size="small"
                                        placeholder="请输入图像放大面积阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="图像缩小宽阈值">
                                    <el-input v-model="form.width_small_threshold" size="small"
                                        placeholder="请输入图像缩小宽阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="图像缩小高阈值">
                                    <el-input v-model="form.height_small_threshold" size="small"
                                        placeholder="请输入图像缩小高阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="图像缩小面积阈值">
                                    <el-input v-model="form.area_small_threshold" size="small"
                                        placeholder="请输入图像缩小面积阈值"></el-input>
                                </el-form-item>
                                <el-form-item label="无目标时超时复位时间">
                                    <el-input v-model="form.time_track_var_three" size="small"
                                        placeholder="请输入无目标时超时复位时间"></el-input>
                                </el-form-item>
                                <el-form-item label="有目标时超时抓拍返回巡航时间">
                                    <el-input v-model="form.time_track_var_one" size="small"
                                        placeholder="请输入有目标时超时抓拍返回巡航时间"></el-input>
                                </el-form-item>
                                <el-form-item label="抓拍后延时时间">
                                    <el-input v-model="form.time_track_var_two" size="small" placeholder="请输入抓拍后延时时间">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="移动速度">
                                    <el-input v-model="form.moveSpeed" size="small" placeholder="请输入移动速度"></el-input>
                                </el-form-item>
                                <el-form-item label="变焦速度">
                                    <el-input v-model="form.focalSpeed" size="small" placeholder="请输入变焦速度"></el-input>
                                </el-form-item>
                                <el-form-item label="移动延时">
                                    <el-input v-model="form.moveDelayTime" size="small" placeholder="请输入移动延时">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="变焦延时">
                                    <el-input v-model="form.focalDelayTime" size="small" placeholder="请输入变焦延时">
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="TrackIdparaBtn">
                                    <el-button @click="trackIdparaVisible = false" size="small">取消</el-button>
                                    <el-button type="primary" @click="downSendTrackIdpara(), onSubmit" size="small">确定
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </template>
                    <!-- 目标跟踪开关 -->
                    <div class="button" @click="downsendInfo()"><span>目标跟踪开关</span></div>
                </div>
            </div>
            <div class="right-bottom">
                <div class="center-box">
                    <div class="default-list">
                        <div class="select-title">
                            <!-- <div class="arrow"><i class="el-icon-caret-left"></i></div> -->
                            <h3>{{ CruiseLine }}</h3>
                            <!-- <div class="arrow"><i class="el-icon-caret-right"></i></div> -->
                        </div>
                        <!-- 巡航线 -->
                        <div class="selected-list">
                            <div class="table">
                                <el-table :data="presetinfotableData" tooltip-effect="dark" :cell-style="tableRowStyle"
                                    :header-cell-style="tableHeaderColor" style="width: 100%" max-height="250">
                                    <el-table-column prop="token" label="ID" width="40" align="center"
                                        show-overflow-tooltip>
                                        <!-- <template slot-scope="scope">
                                            <el-input size="small" v-model="scope.row.token" v-if="scope.row.show"
                                                placeholder="请输入内容" class="el-input-padding"></el-input>
                                            <span v-if="!scope.row.show">{{ scope.row.token }}</span>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column prop="name" label="预设点名称" width="90" align="center"
                                        show-overflow-tooltip>
                                        <!-- <template slot-scope="scope">
                                            <el-input size="small" v-model="scope.row.name" v-show="scope.row.show"
                                                placeholder="请输入内容" class="el-input-padding"></el-input>
                                            <span v-show="!scope.row.show">{{ scope.row.name }}</span>
                                        </template> -->
                                    </el-table-column>
                                    <el-table-column prop="ai" label="算法" align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <!-- <el-table-column label="操作" align="center" width="100">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="调用" placement="top">
                                                <i class="el-icon-position" style="cursor: pointer"
                                                    @click="gotoPreset(scope.row)"></i>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="保存" placement="top">
                                                <i class="el-icon-document-copy" style="cursor: pointer"
                                                    @click="savePreset(scope.row), printPreset(), downsendPreset(scope.row)"></i>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                                <i class="el-icon-delete-solid" style="cursor: pointer"
                                                    @click="deletePreset(scope.row), printPreset()"></i>
                                            </el-tooltip>]
                                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                                <i class="el-icon-s-claim" style="cursor: pointer"
                                                    @click="editPreset(scope.row)"></i>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column> -->
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import flv from 'flv.js'
import { wsEvent } from '../service/ws-api'
import {
    ptzsendControl,
    ptzdowninitControl,
    ptzinitControl,
    ptzpresetControl,
    ptzlineControl,
    ptzipControl,
    TrackIdparaControl,
    ptzadd,
    getlist,
    ptzdownControl,
} from '@/service/api/camera.js'
const LineOptions = ['巡航线2', '巡航线3', '巡航线4', '巡航线5']
export default {
    name: 'PTZmanage',
    data() {
        return {
            lockTimeout: null,
            isLocked: false,
            warnArr: [],
            ImgInfo: { imgPath: '' },
            WarningImgInfo: {
                warningimgpath1: '',
                warningimgpath2: '',
                warningimgpath3: '',
                warningimgpath4: '',
            },
            CruiseLine: '巡航线',
            WarningImgIndex: [false, false, false, false],
            ws: null, //建立的连接
            lockReconnect: false, //是否真正建立连接
            timeout: 5 * 1000, //5秒一次心跳
            timeoutObj: null, //心跳心跳倒计时
            serverTimeoutObj: null, //心跳倒计时
            timeoutnum: null, //断开 重连倒计时
            reconnect_num: 0, // 重连次数
            isDestroyed: false, // 关闭或切换页面，是否断开

            dialogPresetVisible: false, //添加预置点
            PresetVisible: false, //显示预置点
            printData: [
                // {
                //     token: '',
                //     name: '',
                //     ai: ''
                // }
            ],
            cruiseLineVisible: false, //添加巡航线
            token: '',
            tokens: [],
            checkAll: false,
            checkedLines: [],
            cities: LineOptions,
            isIndeterminate: true,
            istruefalse: true,
            checkList: [],
            trackIdparaVisible: false, //更改跟踪参数
            form: {
                large_small_count_threshold: 1,
                autotrack_move_count_threshold: 3,
                width_large_threshold: 0.3,
                height_large_threshold: 0.4,
                area_large_threshold: 0.15,
                width_small_threshold: undefined,
                height_small_threshold: undefined,
                area_small_threshold: undefined,
                time_track_var_three: 30,
                time_track_var_one: 60,
                time_track_var_two: 7,
                moveSpeed: 0.1,
                focalSpeed: 0.1,
                moveDelayTime: 100000,
                focalDelayTime: 10000,
            },

            ptzconfig: {
                id: 0,
                ip: '10.10.10.219',
                url: '0.0.0.0:0',
                username: 'admin',
                password: 'AGvay123456',
                add_name: 'ptz1',
                add_addr: '',
            },
            autotrackid: '',
            choosetrackoptions: [
                {
                    value: '1',
                    label: 'ID最小',
                },
                {
                    value: '2',
                    label: 'ID最大',
                },
                {
                    value: '3',
                    label: '锁定ID',
                },
                // {
                //   value: '4',
                //   label: '最大目标',
                // },
                // {
                //   value: '5',
                //   label: '最小目标',
                // },
            ],
            choosetrackmodule: '',
            AIalgorithm: [
                {
                    value: 'A01',
                    label: '入侵检测-人员',
                },
            ],
            area: {
                token: '1',
                presetalgorithm: { '22': [0.1, 0.1, 0.1, 0.1], '23': [0.2, 0.2, 0.2, 0.2] },
            },
            autotrackkey: ['star', 'end'],
            buttons: [
                { iclass: 'el-icon-top-left', title: 'top-left' },
                { iclass: 'el-icon-top', title: 'top' },
                { iclass: 'el-icon-top-right', title: 'top-right' },
            ],
            isBigImg: false,
            preset_token: '',
            preset_name: '',
            preset_ai: ['入侵检测-人员'],
            presetinfotableData: [
                // { token: "1", name: "东南角预设点", algorithm: ["无"], show: false },
            ],
            presetinfotableData2: [],
            tableData: [
                { token: '1', name: '东南角预设点', algorithm: ['入侵检测-人员'], show: false },
                { token: '2', name: '西南角预设点', algorithm: ['入侵检测-人员'], show: false },
                { token: '3', name: '东南角预设点', algorithm: ['入侵检测-人员'], show: false },
                { token: '4', name: '西南角预设点', algorithm: ['入侵检测-人员'], show: false },
            ],
        }
    },
    methods: {
        ptzWebSocket(val) {
              let data = JSON.parse(val.data)
            //   console.log('val', data)

            // console.log('val',val.data.image_path);
            this.ImgInfo.imgPath = 'http://10.10.10.226:10225/' + data.image_path

            if (data.is_warning) {
                if (!this.isLocked) {
                    this.isLocked = true
                    this.warnArr.push({
                        imgpath: 'http://10.10.10.226:10225/' + data.image_path,
                        time: data['timestamp'],
                        eventtype: data['event_type'],
                    })
                    if (this.warnArr.length == 5) {
                        this.warnArr.shift()
                    }
                    this.lockTimeout = setTimeout(() => {
                        this.isLocked = false
                    }, 50)
                }
            }
        },
        tableRowStyle({ row, rowIndex }) {
            return 'padding: 0px;font-size:0.8vw;text-align: center;background-color: #15718E;border-bottom: 1px solid #3DBAF1;color: #fff;'
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            return 'text-align: center;background-color: #041E2B;border-bottom: 1px solid #3DBAF1;color: #fff;'
        },
        play_stream(stream_url, videoElement) {
            // if (flv.isSupported()) {
            //     var flvPlayer = flv.createPlayer({
            //         type: "flv",
            //         url: stream_url,
            //     });
            //     flvPlayer.attachMediaElement(videoElement);
            //     flvPlayer.load(); //加载
            //     videoElement.play();
            // }
        },
        // 增加预置点>弹窗>确认
        addPreset() {
            ptzpresetControl({
                ptzpreset: 'setpreset',
                ptzpresetname: this.preset_name,
                ptzpresettoken: this.preset_token,
            }).then(res => {
                if (res.code == 2200) {
                    let presetinfoDate = {
                        token: this.preset_token,
                        name: this.preset_name,
                        ai: this.preset_ai,
                    }
                    // this.presetinfotableData.push(presetinfoDate);
                    this.$message.success('添加成功')
                    this.printPreset()
                } else {
                    this.$message.warning(res.msg)
                }
            })
            // let preset_save_key = false;
            // for (let i = 0; i <= this.presetinfotableData2.length; i++) {
            //   if (this.preset_token === this.presetinfotableData2[i].token) {
            //     preset_save_key = true;
            //     break;
            //   }
            // };
            // if (preset_save_key) {
            //   ptzpresetControl({
            //     ptzpreset: "setpreset",
            //     ptzpresetname: this.preset_name,
            //     ptzpresettoken: this.preset_token,
            //   }).then((res) => {
            //     if (res.code == 2200) {
            //       let presetinfoDate = {
            //         token: this.preset_token,
            //         name: this.preset_name,
            //         ai: this.preset_ai,
            //         };
            //       this.presetinfotableData.push(presetinfoDate);
            //       this.$message.success("发送成功");
            //     } else {
            //       this.$message.warning(res.msg);
            //     }
            //   });
            // } else {
            //   ptzpresetControl({
            //     ptzpreset: "setpreset",
            //     ptzpresetname: this.preset_name,
            //     ptzpresettoken: this.preset_token,
            //   }).then((res) => {
            //     if (res.code == 2200) {
            //       let presetinfoDate = {
            //         token: this.preset_token,
            //         name: this.preset_name,
            //         ai: this.preset_ai,
            //         };
            //       this.presetinfotableData.push(presetinfoDate);
            //       this.$message.success("发送成功");
            //     } else {
            //       this.$message.warning(res.msg);
            //     }
            //   });
            // };
        },
        // 添加球机
        GetUrlPTZ() {
            ptzipControl({
                ptzip: this.ptzconfig.ip,
            }).then(res => {
                if (res.code === 2200) {
                    ; (this.ptzconfig.url = res.data),
                        // console.log(res.data),
                        console.log('获取url成功'),
                        ptzinitControl({
                            ptzurl: this.ptzconfig.url,
                            ptzusername: this.ptzconfig.username,
                            ptzpassword: this.ptzconfig.password,
                        }).then(res => {
                            if (res.code === 2200) {
                                ; (this.ptzconfig.add_addr = res.data),
                                    console.log('初始化成功'),
                                    console.log('获取流成功')
                                // console.log(`rtsp://${this.ptzconfig.username}:${this.ptzconfig.password}@${this.ptzconfig.ip}`);
                                ptzadd({
                                    name: this.ptzconfig.add_name,
                                    addr: this.ptzconfig.add_addr,
                                }).then(res => {
                                    if (res.code === 2200) {
                                        this.ptzconfig.id = res.data.id
                                        // console.log(res.data.id);
                                        console.log('摄像头添加成功')
                                        getlist({}).then((res) => {
                                            if (res.code === 2200) {
                                                for (var i = 0; i < res.data.list.length; i++) {
                                                    if (this.ptzconfig.ip == res.data.list[i].ip) {
                                                        this.ptzconfig.id = res.data.list[i].id
                                                    }
                                                }
                                            } else {
                                                console.log('失败', res)
                                            }
                                        })
                                        ptzdowninitControl({
                                            ptz_init_id_msg: this.ptzconfig.id,
                                            ptz_init_ip_msg: this.ptzconfig.ip,
                                            ptz_init_name_msg: this.ptzconfig.username,
                                            ptz_init_pass_msg: this.ptzconfig.password,
                                            ptz_init_rtsp_msg: this.ptzconfig.add_addr,
                                        }).then(res => {
                                            if (res.code === 2200) {

                                            } else {
                                            }
                                        })
                                    } else {
                                        getlist({}).then((res) => {
                                            console.log(123156454)
                                            if (res.code === 2200) {
                                                for (var i = 0; i < res.data.list.length; i++) {
                                                    if (this.ptzconfig.ip == res.data.list[i].ip) {
                                                        this.ptzconfig.id = res.data.list[i].id
                                                    }
                                                }
                                            } else {
                                                console.log('失败', res)
                                            }
                                        })
                                        ptzdowninitControl({
                                            ptz_init_id_msg: this.ptzconfig.id,
                                            ptz_init_ip_msg: this.ptzconfig.ip,
                                            ptz_init_name_msg: this.ptzconfig.username,
                                            ptz_init_pass_msg: this.ptzconfig.password,
                                            ptz_init_rtsp_msg: this.ptzconfig.add_addr,
                                        }).then(res => {
                                            if (res.code === 2200) {

                                            } else {
                                            }
                                        })
                                        this.$message.warning(res.msg)
                                    }
                                })
                            } else {
                                this.$message.warning(res.msg)
                            }
                        })
                } else {
                    this.$message.warning(res.msg)
                }
            })
        },

        // InitAndGetRtspPTZ() {
        //   ptzinitControl({
        //     ptzurl: this.ptzconfig.url,
        //     ptzusername: this.ptzconfig.username,
        //     ptzpassword: this.ptzconfig.password,
        //   }).then(res => {
        //     if (res.code === 2200) {
        //       this.ptzconfig.add_addr = res.data,
        //       console.log("初始化成功"),
        //       console.log("获取流成功");
        //     } else {
        //       this.$message.warning(res.msg);
        //     }
        //   });
        // },

        // AddCamera() {
        //   let param = {name: this.add_name, addr: this.add_addr};
        //   let _this = this;
        //   ajax.get("/api/v1/camera/add", {params: param}).then(function (res) {
        //       let data = res.data;
        //       if (data.code === 2200) {
        //           console.log(data);
        //           _this.Ready();
        //       } else {
        //           console.log(res);
        //       }
        //   });
        //   console.log(this.add_addr);
        // },
        // 删除球机
        ListCamera() {
            getlist({}).then(res => {
                if (res.code === 2200) {
                    ; (this.ptzconfig.id = res.data.list[0].id),
                        (this.ptzconfig.ip = res.data.list[0].ip),
                        (this.ptzconfig.add_name = res.data.list[0].name),
                        (this.ptzconfig.add_addr = res.data.list[0].main_stream),
                        console.log(res.data.list[0])
                    // $(".config-div").css("display", "none");
                    // _this.Ready();
                } else {
                    console.log('失败', res)
                }
            })
        },
        // 操作中的保存
        downsendPreset() {
            ptzdownControl({ ptz_area_msg: JSON.stringify(this.area) }).then(res => {
                let data = res.data
                if (data.code == 2200) {
                    console.log('成功')
                } else {
                    console.log('失败')
                }
            })
            // ajax.get("/api/v1/camera/ai", { params: param }).then(function (res) {
            //   let data = res.data;
            //   if (data.code === 2200) {
            //     // console.log(data);
            //     $(".config-div").css("display", "none");
            //     _this.Ready();
            //   } else {
            //     console.log("配置失败", res);
            //     alert("配置失败");
            //   }
            // });
        },
        // 目标跟踪开关
        downsendInfo() {
            if (this.istruefalse) {
                ptzdownControl({ ptz_send_msg: 'star' }).then(res => {
                    this.istruefalse = false
                    if (res.code == 2200) {
                        console.log('成功')
                        this.$message.success('目标跟踪已开启')
                    } else {
                        console.log('失败')
                    }
                })
            } else {
                ptzdownControl({ ptz_send_msg: 'end' }).then(res => {
                    this.istruefalse = true
                    // let data = res.data;
                    if (res.code == 2200) {
                        console.log('成功')
                        this.$message.info('目标跟踪已关闭')
                    } else {
                        console.log('失败')
                    }
                })
            }
        },
        // 更改跟踪方式
        downSendTrackIdInfo() {
            ptzdownControl({
                ptz_track_id_msg: this.autotrackid,
                ptz_track_mode_msg: this.choosetrackmodule,
            }).then(res => {
                // let data = res.data;
                if (res.code == 2200) {
                    console.log('成功')
                    this.$message.success('跟踪方式已更改')
                } else {
                    console.log('失败')
                }
            })
        },
        // 更改跟踪参数
        onSubmit() {
            console.log('submit!')
        },
        // 操作中的保存
        savePreset(row) {
            ptzpresetControl({
                ptzpreset: 'setpreset',
                ptzpresetname: row.name,
                ptzpresettoken: row.token,
            }).then(res => {
                if (res.code == 2200) {
                    row.show = false
                    console.log('保存', row.show)
                    this.$message.success('发送成功')
                } else {
                    this.$message.warning(res.msg)
                }
            })
        },
        // 操作中的删除
        deletePreset(row) {
            this.$confirm('是否确认删除此预置点?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                    ptzpresetControl({
                        ptzpreset: 'deletepreset',
                        ptzpresettoken: row.token,
                    }).then(res => {
                        if (res.code == 2200) {
                            // this.$message.success("发送成功");
                            this.printPreset()
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                })
                .catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                })
        },
        // 操作中的调用
        gotoPreset(row) {
            ptzpresetControl({
                ptzpreset: 'gotopreset',
                ptzpresettoken: row.token,
            }).then(res => {
                if (res.code == 2200) {
                    this.$message.success('发送成功')
                } else {
                    this.$message.warning(res.msg)
                }
            })
        },
        // 操作中的编辑
        editPreset(row) {
            row.show = true
            console.log('编辑', row.show)
        },
        // 增加预置点
        printPreset() {
            ptzpresetControl({ ptzpreset: 'getpreset' }).then(res => {
                if (res.code == 2200) {
                    console.log('res.data', res.data)
                    this.printData = res.data
                    console.log('this.printData', this.printData)
                    // for(var i = 0;i < this.printData.length;i++){

                    // }
                    this.presetinfotableData2.length = 0
                    for (let i = 0; i <= res.data.length; i++) {
                        let presetDate = {
                            token: res.data[i]['-token'],
                            name: res.data[i].Name,
                            ai: '入侵检测-人员',
                        }
                        this.presetinfotableData2.push(presetDate)
                        // console.log('this.presetinfotableData2',this.presetinfotableData2);
                    }
                } else {
                    this.$message.warning(res.msg)
                }
            })
            if (this.presetinfotableData.length === 0) {
                // this.$message.warning("11111111111111");
                // console.log(7777)
                // console.log(this.presetinfotableData2)
                // this.presetinfotableData = this.presetinfotableData2;
                // console.log(this.presetinfotableData)
            }
        },
        //关闭弹窗
        closeDialog() {
            // console.log(123456)
            ; (this.preset_token = ''),
                (this.preset_name = ''),
                (this.preset_ai = []),
                (this.checkedLines = [])
            this.isIndeterminate = false
        },
        // 添加巡航线
        addCruiseLine() {
            console.log('添加', this.checkedLines)
            // let tokens = []
            for (var i = 0; i < this.checkedLines.length; i++) {
                this.presetinfotableData.push(this.checkedLines[i])
                this.tokens.push(this.checkedLines[i].token)
                this.token = this.tokens.join(',')
                console.log('this.presetinfotableData', this.presetinfotableData)
            }
            ptzlineControl({ ptz_cruise_line_msg: this.token }).then(res => {
                if (res.code == 2200) {
                    console.log('成功')
                }
            })
        },
        handleCheckAllChange(val) {
            console.log('全选', val)
            this.checkedLines = val ? this.presetinfotableData2 : []
            console.log('this.checkedLines', this.checkedLines)
            this.isIndeterminate = false
        },
        handleCheckedLinesChange(value) {
            console.log('value', value)
            let checkedCount = value.length
            this.checkAll = checkedCount === this.presetinfotableData2.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.presetinfotableData2.length
        },
        // 更改跟踪参数
        downSendTrackIdpara() {
            // ajax.get("", { params: {} }).then(function (res) { }).catch(function (error) { console.log(error); });
            TrackIdparaControl({ ptzsend: '123' }).then(res => {
                if (res.code == 2200) {
                    this.$message.success('发送成功')
                } else {
                    // this.$message.warning(res.msg);
                }
            })
        },
        ControlStop() {
            ptzsendControl({ ptz: 's' }).then(res => {
                if (res.code == 2200) {
                    this.$message.success('发送成功')
                } else {
                    this.$message.warning(res.msg)
                }
            })
        },

        ControlPTZ(key) {
            switch (key) {
                case 'a':
                    ptzsendControl({ ptz: 'a' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'd':
                    ptzsendControl({ ptz: 'd' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'q':
                    ptzsendControl({ ptz: 'q' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'w':
                    ptzsendControl({ ptz: 'w' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'e':
                    ptzsendControl({ ptz: 'e' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'z':
                    ptzsendControl({ ptz: 'z' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'x':
                    ptzsendControl({ ptz: 'x' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case 'c':
                    ptzsendControl({ ptz: 'c' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case '1':
                    ptzsendControl({ ptz: '1' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
                case '2':
                    ptzsendControl({ ptz: '2' }).then(res => {
                        if (res.code == 2200) {
                            this.$message.success('发送成功')
                        } else {
                            this.$message.warning(res.msg)
                        }
                    })
                    break
            }
        },

        notify: function (title, msg, err_type) {
            new Notification({ title: title, message: msg, type: err_type })
        },
        initWebSocket() {
            try {
                if ('WebSocket' in window) {
                    //建立连接
                    //初始化weosocket
                    let wsuri = 'ws://' + window.location.host + '/api/v1/event/ws'
                    // let wsuri = "ws://10.10.10.119:10225/api/v1/event/ws";
                    //建立连接
                    this.ws = new WebSocket(wsuri)
                }
                this.monitorWebsocket()
            } catch (e) {
                this.wsReconnect()
            }
        },
        wsReconnect() {
            //websocket重新连接
            var that = this
            if (that.lockReconnect || that.isDestroyed) {
                return
            }
            that.lockReconnect = true
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum)
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.initWebSocket()
                that.lockReconnect = false
            }, 5000)
        },
        heartBeatReset() {
            //重置心跳
            var that = this
            //清除时间
            clearTimeout(that.timeoutObj)
            clearTimeout(that.serverTimeoutObj)
            //重启心跳
            that.heartBeatStart()
        },
        heartBeatStart() {
            //开启心跳
            var self = this
            self.timeoutObj && clearTimeout(self.timeoutObj)
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)
            self.timeoutObj = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息
                if (self.ws.readyState == 1) {
                    //如果连接正常
                    self.ws.send('ping')
                } else {
                    //否则重连
                    console.log('readyState is ', self.ws.readyState)
                    self.wsReconnect()
                }
                self.serverTimeoutObj = setTimeout(function () {
                    //超时关闭
                    console.log('超时关闭!')
                    self.ws.close()
                }, 10000)
            }, 5000)
        },
        monitorWebsocket() {
            var _this = this
            this.ws.onopen = function (event) {
                console.log('连接' + event)
                _this.heartBeatStart() // 开启心跳
            }
            this.ws.onmessage = function (event) {
                if (event.data === 'pong') {
                    console.log(event.data)
                    //收到服务器信息，心跳重置
                    _this.heartBeatReset()
                    return
                }
                let data = JSON.parse(event.data)
                if (data == '') {
                    return
                }
                _this.heartBeatReset()
                if (data['is_warning']) {
                    if (_this.WarningImgIndex[2]) {
                        _this.WarningImgInfo.warningimgpath4 = _this.WarningImgInfo.warningimgpath3
                    }
                    if (_this.WarningImgIndex[1]) {
                        _this.WarningImgInfo.warningimgpath3 = _this.WarningImgInfo.warningimgpath2
                        _this.WarningImgIndex[2] = true
                    }
                    if (_this.WarningImgIndex[0]) {
                        _this.WarningImgInfo.warningimgpath2 = _this.WarningImgInfo.warningimgpath1
                        _this.WarningImgIndex[1] = true
                    }
                    _this.WarningImgInfo.warningimgpath1 = '/' + data['image_path']
                    _this.WarningImgIndex[0] = true
                } else {
                    _this.ImgInfo.imgPath = '/' + data['image_path']
                }

                console.log(data['img_coordinate'])
            }
            this.ws.onerror = function (event) {
                // alert(event.data);
                console.log('错误：' + event)
                _this.wsReconnect()
                // print("错误："+event.data)
            }
            this.ws.onclose = function (event) {
                //连接关闭事件
                //提示关闭
                console.log('isDestroyed: ', _this.isDestroyed)
                if (!_this.isDestroyed) {
                    console.log('连接已关闭:', event.code + ' ' + event.reason + ' ' + event.wasClean)
                    _this.reconnect_num += 1
                    var err_str = '网络服务差, 正在执行第' + _this.reconnect_num.toString() + '次重连！'
                    _this.notify('错误', err_str, 'error')
                }
                //重连
                _this.wsReconnect()
            }
        },

        LoopTS(obj, key) {
            let _this = this
            for (let j = 0; j < 3; j++) {
                for (let i = 1; i <= 10; i++) {
                    setTimeout(function () {
                        // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                        $(obj).css({
                            'box-shadow': 'red 0px 0px ' + i + 'px ' + i + 'px inset',
                        })
                    }, i * 15)
                }
                let num = 1
                for (let i = 9; i >= 0; i--) {
                    setTimeout(function () {
                        // $(obj).css({"box-shadow": _this.ColorList.get(key)+" 0px 0px "+i+"px "+i+"px inset"})
                        $(obj).css({
                            'box-shadow': 'red 0px 0px ' + i + 'px ' + i + 'px inset',
                        })
                    }, num * 15 + 150)
                    num += 1
                }
            }
        },
    },
    mounted() {
        let player_1 = document.getElementById('video_1')
        let stream_1 = 'http://10.10.10.241/flv?port=1985&app=myapp&stream=testv'
        this.play_stream(stream_1, player_1)
        this.monitorWebsocket() // websocket 监听事件
        let ws = wsEvent.start(this.ptzWebSocket)
    },

    created() {
        // //页面刚进入时开启长连接
        this.initWebSocket()
    },
    destroyed() {
        console.log('切换页面关闭连接')
        this.isDestroyed = true
        this.ws.close()
        //页面销毁时关闭长连接
        // this.wsReconnect();
        // window.addEventListener('beforeunload', e => this.wsReconnect(e))
        wsEvent.end(ws)
    },
    beforeDestroy() {
        this.isDestroyed = true
        this.ws.close()
        // window.addEventListener('beforeunload', e => this.wsReconnect())
    },
}
</script>

<style scoped>
.clearfix::before,
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}

.content {
    width: 100%;
    height: 100%;
    padding-left: 0.5%;
    background-color: rgba(4, 30, 43, 0.8);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.left .left-top {
    width: 99%;
    height: 75%;
    border: 1px solid #00b0f0;
    border-radius: 5px;
}

.left .left-top .title {
    width: 100%;
    height: 5%;
    text-align: center;
    position: relative;
}

.left .left-top .title .curent-msg {
    width: 45%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.left .left-top .title .curent-msg .msg-box {
    height: 80%;
    color: #fff;
}

.left .left-top .title h3 {
    margin-top: 1%;
}

.left .left-top .bigimg {
    width: 100%;
    height: 85%;
    /* background-image: url(../../static/images/camera_default.png);
  background-size: 100%; */
    /* border: 1px solid #00B0F0; */
    position: relative;
}

.left .left-top .bigimg .img-div {
    width: 100%;
    height: 100%;
}

.left .left-top .bigimg .switch {
    position: absolute;
    right: 2%;
    top: -6%;
}

.left .left-top .bigimg .switch>>>.el-switch__label {
    color: #fff;
}

.left .left-top .bigimg .allimg {
    width: 30%;
    height: 30%;
    /* background-color: rgba(4, 30, 43, 0.8); */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
}

.left .left-top .bigimg .allimg img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
}

.left .left-top .bigimg .warn-msg {
    width: 30%;
    height: 30%;
    background-color: rgba(4, 30, 43, 0.5);
    position: absolute;
    top: 0;
    right: 0;
}

.left .left-top .bigimg .warn-msg .msg-text {
    padding: 2%;
}

.left .left-top .bigimg img {
    width: 100%;
    height: 100%;
}

.left .left-top .left-mid {
    width: 100%;
    height: 8%;
    /* background-color: #00b0f0; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.left .left-top .left-mid .mid-box {
    width: 96%;
    height: 50%;
}

.left .left-top .left-mid .mid-box>>>.el-radio {
    color: #fff;
}

.left .left-bottom {
    width: 99%;
    height: 23%;
    border: 1px solid #00b0f0;
    border-radius: 5px;
}

.left .left-bottom .title {
    width: 100%;
    height: 13%;
    text-align: center;
}

.left .left-bottom .event-img-list {
    width: 100%;
    height: 87%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.left .left-bottom .event-img-list .img-box {
    width: 24.5%;
    height: 100%;
    /* border: 1px solid #00b0f0; */
}

.left .left-bottom .event-img-list .img-box img {
    width: 100%;
    height: 100%;
}

.right {
    width: 30%;
    height: 100%;
    border-radius: 5px;
    background-color: #0b3d51;
}

/* right-top */
.right .right-top {
    width: 94%;
    height: 49%;
    background-color: rgba(4, 30, 43, 0.8);
    margin-left: 2%;
    margin-top: 2%;
    border-radius: 5px;
}

.right .right-top .PTZ-botton {
    width: 100%;
    background-color: #041e2b;
}

.right .right-top .PTZ-botton .bottons-box {
    width: 100%;
    height: 100%;
}

.right .right-top .PTZ-botton .bottons-box .bottons {
    width: 100%;
    padding-top: 2%;
}

/* right 焦距 */
.bottons-left {
    width: 45%;
    float: left;
    margin-left: 3%;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row {
    /* width: 96%; */
    height: 100%;
    padding-bottom: 3.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row .item {
    width: 30%;
    height: 38px;
    background-color: #15718e;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row .item img {
    width: 60%;
    height: 60%;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row .item i {
    color: #041e2b;
    font-size: 2.5vw;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row .items {
    width: 12%;
    height: 99%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.right .right-top .PTZ-botton .bottons-box .bottons .row .items {
    font-size: 0.5vw;
}

/* right  input输入等 */
.bottons-right {
    width: 45%;
    float: right;
    margin-right: 3%;
}

.right .right-top .PTZ-botton .bottons-box .title {
    color: #fff;
}

.bottons-right-one {
    margin-bottom: 2%;
}

/* 添加/删除球机 */
.right .right-top .bottons-right .bottons-right-two {
    /* height: 80%; */
    width: 100%;
    background-color: #0b3d51;
    text-align: center;
    padding: 4% 0;
    border-radius: 4px;
    margin-bottom: 2%;
}

.right .right-top .bottons-right .bottons-right-two:hover {
    color: #00b0f0;
    background-color: #15718e;
}

/* 选择跟踪方式/请输入跟踪ID */
.right .right-top .ctrl-bottons {
    display: flex;
    justify-content: space-around;
    margin: 0.1% 0.5%;
    cursor: pointer;
    color: #fff;
}

.right .right-top .bottons-right-three {
    width: 45%;
    margin-bottom: 2%;
}

/* 增加预置点等按钮 */
.right .right-top .ctrl-botton {
    width: 100%;
    height: 13%;
    background-color: #041e2b;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}

/* 增加预置点弹窗 */
.add_preset_style {
    display: flex;
    white-space: nowrap;
    width: 60%;
    margin: 0 auto;
    align-content: space-around;
    align-items: center;
    margin-top: 1%;
    color: #fff;
}

.add_preset_style span {
    width: 35%;
}

.ctrl-botton>>>.el-dialog__header {
    background-color: #041e2b;
    padding: 10px 20px 10px;
}

.ctrl-botton>>>.el-dialog__headerbtn {
    top: 12px;
}

.ctrl-botton>>>.el-dialog__title {
    color: #fff;
}

.ctrl-botton>>>.el-dialog__body {
    background-color: #0b3d51;
}

.ctrl-botton>>>.el-dialog__footer {
    background-color: #0b3d51;
    /* margin: 0 auto; */
    display: flex;
    margin-top: -3%;
    justify-content: center;
}

/* .ctrl-botton>>>.el-select {
    width: 100%;
} */

/* 显示预置点弹窗 */
.dialogPrint>>>.el-table tr,
.dialogPrint>>>.el-table th,
.dialogPrint>>>.el-table td {
    background-color: #0b3d51;
    border-bottom: 0.1px solid #00b0f0;
    color: #fff;
}

.dialogPrint>>>.el-table__empty-block {
    background-color: #0b3d51 !important;
}

.dialogPrint>>>.el-table__body tr:hover>td {
    background-color: transparent !important;
}

.dialogPrint>>>.el-input__inner {
    background-color: #0b3d51;
    color: #fff;
}

/* 添加巡航线弹窗 */
.ctrl-botton>>>.el-checkbox__label {
    color: #fff;
}

.right .right-top .ctrl-botton .button {
    width: 30%;
    height: 80%;
    color: #fff;
    border-radius: 3px;
    background-color: #0b3d51;
    margin-bottom: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.right .right-top .ctrl-botton .button:hover {
    color: #00b0f0;
    background-color: #15718e;
}

/* 更改跟踪参数 */
/* .TrackIdparaDialog>>> .el-form{
    margin: 0 auto;
} */
.TrackIdparaDialog>>>.el-form-item__label {
    color: #fff;
    width: 40%;
}

.TrackIdparaDialog>>>.el-form-item {
    margin-bottom: 0;
}

.TrackIdparaDialog>>>.el-input {
    width: 40%;
    /* display: flex; */
    margin-left: 2%;
    color: #fff;
}

.TrackIdparaBtn {
    /* margin: 0 auto; */
    margin-top: 3%;
    margin-left: 40%;
    /* transform:translate(-40%) */
}

/* 巡航线header  */
.right .right-bottom {
    width: 98%;
    height: 50%;
    border-radius: 5px;
    margin-left: 2%;
}

.right .right-bottom .center-box {
    width: 96%;
    height: 96%;
    /* background-color:red; */
    margin-top: 2%;
}

.right .right-bottom .center-box .channel-select>>>.el-descriptions-item__label:not(.is-bordered-label) {
    line-height: 200%;
}

.right .right-bottom .center-box .default-list {
    width: 100%;
    height: 90%;
}

.right .right-bottom .center-box .default-list .select-title {
    width: 100%;
    height: 8%;
    padding-top: 2%;
    background-color: #062534;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.right .right-bottom .center-box .default-list .select-title .arrow {
    width: 20%;
    height: 100%;
    position: relative;
    cursor: pointer;
    color: #fff;
}

.right .right-bottom .center-box .default-list .select-title .arrow:hover {
    color: #00b0f0;
}

.right .right-bottom .center-box .default-list .select-title .arrow i {
    position: absolute;
    left: 40%;
    top: 10%;
}

.right .right-bottom .center-box .default-list .select-title h3 {
    width: 60%;
    text-align: center;
}

/* 表单 */
.right .right-bottom .center-box .default-list .selected-list {
    width: 100%;
    height: 100%;
    position: relative;
}

.right .right-bottom .center-box .default-list .selected-list>>>.el-table__empty-block {
    background-color: #062534;
}

/* .right .right-bottom .center-box .default-list .selected-list>>> .el-table__body{
    overflow-y: scroll;
} */

/* 去除底部白线 */
.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}

.selected-list>>>.el-table__body-wrapper::-webkit-scrollbar {
    width: 100%;
    height: 100%;
}

.selected-list>>>.el-scrollbar__wrap::-webkit-scrollbar {
    width: 100%;
    height: 100%;
}

.right .right-bottom .center-box .default-list .selected-list .table-add {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: #135b7e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.event-img-list {
    /* display: flex; */
    /* justify-content: 
  ; */
    /* justify-content: space-evenly; */
    height: 100%;
}

.img-box {
    overflow: hidden;
    height: 100%;
}

.img-box img {
    height: 100%;
}
</style>
