const form = document.getElementById('Form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const assunto = document.getElementById('assunto');
const  mensagem= document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    //pegar os valores dos inputs
    
    const nomeValue = nome.value.trim()
    const emailValue = email.value.trim()
    const assuntoValue = assunto.value.trim()
    const mensagemValue = mensagem.value.trim()

    if(nomeValue === ''){
        //mostra a mensagem de error
        //e a exclamação
        setErrorFor(nome, 'preencha esse campo');
    } else {
        //mostra o símbolo de sucesso
        setSuccessFor(nome);
    }

    if(emailValue === ''){
        //mostra a mensagem de error
        //e a exclamação
        setErrorFor(email, 'preencha esse campo');
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, 'Email inválida');
    } else {
        setSuccessFor(email);
    }

    if(assuntoValue === ''){
        //mostra a mensagem de error
        //e a exclamação
        setErrorFor(assunto, 'preencha esse campo');
    } else {
        //mostra o símbolo de sucesso
        setSuccessFor(assunto);
    }

}

function setErrorFor(input, mensagem) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    //mudar a informação no elemento small
    small.innerText = mensagem;

    //adicionar o nome de class
    formControl.className = 'form-control error';
}

function setSuccessFor (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}