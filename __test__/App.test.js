import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import App from '../src/components/App'
import AppScreen from '../src/containers/AppScreen'

const middlewares = [];
const mockStore = configureMockStore(middlewares)({app: {isDisplayingSite: false}});
jest.mock('../src/containers/SiteDisplay', () => 'SiteDisplay')
jest.mock('../src/components/SearchDisplay', () => 'SearchDisplay')
const enzymeAppMounted = mount(
  <Provider store={mockStore}>
    <AppScreen />
  </Provider>
);

describe('App Screen init', () => {
  it('should render', () => {
    expect(enzymeAppMounted.find(AppScreen).length).toEqual(1);
  });
  it('should init with isDisplayingSite as false', () => {
    expect(enzymeAppMounted.props().isDisplayingSite).toBeFalsy();
  });
  it('should instantiate SearchDisplay', () => {
    expect(enzymeAppMounted.find('SearchDisplay').length).toEqual(1);
  });
});

describe('App Screen on site HTML', () => {
  const component = mount(
    <Provider store={configureMockStore(middlewares)({app: {isDisplayingSite: true}})}>
      <AppScreen />
    </Provider>
  );
  it('should instantiate SearchDisplay', () => {
    expect(component.find('SiteDisplay').length).toEqual(1);
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

/*  Todo:

  refactor: to use moduleNameMapper option and a stub file in Jest config
  (rather than current weback.test config & test env & plugin)

*  *  *    https://github.com/facebook/jest/issues/870
  Jest config:

  "moduleNameMapper": {
    "\.scss$": "path/to/SCSSStub.js"
  }
  SCSSStub.js:

  module.exports = {}; // Or other stub data for all SCSS modules.

*/
