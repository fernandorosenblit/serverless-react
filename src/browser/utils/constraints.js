import validate from 'validate.js';

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' }
  }
};

export const signUp = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' }
  },
  passwordConfirmation: {
    presence: { message: 'passwordConfirmation.presence' },
    equality: {
      attribute: 'password',
      message: 'passwordConfirmation.equality'
    }
  }
};

export const stripeForm = {
  cardHolderName: {
    presence: true,
    format: {
      pattern: '[a-zA-Z ]+'
    }
  },
  stripeCardEmail: {
    presence: true,
    email: true
  }
};

validate.validators.presence.options = { allowEmpty: false };

export const validations = (constraints, props = {}) => data =>
  validate(data, constraints, props) || {};
