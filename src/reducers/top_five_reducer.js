const demo_top_five = [
 '<html><body>Hello, <b>world</b>.</body></html>',
 '<html><body>Hello, <b>world</b>.</body></html>',
 '<html><body>Hello, <b>world</b>.</body></html>',
 '<html><body>Hello, <b>world</b>.</body></html>',
 '<html><body>Hello, <b>world</b>.</body></html>'
];

const top_five = (state={isFetching: true, topFive: demo_top_five}, action) => {
  // console.log('in top_five', state, action)
  switch ( action.type ) {
    default :
      return state;
  }
}


export default top_five
