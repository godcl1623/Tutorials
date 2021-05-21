export const whenSignIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId
  }
}

export const whenSignOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}