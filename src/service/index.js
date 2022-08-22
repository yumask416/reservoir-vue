// 版本一通用基本接口
const v1Base = '/api/v1'
// 摄像头相关接口
const cameraBase = '/camera';
export const camera = {
  add_excel:'', // 根据表格添加摄像头功能
  list:'', // 获取摄像头列表
  get_info:'', //获取摄像头配置信息
  config:'', //配置摄像头
  inference:'', //获取配置好摄像头列表
  add:'',
  ai:'',
}
// 摄像头相关接口代理
export const cameraUrl = new Proxy(camera,{
  get(target,key) {
    return `${v1Base}${cameraBase}/${key}`
  }
})

// 播放接口
const realtimeBase = '/realtime';
export const realtime = {
  play: '', //单路播放请求
}

// 播放接口及相关代理
export const realtimeUrl = new Proxy(realtime,{
  get(target,key) {
    return `${v1Base}${realtimeBase}/${key}`
  }
})

// 播放接口
const manytimeBase = '/report';
export const manytime = {
  play: '', //单路播放请求
  statistic:'', //主页面统计
}

// 播放接口及相关代理
export const manytimeUrl = new Proxy(realtime,{
  get(target,key) {
    return `${v1Base}${manytimeBase}/${key}`
  }
})

// 系统设置相关接口
const settingBase = '/setting';
export const setting = {
  get_time:'', //请求系统时间
  update_time:'', //更新系统时间
  reboot:'', //重启系统
  reduction:'', 
}
export const settingUrl = new Proxy(setting,{
  get(target,key) {
    return `${v1Base}${settingBase}/${key}`
  }
})


// 重连系统接口
const pingBase = '/ping';
export const pingUrl = `${v1Base}${pingBase}`

// 云台控制接口
const controlBase = '/ptz';
export const ptz = {
  ptz:'', 
  ptzinit:'',
  ptzpreset:'',
  ptzip:'',
  ptzsend:'',
}
export const ptzUrl = new Proxy(ptz,{
  get(target,key) {
    return `${v1Base}${controlBase}/${key}`
  }
})