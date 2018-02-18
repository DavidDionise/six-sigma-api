
const initRoutes = Interactors => {
  return {
    ['POST /signup']: Interactors.signUpUser,
    ['POST /signin']: Interactors.signInUser,
    ['POST /updateForm']: Interactors.updateForm,
    ['GET /fetchForms']: Interactors.fetchForms
  };
};

module.exports = initRoutes;