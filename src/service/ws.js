function useWs() {
  let recLock = false
  const startWs = (url, callback, data) => {
    if (typeof WebSocket === 'undefined') {
      return console.log('您的浏览器不支持WebSocket, 无法获取数据')
    }
    let ws = new WebSocket(url)
    ws.onopen = e => {
      if (ws.readyState === 1) {
        ws.send(data)
      }
      if (ws.readyState === 3) {
        reconnect()
      }
      heartCheck.start(ws)
    }
    ws.onmessage = e => {
      callback(e)
      heartCheck.start(ws)
    }
    ws.onclose = e => {
      if (e && e.code !== 1000) {
        console.log('WS非正常关闭 e.code不为1000 ')
        reconnect()
      }
    }
    ws.onerror = e => {
      console.log('WS错误 e.data:', e.data)
      reconnect()
    }
    const reconnect = () => {
      if (!recLock) {
        recLock = true
        setTimeout(() => {
          startWs(url, callback, data)
          recLock = false
        }, 3000)
      }
    }
    return ws
  }

  const endWs = ws => {
    if (ws) {
      ws.close(1000)
      recLock = true
      heartCheck.stop()
    }
  }

  let heartCheck = {
    timeout: 5000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start(ws) {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        const ping = { ping: true }
        ws.send(JSON.stringify(ping))
        this.serverTimeoutObj = setTimeout(() => {
          console.log('没有收到后台的数据，重新连接')
          reconnect()
        }, this.timeout)
      }, this.timeout)
    },
    // reset(ws) {
    //   clearTimeout(this.timeoutObj)
    //   clearTimeout(this.serverTimeoutObj)
    //   this.start(ws)
    // },
    stop() {
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
    },
  }
  return { startWs, endWs }
}

export default useWs
