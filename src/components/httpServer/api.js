import axios from "axios";

export function exportExcel(url, options) {
  return new Promise((resolve, reject) => {
    //axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    let baseUrl = "/api";
    let Public = { //公共参数
    }
    axios({
      method: 'post',
      url: baseUrl+url, // 请求地址
      params: Object.assign(Public, options),
      data: options, // 参数
      responseType: 'blob', // 表明返回服务器返回的数据类型
      transformRequest: [function (options) {
        let ret = ''
        for (let it in options) {
          if(options[it] instanceof Array) {
            options[it].forEach((item)=>{
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(item) + '&'
            })
          }
          else {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(options[it]) + '&'
          }
        }

        return ret
      }],
      headers:{
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      response => {
        resolve(response.data)
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        let fileName = options.fileName + '.xlsx'
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName)
        } else {
          // console.log(3)
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}
