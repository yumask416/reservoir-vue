import axios from 'axios'
const getEvent = form => axios.get('/api/v1/event/list', { params: form }).then(res => res.data)


export {
  getEvent,

}
