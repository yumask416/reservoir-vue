import axios from 'axios'
import qs from 'qs'
// const UserLogin = () => axios.post('/api/v1/user/login').then(res => res.data)
// const UserLogin = form => axios.post('/api/v1/user/login', form).then(res => res.data)
const UserLogin = form => axios.post('/api/v1/user/login', qs.stringify(form)).then(res => res.data)

export {
  UserLogin,

}
