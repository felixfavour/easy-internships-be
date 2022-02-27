export const errorMsg = (msg) => (typeof msg === 'string' ? ({ error: true, msg }) : ({ error: true, msg: msg.message }))

export const successMsg = (data) => ({ error: false, data })
