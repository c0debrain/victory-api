/*
    Exchange public token generated by plaid-link on the client-side for a
    server-side access_token that is stored on the user's database row for
    future requests.
*/
module.exports = function(req, res, next) {
    req.plaid.getCategories(req.plaid.environments.tartan, function(error, response) {
        if (error) {
            return res.status(req.httpStatus.SERVICE_UNAVAILABLE)
                .json({
                    status: req.status.error,
                    data: error
                });
        }

        console.log(req.models.PlaidCategory);

        // Persist categories to database
        req.models.PlaidCategory.bulkCreate(
            req.models.PlaidCategory.fromPlaidObject(
                response,
                req.user
            )
        ).then(function(categories) {
            res.status(req.httpStatus.OK)
                .json({
                    status: req.status.success,
                    data: categories
                });
        });
    });
};