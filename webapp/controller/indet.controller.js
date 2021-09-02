sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("bala.comEHSM_Portal.controller.indet", {

		onInit: function(oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			var surl = "/sap/opu/odata/SAP/ZEHSMPORTAL_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
			var oTable = this.getView().byId("form");
			//var prono=sap.ui.getCore().getModel("pro").oData.data;
			//window.console.log(prono);
			oModel.read("/indetSet(RecNo='644667877935')", {

				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {

					window.console.log(oData);
					var tableModel = new sap.ui.model.json.JSONModel();
					// created a JSON model
					tableModel.setData(
						oData
					);
					oTable.setModel(tableModel);
					oDialog.close();

				},
				error: function(oData, oResponse) {

					window.console.log('HIIIIIIIIIIIIII IN ERROR');
					oDialog.close();

				}
			});
		}

	});

});