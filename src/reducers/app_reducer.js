const app = (state={isDisplayingSite: false, currentSite: '<html><body>Hello, <b>world</b>.</body></html>'}, action) => {
  switch ( action.type ) {
    case 'HTML_FETCH_SUCCESS':
      return {
        ...state,
        isDisplayingSite: true,
        currentSite: action.html
      }
    case 'BACK_TO_MAIN':
      return {
        ...state,
        isDisplayingSite: false
      };
    default :
      return state;
  }
}

export default app
