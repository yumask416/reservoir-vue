import axios from 'axios'
import qs from 'qs'
const listCam = form => axios.get('/api/v1/camera/list', { params: form }).then(res => res.data)
const addCam = form => axios.get('/api/v1/camera/add', { params: form }).then(res => res.data)
const onvifaddCam = form => axios.post('/api/v1/camera/scan', qs.stringify(form)).then(res => res.data)
const updateCam = form => axios.get('/api/v1/camera/update', { params: form }).then(res => res.data)
const configuration = form => axios.get('/api/v1/camera/ai', { params: form }).then(res => res.data)
const DeleteCam = form => axios.delete('/api/v1/camera/remove' + '/' + form).then(res => res.data)
const DeleteCamList = form => axios.delete('/api/v1/camera/removes' + '/' + form).then(res => res.data)
const RestoreCam = form => axios.get('/api/v1/camera/stop', { params: form }).then(res => res.data)
const PlayCam = form => axios.get('/stream/play', { params: form }).then(res => res.data)
const captureCam = form => axios.get('/api/v1/camera/capture', { params: form }).then(res => res.data)
const playAiCam = form => axios.get('/api/v1/camera/ai/play', { params: form }).then(res => res.data)

export {
  listCam,
  addCam,
  onvifaddCam,
  updateCam,
  configuration,
  DeleteCam,
  DeleteCamList,
  RestoreCam,
  PlayCam,
  captureCam,
  playAiCam
}
