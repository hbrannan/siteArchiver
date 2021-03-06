import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import nock from 'nock'
import thunk from 'redux-thunk'
import { requestUrl } from '../src/actions'
import FormContainer from '../src/containers/Form'
import Form from '../src/components/Form'
const port = process.env.PORT || 3000;
const serverPath = `http://localhost:${port}`

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const dispatchMock = jest.fn()
const mokStor = mockStore({url: { isFetching: true, response_message:'', dispatchUrlRequest: new dispatchMock} })
jest.mock('../src/containers/SpinWheel', () => 'SpinWheel')
const enzymeForm = mount(
  <Provider store={mokStor}>
    <FormContainer />
  </Provider>
);

describe('async form actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({url: { isFetching: true, response_message:''} })
  })
  afterEach(() => {
    nock.cleanAll();
  })

  it('triggers html display action when site has html', () => {
    nock(`${serverPath}`)
      .post('/site', {
        url:'google.com'
      })
      .reply(200, { html: 'dummyHTML' })

    const expectedSuccessActions = [
      { type: 'REQUESTING_URL' },
      { type: 'HTML_FETCH_SUCCESS', 'html': 'dummyHTML' }
    ]

    return store.dispatch(requestUrl('google.com')).then(() => {
      expect(store.getActions()).toEqual(expectedSuccessActions)
    })
  });

  it('triggers coming soon actions when a site is awaiting html', () => {
    nock(`${serverPath}`)
      .post('/site', {
        url: 'marlamaples.com'
      })
      .reply(200, { msg: 'dummyMSG' })

    const expectedAwaitActions = [
      { type: 'REQUESTING_URL' },
      { type: 'URL_COMING_SOON', 'msg': 'dummyMSG' }
    ]

    return store.dispatch(requestUrl('marlamaples.com')).then(() => {
      expect(store.getActions()).toEqual(expectedAwaitActions)
    })
  });

  it('creates URL_FETCH_FAILURE on a bad request', () => {
    nock(`${serverPath}`)
      .post('/site', {
        url: 'notReal.com'
      })
      .replyWithError('serverError');

    const expectedErrorActions = [
      { type: 'REQUESTING_URL' },
      { type: 'URL_FETCH_FAILURE'}
    ]

    return store.dispatch(requestUrl('notReal.com')).then(() => {
      expect(store.getActions()).toEqual(expectedErrorActions)
    })
  });
});

describe('component props', () => {
  it('should init with an empty response message', () => {
    expect(enzymeForm.find(Form).props().responseMessage.length).toEqual(0);
  });

  it('should have a dispatchUrlRequest fn', () => {
    expect(enzymeForm.find(Form).props().dispatchUrlRequest).toBeInstanceOf(Function);
  });
})

/*

Testing TODOS:
- displays response message if exists
- event handlers
*/
