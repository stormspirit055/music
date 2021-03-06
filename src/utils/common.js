export function isDef(v) {
  return v !== undefined && v !== null
}
export function generateImgurl(url , w, h) {
  if (!h) h = w
  if (url) {
    return `${url}?imageView=1&thumbnail=${w}z${h}&type=webp&quality=50`
  } else {
    return ''
  }
}
export function filterProcessTime(time) {
  time = Math.floor(time)
  let minute = time / 60 < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
  let second = time % 60 < 10 ? '0' + time % 60 : time % 60
  return minute + ':' +second
}
export function countFilter(v) {
  return v / 10000 > 1 ? (v / 10000).toFixed(1) + '万' : '1万'
}
export function isChildOf(child, parents) {
  let mark = 0
  const parentNodes = parents.map(v => document.querySelector(v))
  for (let value of parentNodes) {
    let parentNode = child
    while(parentNode) {
      if(value === parentNode) {
          mark++
        }
        parentNode = parentNode.parentNode;
    }
  }
  return mark !== 0;
}