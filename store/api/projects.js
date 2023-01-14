import axios from 'axios'
// import { saveAs } from 'file-saver'
import getMD from '@/lib/git-markdown-api'
import { crudState, crudGetters, crudMutations, crudActions } from '@/lib/resources'

axios.defaults.withCredentials = true
const API_URL = `${process.env.API_BASE_URL}/api`

export const state = () =>
  crudState({
    markdown: '',
    markdownText: '',
    pages: [],
    page: {},
  })

export const getters = crudGetters({
  markdown: state => {
    return state.markdown
  },
  markdownText: state => {
    return state.markdownText
  },
  pages: state => {
    return state.pages
  },
  page: state => {
    return state.page
  },
})

export const mutations = crudMutations({
  setMarkdown(state, response) {
    state.markdown = response
  },
  setMarkdownText(state, response) {
    state.markdownText = response
  },
  setPages(state, response) {
    state.resource.pages = response
  },
  setPage(state, response) {
    state.page = response
  },
})

export const actions = crudActions(axios, `${API_URL}/projects`, {
  getMarkdown: async ({ commit }, argument) => {
    const response = await getMD(argument.data)
    commit('setMarkdown', response)
    commit('setMarkdownText', argument.data)
  },
  download: async ({ commit }, argument) => {
    console.log('saveAs(blob, fileName)')
    return await axios
      .get(`${API_URL}/export/${argument.id}`, {
        responseType: 'arraybuffer',
        headers: { Accept: 'application/zip' },
      })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/zip' })
        const uri = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = argument.name + '.zip'
        link.href = uri
        link.click()
        return true
      })
      .catch(() => {
        return false
      })
  },
  getPage: async ({ commit }, argument) => {
    return await axios
      .get(`${API_URL}/projects/${argument.id}/pages/${argument.number}`)
      .then(response => {
        commit('setPage', response.data)
        return true
      })
      .catch(() => {
        return false
      })
  },
  putPages: async ({ commit }, argument) => {
    return await axios
      .put(`${API_URL}/pages/${argument.id}`, argument.data)
      .then(response => {
        commit('setPages', response.data)
        return true
      })
      .catch(e => {
        console.log(e)
        return false
      })
  },
  putPage: async ({ commit }, argument) => {
    return await axios
      .put(`${API_URL}/pages/${argument.id}`, argument.data)
      .then(response => {
        commit('setPage', response.data)
        return true
      })
      .catch(() => {
        return false
      })
  },
})
// function getFileName(contentDisposition) {
//   let fileName = contentDisposition.substring(contentDisposition.indexOf("''") + 2, contentDisposition.length)

//   fileName = decodeURI(fileName).replace(/\+/g, ' ')

//   return fileName
// }
