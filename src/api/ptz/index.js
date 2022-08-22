import axios from 'axios'
import qs from 'qs'
const ptzsendControl = form => axios.get('/api/v1/ptz/ptz', { params: form }).then(res => res.data)
const ptzinitControl = form => axios.get('/api/v1/ptz/ptzinit', { params: form }).then(res => res.data)
const ptzpresetControl = form => axios.get('/api/v1/ptz/ptzpreset', { params: form }).then(res => res.data)
const ptzipControl = form => axios.get('/api/v1/ptz/ptzip', { params: form }).then(res => res.data)
const ptzdownControl = form => axios.get('/api/v1/ptz/ptzsend', { params: form }).then(res => res.data)
const ptzadd = form => axios.get('/api/v1/camera/add', { params: form }).then(res => res.data);
export {
  ptzsendControl,
  ptzinitControl,
  ptzpresetControl,
  ptzipControl,
  ptzdownControl,
  ptzadd,
}
