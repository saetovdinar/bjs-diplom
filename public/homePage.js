'use strict' 

const logoutBTN = new LogoutButton();

logoutBTN.action = function() {
    ApiConnector.logout((log) => {
        if(log.success) {
            location.reload();
        }
    });
}

ApiConnector.current((log) => {
    if(log.success) {
        ProfileWidget.showProfile(log.data);
    }
});

const ratesBoard= new RatesBoard();

let intervalTimer = setInterval(ApiConnector.getStocks((data) => {
    if(data.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(data.data);
    }
}), 60000)


const moneyManag = new MoneyManager();

moneyManag.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (log) => {
        
        if(log.success) {
            ProfileWidget.showProfile(log.data);
            moneyManag.setMessage(log.success, "Success");
        } else {
            moneyManag.setMessage(log.success, log.error);
        }
    });
}
moneyManag.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (log) => {
        if(log.success) {
            ProfileWidget.showProfile(log.data);
            moneyManag.setMessage(log.success, "Success");
        } else {
            moneyManag.setMessage(log.success, log.error);
        }
    });
};

moneyManag.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (log) => {

        if(log.success) {
            ProfileWidget.showProfile(log.data);
            moneyManag.setMessage(log.success, "Success");
        } else {
            moneyManag.setMessage(log.success, log.error);
        }
    });
};

const favWidgetObj = new FavoritesWidget();

ApiConnector.getFavorites((log) => {

    if(log.success) {
        favWidgetObj.clearTable();
        favWidgetObj.fillTable(log.data);
        moneyManag.updateUsersList(log.data);
    }
});


favWidgetObj.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (log) => {
        if(log.success) {
            favWidgetObj.clearTable();
            favWidgetObj.fillTable(log.data);
            moneyManag.updateUsersList(log.data);
            moneyManag.setMessage(log.success, "Success");
        }  else {
            moneyManag.setMessage(log.success, log.error);
        }
    });
};

favWidgetObj.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (log) => {
        if(log.success) {
            favWidgetObj.clearTable();
            favWidgetObj.fillTable(log.data);
            moneyManag.updateUsersList(log.data);
            moneyManag.setMessage(log.success, "Success");
        }  else {
            moneyManag.setMessage(log.success, log.error);
        }
    });
};