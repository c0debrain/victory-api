/**
 * Exchange public token generated by plaid-link on the client-side for a
 * server-side access_token that is stored on the user's database row for
 * future requests.
 *
 * @param  {[type]} models          Database models to make requests with
 * @param  {[type]} plaid           Plaid client to make requests with
 * @param  {[type]} public_token    Token sent to plaid in exchange for an access_token
 * @param  {[type]} user_id         User that the token should be assigned to
 * @return {[type]}                 The token that was created by the exchange process
 */
var exchangeToken = async function(models, plaid, user_id, public_token) {
    var result = { status: null, data: null };


    try {
        var exchangeResponse = await plaid.exchangeTokenAsync(public_token);

        var token = await models.PlaidToken.create({
            plaid_raw: exchangeResponse,
            user_id: user_id,
            access_token: await exchangeResponse.access_token,
            public_token: public_token
        });

    } catch(error) {
        console.error('Plaid error exchanging public for access token: ', error);

        return {
            status: 'error',
            data: error
        }
    }

    return {
        status: 'success',
        data: token
    }
};

module.exports = exchangeToken;
