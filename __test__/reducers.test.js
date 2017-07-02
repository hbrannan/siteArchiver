import app from '../src/reducers/app_reducer'
import url from '../src/reducers/url_reducer'
import top_five from '../src/reducers/top_five_reducer'

describe('app reducer', () => {
  it('should handle HTML_FETCH_SUCCESS', () => {
    expect(
      app({
        isDisplayingSite:false,
        currentSite: '<html><body>Hello, <b>world</b>.</body></html>'
      },{
        type: 'HTML_FETCH_SUCCESS',
        html: '<html><body>Hey, <b>Joe</b>.</body></html>'
      })
    ).toEqual({
      isDisplayingSite: true,
      currentSite: '<html><body>Hey, <b>Joe</b>.</body></html>'
    })
  })

  it('should handle backToMain', () => {
    expect(
      app({
        isDisplayingSite: true,
        currentSite: '<html><body>Hello, <b>world</b>.</body></html>'
      }, {
        type: 'BACK_TO_MAIN'
      })
    ).toEqual({
      isDisplayingSite: false,
      currentSite: '<html><body>Hello, <b>world</b>.</body></html>'
    })
  })
})

describe('url reducer', () => {
  it('should handle top5 request', () => {
    expect(
      top_five({
        isFetching:false,
        topFive:[],
        response_message: ''
      },{
        type: 'REQUESTING_TOP_FIVE'
      })
    ).toEqual({
      isFetching:true,
      topFive:[],
      response_message: ''
    })
  })

  it('should handle top5 failure', () => {
    expect(
      top_five({
        isFetching:true,
        topFive:[],
        response_message: ''
      },{
        type: 'TOP_FIVE_FAILURE'
      })
    ).toEqual({
      isFetching:false,
      topFive:[],
      response_message: 'Loading woes! Please refresh to see top five.'
    })
  })

  it('should handle top5 failure', () => {
    expect(
      top_five({
        isFetching:true,
        topFive:[],
        response_message: ''
      },{
        type: 'TOP_FIVE_SUCCESS',
        sites: [{html:'html'},{html:null},{html:'html'},{html:'html'},{html:'html'}]
      })
    ).toEqual({
      isFetching:false,
      topFive:['html','html','html','html'],
      response_message: ''
    })
  })
})


//TODO:
// describe('url', () => {

// })
