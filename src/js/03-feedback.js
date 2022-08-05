import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

try {
  const { email: storageEmail = '', message: storageMessage = '' } = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  );
  formRef.email.value = storageEmail;
  formRef.message.value = storageMessage;
} catch (error) {
  console.log(error.message);
}

const form = {
  email: '',
  message: '',
};

formRef.addEventListener(
  'input',
  throttle(e => {
    try {
      const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
      form.email = email;
      form.message = message;
    } catch (error) {
      console.log(error.message);
    }

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
  localStorage.removeItem(STORAGE_KEY);
});
