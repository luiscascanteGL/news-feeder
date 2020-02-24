import React from 'react';
import { mount } from 'enzyme';
import CardContainer from "./index";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "../../reducers"
import thunk from "redux-thunk"

const store = createStore(reducer, applyMiddleware(thunk))


describe('Card Container', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Provider store={store}><CardContainer /></Provider>)
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('Should render a <div/>', () => {
    expect(wrapper.first('div').length).toEqual(1);
  })

  it('Should render a <form/>', () => {
    expect(wrapper.find('form').length).toEqual(1);
  })

  it('Should render a <input/>', () => {
    expect(wrapper.find('input').length).toEqual(1);
  })

  it('Should render a <select/>', () => {
    expect(wrapper.find('select').length).toEqual(1);
  })

  it('Should render two <label/>', () => {
    expect(wrapper.find('label').length).toEqual(2);
  })
})