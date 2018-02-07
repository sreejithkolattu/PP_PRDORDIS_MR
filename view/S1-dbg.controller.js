/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.view.S1parent");
// TODO: rework require statements
jQuery.sap.require("i2d.pp.prdorderissue.monitor.util.Formatter");
jQuery.sap.require("sap.m.TablePersoController");
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.CommonFormatter");

/**
 * 312 Master Controller
 */
i2d.pp.mrpcockpit.reuse.view.S1parent.extend("i2d.pp.prdorderissue.monitor.view.S1", {

	/**
	 * @memberOf About
	 */

	// Controller Init function Start
	onInit : function() {

		// default title for the master section
		this.masterTitle = "FULLSCREEN_TITLE";

		// declaration of variables
		this.sViewNumber = "v312";

		var aFacetFilterState = [];
		var oNewEntry = {
			listKey : "MfgOrderProgressStatus",
			active : true,
			selectedItemKeys : []
		};
		aFacetFilterState.push(oNewEntry);
		oNewEntry = {
			listKey : "LatenessDurationInWorkDays",
			active : true,
			selectedItemKeys : []
		};
		aFacetFilterState.push(oNewEntry);
		oNewEntry = {
			listKey : "MaximumDelayInWorkDays",
			active : true,
			selectedItemKeys : []
		};
		aFacetFilterState.push(oNewEntry);
		oNewEntry = {
			listKey : "DurnPlndStatusToTodayInWrkdays",
			active : true,
			selectedItemKeys : []
		};
		aFacetFilterState.push(oNewEntry);

		this.oDefaultVariantData = {
			MaterialShortageDefinitionID : "",
			TimeHorizon : "7",
			FacetFilterState : aFacetFilterState,
			TableState : {},
			SortKey : "",
			SortDescending : false
		};

		// execute the onInit for the base class
		i2d.pp.mrpcockpit.reuse.view.S1parent.prototype.onInit.call(this);

		// create resource Bundle for Formatter
		i2d.pp.prdorderissue.monitor.util.Formatter.oResourceBundle = this.oApplicationFacade.getResourceBundle();
		// create resource Bundle for Texts
		this.oResourceBundle = this.oApplicationFacade.getResourceBundle();

		// TODO
		// array for default sorting of cells

		this.aDefaultSorting = new Array();
		this.aDefaultSorting[0] = new Array("MaterialExternalID", 3);
		this.aDefaultSorting[1] = new Array("MaterialName");
		this.aDefaultSorting[2] = new Array("ManufacturingOrderTypeName");
		this.aDefaultSorting[3] = new Array("MRPElementOpenQuantity");
		this.aDefaultSorting[4] = new Array("LateSupplyQuantity");
		this.aDefaultSorting[5] = new Array("MRPElement", 4);
		this.aDefaultSorting[6] = new Array("LateSupplyEarliestDemandDate");
		this.aDefaultSorting[7] = new Array("LatenessDurationInWorkDays");
		this.aDefaultSorting[8] = new Array("MfgOrderPlannedStartDate", 1);
		this.aDefaultSorting[9] = new Array("MfgOrderPlannedEndDate", 2);
		this.aDefaultSorting[10] = new Array("MRPController");
		this.aDefaultSorting[11] = new Array("MRPPlant");
		this.aDefaultSorting[12] = new Array("MRPArea");
		this.aDefaultSorting[13] = new Array("NumberOfComponentsWithProblems");
		this.aDefaultSorting[14] = new Array("MaximumDelayInWorkDays");
		this.aDefaultSorting[15] = new Array("MfgOrderProgressStatusName");
		this.aDefaultSorting[16] = new Array("MfgOrderProgressNextStatusName");
		this.aDefaultSorting[17] = new Array("DurationToNextStatusInDays");
		this.aDefaultSorting[18] = new Array("DurationToReleaseInWorkdays");
		this.aDefaultSorting[19] = new Array("DurationToStartInWorkdays");
		this.aDefaultSorting[20] = new Array("DurationToFinishInWorkdays");
		this.aDefaultSorting[21] = new Array("DurationToGRInWorkdays");
		this.aDefaultSorting[22] = new Array("DurnPlndStatusToTodayInWrkdays");

	},
	// Controller Init function End

	/**
	 * Returns the view number
	 */
	getViewNumber : function() {
		return this.sViewNumber;
	},

	/**
	 * Returns the table ID
	 */
	getTableId : function() {
		return this.sViewNumber + "Table";
	},

	/**
	 * Returns the material shortage definition type relevant for the app 1: for 210 2: for 110/112
	 */
	getShortageDefintionType : function() {
		return 1;
	},

	/**
	 * Personalisation needs method
	 */
	getComponentName : function() {
		return "i2d.pp.prdorderissue.monitor";
	},

	/**
	 * Returns the entity type needed for the application: /ManufacturingOrder Items
	 */
	getMasterEntity : function() {
		return "/ManufacturingOrders";
	},

	/**
	 * Returns entity name needed for Interoperability Service Version
	 */
	getMasterServiceEntity : function() {
		return "ManufacturingOrder";
	},

	/**
	 * Returns Entity Set Name for Shortage
	 */
	getShortageEntitySetName : function() {
		return "MaterialShortageDefinitions";
	},

	// /**
	// * Returns Entity Set Name for Sorting
	// */
	// getSortingEntitySetName : function() {
	// return "PP_MRP_COCKPIT_SRV/ManufacturingOrder";
	// },

	/**
	 * Returns Property Name for Filtering
	 */
	getFilterPropertyName : function() {
		return "MaterialShortageDefinitionID";
	},

	/**
	 * Returns the select fields needed for the application
	 */
	getSelectFields : function() {

	},

	/**
	 * Add additional oData filters for the /ManufacturingOrder
	 */
	getSpecificAppFilter : function() {
		return null;
	},

	getSingleSelectFacetFilter : function() {
		return ["MaximumDelayInWorkDays", "LatenessDurationInWorkDays", "DurationToReleaseInWorkdays",
				"DurationToNextStatusInWorkDays", "DurationToStartInWorkdays", "DurationToFinishInWorkdays",
				"DurationToGRInWorkdays", "DurnPlndStatusToTodayInWrkdays", ];
	},

	getFacetFilterDefaults : function() {
		return ["MaterialID", "ManufacturingOrderType", "MfgOrderProgressStatus", "LatenessDurationInWorkDays",
				"ProductionVersion", "ProductionSupervisor", "ProductionLine", "MRPController", "MRPPlant", "MRPArea",
				"MaximumDelayInWorkDays", "MfgOrderProgressNextStatus", "DurnPlndStatusToTodayInWrkdays",
				"DurationToNextStatusInWorkDays", "DurationToReleaseInWorkdays", "DurationToStartInWorkdays",
				"DurationToFinishInWorkdays", "DurationToGRInWorkdays"];
	},

	getFacetFilterType : function() {
		return "5";
	},

	/**
	 * Returns all fields which are needed for the initial oData master call ($select)
	 */
	getInitialSelectFields : function() {
		var mandSelectFields = this.getMandatorySelectFields();
		var selectFields = this.getBaseSelectFields();
		var allFields = mandSelectFields.concat(selectFields);
		return allFields.join(",");
	},

	/**
	 * Returns those fields which are mandatory for the oData master call ($select)<br>
	 * These fields (especially all navigation fields) should be requested no matter what columns the user has made
	 * visible in the table.
	 */
	getMandatorySelectFields : function() {
		// TODO
		return new Array("MaterialExternalID", "MaterialName", "MfgOrderProblemCategory", "MRPElementOpenQuantity",
				"LatenessDurationInWorkDays", "MfgOrderPlannedStartDate", "MfgOrderPlannedEndDate", "MfgOrderProgressStatus",
				"MfgOrderProgressStatusName", "DurationToNextStatusInDays", "NumberOfComponentsWithProblems",
				"MaximumDelayInWorkDays", "DurnPlndStatusToTodayInWrkdays");
	},

	getBaseSelectFields : function() {
		// TODO
		var aSelectedFields = new Array("DynamicHorizonCode", "MRPPlanningSegmentNumber", "MRPPlanningSegmentType",
				"MaterialShortageDefinitionID", "ComponentShortageDefinitionID", "MRPPlant", "MRPArea", "MaterialID",
				"MRPElementCategory", "MRPController", "UnitOfMeasureTechnicalName", "TargetQuantityUnitDcmls",
				"LateSupplyEarliestDemandDate", "MRPElementCategory", "MRPElement");
		/**
		 * @ControllerHook extension Hook for Get Base Select Fields Additionally to the base select fields the customer
		 *                 here is allowed to add or delete fields from the array. The hook is called at the initialization
		 *                 phase -> event onInit.
		 * @callback sap.ca.scfld.md.controller.BaseFullscreenController~extHookGetBaseSelectFields
		 * @param {array}
		 *          List of Fields
		 */
		if (this.extHookGetBaseSelectFields) { // check whether any extension has implemented the hook...
			this.extHookGetBaseSelectFields(aSelectedFields); // ...and call it
		}
		return aSelectedFields;
	},

	/**
	 * Returns the Variant Container Prefix Name for either the Application: "MRPProductionRequirement" or
	 * "MRPProcessRequirement
	 */
	getVariantContainerPrefix : function() {
		if (this.sOrderCategory) {
			if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
				return "MRPProductionOrderItem";
			} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
				return "MRPProcessOrderItem";
			}
		} else {
			return "MRPProductionOrderItem";
		}
	},

	/**
	 * Returns the Object Header Title
	 */
	getObjectHeaderTitle : function() {
		if (this.sOrderCategory) {
			if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
				return this.oResourceBundle.getText("ObjectHeaderTitle");
			} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
				return this.oResourceBundle.getText("ObjectHeaderTitle_PROC");
			}
		} else {
			return this.oResourceBundle.getText("ObjectHeaderTitle");
		}

	},

	/**
	 * Returns the Number Unit
	 */
	getNumberUnit : function() {
		if (this.sOrderCategory) {
			if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
				return this.oResourceBundle.getText("NumberUnit");
			} else if (this.sOrderCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
				return this.oResourceBundle.getText("NumberUnit_PROC");
			}
		} else {
			return this.oResourceBundle.getText("NumberUnit");
		}
	},

	/**
	 * Returns the Icon for Monitor App Tile
	 */
	getMonitorAppIcon : function() {
		return "sap-icon://Fiori5/F0266";
	},

	/**
	 * Returns the Icon for Manage App Tile
	 */
	getManageAppIcon : function() {
		return "sap-icon://Fiori5/F0273";
	},

	/**
	 * Returns the navigation target for the navigation to the corresponding manage app
	 */
	getNavigationTarget : function() {
		return {
			semanticObject : "MRPProductionOrderItem",
			action : "manage"
		};
	},

	/**
	 * Returns the navigation parameters for the navigation to the corresponding manage app
	 */
	getNavigationParams : function() {
		var aSelectedItems = this.getView().byId(this.getTableId()).getSelectedItems();
		var sMatShortDefID = aSelectedItems[0].getBindingContext().getProperty("MaterialShortageDefinitionID");
		var sCompShortDefID = aSelectedItems[0].getBindingContext().getProperty("ComponentShortageDefinitionID");

		var aMaterialID = new Array();
		var aMRPArea = new Array();
		var aMRPElement = new Array();
		var aMRPElementCategory = new Array();
		var aMRPPlanningSegmentNumber = new Array();
		var aMRPPlanningSegmentType = new Array();
		var aMRPPlant = new Array();

		for (var i = 0; i < aSelectedItems.length; i++) {
			var sMaterialID = aSelectedItems[i].getBindingContext().getProperty("MaterialID");
			aMaterialID.push(sMaterialID);

			var sMRPArea = aSelectedItems[i].getBindingContext().getProperty("MRPArea");
			aMRPArea.push(sMRPArea);
			var sMRPElement = aSelectedItems[i].getBindingContext().getProperty("MRPElement");
			aMRPElement.push(sMRPElement);
			var sMRPElementCategory = aSelectedItems[i].getBindingContext().getProperty("MRPElementCategory");
			aMRPElementCategory.push(sMRPElementCategory);
			var sMRPPlanningSegmentNumber = aSelectedItems[i].getBindingContext().getProperty("MRPPlanningSegmentNumber");
			aMRPPlanningSegmentNumber.push(sMRPPlanningSegmentNumber);
			var sMRPPlanningSegmentType = aSelectedItems[i].getBindingContext().getProperty("MRPPlanningSegmentType");
			aMRPPlanningSegmentType.push(sMRPPlanningSegmentType);
			var sMRPPlant = aSelectedItems[i].getBindingContext().getProperty("MRPPlant");
			aMRPPlant.push(sMRPPlant);

		};

		var oParams = {
			"MaterialShortageDefinitionID" : sMatShortDefID,
			"ComponentShortageDefinitionID" : sCompShortDefID,
			"MaterialID" : aMaterialID,
			"MRPArea" : aMRPArea,
			"MRPElement" : aMRPElement,
			"MRPElementCategory" : aMRPElementCategory,
			"MRPPlanningSegmentNumber" : aMRPPlanningSegmentNumber,
			"MRPPlanningSegmentType" : aMRPPlanningSegmentType,
			"MRPPlant" : aMRPPlant,
			"OrderCategory" : this.sOrderCategory
		// gets filled via the URL Parameter, or the variant.

		};

		return oParams;
	},

	/*
	 * getHeaderFooterOptions : function() { // execute the getHeaderFooterOptions function of the base class
	 * this.oHeaderFooterOptions = i2d.pp.mrpcockpit.reuse.view.S1parent.prototype.getHeaderFooterOptions.call(this);
	 * 
	 * if (this.masterTitle === undefined) { // we have to set this first because it is used by the parent
	 * this.masterTitle = "FULLSCREEN_TITLE"; } // add app-specific master list title
	 * this.oHeaderFooterOptions.sI18NFullscreenTitle = this.masterTitle;
	 * 
	 * return this.oHeaderFooterOptions; },
	 */

	/**
	 * Changes the Application naming between Production and Process Order
	 * 
	 */
	_changeAppName : function(mRPElementCategory) {
		// Production Order
		if (mRPElementCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRDORD) {
			this.masterTitle = "FULLSCREEN_TITLE";
			this.getView().byId("ObjectHeader").setNumberUnit(this.oResourceBundle.getText("NumberUnit"));
		}
		// Process Order
		if (mRPElementCategory === i2d.pp.mrpcockpit.reuse.util.CommonConstants.MRP_ELEMENT_CATEGORY_PRCORD) {
			this.masterTitle = "FULLSCREEN_TITLE_PROC";
			this.getView().byId("ObjectHeader").setNumberUnit(this.oResourceBundle.getText("NumberUnit_PROC"));
		}

		this.oHeaderFooterOptions.sI18NFullscreenTitle = this.masterTitle;
		this.setHeaderFooterOptions(this.oHeaderFooterOptions);
	}

});