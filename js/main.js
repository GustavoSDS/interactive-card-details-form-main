window.addEventListener("load", (e) => {
    // Card Name
    let nameCard = document.querySelector(".card__details-name");
    let nameInput = document.querySelector("#cardHolder");
    let nameErrorDiv = document.querySelector('.form__cardHolder--error');

    /* Card Number */
    let cardNumber = document.querySelector('.card__number');
    let inputNumber = document.querySelector("#cardNumber");
    let numberErrorDiv = document.querySelector('.form__cardNumber--error');

    // Card MM
    let cardMonth = document.querySelector(".card__month");
    let inputMonth = document.querySelector("#cardMonth");
    let monthErrorDiv = document.querySelector('.form__input-mm--error');

    // Card YY
    let cardYear = document.querySelector('.card__year');
    let inputYear = document.querySelector("#cardYear");
    let yearErrorDiv = document.querySelector('.form__input-yy--error');

    // Card Cvc
    let cardCvc = document.querySelector(".card-back__cvc");
    let inputCvc = document.querySelector("#cardCvc");
    let cvcErrorDiv = document.querySelector(".form__input-cvc--error");

    /* Ingreso dinámico del nombre */
    nameInput.addEventListener("input", () => {
        if (nameInput.value === "") {
            nameCard.innerText = 'JANE APPLESEED';
            nameErrorDiv.innerText = "Can't by empty";
        } else {
            nameCard.innerText = nameInput.value;
            nameErrorDiv.innerText = "";
        }
    });

    /* Ingreso dinamico del numero */
    inputNumber.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        /* Actualizando la tarjeta */
        cardNumber.innerText = inputNumber.value;
        inputNumber.value = inputValue.replace(/[\s\-]/g, "").replace(/([0-9]{4})/g, '$1 ').trim();

        /* Validando que no haya letras */
        if (validateCardNumber(cardNumber.innerText)) {
            showError(inputNumber, numberErrorDiv, '', false);
        }
        /* Mostrando valores por defecto */
        else if (inputNumber.value === "") {
            cardNumber.innerText = "0000 0000 0000 0000";
            showError(inputNumber, numberErrorDiv, "Can't by empty", true);
        }
        else {
            showError(inputNumber, numberErrorDiv, "Wrong format, numbers only", true);
        }
    });


    /* Ingreso dinamico del mes */
    inputMonth.addEventListener("input", () => {
        cardMonth.innerText = inputMonth.value;
        validateNumbers(inputMonth, monthErrorDiv);
    });

    /* Ingreso dinamico del year */
    inputYear.addEventListener("input", () => {
        cardYear.innerText = inputYear.value;
        validateNumbers(inputYear, yearErrorDiv);
    });

    /* Ingreso dinamico del cvc */
    inputCvc.addEventListener("input", () => {
        cardCvc.innerText = inputCvc.value;
        validateNumbers(inputCvc, cvcErrorDiv);
    });


    let nameValidation = false;
    let numberValidation = false;
    let monthValidation = false;
    let yearValidation = false;
    let cvcValidation = false;

    // Secciones formulario y thanks
    let formSection = document.querySelector('.form');
    let thanksSection = document.querySelector('.thanks-sections');

    /* Botton confirm */
    let confirmBtn = document.querySelector(".form__submit");
    confirmBtn.addEventListener("click", event => {
        event.preventDefault();


        // validando el Nombre
        if (verifyIsFilled(nameInput, nameErrorDiv)) {
            showError(nameInput, nameErrorDiv, '', false);
            nameValidation = true;
        } else {
            showError(nameInput, nameErrorDiv, "Can't by empty", true);
            nameValidation = false;
        }
        
        // validando el numero
        if(verifyIsFilled(inputNumber, numberErrorDiv)){
            showError(nameInput, nameErrorDiv, '', false);
            numberValidation = true;
        }else{
            showError(nameInput, nameErrorDiv, "Can't by empty", true);
            numberValidation = false;    
        }

        // validando el mes
        if (verifyIsFilled(inputMonth, monthErrorDiv)) {
            if (parseInt(inputMonth.value) >= 1 && parseInt(inputMonth.value) <= 12 && inputMonth.value.length == 2) {
                showError(inputMonth, monthErrorDiv, '', false);
                monthValidation = true;
            } else {
                showError(inputMonth, monthErrorDiv, 'Month incorrect', true);
                monthValidation = false;
            }
        }
        // validando el año
        let yearDate = new Date().getFullYear().toString().substr(-2);
        if (verifyIsFilled(inputYear, yearErrorDiv)) {
            if (parseInt(inputYear.value) > yearDate) {
                showError(inputYear, yearErrorDiv, '', false);
                yearValidation = true;
            } else {
                showError(inputYear, yearErrorDiv, 'Incorrect year', true);
                yearValidation = false;
            }
        }

        // Validando el cvc
        if (verifyIsFilled(inputCvc, cvcErrorDiv)) {
            if (inputCvc.value.length === 3) {
                showError(inputCvc, cvcErrorDiv, '', false);
                cvcValidation = true;
            } else {
                showError(inputCvc, cvcErrorDiv, 'Incorrect cvc', true);
                cvcValidation = false;
            }
        }

        if (nameValidation === true && numberValidation === true && monthValidation === true && yearValidation === true && cvcValidation === true) {
            console.log('valid')
            formSection.style.display = 'none';
            thanksSection.style.display = 'block';
        }else{
            formSection.style.display = 'block';
            thanksSection.style.display = 'none';
        }
    });


    /* Functions */
    function validateCardNumber(cardNumber) {
        // let regExp = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g;
        let regExp = /^\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}$/g;
        return regExp.test(cardNumber);
    }
    function showError(divInput, divError, msgError, show) {
        if (show) {
            divError.innerText = msgError;
            divInput.style.borderColor = "hsl(0, 100%, 66%)";
        } else {
            divError.innerText = msgError;
            divInput.style.borderColor = "hsl(270, 3%, 87%)";
        }
    }

    function verifyIsFilled(divInput, divError) {
        if (divInput.value.length > 0) {
            showError(divInput, divError, "", false);
            return true;
        } else {
            showError(divInput, divError, "Can't be blank", true);
            return false;
        }
    }

    function validateNumbers(input, divError) {
        let regExp = /[A-Za-z]/g;
        if (regExp.test(input.value)) {
            showError(input, divError, "Wrong number, numbers only", true);
        } else {
            showError(input, divError, "", false);
        }
    }

});