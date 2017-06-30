import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from '../src/components/App';

const middlewares = [];
const state = [];
const mockStore = configureMockStore(middlewares)([]);

describe('App (Snapshot)', () => {
  it('consistently renders the App shell', () => {
    const component = renderer.create(<Provider store={mockStore}><App /></Provider>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('Welcome renders hello world', () => {
    const app = shallow(<App />);
    expect(app.find('h1').text()).toEqual('Web Crawler');
  });

});


/*
  Resources
  - Understanding a component’s contract: defines the expected behavior of your component and
    what assumptions are reasonable to have about its usage
      - What it renders  - props  - state held  - response to user interactions
      - context rendered in  - side effects as a part of component lifecycle
      - performance of methods called on instance  -

  Test shouldn't need to exactly duplicate app.
  Test shouldn't duplicate library code.
  Trivial or important detail? Does this aspect affect the component's public API?

  https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8
  https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
  https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
*/
