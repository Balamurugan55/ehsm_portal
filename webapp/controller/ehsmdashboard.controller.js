sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, MessageBox, History, UIComponent) {
	"use strict";

	return Controller.extend("bala.comEHSM_Portal.controller.ehsmdashboard", {

		onPress: function() {
			var oRouter = UIComponent.getRouterFor(this);
			MessageBox.warning("Are you sure to logout?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function(sAction) {
					if (sAction === "OK") {
						var oHistory = History.getInstance();
						var sPreviousHash = oHistory.getPreviousHash();
						if (sPreviousHash !== undefined) {
							window.console.log("Hi");
							//window.history.go(-1);
							oRouter.navTo("login");
						} else {
							window.console.log("Hello");
							
							oRouter.navTo("login");
							
						}
					}
				}
			});
		}

	});

});