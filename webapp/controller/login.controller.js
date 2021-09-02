sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var coreModel=new sap.ui.model.json.JSONModel();
	return Controller.extend("bala.comEHSM_Portal.controller.login", {
		onInit: function() {
			// set explored app's demo model on this sample
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("login").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function(oEvent) {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.location.reload();
			}
				//window.location.reload();
			},
		onClick:function(oEvent){
				var oDialog = this.byId("BusyDialog");
					oDialog.open();
			
				var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				
				var userid=this.byId("userid").getValue();
				var password=this.byId("password").getValue();
				window.console.log(userid,password);
				var surl="/sap/opu/odata/SAP/ZEHSMPORTAL_SRV/";
				var oModel = new sap.ui.model.odata.v2.ODataModel(surl, true, "abaper", "abap@123");
            
            var plant ='' ;
          
            oModel.read("/loginSet(Userid='"+userid+"',Password='"+password+"')", {
            
                context: null,
                urlParameters: null,
                async: false,
                success: function(oData, oResponse) {
                	
                    window.console.log(oData);
                        window.console.log(oResponse.data.Plant);
                    if(oResponse.data.Type==="S"){
                    		
                             sap.m.MessageToast.show('Login success');
                  
                        	plant = oResponse.data.Plant;
                        	coreModel.setData({plant:plant}, "login");
                            sap.ui.getCore().setModel(coreModel, "login");
                            oRouter.navTo("ehsmdashboard");
                            oDialog.close();
			
								
                    }
                    else
                    {
                         sap.m.MessageToast.show('Invalid Credentials!');
                         oDialog.close();
                    }
                    
                
                },    
                error: function(oData) {
                
                        window.console.log('ERROR');
                        sap.m.MessageToast.show('Invalid Credentials!');
                        oDialog.close();
                            
                
                }

 

            });
            
    
			}

	});

});