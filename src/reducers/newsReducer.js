import { RECEIVE_ARTICLES, REQUEST_ARTICLES, FAILED_REQUEST } from "../actions"

const initialState = {
  isFetching: false,
  articles: []
}


const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_ARTICLES:
      const newArticles = [... new Set(state.articles.concat(payload))];
      return Object.assign({}, state, {
        isFetching: false,
        articles: newArticles
      })

    case FAILED_REQUEST:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state;
  }
}

export default newsReducer;