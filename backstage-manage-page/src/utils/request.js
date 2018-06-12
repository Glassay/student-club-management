import axios from 'axios';
import qs from 'qs';
import HttpStatus from 'http-status-codes';
import NProgress from 'nprogress';
import { message, notification } from 'antd';
import '../../node_modules/nprogress/nprogress.css';
// import {
//   baseURL,
//   requestTimeOut
// }                 from './config'

axios.defaults.baseURL = "http://127.0.0.1:7001";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = false;// 状态码错误信息

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 添加一个请求拦截器，用于设置请求过渡状态
axios.interceptors.request.use((config) => {
  // 请求开始，蓝色过渡滚动条开始出现
  NProgress.start();
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // 请求结束，蓝色过渡滚动条消失
  NProgress.done();
  return response;
}, (error) => {
  // 请求结束，蓝色过渡滚动条消失
  // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪
  NProgress.done();
  return Promise.reject(error);
});

export default function request (opt) {
  // 调用 axios api，统一拦截
  return axios(opt)
    .then((response) => {
      // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
      // console.log(`【${opt.method} ${opt.url}】请求成功，响应数据：%o`, response);

      // 打印业务错误提示
      // if (response.data && response.data.code != '0000') {
      //   message.error(response.data.message);
      // }

      // return { ...response };
      return response.data;
    })
    .catch((error) => {
      // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
      // 请求配置发生的错误
      if (!error.response) {
        return console.log('Error', error.message);
      }

      // 响应时状态码处理 
      const status = error.response.status;
      const errortext = codeMessage[status] || error.response.statusText;
      
      notification.error({
        message: `请求错误 ${status}`,
        description: errortext,
      });
      
      // 存在请求，但是服务器的返回一个状态码，它们都在2xx之外
      // const { dispatch } = store;

      // if (status === 401) {
      //   dispatch(routerRedux.push('/user/login'));
      // } else if (status === 403) {
      //   dispatch(routerRedux.push('/exception/403'));
      // } else if (status <= 504 && status >= 500) {
      //   dispatch(routerRedux.push('/exception/500'));
      // } else if (status >= 404 && status < 422) {
      //   dispatch(routerRedux.push('/exception/404'));
      // }

      // 开发时使用，上线时删除
      console.log(`【${opt.method} ${opt.url}】请求失败，响应数据：%o`, error.response);

      return { code: status, message: errortext }; 
    });
}

// const fetch = (options) => {
//   let {
//     method,
//     data,
//     url,
//   } = options

//   switch (method.toLowerCase()) {
//     case 'get':
//       return axios.get(`${url}${data ? `?${qs.stringify(data)}` : ''}`)
//     case 'delete':
//       return axios.delete(url, { data })
//     case 'head':
//       return axios.head(url, data)
//     case 'post':
//       return axios.post(url, data)
//     case 'put':
//       return axios.put(url, data)
//     case 'patch':
//       return axios.patch(url, data)
//     default:
//       return axios(options)
//   }
// }

// export default function request (options) {
//   return fetch(options).then((response) => {
//     console.log('options: ', options, 'response: ', response);
//     if (response.status === HttpStatus.OK) {
//       return response.data
//     }
//     throw { response } // eslint-disable-line
//   }).catch((error) => {
//     const { response } = error;
//     console.log('request error: ', error);
//     let message, status
//     if (response) {
//       status = response.status
//       const { data, statusText } = response
//       message = data.message || statusText || HttpStatus.getStatusText(status)
//     } else {
//       status = 600
//       message = 'Network Error'
//     }
//     throw { status, message } // eslint-disable-line
//   })
// }

// export const setToken = function (authToken) {
//   axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
// }
