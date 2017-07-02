import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import App from '../src/components/App'
import AppScreen from '../src/containers/AppScreen'
import state from './state-stub'

const middlewares = [];
const mockStore = configureMockStore(middlewares)({app: {isDisplayingSite: false}});
jest.mock('../src/containers/SiteDisplay', () => 'div className="site__container"')
jest.mock('../src/components/SearchDisplay', () => 'div className="search__container"')

describe('App Screen', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Provider store={mockStore}>
        <AppScreen />
      </Provider>
    );
    expect(wrapper.find(AppScreen).length).toEqual(1);
  });

});

describe('App (Snapshot)', () => {
  it('consistently renders the App shell', () => {
    const component = renderer.create(
      <Provider store={mockStore}>
        <AppScreen />
      </Provider>).toJSON();

    expect(component).toMatchSnapshot();
  });
});


/*

Todo:

  refactor: to use moduleNameMapper option and a stub file in Jest config
  (rather than current weback.test config & test env & plugin)
*  *  *    https://github.com/facebook/jest/issues/870
  Jest config:

  "moduleNameMapper": {
    "\.scss$": "path/to/SCSSStub.js"
  }
  SCSSStub.js:

  module.exports = {}; // Or other stub data for all SCSS modules.

*  *  *
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
