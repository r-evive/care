export const handleLoginError = (error: string) => {
    if(error === 'CredentialsSignin'){
        return 'Nieprawidłowe dane logowania!';
    }
    else{
        return 'Coś poszło nie tak!';
    }
}