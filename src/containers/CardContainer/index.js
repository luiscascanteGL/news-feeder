import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchArticles } from "../../actions";
import CardComponent from "../../components/Card";

import "./index.scss";

export const CardContainer = ({ isFetching, articles, fetchArticles }) => {

  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  let page = 0;

  useEffect(() => {
    fetchArticles(page);
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setFilteredArticles(filterArticles());
  }, [searchText, selectedSource, articles]);

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  }

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleScroll = async () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      page = page + 1;
      await fetchArticles(page);
    }
  }

  const checkSourceMatch = ({ source }) => {
    try {
      return source.hasOwnProperty("name") && source.name === selectedSource;
    }
    catch (error) {
      console.log(error);
    }
  }

  const checkTextMatch = ({ title = "", description = "", author = "", content = "" }) => {
    try {
      return title.includes(searchText) || description.includes(searchText) || author.includes(searchText) || content.includes(searchText);
    }
    catch (error) {
      console.log(error);
    }
  }

  const sources = articles.map(({ source }) => {
    return (<option key={`${source.name}`} value={source.name}>{source.name}</option>);
  })


  const filterArticles = () => {
    if (searchText !== "" && selectedSource !== "") {
      try {
        return articles.filter((article) => checkTextMatch(article) && checkSourceMatch(article));
      }
      catch (error) {
        console.log(error);
        return articles;
      }
    }
    else if (searchText !== "") {
      try {
        return articles.filter((article) => checkTextMatch(article));
      }
      catch (error) {
        console.log(error);
        return articles;
      }
    }
    else if (selectedSource !== "") {
      return articles.filter((article) => checkSourceMatch(article));
    }
    else {
      return articles;
    }
  }



  return (
    <div className="container">
      <form className="form--container" onSubmit={handleSubmit}>
        <div className="form--group">
          <label htmlFor="sources">Filter by</label>
          <select name="sources" id="sources" onChange={handleSourceChange}><option value="">All</option>{sources}</select>
        </div>
        <div className="form--group">
          <label htmlFor="keyword">Search</label>
          <input name="keyword" id="keyword" placeholder="Type a keyword..." type="text" value={searchText} onChange={handleTextChange} />
        </div>
      </form>
      <div className="card--list">
        {filteredArticles.map((article) => <CardComponent key={`${article.title}`} article={article} />)}
        <div style={{ width: '400px', padding: '0 2% 0 2%' }} />
      </div>
      {isFetching ? "Loading..." : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isFetching: state.newsReducer.isFetching,
    articles: state.newsReducer.articles
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: (page) => dispatch(fetchArticles(page))
  }
}

CardContainer.propTypes = {
  isFetching: PropTypes.bool,
  articles: PropTypes.array,
  fetchArticles: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);


