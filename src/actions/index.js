import axios from "axios";

export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES"
export const REQUEST_ARTICLES = "REQUEST_ARTICLES"
export const FAILED_REQUEST = "FAILED_REQUEST"


export const requestArticles = () => {
  return {
    type: REQUEST_ARTICLES,
  }
}

export const receiveArticles = (payload) => {
  return {
    type: RECEIVE_ARTICLES,
    payload
  }
}

export const failedRequest = () => {
  return {
    type: FAILED_REQUEST
  }
}

export const fetchArticles = (page) => {
  return async dispatch => {
    dispatch(requestArticles());
    try {
      const { data } = await axios.get(`http://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=d112f69311854c6aaf5a650faf0c75c6&pageSize=20`);
      dispatch(receiveArticles(data.articles));
    }
    catch (error) {
      dispatch(failedRequest())
    }
  }
}