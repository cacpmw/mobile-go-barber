import * as Yup from 'yup';

interface Errors {
  [key: string]: string;
}

const signUpValidator = Yup.object().shape({
  name: Yup.string().min(3, 'Name must have at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: Yup.string().min(6, 'Password must have at least 6 characters'),
});

const signInValidator = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: Yup.string().min(6, 'Password must have at least 6 characters'),
});

const getValidationErrors = (error: Yup.ValidationError): Errors => {
  const validationErrors: Errors = {};
  error.inner.forEach(element => {
    validationErrors[element.path] = element.message;
  });
  return validationErrors;
};
const profileValidator = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  oldPassword: Yup.string(),
  newPassword: Yup.string().when('oldPassword', {
    is: value => !!value.length,
    then: Yup.string().required('New password is required'),
    otherwise: Yup.string(),
  }),
  passwordConfirmation: Yup.string()
    .when('oldPassword', {
      is: value => !!value.length,
      then: Yup.string().required('Confirmation is required'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match'),
});

export {
  signUpValidator,
  signInValidator,
  getValidationErrors,
  profileValidator,
};
