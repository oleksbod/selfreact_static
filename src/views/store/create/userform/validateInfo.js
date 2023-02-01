export default function validateInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'First Name required';
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = 'Last Name required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = '';
  } else if (values.password.length < 6) {
    errors.password = '';
  }

  if (!values.password2) {
    errors.password2 = '';
  } else if (values.password2 !== values.password) {
    errors.password2 = '';
  }
  return errors;
}
