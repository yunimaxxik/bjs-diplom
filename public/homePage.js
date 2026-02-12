const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};
ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

const rate = new RatesBoard();
function fetchAndDisplayRates() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			rate.clearTable();
			rate.fillTable(response.data);
		}
	});
}
fetchAndDisplayRates();
setInterval(fetchAndDisplayRates, 60000);

const manager = new MoneyManager();
manager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response.success, 'Баланс успешно пополнен');
		} else {
			manager.setMessage(response.success, response.error);
		}
	});
};

manager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response.success, 'Конвентирование успешно пополнен');
		} else {
			manager.setMessage(response.success, response.error);
		}
	});
};

manager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			manager.setMessage(response.success, 'Перевод успешно пополнен');
		} else {
			manager.setMessage(response.success, response.error);
		}
	});
};

const favorites = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favorites.clearTable();
		favorites.fillTable(response.data);
		manager.updateUsersList(response.data);
	}
});

favorites.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favorites.clearTable();
			favorites.fillTable(response.data);
			manager.updateUsersList(response.data);
			favorites.setMessage(response.success, 'Пользователь успешно добавлен');
		} else {
			favorites.setMessage(response.success, response.error);
		}
	});
};

favorites.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favorites.clearTable();
			favorites.fillTable(response.data);
			manager.updateUsersList(response.data);
			favorites.setMessage(response.success, 'Пользователь успешно удален');
		} else {
			favorites.setMessage(response.success, response.error);
		}
	});
};
