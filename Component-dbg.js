/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
// define a root UIComponent which exposes the main view
jQuery.sap.declare("i2d.pp.prdorderissue.monitor.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("i2d.pp.prdorderissue.monitor.Configuration");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.ui.core.routing.History");

// check for BSP environment and set reuse library path
(function() {
	var iIndex = window.location.pathname.indexOf("/ui5_ui5/");
	if (iIndex !== -1) {
		var sPath = window.location.pathname.slice(0, iIndex + 8);
		sPath += "/sap/pp_mrp_reuse/i2d/pp/mrpcockpit/reuse";
		jQuery.sap.registerModulePath("i2d.pp.mrpcockpit.reuse", sPath);
	}
}());

// new Component
sap.ui.core.UIComponent
		.extend(
				"i2d.pp.prdorderissue.monitor.Component",
				{
					metadata : {
						"name" : "Monitor Production Orders",
						"version" : "1.5.1",
						"library" : "i2d.pp.prdorderissue.monitor",
						"includes" : [],
						"dependencies" : {
							// added reuse project to allow preloading for reuse files
							"libs" : ["sap.m", "sap.me", "i2d.pp.mrpcockpit.reuse"],
							"components" : [],
						},

						"config" : {
							"resourceBundle" : "i18n/i18n.properties",
							"titleResource" : "shellTitle",
							"icon" : "sap-icon://Fiori2/F0246",
							"favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/F0246_Monitor_Uncovered_Sales_Order.ico",
							"homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order57_iPhone_Desktop_Launch.png",
							"homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order114_iPhone-Retina_Web_Clip.png",
							"homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order72_iPad_Desktop_Launch.png",
							"homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0246_Monitor_Uncovered_Sales_Order144_iPad_Retina_Web_Clip.png",
							fullWidth : true,
						},

						"routing" : {

							"config" : {
								viewType : "XML",
								viewPath : "i2d.pp.prdorderissue.monitor.view",
								targetControl : "fioriContent",
								targetAggregation : "pages",
								clearTarget : false
							},
							"routes" : [{
								pattern : "",
								view : "S1",
								// viewId : "i2d.pp.prdorderissue.monitor.S1",
								viewPath : "i2d.pp.prdorderissue.monitor.view",
								targetControl : "fioriContent", // This is the control
								// in which the new
								// view will be placed
								targetAggregation : "pages", // This is the aggregation
								// in which the new
								// view will be placed
								name : "fullscreen"

							}, {

								pattern : "second",
								view : "S3",
								name : "subscreen"
							}, {
								pattern : "{stateID}",
								view : "S1",
								name : "state"

							}]
						}
					},

					/**
					 * Initialize the application
					 * 
					 * @returns {sap.ui.core.Control} the content
					 */
					createContent : function() {
						
					  // add less processor for custom CSS
						jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.Lessifier");
						i2d.pp.mrpcockpit.reuse.util.Lessifier.lessifyCSSx10();

						this.sStateID = jQuery.sap.uid(); // "MRPCockpitViewState";// jQuery.sap.uid();
						if (!sap.ui.core.routing.HashChanger.getInstance().getHash()) {
							// i2d.pp.mrpcockpit.reuse.view.ViewStateHandler.deleteViewStateInContainer(null, this.sStateID, 60);
							sap.ui.core.routing.HashChanger.getInstance().replaceHash(this.sStateID);
						}

						var oViewData = {
							component : this
						};
						return sap.ui.view({
							viewName : "i2d.pp.prdorderissue.monitor.Main",
							type : sap.ui.core.mvc.ViewType.XML,
							viewData : oViewData
						});

					},

					init : function() {
						sap.ui.core.UIComponent.prototype.init.apply(this, arguments); // calls createContent (among others)

						// oConfiguration.oRouteConfig.targetParent =
						// oHookPage.getParent().getId();
						// this.getRouter().attachRouteMatched(function(oEvent) {
						// var oControl = oEvent.getParameter("targetControl");
						// var oView = oEvent.getParameter("view");
						// var oArgs = oEvent.getParameter("arguments");
						// if (oControl instanceof sap.m.NavContainer || oControl
						// instanceof sap.m.SplitContainer) {
						// oControl.to(oView.getId(), "slide", oArgs);
						// }
						// }, this);

						// this.oRouter.register("appRouter");
						this.getRouter().attachRouteMatched(this._handleRouteMatched);

						// this component should automatically initialize the
						// router!
						this.getRouter().initialize();

						// this.oRouter.initialize();

					},

					_handleRouteMatched : function(evt) {

						var oApp = evt.getParameter("targetControl");

						if (!(oApp instanceof sap.m.NavContainer || oApp instanceof sap.m.SplitContainer)) {
							return;
						}

						// close open popovers
						if (sap.m.InstanceManager.hasOpenPopover()) {
							sap.m.InstanceManager.closeAllPopovers();
						}

						// close open dialogs
						if (sap.m.InstanceManager.hasOpenDialog()) {
							sap.m.InstanceManager.closeAllDialogs();
						}

						// navigate to the view in nav container
						var oView = evt.getParameter("view");
						var iViewLevel = evt.getParameter("config").viewLevel;

						var bNextPageIsMaster = (oApp instanceof sap.m.SplitContainer) && !!oApp.getMasterPage(oView.getId());

						var oHistory = sap.ui.core.routing.History.getInstance();

						var bBack;

						if (iViewLevel === undefined || this._iCurrentViewLevel === undefined
								|| iViewLevel === this._iCurrentViewLevel) {
							bBack = oHistory.getDirection() === "Backwards";
						} else {
							bBack = (iViewLevel !== undefined && (iViewLevel < this._iCurrentViewLevel));
						}

						if (bBack) {
							// insert previous page if not in nav container yet
							var oPreviousPage = oApp.getPreviousPage(bNextPageIsMaster);
							if (!oPreviousPage || oPreviousPage.getId() !== oView.getId()) {
								oApp.insertPreviousPage(oView.getId());
							}
							oApp.backToPage(oView.getId());
						} else {
							oApp.to(oView.getId());
						}

						this._iCurrentViewLevel = iViewLevel;
					}

				});