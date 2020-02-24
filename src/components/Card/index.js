import React from 'react'
import PropTypes from 'prop-types';
import "./index.scss"

const CardComponent = ({ article }) => {
  const { title, source, description, urlToImage, author, publishedAt, url } = article;
  const publishDate = new Date(publishedAt);
  const daysOfWeek = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <a href={url} className="article--card">

      <h2 className="article--title">{title.substring(0, title.indexOf("-"))}</h2>
      <time className="article--date" dateTime={publishedAt}>{`${daysOfWeek[publishDate.getMonth()]} ${publishDate.getDate()}, ${publishDate.getFullYear()}`}</time>
      {/* Each image should have a specific alt which is not included in the API response */}

      <img className="article--image" src={urlToImage} alt="" />
      <address className="row--container">
        <strong className="article--source">{source.name}</strong>
        {author && <p className="article--author"><em >By {author}</em></p>}
      </address>
      <p className="article--description">{description}</p>

    </a >
  )
}

CardComponent.propTypes = {
  article: PropTypes.oneOfType({
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string || null,
    author: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
    source: PropTypes.oneOfType({
      id: PropTypes.string || null,
      name: PropTypes.string
    })
  })
}


export default CardComponent;