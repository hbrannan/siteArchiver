import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { requestUrl } from '../src/actions';
import nock from 'nock';
const serverPath = 'http://localhost:3000';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async form actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ isFetching: true, response_message:'echo' })
  })
  afterEach(() => {
    nock.cleanAll();
  })

  it('creates HTML_FETCH_SUCCESS when a site has html', () => {
    nock(`${serverPath}`)
      .get('/site?url=google.com')
      .reply(200, { html: 'dummyHTML' })

    const expectedSuccessActions = [
      { type: 'REQUESTING_URL', 'url': 'google.com'},
      { type: 'HTML_FETCH_SUCCESS', 'html': 'dummyHTML' }
    ]

    return store.dispatch(requestUrl('google.com')).then(() => {
      expect(store.getActions()).toEqual(expectedSuccessActions)
    })
  });

  it('creates URL_COMING_SOON when a site is awaiting html', () => {
    nock(`${serverPath}`)
      .get('/site?url=marlamaples.com')
      .reply(200, { msg: 'dummyMSG' })

    const expectedAwaitActions = [
      { type: 'REQUESTING_URL', 'url': 'marlamaples.com'},
      { type: 'URL_COMING_SOON', 'msgObj': 'dummyMSG' }
    ]

    return store.dispatch(requestUrl('marlamaples.com')).then(() => {
      expect(store.getActions()).toEqual(expectedAwaitActions)
    })
  });

  it('creates URL_FETCH_FAILURE on a bad request', () => {
    nock(`${serverPath}`)
      .get('/site?url=notReal.com')
      .replyWithError('serverError');

    const expectedErrorActions = [
      { type: 'REQUESTING_URL', 'url': 'notReal.com'},
      { type: 'URL_FETCH_FAILURE'}
    ]

    return store.dispatch(requestUrl('notReal.com')).then(() => {
      expect(store.getActions()).toEqual(expectedErrorActions)
    })
  });
})


//TODO: handling alt status codes e.g., 301s, 404s, 500s, etc.

//https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
