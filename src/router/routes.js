
const initRoutes = Interactors => {
  return {
    ['POST /users/signup']: Interactors.signUpUser,
    ['POST /users/signin']: Interactors.signInUser,
    ['PUT /fields/update']: Interactors.updateField,
    ['GET /fields']: Interactors.fetchFields
  }
}

module.exports = initRoutes;
