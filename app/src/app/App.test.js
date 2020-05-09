

import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./App";
import { expect } from 'chai';
import sinon from 'sinon';
const mockStore = configureMockStore();
const store = mockStore({});

describe("App Component", () => {
    it("should render without throwing an error", () => {
      shallow(
        <Provider store={store}>
            <App />
        </Provider>
      );
    });
    it("should render without throwing an error", () => { 
      let wrapper =  shallow(
        <Provider store={store}>
            <App />
        </Provider>
      );
      const welcome = <h1> aa </h1>;
      expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
      
    });
 
  it('sums numbers', () => {
    expect(3).equal(3);
    expect(4).equal(4);
  });
});