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
  it('should render a Card Container', () => {
    const wrapper = shallow(<Provider store={store}><App /></Provider>);
    expect(wrapper.containsMatchingElement(<CardContainer />));
  })

})
