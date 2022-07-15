import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.MIX_API_BASE_URL
const baseHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}
const client = axios.create({
  baseURL,
  timeout: 20000,
  headers: baseHeaders,
})


type GetParam = {
  endpoint: string,
  config?: AxiosRequestConfig,
}

type UploadFileParam = {
  endpoint: string,
  params: { [key:string] : any },
  file?: any,
  files?: Array<any>,
  config?: AxiosRequestConfig,
}
type UploadPdfParam = {
  endpoint: string,
  shareFile?: any,
  boothFile?: any,
  roomFile?: any,
  config?: AxiosRequestConfig,
}

export default {
  async get({endpoint, config = {}}: GetParam) {
    const addedAuthConfig = addAuthToken(config)
    Object.assign(addedAuthConfig, {config})

    return client.get(endpoint, addedAuthConfig)
  },

  async post<T = any>({ endpoint, params = {}, config = {} }: { endpoint: string, params?: object, config?: {}}) {
    const addedAuthConfig = addAuthToken(config)
    Object.assign(addedAuthConfig, {config})

    return client.post<T>(endpoint, params, addedAuthConfig)
  },

  async put<T = any>({ endpoint, params = {}, config = {} }: { endpoint: string, params?: object, config?: {}}) {
    const addedAuthConfig = addAuthToken(config)
    Object.assign(addedAuthConfig, {config})

    return client.put<T>(endpoint, params, addedAuthConfig)
  },

  async uploadFile({endpoint, files, file, params, config = {}}: UploadFileParam) {
    const addedConfig = addAuthToken(config)
    addedConfig.headers['Content-type'] = 'multipart/form-data'

    const form = new FormData()
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        params[key].forEach((param: any) => {
          form.append(`${key}[]`, param)
        })
      } else {
        form.append(key, params[key])
      }
    })
    if (files) {
      files.forEach((file) => {
        form.append('files[]', file)
      })
    }
    form.append('file', file)

    return client.post(endpoint, form, addedConfig)
  },

  async uploadPdf({endpoint, shareFile, boothFile, roomFile, config = {}}: UploadPdfParam) {
    const addedConfig = addAuthToken(config)
    addedConfig.headers['Content-type'] = 'multipart/form-data'

    const form = new FormData()
    if (shareFile.content !== '') {
      form.append('sharePdf', shareFile.blob)
    }
    if (boothFile.content !== '') {
      form.append('boothPdf', boothFile.blob)
    }
    if (roomFile.content !== '') {
      form.append('roomPdf', roomFile.blob)
    }

    return client.post(endpoint, form, addedConfig)
  },

  async downloadFile(endpoint: string, config = {}) {
    const addedConfig = addAuthToken(config)
    addedConfig.responseType = 'arraybuffer'
    return client.get<ArrayBuffer>(endpoint, addedConfig)
  }
}

function addAuthToken(config: AxiosRequestConfig) {
  const accessToken = localStorage.getItem('token') || ''
  config.headers = {
    ...config.headers,
    ...baseHeaders,
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  }

  return config
}
