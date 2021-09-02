sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";

	return Controller.extend("bala.comEHSM_Portal.controller.incr", {

		onClick: function(oEvent) {
			var oDialog = this.byId("BusyDialog");
			oDialog.open();
			var plant = sap.ui.getCore().getModel("login").oData.plant;
			var intype = this.byId("intype").getValue();
			var indesc = this.byId("indesc").getValue();
			var dmtype = this.byId("dmtype").getValue();
			var eqno = this.byId("eqno").getValue();
			var eqdesc = this.byId("eqdesc").getValue();
			var invres = this.byId("invres").getValue();
			var crby = this.byId("crby").getValue();
			var evdate = this.byId("evdate").getValue();
			var valfr = this.byId("valfr").getValue();
			var valto = this.byId("valto").getValue();
			this.byId("intype").setValue("");
			this.byId("indesc").setValue("");
			this.byId("dmtype").setValue("");
			this.byId("eqno").setValue("");
			this.byId("eqdesc").setValue("");
			this.byId("invres").setValue("");
			this.byId("crby").setValue("");
			this.byId("evdate").setValue("");
			this.byId("valfr").setValue("");
			this.byId("valto").setValue("");
			//window.console.log(plo_sdate);
			var parameters = {
				"Valfr": this.convertDate(valfr),
				"Valto": this.convertDate(valto),
				"Crnam": crby,
				"Iatype": intype,
				"Iaplant": plant,
				"Evdesc": indesc,
				"Dmtype": dmtype,
				"Equnr": eqno,
				"Eqdesc": eqdesc,
				"Evdat": this.convertDate(evdate),
				"Invresult": invres
			};
			window.console.log(parameters);
			var surl = "/sap/opu/odata/SAP/ZEHSMPORTAL_SRV/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");

			oModel.create("/createSet", parameters, {

				//context: parameters,

				success: function(oData, oResponse) {

					window.console.log(oData);
					oDialog.close();
					if (oData.PlannedorderNum !== "") {
						MessageBox.success("Incident is created with record no " + oData.Recntwah);
					} else {
						MessageBox.error("Error occured");
					}

				},
				error: function(oData, oResponse) {

					window.console.log('HIIIIIIIIIIIIII IN ERROR', oData, oResponse);

					oDialog.close();
					MessageBox.error("Error occured");

				}
			});
		},
		convertDate: function(date) {
			var splitted = date.split("-");
			var newDate = new Date(Date.UTC(splitted[0], splitted[1] - 1, splitted[2]));

			return '\/Date(' + newDate.getTime() + ')\/';
		}

	});

});