  document.addEventListener('DOMContentLoaded', () => {
    const viewModalButton = document.getElementById('viewModalButton');
    const closeModalButton = document.getElementById('modalCloseButton');
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById("modalBackdrop");

    let firstName = " ";
    let lastName = " ";
    let password = " ";
    let confirmPwd = " ";
    let email = " ";
    let address = " ";
    let dateOfBirth = " ";
    let mobileNumber = " ";

    let hasError = false;

    //Function to check allowed inputs
    function checkAllowedInputs() {

      const firstNameRegex = /^[A-Za-z ]+$/;
      const lastNameRegex = /^[A-Za-z ]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-@!&*]).*$/;
      const confirmPwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-@!&*]).*$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const dateOfBirthRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      const addressRegex = /^[A-Za-z0-9\-&,*\s]+$/;
      const mobileNumberRegex = /^\d+$/;

      const firstNameError = 'This field accept Alphabets only';
      const lastNameError = 'This field accept Alphabets only';
      const passwordError = 'Password must contain at least one letter, one number, and one special character (-, @, !, &, )';
      const confirmPwdError = 'Password must contain at least one letter, one number, and one special character (-, @, !, &, ).';
      const emailError = 'Invalid email format';
      const dateOfBirthError = 'Date must be in the format YYYY-MM-DD';
      const addressError = 'Only letters, numbers, and the following characters are allowed: -, &, ,, ';
      const mobileNumberError = 'Only numeric digits (0 - 9) are allowed.';

      acceptType(firstName, 'firstName', firstNameRegex, firstNameError);
      acceptType(lastName, 'lastName', lastNameRegex, lastNameError);
      acceptType(password, 'password', passwordRegex, passwordError);
      acceptType(confirmPwd, 'confirmPwd', confirmPwdRegex, confirmPwdError);
      acceptType(email, 'email', emailRegex, emailError);
      acceptType(dateOfBirth, 'dateOfBirth', dateOfBirthRegex, dateOfBirthError);
      acceptType(address, 'address', addressRegex, addressError);
      acceptType(mobileNumber, 'mobileNumber', mobileNumberRegex, mobileNumberError);
    }

    //Function to check accepted inputs
    function acceptType(fieldValue, fieldName, regex, errorMessage) {
      if (fieldValue.length > 1) {
        const errorElement = document.getElementById(fieldName + 'Error');
        console.log('errorelement', errorElement);
        if (!regex.test(fieldValue)) {

          errorElement.innerHTML = errorMessage;
          hasError = true;
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }

    //Function to check allowed length
    function checkAllowedLength() {

      firstNameMinLengthError = 'This field must contain at least 3 characters long';
      firstNameMaxLengthError = 'This field cannot exceed more that 8 characters';

      lastNameMinLengthError = 'This field must contain at least 3 characters long';
      lastNameMaxLengthError = 'This field cannot exceed more that 8 characters';

      passwordMinLengthError = 'This field must contain at least 8 characters long';
      passwordMaxLengthError = 'This field cannot exceed more than 20 characters';

      confirmPwdMinLengthError = 'This field must contain at least 8 characters long';
      confirmPwdMaxLengthError = 'This field cannot exceed more than 20 characters';

      lengthValidation(firstName, 'firstName', 3, 8, firstNameMinLengthError, firstNameMaxLengthError)
      lengthValidation(lastName, 'lastName', 3, 8, lastNameMinLengthError, lastNameMaxLengthError)
      lengthValidation(password, 'password', 8, 20, passwordMinLengthError, passwordMaxLengthError)
      lengthValidation(confirmPwd, 'confirmPwd', 8, 20, confirmPwdMinLengthError, confirmPwdMaxLengthError)
    }

    //Function for length validtion
    function lengthValidation(fieldValue, fieldName, minLength, maxLength, minLengthError, maxLengthError) {
      if (fieldValue.length > 0) {
        const errorElement = document.getElementById(fieldName + 'Error');

        if (fieldValue.length < minLength) {
          hasError = true;
          errorElement.innerHTML = minLengthError;
        } else if (fieldValue.length > maxLength) {
          hasError = true;
          errorElement.innerHTML = maxLengthError;
        }
      } else {
        return;
      }

    }

    //Mandatory field validation
    function requiredFieldValidation() {
      isRequired(firstName, 'firstName');
      isRequired(lastName, 'lastName');
      isRequired(password, 'password');
      isRequired(confirmPwd, 'confirmPwd');
      isRequired(email, 'email');
      isRequired(dateOfBirth, 'dateOfBirth');
      isRequired(address, 'address');
      isRequired(mobileNumber, 'mobileNumber');
    }

    //Function to validate required fields
    function isRequired(fieldValue, fieldName) {
      if (fieldValue.length < 1) {

        hasError = true;
        const errorElement = fieldName + 'Error';

        document.getElementById(errorElement).innerHTML = 'This field is required';
      }
    }

    //Date of Birth field validation
    function dateOfBirthValidation(dateOfBirth) {

      if (dateOfBirth.length > 0) {

        const regexValidation = acceptType(dateOfBirth, 'dateOfBirth',
          /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Invalid Date Format');

        if (regexValidation == false) {
          hasError = true;
        } else {
          findAge(dateOfBirth);
        }
      } else {
        return;
      }
    }

    //Function for age validation
    function findAge(fieldValue) {
      if (fieldValue.length > 0) {
        const errorElement = document.getElementById('dateOfBirthError');

        const field = new Date(fieldValue);
        const currentYear = new Date().getFullYear();
        const year = field.getFullYear();

        const age = currentYear - year;
        if (age < 18 || age > 100) {
          hasError = true;
          errorElement.innerHTML = 'The  required age is between 18 and 100.';
        }
      } else {
        return;
      }
    }

    //Function to validate password
    function pswdValidation(password, confirmPwd) {

      if (password !== confirmPwd) {

        hasError = true;
        document.getElementById('confirmPwdError').innerHTML = "Passwords do not match.";
      }
    }

    //Form validation function
    function validation() {
      hasError = false;
      requiredFieldValidation()
      checkAllowedInputs()
      checkAllowedLength()
      dateOfBirthValidation(dateOfBirth)
      pswdValidation(password, confirmPwd);
    }

    const submitButton = document.querySelector('#submitButton');

    submitButton.addEventListener('click', (event) => {

      event.preventDefault();
      firstName = document.getElementById('firstName').value
      lastName = document.getElementById('lastName').value
      password = document.getElementById('pword').value
      confirmPwd = document.getElementById('confirmPwd').value
      email = document.getElementById('email').value
      address = document.getElementById('address').value
      dateOfBirth = document.getElementById('dateOfBirth').value
      mobileNumber = document.getElementById('mobileNumber').value

      document.querySelectorAll('span').forEach((span) => span.innerHTML = ' ');

      validation();

      if (hasError == false) {
        alert('Your form submitted successfully');
        viewModalButton.style.display = 'inline-block';

        document.getElementById("registrationForm").reset();

      }
    });

    document.getElementById('clearButton').addEventListener('click', () => {
            alert('Alert');
      document.getElementById("registrationForm").reset();
      document.querySelectorAll('span').forEach((span) => span.innerHTML = ' ');
    })

    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
      backdrop.style.display = "none";
    });

    backdrop.addEventListener("click", function () {
      modal.style.display = "none";
      backdrop.style.display = "none";
    });

    document.getElementById("viewModalButton").addEventListener("click", function (e) {

      e.preventDefault();

      document.getElementById('modalFirstName').textContent = firstName;
      document.getElementById('modalLastName').textContent = lastName;
      document.getElementById('modalPwd').textContent = password;
      document.getElementById('modalConfirmPwd').textContent = confirmPwd;
      document.getElementById('modalAddress').textContent = address;
      document.getElementById('modalEmail').textContent = email;
      document.getElementById('modalMobileNumber').textContent = mobileNumber;
      document.getElementById('modalDateOfBirth').textContent = dateOfBirth;

      backdrop.style.display = "block";
      document.getElementById("modal").style.display = "inline-block";

    });
  });
