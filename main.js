/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");
    
    var Dialogs             = brackets.getModule("widgets/Dialogs");
    var PanelTemplate       = require("text!panel.html");
    var ExtensionUtils      = brackets.getModule("utils/ExtensionUtils");
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");
    
    function handlePreferencesUI() {
        ExtensionUtils.loadStyleSheet(module, "panel.css");
        Dialogs.showModalDialogUsingTemplate(PanelTemplate);
        /* Set current values */
		/* jslint.options */
        /* TODO */
		/* Code Inspection */
		$('#prefUI-cI').prop('checked', (PreferencesManager.get("linting.enabled") == "true") ? true : false);
		/* useTabChar */
		$('#prefUI-tabChar').prop('checked', (PreferencesManager.get("useTabChar") == "true") ? true : false);
		/* tabSize */
		$("#prefUI-tabSize").val(PreferencesManager.get("tabSize"));
		/* spaceUnits */
		$("#prefUI-spaceUnit").val(PreferencesManager.get("spaceUnits"));
		/* wordWrap */
		$('#prefUI-wordWrap').prop('checked', (PreferencesManager.get("wordWrap") == "true") ? true : false);
		/* proxy */
		$("#prefUI-proxy").val(PreferencesManager.get("proxy"));
        /* smartIndent */
		$('#prefUI-smartIndent').prop('checked', (PreferencesManager.get("smartIndent") == "true") ? true : false);
		/* closeTags */
        /* TODO*/
		/* insertHintOnTab */
		$('#prefUI-insertHint').prop('checked', (PreferencesManager.get("insertHintOnTab") == "true") ? true : false);
		/* sortDirectoriesFirst */
		$('#prefUI-sortDir').prop('checked', (PreferencesManager.get("sortDirectoriesFirst") == "true") ? true : false);
		/* staticserver.port */
		$("#prefUI-serverPort").val(PreferencesManager.get("staticserver.port"));
		/* scrollPastEnd */
		$('#prefUI-scrollPastEnd').prop('checked', (PreferencesManager.get("scrollPastEnd") == "true") ? true : false);
		/* softTabs */
		$('#prefUI-softTabs').prop('checked', (PreferencesManager.get("softTabs") == "true") ? true : false);
		
		$("#prefUISubmit").on("click", function (e) {
            /* jslint.options */
            /* TODO */
            /* Code Inspection */
            PreferencesManager.set("linting.enabled", ($('#prefUI-cI').is(':checked')) ? "true" : "false");
            /* useTabChar */
            PreferencesManager.set("useTabChar", ($('#prefUI-tabChar').is(':checked')) ? "true" : "false");
            /* tabSize */
            PreferencesManager.set("tabSize", $("#prefUI-tabSize").val());
            /* spaceUnits */
            PreferencesManager.set("spaceUnits", $("#prefUI-spaceUnit").val());
            /* wordWrap */
            PreferencesManager.set("wordWrap", ($('#prefUI-wordWrap').is(':checked')) ? "true" : "false");
            /* proxy */
            PreferencesManager.set("proxy", $("#prefUI-proxy").val());
            /* smartIndent */
            PreferencesManager.set("smartIndent", ($('#prefUI-smartIndent').is(':checked')) ? "true" : "false");
            /* closeTags */
            /* TODO*/
            /* insertHintOnTab */
            PreferencesManager.set("insertHintOnTab", ($('#prefUI-insertHint').is(':checked')) ? "true" : "false");
            /* sortDirectoriesFirst */
            PreferencesManager.set("sortDirectoriesFirst", ($('#prefUI-sortDir').is(':checked')) ? "true" : "false");
            /* staticserver.port */
            PreferencesManager.set("staticserver.port", $("#prefUI-serverPort").val());
            /* scrollPastEnd */
            PreferencesManager.set("scrollPastEnd", ($('#prefUI-scrollPastEnd').is(':checked')) ? "true" : "false");
            /* softTabs */
            PreferencesManager.set("softTabs", ($('#prefUI-softTabs').is(':checked')) ? "true" : "false");
            
            PreferencesManager.save();
        });
    }
    
    var PREFUI_COMMAND_ID = "preferencesui.execute";
    CommandManager.register("Preferences", PREFUI_COMMAND_ID, handlePreferencesUI);
    var menu = Menus.getMenu(Menus.AppMenuBar.HELP_MENU);
    menu.addMenuItem(PREFUI_COMMAND_ID);
});