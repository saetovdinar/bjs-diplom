'use strict'


const userFormObj = new UserForm();

userFormObj.loginFormCallback = function(data) {
    ApiConnector.login(data, (log) => {
        if(log.success) {
            location.reload();
        } else {
            console.log(log.error);
        }
    });
}

userFormObj.registerFormCallback = function(data) {
    ApiConnector.register(data, (log) => {
        if(log.success) {
            location.reload();
        } else {
            console.log(log.error);
        }
    });
}

