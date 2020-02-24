import React from 'react';
import { shallow } from 'enzyme';
import CardComponent from "./index";

const article = {
  "source": {
    "id": "cnbc",
    "name": "CNBC"
  },
  "author": "Pippa Stevens",
  "title": "Warren Buffett interview live updates: 'Good for us' when stocks drop, Berkshire coronavirus impact - CNBC",
  "description": "Berkshire Hathaway's Warren Buffett talks stocks, investing, corporate governance and more.",
  "url": "https://www.cnbc.com/2020/02/24/warren-buffet-interview-live-updates.html",
  "urlToImage": "https://image.cnbcfm.com/api/v1/image/106074997-1565643500288gettybuffettnew.jpg?v=1565643583",
  "publishedAt": "2020-02-24T11:06:00Z",
  "content": "Warren Buffett joins CNBC's Becky Quick with an exclusive three-hour interview on Squawk Box Monday morning.\r\nFollow along below for the highlights:\r\n7:41 am: Buffett says Berkshire is worth the same with or without him\r\nBuffett will turn 90 later this year, … [+6105 chars]"
};

describe('Card Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardComponent article={article} />);
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('Should render a <a/>', () => {
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('Should render a <h2/>', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('Should render a <time/>', () => {
    expect(wrapper.find('time').length).toEqual(1);
  });

  it('Should render a <img/>', () => {
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('Every <img/> should have alt text', () => {
    expect(wrapper.find('img').prop('alt')).toBeDefined();
  });

  it('Should render a <address/>', () => {
    expect(wrapper.find('address').length).toEqual(1);
  });

  it('Should render a <strong/>', () => {
    expect(wrapper.find('strong').length).toEqual(1);
  });

  it('Should render a <em/>', () => {
    expect(wrapper.find('em').length).toEqual(1);
  });

  it('Should render a <p/>', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
})