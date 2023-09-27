export const handleLoginError = (error: string) => {
    if(error === 'CredentialsSignin'){
        return 'Invalid email or password!';
    }
    else{
        return 'An unknown error occurred!';
    }
}