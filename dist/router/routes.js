
const initRoutes = Interactors => {
  return {
    ['POST /users/signup']: Interactors.signUpUser,
    ['POST /users/signin']: Interactors.signInUser,
    ['POST /users/validate-auth']: Interactors.validateAuth,
    ['PUT /fields/update']: Interactors.updateField,
    ['GET /fields']: Interactors.fetchFields,
    ['POST /fields/create']: Interactors.createField
  };
};

module.exports = initRoutes;