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
        //alert(PreferencesManager.get("proxy"));
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