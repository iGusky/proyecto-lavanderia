export const authReducer = (state = {}, action) => {
  switch(action.type){
    case 'login':
      return {
        token: action.payload.token
      }
    case 'logout':
      return {}
    default:
      return state
  }
}