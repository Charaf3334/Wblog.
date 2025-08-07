import Joi from 'joi'

export const SignUpValidation = (req, res, next) => {
        
    const SignupSchema = Joi.object({
        firstName: Joi.string().trim().max(50).pattern(/^[A-Za-z]+$/).required().messages({
            'string.pattern.base': 'First name must contain only alphabetic characters',
            'string.empty': 'First name is required',
            'string.max': 'First name must not exceed 50 characters'
        }),
        lastName: Joi.string().trim().max(50).pattern(/^[A-Za-z]+$/).required().messages({
            'string.pattern.base': 'Last name must contain only alphabetic characters',
            'string.empty': 'Last name is required',
            'string.max': 'Last name must not exceed 50 characters'
        }),
        email: Joi.string().trim().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Email format is not valid',
            'string.empty': 'Email field is required'
        }),
        password: Joi.string().trim().min(8).max(30).required().messages({
            'string.min': 'Password should be atleast 8 characters long',
            'string.empty': 'Password is required',
            'string.max': 'Password should be max 30 characters long',
        })
    })

    const { error, value } = SignupSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true // katgolih tmer 3la fields li mkyninch w value ky7yd mnhom dak tkhrbi9
    })
    
    if (error) {
        const messages = error.details.reduce((acc, curr) => {
            const field = curr.path[0]
            if (!acc[field])
              acc[field] = curr.message
            return acc
          }, {})
        return res.status(400).json({ error: messages })
    }
    
    req.body = value
    next()
}

export const SignInValidation = (req, res, next) => {
    
    const SigninSchema = Joi.object({
        email: Joi.string().trim().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'Email format is not valid',
            'string.empty': 'Email field is required'
        }),
        password: Joi.string().trim().min(8).max(30).required().messages({
            'string.min': 'Password should be atleast 8 characters long',
            'string.empty': 'Password is required',
            'string.max': 'Password should be max 30 characters long',
        })
    })

    const { error, value } = SigninSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })
    
    if (error) {
        const messages = error.details.reduce((acc, curr) => {
            const field = curr.path[0]
            if (!acc[field])
              acc[field] = curr.message
            return acc
          }, {})
        return res.status(400).json({ error: messages })
    }
    
    req.body = value
    next()
} 