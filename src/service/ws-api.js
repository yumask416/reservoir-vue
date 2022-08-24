import $ws from './ws'

/**
 * 在vue文件中的应用示例
 * import { wsEvent } from '...'
 * let ws = wsEvent.start(callback)
 * setTimeout(() => {
 *   wsEvent.end(ws)
 * }, 6000)
 */

let { startWs, endWs } = $ws()
export const wsEvent = {
  start: (callback, url = 'ws://10.10.10.226:10225/api/v1/event/ws') => startWs(url, callback),
  end: ws => endWs(ws),
}