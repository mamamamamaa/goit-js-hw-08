import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const { email = '', message = '' } = JSON.parse(
  localStorage.getItem(STORAGE_KEY)
);

if (localStorage.getItem(STORAGE_KEY) !== null) {
  formRef.email.value = email;
  formRef.message.value = message;
}

const form = {
  email,
  message,
};

formRef.addEventListener(
  'input',
  throttle(e => {
    switch (e.target.name) {
      case 'email':
        form.email = e.target.value;
        break;
      case 'message':
        form.message = e.target.value;
        break;
      default:
        break;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, 500)
);

formRef.addEventListener('submit', e => {
  e.preventDefault();
  formRef.email.value = '';
  formRef.message.value = '';
  localStorage.setItem(STORAGE_KEY, '');
});
