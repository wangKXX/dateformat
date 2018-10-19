/** 
 * @method
 * @param {Date}
 * @returns {String} 
 * @description
 */
function timeFormat(date) {
  let second = parseInt(date)// 秒
  let minute = 0// 分
  if (second > 60) {
    minute = parseInt(second / 60)
    second = parseInt(second % 60)
  }
  return `${minute.toString().padStart(2, 0)}:${second.toString().padStart(2, 0)}`
}
/** 
 * @method
 * @param {Array}
 * @returns {Object}
 * @description
 */
function mergeObject(arr) {
  return Object.assign({}, ...arr)
}

/**
 * @method
 * @param {File, Number}
 * @returns {File}
 * @description
 */
function cutDownImage(file, limit) {
  const MAX_SIZE = limit * 1024 *1024
  let file_size = file.size
  let promise = new Promise((resolve, reject) => {
    if (file_size > MAX_SIZE) {
      imageReader(file, {quality: MAX_SIZE/ file_size}).then((result) => {
        let file_object = base64UrlToBlob(result)
        if (file_object.size > MAX_SIZE) {
          cutDownImage(file_object, MAX_SIZE)
        } else {
          resolve(file_object)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
  return promise
}
/**
 * @method
 * @param {base64}
 * @returns {Blob}
 * @description
 */

function base64UrlToBlob(urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}
/**
 * @method
 * @param {File}
 * @returns {Promise}
 * @description
 */
function imageReader(file) {
  return new Promise((reslove, reject) => {
    let file_reader = new FileReader()
    file_reader.readAsDataURL(file)
    file_reader.onloadend = function() {
      canvasImage(this.result).then((result) => {
        reslove(result)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
/**
 * @param {File} imageData 
 * @param {Object} config 
 */
function canvasImage(imageData, config) {
  return new Promise((reslove, reject) => {
    let img = new Image()
    img.src = imageData
    img.onload = function(e) {
      let width = this.width
      let height = this.height
      let quality = 0.7
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let anw = document.createAttribute('width')
      anw.nodeValue = w
      let anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(this, 0, 0, width, height)
      let setQuality = config.quality
      if (setQuality && setQuality <= 1 && setQuality > 0) {
        quality = config.quality
      }
      let base64 = canvas.toDataURL('image/jpeg', quality)
      reslove(base64)
    }
    img.onerror = err => {
      reject(err)
    }
  })
}
export default {
  timeFormat,
  mergeObject,
  cutDownImage
}