var moment = require('moment')
var _ = require('lodash')
require('moment-range')

module.exports = {
    postUser: function(req, res, next) {
        req.models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(user) {
            // If the user already exists, throw an error
            if (user) {
                return res.status(400).json({
                    status: req.status.error,
                    message: 'Email is already registered in the system.'
                })
            }

            // Create the new user
            req.models.User.create({
                email: req.body.email,
                password: req.body.password
            }).then(function(user) {
                return res.json({
                    status: req.status.success,
                    data: user
                })
            })
        })
    },

    getNetWorthHistory: async function(req, res, next) {
        var DATE_FORMAT = 'YYYY-MM-DD'
        var user_id = req.user.id
        var startDate = moment(req.query.startDate) || moment().subtract(1, 'year')
        var endDate = moment()

        var accounts = await req.models.Account.findAll({
            attributes: ['balance_current'],
            where: {
                user_id: user_id
            }
        })

        var currentNetWorth = accounts.reduce(function(previous, current) {
            return previous + current.balance_current
        }, 0)

        var transactions = (await req.models.Transaction.findAll({
            attributes: ['date', 'amount'],
            where: {
                user_id: req.user.id,
                date: {
                    $between: [
                        startDate.format(),
                        endDate.format()
                    ]
                }
            },
            include: {
                model: req.models.Account,
                as: 'account',
                attributes: ['type']
            }
        })).map(function(transaction) {
            // If the transaction is credit, it is negative
            if (transaction.account.type === 'credit') {
                transaction.amount = transaction.amount
            }

            return transaction
        })


        var transactionDays = _.groupBy(transactions, function(transaction) {
            return moment(transaction.date).startOf('day').format(DATE_FORMAT)
        })

        var netWorths = {}

        moment.range(startDate, endDate).by('days', function(day) {
            var dateFormatted = day.startOf(day).format(DATE_FORMAT)

            // If there are no transactions for that day, then return zero
            if (!transactionDays[dateFormatted]) {
                netWorths[dateFormatted] = 0
            } else {
                netWorths[dateFormatted] = transactionDays[dateFormatted].reduce(function(previous, current) {
                    return previous + current.amount
                }, 0)
            }

        })

        Object.keys(netWorths).sort(function(a, b) {
            return a < b ? 1 : -1
        }).forEach(function(date) {
            if (moment(date).format(DATE_FORMAT) === endDate.format(DATE_FORMAT)) {
                netWorths[date] += currentNetWorth
            } else {
                netWorths[date] += Math.round(netWorths[moment(date).add(1, 'day').startOf('day').format(DATE_FORMAT)])
            }
        })

        return res.json({
            status: req.status.success,
            data: netWorths,
            // transactions: transactionDays
        })
    }
}
