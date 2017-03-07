module.exports = {
    // 2000: Successful response
    2001: 'This relation has no related collections.',
    2002: 'This relation has no related resource.',

    // 4000: Invalid request
    4001: 'A resource at this ID was not found.',
    4002: 'An invalid resource identifier was provided.',
    4003: 'Attempt to generate a passport authentication without a strategy.',
    4004: 'No user was found with the supplied credentials.',
    4005: 'User authentication token expired.',
    4006: 'Request made from unauthorized IP address.',
    4007: 'Error with authentication.',

    // 5000: Database error
    5001: 'Database error generating a new passport.',
    5002: 'Database error retrieving Passport associated with auth_token.',
    5003: 'Database error attempting to verify credentials.',
    5004: 'Database error retrieving User during local authentication.',
    5005: 'Database error bad password.',

    // 6000: Registration error
    6000: 'Invalid email address.',
    6001: 'Email address already in use.',
    6002: 'Password does not meet requirements.',
    6003: 'User is not verified: check your email.'
}