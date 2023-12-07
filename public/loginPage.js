'use strict'


const userFormObj = new UserForm();
//realization login form
userFormObj.loginFormCallback = function(data) {
    ApiConnector.login(data, (log) => {
        if(log.success) {
            location.reload();
        } else {
            userFormObj.setLoginErrorMessage(log.error);
        }
    });
}
//realization register form
userFormObj.registerFormCallback = function(data) {
    ApiConnector.register(data, (log) => {
        if(log.success) {
            location.reload();
        } else {
            userFormObj.setRegisterErrorMessage(log.error);
        }
    });
}

