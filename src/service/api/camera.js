import { cameraUrl,realtimeUrl,manytimeUrl,settingUrl,pingUrl,ptzUrl } from "../index";
import { fetchGet, fetchPost } from '@/config/axiosConfig';
import url from "postcss-url";

// 根据表格添加摄像头功能
export async function add_excel(data, url = cameraUrl.add_excel) {
	return await fetchPost(url, data);
}
// 获取摄像头列表
export async function getlist(data, url = cameraUrl.list) {
  return await fetchGet(url, data);
}

export async function listCam(data, url = cameraUrl.list) {
  return await fetchGet(url, data);
}

export async function playAiCam(data, url = cameraUrl.ai.play) {
  return await fetchGet(url, data);
}

// 获取配置好摄像头列表
export async function getInference(data, url = cameraUrl.inference) {
  return await fetchGet(url, data);
}

export async function getCameraInfo(data, url = cameraUrl.get_info) {
  return await fetchGet(url, data);
}

export async function updateConfig(data, url = cameraUrl.config) {
  return await fetchGet(url, data);
}

// 单路播放接口
export async function getplay(data, url = realtimeUrl.play) {
  return await fetchGet(url, data);
}
// 多路播放接口
export async function getmanyplay(data, url = manytimeUrl.play) {
  return await fetchGet(url, data);
}

export async function getstatistic(data, url = manytimeUrl.statistic) {
  return await fetchGet(url, data);
}

// 获取系统时间
export async function getsystemTime(data, url = settingUrl.get_time) {
  return await fetchGet(url, data);
}

// 更新系统时间
export async function UpdatesystemTime(data, url = settingUrl.update_time) {
  return await fetchGet(url, data);
}

// 系统重启
export async function reBoot(data, url = settingUrl.reboot) {
  return await fetchGet(url, data);
}

// 系统重连
export async function Ping(data, url = pingUrl) {
  return await fetchGet(url, data, {timeout: 1000});
}

export async function reDuction(data, url = settingUrl.reduction) {
  return await fetchGet(url, data);
}

// 云台控制
export async function ptzsendControl(data, url = ptzUrl.ptz){
  return await fetchGet(url, data);
}

export async function ptzinitControl(data, url = ptzUrl.ptzinit){
  return await fetchGet(url, data);
}
// 操作中的保存
export async function ptzpresetControl(data, url = ptzUrl.ptzpreset){
  return await fetchGet(url, data);
}
// 添加球机
export async function ptzipControl(data, url = ptzUrl.ptzip){
  return await fetchGet(url, data);
}

export async function ptzdownControl(data, url = ptzUrl.ptzsend){
  return await fetchGet(url, data);
}

export async function ptzdowninitControl(data, url = ptzUrl.ptzsendinit){
  return await fetchGet(url, data);
}

export async function ptzadd(data, url = cameraUrl.add) {
	return await fetchGet(url, data);
}
// 添加巡航线
export async function ptzlineControl(data, url = ptzUrl.ptzsend) {
	return await fetchGet(url, data);
}