/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("i2d.pp.prdorderissue.monitor.util.Formatter");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.QuantityFormat");
jQuery.sap.require("i2d.pp.mrpcockpit.reuse.util.CommonFormatter");

i2d.pp.prdorderissue.monitor.util.Formatter = {};

// note: variable is global for the entire shell (for all application instances)
i2d.pp.prdorderissue.monitor.util.Formatter.oResourceBundle = null;

i2d.pp.prdorderissue.monitor.util.Formatter.getBundle = function() {
	if (i2d.pp.prdorderissue.monitor.util.Formatter.oResourceBundle) {
		return i2d.pp.prdorderissue.monitor.util.Formatter.oResourceBundle;
	}
	return {
		getText : function(a, b) {
			return "ERROR";
		}
	};
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatDateShort = function(dDate) {
	if (dDate) {
		var oDateFormatShort = sap.ca.ui.model.format.DateFormat.getDateInstance({
			style : "short"
		});
		return oDateFormatShort.format(dDate);
	};
	return "";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatQuantity = function(value, precision, unit) {
	if ((value != null) && (precision != null) && (unit != null)) {
		var sFormattedValue = sap.ca.ui.model.format.QuantityFormat.FormatQuantityStandard(value, unit, precision);
		return sFormattedValue + " " + unit;
	};
	return "";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatDelay = function(iDelay) {
	if (iDelay) {
		if (iDelay === 1) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("Day", [iDelay]);
		} 
		if ((iDelay > 1) && (iDelay !== 999 )) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("Days", [iDelay]);
		}
		if ((iDelay <= 0) || (iDelay === 999)) {
			//return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("NoSupply");
			return "";
		};
		
	};
	return "";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatComponentDelay = function(iDelay) {
	if (iDelay) {
		if (iDelay === 1) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("Day", [iDelay]);
		} 
		if ((iDelay > 1) && (iDelay !== 999)) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("Days", [iDelay]);
		}
		if (iDelay === 999) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("NoSupply");			
		};		
		if (iDelay <= 0) {			
			return "";
		};	
	};
	return "";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatIcon = function(iChecked) {
	switch (iChecked) {
		case false :
			// return "sap-icon://decline";
			return "";
			break;
		case true :
			return "sap-icon://accept";
			break;
		default :
			return "";
	};
};

i2d.pp.prdorderissue.monitor.util.Formatter.pdaTooltip = function(iChecked) {
	switch (iChecked) {
		case false :
			return ""; //i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("xtolPDANotAllowed");
			break;
		case true :
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("ManufacturingOrderIsLate");
			break;
		default :
			return "";
	};
};

i2d.pp.prdorderissue.monitor.util.Formatter.leadingZeros = function(number) {
	if (number) {
		return number.replace(/^(0+)/g, '');
	};
	return "";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatRatioInPct = function(value, precision) {
	if ((value != null) && (precision != null)) {
		var sFormattedValue = sap.ca.ui.model.format.QuantityFormat.FormatQuantityStandard(value, precision);
		return sFormattedValue + " " + "%";
	};
	return value + " " + "%";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatNumberOfComponents = function(status) {
	return (status == "0") ? "None" : "Error";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatLatenessDuration = function(status) {
	return "Error";
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatMaximumDelay = function(status) {
	return "Error";	
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatDurationToNextStatus = function(status) {
	try {
		if (status > 0) {
			return "Error";
		} else {
			return "None";
		}
	} catch (err) {
		return "None";
	}
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatDurationToNextStatusInDaysState = function(iStatus) {
	try {
		if (iStatus < 0) {
			return "Error";
		} else {
			return "None";
		}
	} catch (err) {
		return "None";
	}
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatDurationToNextStatusInDays = function(iDelay) {
	try {
		var fValue = parseFloat(iDelay);
		if (fValue < -1) {
			var fPosValue = fValue * -1;
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("OverdueByDays", [fPosValue]);
		}
		if (fValue === -1) {
			var fPosValue = fValue * -1;
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("OverdueByDay", [fPosValue]);
		}
		if (fValue === 0) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("Today", [iDelay]);
		}
		if (fValue === 1) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("InDay", [iDelay]);
		}
		if (fValue > 1) {
			return i2d.pp.prdorderissue.monitor.util.Formatter.getBundle().getText("InDays", [iDelay]);
		}
	} catch (err) {
		return "None";
	}
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatMfgOrderProblemCatIconStockReq = function(iCategory) {
	try {
		var fValue = iCategory.substring(0, 1);
		if (fValue == "1") {
			return "Error";
		} else {
			return "None";
		}
	} catch (err) {
		return "None";
	}
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatMfgOrderProblemCatIconTree = function(iCategory) {
	try {
		var fValue = iCategory.substring(1, 2);
		if (fValue == "1") {
			return "Error";
		} else {
			return "None";
		}
	} catch (err) {
		return "None";
	}
};

i2d.pp.prdorderissue.monitor.util.Formatter.formatMfgOrderProblemCatIconGantt = function(iCategory) {
	try {
		var fValue = iCategory.substring(2, 3);
		if (fValue == "1") {
			return "Error";
		} else {
			return "None";
		}
	} catch (err) {
		return "None";
	}
};

/**
 * formats late base material "Material late by 3 days" "Material late by one days" "Material on time"
 */
i2d.pp.prdorderissue.monitor.util.Formatter.formatBaseMaterialDelayText = function(latenessDurationInWorkDays) {
	// we have base material missing more than one day
	if (latenessDurationInWorkDays >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_X_DAYS",
				[latenessDurationInWorkDays]);
		// we have base material missing one da
	} else if (latenessDurationInWorkDays === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ONE_DAYS");
	} else {
		// base material on time
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_BASE_MAT_MISSING_ON_TIME");
	}
};

/**
 * formats missing components "1 missing part" "x missing parts" "No missing components"
 */
i2d.pp.prdorderissue.monitor.util.Formatter.formatMissingComponentsText = function(numberOfComponentsWithProblems) {
	// we have several components misssing
	if (numberOfComponentsWithProblems >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_X_COMPONENTS_MISSING",
				[numberOfComponentsWithProblems]);
		// we have one component missing
	} else if (numberOfComponentsWithProblems === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_ONE_COMPONENT_MISSING",
				[numberOfComponentsWithProblems]);
	} else {
		// we are <= 0 so no component is missing
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_NO_MISSING_COMPONENTS",
				[numberOfComponentsWithProblems]);
	}
};

/**
 * formats process delay "Late and Overdue" "Overdue" "On schedule"
 */
i2d.pp.prdorderissue.monitor.util.Formatter.formatProcessDelayText = function(durnPlndStatusToTodayInWrkdays) {
	// we have a delay of several days
	if (durnPlndStatusToTodayInWrkdays >= 2) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_X_DAYS",
				[durnPlndStatusToTodayInWrkdays]);
		// we have a delay of one day
	} else if (durnPlndStatusToTodayInWrkdays === 1) {
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_DELAYED_BY_ONE_DAY");
	} else {
		// we are <= 0 so we are on schedule
		return this.getModel('i18n').getResourceBundle().getText("MASTER_STATUS_ON_SCHEDULE");
	}
};





