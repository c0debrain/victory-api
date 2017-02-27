const controllers = require('../controllers')
const cache = require('apicache').middleware
const authentication = require('../services/authentication')
const handlers = require('../services/handlers')
const services = require('../services')

module.exports = (app) => {

    /**
     * Fallbacks
     */
    app.route('/')
        .get((request, response) => { response.sendStatus(200) })


    /**
     * Authentication
     */
    app.route('/v1/login')
        .post(services.authentication.isLocal, handlers.controller(controllers.passport.postPassport, (request) => [request.user.id, request.client_ip_addr]))
    app.route('/v1/verification')
        .get(services.authentication.verification)
    app.route('/v1/logout')
        .get(handlers.controller(controllers.passport.deletePassport, (request) => [request.headers.authorization.split(" ")[1]]))
    app.route('/v1/register')
        .post(handlers.controller(controllers.user.postUser, (request) => [request.body.email, request.body.password, request.client_ip_addr]))
    /*
        OneLink Software
     */
    app.route('/v1/clients')
        .get(services.authentication.isJwt, handlers.controller(controllers.client.getCollection, (request) => [request.params.id]))
        // .get(handlers.controller(controllers.client.getCollection))
    app.route('/v1/clients/:id')
        .get(handlers.controller(controllers.client.getSingleton, (request) => [request.params.id]))
    app.route('/v1/clients/:id/origins')
        .get(handlers.controller(controllers.client.getCollection, (request) => [request.params.id]))


    /**
     * Origins
     */
    app.route('/v1/origins')
        .get(handlers.controller(controllers.origin.getCollection))
    app.route('/v1/origins/:id/')
        .get(handlers.controller(controllers.origin.getSingleton, (request) => [request.params.id]))
    app.route('/v1/origins/:id/targets')
        .get(handlers.controller(controllers.origin.getTargets, (request) => [request.params.id]))
    app.route('/v1/origins/:id/health')
        .get(handlers.controller(controllers.origin.getHealthHistory, (request) => [request.params.id]))
    app.route('/v1/origins/:id/dispatch')
        .get(handlers.controller(controllers.origin.getDispatchHistory, (request) => [request.params.id]))


    /**
     * Targets
     */
    app.route('/v1/targets')
        .get(handlers.controller(controllers.target.getCollection))
    app.route('/v1/targets/:id/')
        .get(handlers.controller(controllers.target.getSingleton, (request) => [request.params.id]))


    /**
     * Datacenters
     */
    app.route('/v1/datacenters')
        .get(handlers.controller(controllers.datacenter.getCollection))
    app.route('/v1/datacenters/:id')
        .get(handlers.controller(controllers.datacenter.getSingleton, (request) => [request.params.id]))
    app.route('/v1/datacenters/:id/clusters')
        .get(handlers.controller(controllers.datacenter.getClusters, (request) => [request.params.id]))


    /**
     * Clusters
     */
    app.route('/v1/clusters')
        .get(handlers.controller(controllers.cluster.getCollection))
    app.route('/v1/clusters/:id')
        .get(handlers.controller(controllers.cluster.getSingleton, (request) => [request.params.id]))

}
