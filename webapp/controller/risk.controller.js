sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var item;
	var tableModel;
	return Controller.extend("bala.comEHSM_Portal.controller.risk", {
		onPress: function() {
			var oFilters = [];
			window.console.log("gg");
			var agent = this.getView().byId("agent").getValue();
			var filter1 = new sap.ui.model.Filter("Agent", sap.ui.model.FilterOperator.EQ, agent);
			//var filter2 = new sap.ui.model.Filter("PlanPlant", sap.ui.model.FilterOperator.EQ, plant);
			oFilters.push(filter1);
			//oFilters.push(filter2);
			// window.console.log(oFilters);

			var oTable = this.getView().byId("risk");
			var url = "/sap/opu/odata/sap/ZEHSMPORTAL_SRV/";
			var model = new sap.ui.model.odata.v2.ODataModel(url, true, "abaper", "abap@123");
			model.read("/riskSet", {
				filters: oFilters,
				context: null,
				urlParameters: null,
				async: true,
				success: function(success, err) {
					if (success) {
						// window.console.log(success.results);
						item = success.results;
						window.console.log(success);
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
		}

	});

});