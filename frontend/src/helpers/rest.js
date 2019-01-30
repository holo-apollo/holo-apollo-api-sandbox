// @flow
import { create } from 'apisauce';
import { isEmpty, isNil } from 'ramda';

type Data = { [string]: any };
type Files = FileList | File[];
type FilesMap = { [string]: Files };

export const api = create({
  baseURL: '/api/v1/',
  headers: {
    post: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

export function requestWithFiles(
  method: 'post' | 'put',
  url: string,
  data: Data,
  files?: FilesMap = {}
) {
  if (!isNil(files) && !isEmpty(files)) {
    const formData = new FormData();
    Object.keys(files).forEach(key => {
      const fileList = files[key];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        formData.append(key, file);
      }
    });
    Object.keys(data).forEach(key => {
      const dataItem = data[key];
      formData.append(key, dataItem);
    });
    return api[method](url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  return api[method](url, data);
}

// for backward compatibility for now
export function get(url: string, data?: Data = {}) {
  return api.get(url, data);
}

export function post(url: string, data: Data, files?: FilesMap) {
  return requestWithFiles('post', url, data, files);
}

export function put(url: string, data: Data) {
  return api.put(url, data);
}

export function patch(url: string, data: Data) {
  return api.patch(url, data);
}

export function del(url: string, data: Data) {
  return api.delete(url, data);
}
