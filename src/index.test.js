import React from 'react';
import { shallow } from 'enzyme';
import App from "./App";
import CardContainer from "./containers/CardContainer"


import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers"
import thunk from "redux-thunk"

const store = createStore(reducer, applyMiddleware(thunk))

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Provider store={store}><App /></Provider>);
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());
  it('should render a Card Container', () => {
    expect(wrapper.containsMatchingElement(<CardContainer />));
  })

})
