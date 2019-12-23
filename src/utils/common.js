export function isDef(v) {
  return v !== undefined && v !== null
}
export function generateImgurl(url, w, h) {
  if (!h) h = w
  return `${url}?imageView=1&thumbnail=${w}z${h}&type=webp&quality=80`
}
export function filterProcessTime(time) {
  time = Math.floor(time)
  let minute = time / 60 < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
  let second = time % 60 < 10 ? '0' + time % 60 : time % 60
  return minute + ' : ' +second
}