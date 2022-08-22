import axios from 'axios'
import qs from 'qs'
const SaveArea = form => axios.get('/api/v1/system/area_setting', { params: form }).then(res => res.data)
const ListArea = form => axios.get('/api/v1/system/area_list', { params: form }).then(res => res.data)
const SetNetwork = form => axios.get('/api/v1/system/setting_network', { params: form }).then(res => res.data)
const GetNetwork = form => axios.get('/api/v1/system/network_info', { params: form }).then(res => res.data)
const UpDate = form => axios.post('/api/v1/system/update', qs.stringify(form)).then(res => res.data)
const DeviceInfo = form => axios.get('/api/v1/system/list', { params: form }).then(res => res.data)



export {
    SaveArea,
    ListArea,
    SetNetwork,
    GetNetwork,
    UpDate,
    DeviceInfo,
}