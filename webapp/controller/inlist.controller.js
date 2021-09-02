sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var item;
	var tableModel;
	var coreModel = new sap.ui.model.json.JSONModel();
	return Controller.extend("bala.comEHSM_Portal.controller.inlist", {
		onInit: function () {
			var oFilters = [];
			var plant = sap.ui.getCore().getModel("login").oData.plant;
			//var filter1 = new sap.ui.model.Filter("MrpCtrl", sap.ui.model.FilterOperator.EQ, mrp);
			var filter2 = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant);
			// oFilters.push(filter1);
			oFilters.push(filter2);
			// window.console.log(oFilters);

			var oTable = this.getView().byId("inlist");
			var url = "/sap/opu/odata/sap/ZEHSMPORTAL_SRV/";
			var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
			model.read("/inlistSet", {
				filters: oFilters,
				context: null,
				urlParameters: null,
				async: true,
				success: function(success, err) {
					if (success) {
						// window.console.log(success.results);
						item = success.results;
						window.console.log(item);
						tableModel = new sap.ui.model.json.JSONModel();
						// created a JSON model
						tableModel.setData(
							item
						);
						oTable.setModel(tableModel);
					} else {
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					}
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error 404 Occured. Session Token is expired. Login Again");
				}
			});
		},

		onClick: function(oEvent) {
			var row = oEvent.getSource();
			var oTable = this.getView().byId("inlist");

			sap.ui.getCore().setModel(coreModel, "inlist");
			var index = oTable._oItemNavigation.iFocusedIndex - 1;
			window.console.log(item[index].PlannedorderNum);
			coreModel.setData({
				data: item[index].PlannedorderNum
			});
			var itemIndex = oTable.indexOfItem(oTable.getSelectedItem());
			window.console.log(row, itemIndex);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("indet", {
				data: "bye"
			});
		}

	});

});