exports.chilangoPostValidator = (req, res, next) => {
    // check phrase
    req.check('phrase', 'hey you have to write something').notEmpty()
    req.check('phrase', 'Phrase must be between 2 to 150 characters').isLength({
        min: 2, 
        max: 150
    })
    // check spanish
    req.check('spanish', 'Write something...').notEmpty()
    req.check('spanish', 'must be between 2 to 2000 characters').isLength({
        min: 2,
        max: 2000
    })
    // check english
    req.check('english', 'hey you have to write the english part!').notEmpty()
    req.check('english', 'must be between 2 to 150 characters').isLength({
        min: 2, 
        max: 150
    })
    // check body
    req.check('spanish', 'Write a spanish translation').notEmpty()
    req.check('spanish', 'must be between 2 to 2000 characters').isLength({
        min: 2,
        max: 2000
    })
    // check examleS
    req.check('exampleS', 'give at least one spanish example').notEmpty()
    req.check('exampleS', 'example must be between 2 to 150 characters').isLength({
        min: 2, 
        max: 150
    })
    //check for errors 
    const errors = req.validationErrors()
    // if error show the first one as they appear
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

exports.createPostValidator = (req, res, next) => {
    // check phrase
    req.check('title', 'hey you have to write a title').notEmpty()
    req.check('title', 'title must be between 2 to 150 characters').isLength({
        min: 2, 
        max: 150
    })
    // check spanish
    req.check('body', 'Write something...').notEmpty()
    req.check('body', 'body must be between 2 to 2000 characters').isLength({
        min: 2,
        max: 2000
    })
    //check for errors 
    const errors = req.validationErrors()
    // if error show the first one as they appear
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

exports.userSignupValidator = (req, res, next) => {
    // name exists and is between 3 - 15 characters
    req.check('name', 'Please add your name').notEmpty()
    // check email
    req.check('email', 'Email must be between 3 - 36 characters')
    .matches(/.+\@.+\..+/) //regrex to make sure it contains @, and is in email format 
    .withMessage('🤖 beep...Email must be in a email format')
    .isLength({
        min: 3,
        max: 2000
    })
    // check password
    req.check('password', '🤖 beep...Password is required').notEmpty()
    req.check('password')
    .isLength({min: 6})
    .withMessage('🤖 beep...Password must contain at least 6 characters')
    .matches(/\d/) //make sure there is at least one number d = digit
    .withMessage('🤖 beep...Password must contain a number')
     //check for errors 
     const errors = req.validationErrors()
     // if error show the first one as they appear
     if(errors) {
         const firstError = errors.map((error) => error.msg)[0]
         return res.status(400).json({error: firstError})
     }
     //
     next()
 }
