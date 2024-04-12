import {debounce} from 'lodash-es'

function isNodeOrWeb() {
  const freeGlobal =
    (typeof global === 'undefined' ? 'undefined' : typeof global) === 'object' &&
    global &&
    global.Object === Object &&
    global
  // eslint-disable-next-line no-undef
  const freeSelf = typeof self === 'object' && self && self.Object === Object && self
  return freeGlobal || freeSelf
}

if (!isNodeOrWeb()) {
  global.Date = Date
}

export {debounce}
