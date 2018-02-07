/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("i2d.pp.prdorderissue.monitor.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("i2d.pp.prdorderissue.monitor.Configuration", {

	oServiceParams : {
		serviceList : [{
			name : "PP_MRP_COCKPIT_SRV",
			masterCollection : "ManufacturingOrders",
			serviceUrl : "/sap/opu/odata/sap/PP_MRP_COCKPIT_SRV/",
			fRequestFailed : function() {
				// empty function to suppress the error handling of the connectionManager
				// in S2parent controller we register again to the requestFailed for handling
				// special cases for the app. Method: handleRequestFailed
			},
			isDefault : true,
			// useBatch: true,
			mockedDataSource : "/i2d.pp.prdorderissue.monitor/model/metadata.xml"
		}]
	},

	setApplicationFacade : function(oApplicationFacade) {
		i2d.pp.prdorderissue.monitor.Configuration.oApplicationFacade = oApplicationFacade;
	},

	getServiceParams : function() {
		return this.oServiceParams;
	},

	getAppConfig : function() {
		return this.oAppConfig;
	},

	/**
	 * @inherit
	 */
	getServiceList : function() {
		return this.oServiceParams.serviceList;
	},

	getMasterKeyAttributes : function() {
		return ["Id"];
	}

});
