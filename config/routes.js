var settings = require('../config')().settings
var controllers = require('../app/controllers')
var services = require('../app/services')
var cache = require('apicache').options(settings.cache).middleware

/**
 * This file contains all of the API's resource endpoints grouped in logical order.
 * Each endpoint needs to pass in an authentication method that validates the request.
 *
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function(app) {

    /* Base Endpoint */
    app.route('/')
        .get(function(req, res, next) {
            res.send('ok')
        })
        .post(function(req, res, next) {
            res.json(req.body)
        })


    /* Auth Token Resource */
    app.route('/v1/authenticate')
        .post(services.authentication.isLocal, controllers.authentication.postSelfPassport)


    /* Users Endpoint */
    app.route('/v1/users')
        .post(controllers.user.postUser)


    /* Transactions Resource */
    app.route('/v1/transactions/self')
        .get(services.authentication.isBearer, controllers.transaction.getSelfAll)
    app.route('/v1/transactions/self/all')
        .get(services.authentication.isBearer, controllers.transaction.getSelfAllWithAll)
    app.route('/v1/transactions/self/accounts')
        .get(services.authentication.isBearer, controllers.transaction.getSelfAllWithAccounts)
    app.route('/v1/transactions/self/plaid')
        .post(services.authentication.isBearer, controllers.transaction.postPlaidTransactions)


    /* Accounts Resource */
    app.route('/v1/accounts/self')
        .get(services.authentication.isBearer, controllers.account.getSelfAll)
    app.route('/v1/accounts/self/transactions')
        .get(services.authentication.isBearer, controllers.account.getSelfAllWithTransactions)
    app.route('/v1/accounts/self/plaid')
        .post(services.authentication.isBearer, controllers.account.postPlaidAccounts)


    /* Plaid Services */
    app.route('/v1/plaid/connect')
        .post(services.authentication.isBearer, controllers.plaid.postConnect)
    app.route('/v1/plaid/exchange')
        .post(services.authentication.isBearer, controllers.plaid.postExchange)
    app.route('/v1/plaid/accounts')
        .get(services.authentication.isBearer, controllers.plaid.getRetrieveAccounts)
    app.route('/v1/plaid/transactions')
        .get(services.authentication.isBearer, controllers.plaid.getRetrieveTransactions)
    app.route('/v1/plaid/webhook/:id')
        .post( /*   Unauthenticated    */ controllers.plaid.postWebhook)


    /* Category Resource */
    app.route('/v1/categories/')
        .get(services.authentication.isBearer, controllers.category.getAll)
    app.route('/v1/categories/primary')
        .get(services.authentication.isBearer, controllers.category.getAllPrimary)
    app.route('/v1/categories/self/transactions')
        .get(services.authentication.isBearer, controllers.category.getAllWithTransactions)


    /* Scenario Resource */
    app.route('/v1/scenarios/self')
        .get(services.authentication.isBearer, controllers.scenario.getSelfAll)
        .post(services.authentication.isBearer, controllers.scenario.postSelf)
    app.route('/v1/scenarios/self/budgets')
        .get(services.authentication.isBearer, controllers.scenario.getSelfAllWithBudgets)
    app.route('/v1/scenarios/self/category')
        .get(services.authentication.isBearer, controllers.scenario.getSelfAllWithCategory)
    app.route('/v1/scenarios/self/transactions')
        .get(services.authentication.isBearer, controllers.scenario.getSelfAllWithTransactions)


    /* Budget Resource */
    app.route('/v1/budgets/self')
        .get(services.authentication.isBearer, controllers.budget.getSelfAll)
    app.route('/v1/budgets/self/transactions')
        .get(services.authentication.isBearer, controllers.budget.getSelfAllWithTransactions)

}
