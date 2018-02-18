const initInteractors = require('../interactors');
const initRoutes = require('./routes');

const router = db => {
  return async (req, res, next) => {
    res.locals.db = db;
    const Interactors = initInteractors(req.body || {}, res.locals);
    const routes = initRoutes(Interactors);
    const current_route = Object.keys(routes).find(route => {
      const [ method, path ] = route.split(' ').filter(e => e);
      return (
        method == req.method &&
        path == req.path
      );
    })
    if(current_route) {
      try {
        await routes[current_route]();
      }
      catch(ex) {
        next(ex);
      }
    }
    next();
  }
}

module.exports = router;
