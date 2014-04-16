/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");
    
    var Dialogs             = brackets.getModule("widgets/Dialogs");
    var PanelTemplate       = require("text!panel.html");
    var ExtensionUtils      = brackets.getModule("utils/ExtensionUtils");
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        prefs               = PreferencesManager.getExtensionPrefs("prefUI");
    
    function getProxyProtocol(proxyString) {
        if (proxyString.indexOf('https') > -1) {
            return 'https';
        }
        if (proxyString.indexOf('http') > -1) {
            return 'http';
        }
        return 'none';
    }//getProxyProtocol
    
    function getProxyData(proxyProtocol, proxyString, type) {
        var _protocolLength = (proxyProtocol == 'none') ? 0 : proxyProtocol.length+3;
        var _proxySNoProt = proxyString.substring(_protocolLength);
        var _splitPS = _proxySNoProt.split('@');
        var _userPsw = _splitPS[0].split(':');
        var _serverPort = _splitPS[1].split(':');
        
        switch(type){
            case 'USERNAME':
                return _userPsw[0];
                break;
            case 'PASSWORD':
                return _userPsw[1];
                break;
            case 'SERVER':
                return _serverPort[0];
                break;
            case 'PORT':
                return _serverPort[1];
                break;
        }
    }//getProxyUsername
    
    function loadPreferences() {
        var _proxyString = PreferencesManager.get("proxy");
        console.log(_proxyString);
        if (_proxyString == null) {
            _proxyString = prefs.get("proxy-string");
            console.log('replace; '+_proxyString);
        }
        
        var _proxyProtocol = getProxyProtocol(_proxyString);
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
		$('#prefUI-proxyEnabled').prop('checked', (prefs.get("proxy-enabled") == true) ? true : false);
        $('input[name=prefUI-proxyProtocol][value='+_proxyProtocol+']').attr('checked', true);
        
        $('#prefUI-proxyUsername').val(getProxyData(_proxyProtocol, _proxyString, 'USERNAME')); 
        $('#prefUI-proxyPsw').val(getProxyData(_proxyProtocol, _proxyString, 'PASSWORD')); 
        $('#prefUI-proxyServer').val(getProxyData(_proxyProtocol, _proxyString, 'SERVER')); 
        $('#prefUI-proxyPort').val(getProxyData(_proxyProtocol, _proxyString, 'PORT')); 
        
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
    }//loadPreferences
    
    function handlePreferencesUI() {
        ExtensionUtils.loadStyleSheet(module, "panel.css");
        Dialogs.showModalDialogUsingTemplate(PanelTemplate);
        
        /* Set current values */
        loadPreferences();
        
		$("#prefUISubmit").on("click", function (e) {
            /* jslint.options */
            /* TODO */
            /* Code Inspection */
            PreferencesManager.set("linting.enabled", ($('#prefUI-cI').is(':checked')) ? true : false);
            /* useTabChar */
            PreferencesManager.set("useTabChar", ($('#prefUI-tabChar').is(':checked')) ? true : false);
            /* tabSize */
            PreferencesManager.set("tabSize", $("#prefUI-tabSize").val());
            /* spaceUnits */
            PreferencesManager.set("spaceUnits", $("#prefUI-spaceUnit").val());
            /* wordWrap */
            PreferencesManager.set("wordWrap", ($('#prefUI-wordWrap').is(':checked')) ? true : false);
            /* proxy */
            prefs.set("proxy-enabled", $('#prefUI-proxyEnabled').is(':checked'));
            var _proxyString = "";
            
            if($('input[name=prefUI-proxyProtocol]:checked').val() != "none"){
                _proxyString = $('input[name=prefUI-proxyProtocol]:checked').val() + "://";
            }
            _proxyString = _proxyString +
                           $("#prefUI-proxyUsername").val()                    + ":" +
                           $("#prefUI-proxyPsw").val()                         + "@" +
                           $("#prefUI-proxyServer").val()                      + ":" +
                           $("#prefUI-proxyPort").val();
            PreferencesManager.set("proxy", ($('#prefUI-proxyEnabled').is(':checked')) ? _proxyString : undefined);
            prefs.set("proxy-string", _proxyString);
            /* smartIndent */
            PreferencesManager.set("smartIndent", ($('#prefUI-smartIndent').is(':checked')) ? true : false);
            /* closeTags */
            /* TODO*/
            /* insertHintOnTab */
            PreferencesManager.set("insertHintOnTab", ($('#prefUI-insertHint').is(':checked')) ? true : false);
            /* sortDirectoriesFirst */
            PreferencesManager.set("sortDirectoriesFirst", ($('#prefUI-sortDir').is(':checked')) ? true : false);
            /* staticserver.port */
            PreferencesManager.set("staticserver.port", $("#prefUI-serverPort").val());
            /* scrollPastEnd */
            PreferencesManager.set("scrollPastEnd", ($('#prefUI-scrollPastEnd').is(':checked')) ? true : false);
            /* softTabs */
            PreferencesManager.set("softTabs", ($('#prefUI-softTabs').is(':checked')) ? true : false);
            
            PreferencesManager.save();
        });
    }
	
    var PREFUI_COMMAND_ID = "preferencesui.execute";
    CommandManager.register("Preferences", PREFUI_COMMAND_ID, handlePreferencesUI);
    var menu = Menus.getMenu(Menus.AppMenuBar.HELP_MENU);
    menu.addMenuItem(PREFUI_COMMAND_ID);
});