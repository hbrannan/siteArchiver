const top_five = (state={isFetching: false, topFive: [], response_message: ''}, action) => {
  switch ( action.type ) {
    case 'REQUESTING_TOP_FIVE':
      return {
        ...state,
        response_message: '',
        isFetching: true
      }
    case 'TOP_FIVE_FAILURE':
      return {
        ...state,
        isFetching: false,
        response_message: 'Loading woes! Please refresh to see top five.'
      }
    case 'TOP_FIVE_SUCCESS':
      return {
        ...state,
        isFetching: false,
        topFive: action.sites.filter((obj) => obj.html !== null).map((obj) => obj.html)
      }
    default :
      return state;
  }
}

export default top_five
