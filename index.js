import { encode, decode } from '@whaaaley/query-string'

var Router = {
  state: {
    query: {},
    path: '/'
  },
  actions: {
    update: function () {
      const hash = window.location.hash
      const index = hash.indexOf('?')
      return {
        query: decode(hash.slice(index)),
        path: hash.slice(1, index === -1 ? hash.length : index)
      }
    },
    route: function (state, _, data) {
      window.location.hash = (data.path || state.path) + encode(data.query || state.query)
    }
  },
  init: function (_, actions) {
    var update = actions.update
    update()
    window.onhashchange = function () {
      update()
    }
  }
}

export { Router }
