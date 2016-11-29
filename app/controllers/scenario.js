module.exports = {
    getSelfAll: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithBudgets: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            include: {
                model: req.models.Budget,
                as: 'budgets',
                where: { user_id: req.user.id }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithCategory: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            include: {
                model: req.models.Budget,
                as: 'budgets',
                where: { user_id: req.user.id },
                include: {
                    model: req.models.Category,
                    as: 'category'
                }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelfAllWithTransactions: function(req, res, next) {
        req.models.Scenario.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']],
            include: {
                model: req.models.Budget,
                as: 'budgets',
                include: {
                    model: req.models.Category,
                    as: 'category',
                    include: {
                        model: req.models.Transaction,
                        as: 'transactions'
                    }
                }
            }

        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    getSelf: function(req, res, next) {
        req.models.Scenario.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    },

    postSelf: function(req, res, next) {
        req.models.Scenario.create({
            user_id: req.user.id,
            name: req.body.name

        }).then(function(scenario) {
            return res.json({
                status: req.status.success,
                data: scenario
            })
        })
    },

    putSelf: function(req, res, next) {
        req.models.Scenario.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(scenario) {
            if (scenario) {
                scenario.updateAttributes(req.body)
                    .then(function(scenario) {
                        return res.json({
                            status: req.status.success,
                            data: scenario
                        })
                    })
            } else {
                res.json({
                    status: req.status.error,
                    message: 'Scenario does not exist or does not belong to requesting user.'
                })
            }
        })
    },

    deleteSelf: function(req, res, next) {
        req.models.Scenario.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        }).then(function(data) {
            res.json({
                status: req.status.success,
                data: data
            })
        })
    }
}
