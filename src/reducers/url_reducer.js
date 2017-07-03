const url = (state={isFetching: false, response_message:''}, action) => {
  switch ( action.type ) {
    case 'REQUESTING_URL':
      return {
        ...state,
        response_message: '',
        isFetching: true
      }
    case 'URL_COMING_SOON':
      return {
        ...state,
        response_message: action.msg,
        isFetching: false
      }
    case 'URL_FETCH_FAILURE':
      return {
        ...state,
        response_message: 'There was an error with your request. Please try again.',
        isFetching: false
      }
    case 'HTML_FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false
      }
    default :
      return state;
  }
}

export default url
