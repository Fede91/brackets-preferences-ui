/*
* main.js
* Author: Fede91
* Github: https://github.com/Fede91
*
* Made available under a MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
* main.js Copyright Fede91 2014.
*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
require.config({
    paths: {
        "text" : "lib/text",
        "i18n" : "lib/i18n"
    },
    locale: brackets.getLocale()
});

define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus          = brackets.getModule("command/Menus");

    var Dialogs             = brackets.getModule("widgets/Dialogs");
    var PanelTemplate       = require("text!panel.html");
    var ExtensionUtils      = brackets.getModule("utils/ExtensionUtils");
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        prefs               = PreferencesManager.getExtensionPrefs("prefUI");

    var Strings             = require("strings");

    function proxyDataFromString(str) {
        var matches = /^(?:(https?):\/\/)?(?:([^\s:@]+):([^\s:@]+)@)?([^\s:@]+)(?::([0-9]+))?$/i.exec(str);

        if (matches)
            return {
                protocol: matches[1],
                username: matches[2],
                password: matches[3],
                server:   matches[4],
                port:     matches[5],
            };
        return null;
    }//proxyDataFromString

    function proxyDataToString(data) {
        var str = '';
        
        if (data.protocol)                  str += data.protocol + '://';
        if (data.username && data.password) str += data.username + ':' + data.password + '@';
        /* if true */                       str += data.server;
        if (data.port)                      str += ':' + data.port;
        
        return str;
    }//proxyDataToString

    function loadPreferences() {
        var _proxyString = PreferencesManager.get("proxy");
        if (_proxyString == null || _proxyString == undefined) {
            _proxyString = prefs.get("proxy-string");
        }
      
        var _proxyData;
        if (_proxyString) {
            _proxyData = proxyDataFromString(_proxyString);
        }
        
        /* Code Inspection */
        $('#prefUI-cI').prop('checked', (PreferencesManager.get("linting.enabled") == true) ? true : false);
        /* useTabChar */
        $('#prefUI-tabChar').prop('checked', (PreferencesManager.get("useTabChar") == true) ? true : false);
        /* tabSize */
        $("#prefUI-tabSize").val(PreferencesManager.get("tabSize"));
        /* spaceUnits */
        $("#prefUI-spaceUnit").val(PreferencesManager.get("spaceUnits"));
        /* wordWrap */
        $('#prefUI-wordWrap').prop('checked', (PreferencesManager.get("wordWrap") == true) ? true : false);
        /* proxy */
        $('#prefUI-proxyEnabled').prop('checked', (prefs.get("proxy-enabled") == true) ? true : false);
        
        if (_proxyData) {
            $('input[name=prefUI-proxyProtocol][value='+(_proxyData.protocol || 'none')+']').attr('checked', true);
            $('#prefUI-proxyUsername').val(_proxyData.username || '');
            $('#prefUI-proxyPsw').val(_proxyData.password || '');
            $('#prefUI-proxyServer').val(_proxyData.server || '');
            $('#prefUI-proxyPort').val(_proxyData.port || '');
        }
        $("#prefUI-proxy").val(PreferencesManager.get("proxy"));
        /* smartIndent */
        $('#prefUI-smartIndent').prop('checked', (PreferencesManager.get("smartIndent") == true) ? true : false);
        /* closeTags */
        /* insertHintOnTab */
        $('#prefUI-insertHint').prop('checked', (PreferencesManager.get("insertHintOnTab") == true) ? true : false);
        /* sortDirectoriesFirst */
        $('#prefUI-sortDir').prop('checked', (PreferencesManager.get("sortDirectoriesFirst") == true) ? true : false);
        /* staticserver.port */
        $("#prefUI-serverPort").val(PreferencesManager.get("staticserver.port"));
        /* scrollPastEnd */
        $('#prefUI-scrollPastEnd').prop('checked', (PreferencesManager.get("scrollPastEnd") == true) ? true : false);
        /* softTabs */
        $('#prefUI-softTabs').prop('checked', (PreferencesManager.get("softTabs") == true) ? true : false);
        /* closeBrackets */
        $('#prefUI-closeBrackets').prop('checked', (PreferencesManager.get("closeBrackets") == true) ? true : false);
        /* dragDropText */
        $('#prefUI-dragDropText').prop('checked', (PreferencesManager.get("dragDropText") == true) ? true : false);
        /* showCursorWhenSelecting */
        $('#prefUI-showCursorWhenSelecting').prop('checked', (PreferencesManager.get("showCursorWhenSelecting") == true) ? true : false);
        /* uppercaseColors */
        $('#prefUI-uppercaseColors').prop('checked', (PreferencesManager.get("uppercaseColors") == true) ? true : false);
        /* highlightMatches */
        $('#prefUI-highlightMatches').prop('checked', (PreferencesManager.get("highlightMatches") == true) ? true : false);
        /* showCodeHints */
        $('#prefUI-showCodeHints').prop('checked', (PreferencesManager.get("showCodeHints") == true) ? true : false);
        /* maxCodeHints */
        $("#prefUI-maxCodeHints").val(PreferencesManager.get("maxCodeHints"));
        /* codehint.TagHints */
        $('#prefUI-TagHints').prop('checked', (PreferencesManager.get("codehint.TagHints") == true) ? true : false);
        /* codehint.SpecialCharHints */
        $('#prefUI-SpecialCharHints').prop('checked', (PreferencesManager.get("codehint.SpecialCharHints") == true) ? true : false);
        /* codehint.AttrHints */
        $('#prefUI-AttrHints').prop('checked', (PreferencesManager.get("codehint.AttrHints") == true) ? true : false);
        /* codehint.CssPropHints */
        $('#prefUI-CssPropHints').prop('checked', (PreferencesManager.get("codehint.CssPropHints") == true) ? true : false);
        /* codehint.JSHints */
        $('#prefUI-JSHints').prop('checked', (PreferencesManager.get("codehint.JSHints") == true) ? true : false);
        /* codehint.SVGHints */
        $('#prefUI-SVGHints').prop('checked', (PreferencesManager.get("codehint.SVGHints") == true) ? true : false);
        /* codehint.UrlCodeHints */
        $('#prefUI-UrlCodeHints').prop('checked', (PreferencesManager.get("codehint.UrlCodeHints") == true) ? true : false);
        /* jscodehints.noHintsOnDot */
        $('#prefUI-noHintsOnDot').prop('checked', (PreferencesManager.get("jscodehints.noHintsOnDot") == true) ? true : false);

        /* CodeFolding */
        /* code-folding​.alwaysUseIndentFold */
        $('#prefUI-CFIndentFold').prop('checked', (PreferencesManager.get("code-folding.alwaysUseIndentFold") == true) ? true : false);
        /* code-folding.enabled */
        $('#prefUI-CFEnabled').prop('checked', (PreferencesManager.get("code-folding.enabled") == true) ? true : false);
        /* code-folding.hideUntilMouseover */
        $('#prefUI-CFHideMouseOver').prop('checked', (PreferencesManager.get("code-folding.hideUntilMouseover") == true) ? true : false);
        /* code-folding.saveFoldStates */
        $('#prefUI-CFSaveFoldState').prop('checked', (PreferencesManager.get("code-folding.saveFoldStates") == true) ? true : false);
        /* code-folding.maxFoldLevel */
        $("#prefUI-CFMaxFoldLevel").val(PreferencesManager.get("code-folding.maxFoldLevel"));
        /* code-folding.minFoldSize */
        $("#prefUI-CFMinFoldSize").val(PreferencesManager.get("code-folding.minFoldSize"));
    }//loadPreferences

    function handlePreferencesUI() {
        ExtensionUtils.loadStyleSheet(module, "panel.css");
        var localizedTemplate = Mustache.render(PanelTemplate, Strings);
        Dialogs.showModalDialogUsingTemplate(localizedTemplate);

        /* Set current values */
        loadPreferences();

    $("#prefUISubmit").on("click", function (e) {
            /* jslint.options */
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
            
            var _protocol = $('input[name=prefUI-proxyProtocol]:checked').val();
            if (_protocol == 'none')
                _protocol = undefined;
            
            var _proxyString = proxyDataToString({
                protocol: _protocol,
                username: $("#prefUI-proxyUsername").val(),
                password: $("#prefUI-proxyPsw").val(),
                server: $("#prefUI-proxyServer").val(),
                port: $("#prefUI-proxyPort").val(),
            });
            
            PreferencesManager.set("proxy", ($('#prefUI-proxyEnabled').is(':checked')) ? _proxyString : undefined);
            prefs.set("proxy-string", _proxyString);
            /* smartIndent */
            PreferencesManager.set("smartIndent", ($('#prefUI-smartIndent').is(':checked')) ? true : false);
            /* closeTags */
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
            /* closeBrackets */
            PreferencesManager.set("closeBrackets", ($('#prefUI-closeBrackets').is(':checked')) ? true : false);
            /* dragDropText */
            PreferencesManager.set("dragDropText", ($('#prefUI-dragDropText').is(':checked')) ? true : false);
            /* showCursorWhenSelecting */
            PreferencesManager.set("showCursorWhenSelecting", ($('#prefUI-showCursorWhenSelecting').is(':checked')) ? true : false);
            /* uppercaseColors */
            PreferencesManager.set("uppercaseColors", ($('#prefUI-uppercaseColors').is(':checked')) ? true : false);
            /* highlightMatches */
            PreferencesManager.set("highlightMatches", ($('#prefUI-highlightMatches').is(':checked')) ? true : false);
            /* showCodeHints */
            PreferencesManager.set("showCodeHints", ($('#prefUI-showCodeHints').is(':checked')) ? true : false);
            /* maxCodeHints */
            PreferencesManager.set("maxCodeHints", $("#prefUI-maxCodeHints").val());
            /* codehint.TagHints */
            PreferencesManager.set("codehint.TagHints", ($('#prefUI-TagHints').is(':checked')) ? true : false);
            /* codehint.SpecialCharHints */
            PreferencesManager.set("codehint.SpecialCharHints", ($('#prefUI-SpecialCharHints').is(':checked')) ? true : false);
            /* codehint.AttrHints */
            PreferencesManager.set("codehint.AttrHints", ($('#prefUI-AttrHints').is(':checked')) ? true : false);
            /* codehint.CssPropHints */
            PreferencesManager.set("codehint.CssPropHints", ($('#prefUI-CssPropHints').is(':checked')) ? true : false);
            /* codehint.JSHints */
            PreferencesManager.set("codehint.JSHints", ($('#prefUI-JSHints').is(':checked')) ? true : false);
            /* codehint.SVGHints */
            PreferencesManager.set("codehint.SVGHints", ($('#prefUI-SVGHints').is(':checked')) ? true : false);
            /* codehint.UrlCodeHints */
            PreferencesManager.set("codehint.UrlCodeHints", ($('#prefUI-UrlCodeHints').is(':checked')) ? true : false);
            /* jscodehints.noHintsOnDot */
            PreferencesManager.set("jscodehints.noHintsOnDot", ($('#prefUI-noHintsOnDot').is(':checked')) ? true : false);

            /* CodeFolding */
            /* code-folding.alwaysUseIndentFold */
            PreferencesManager.set("code-folding.alwaysUseIndentFold", ($('#prefUI-CFIndentFold').is(':checked')) ? true : false);
            /* code-folding.enabled */
            PreferencesManager.set("code-folding.enabled", ($('#prefUI-CFEnabled').is(':checked')) ? true : false);
            /* code-folding​.hideUntilMouseover */
            PreferencesManager.set("code-folding.hideUntilMouseover", ($('#prefUI-CFHideMouseOver').is(':checked')) ? true : false);
            /* code-folding.saveFoldStates */
            PreferencesManager.set("code-folding.saveFoldStates", ($('#prefUI-CFSaveFoldState').is(':checked')) ? true : false);
            /* code-folding.maxFoldLevel */
            PreferencesManager.set("code-folding.maxFoldLevel", $("#prefUI-CFMaxFoldLevel").val());
            /* code-folding.minFoldSize */
            PreferencesManager.set("code-folding.minFoldSize", $("#prefUI-CFMinFoldSize").val());

            PreferencesManager.save();
        });
    }

    var PREFUI_COMMAND_ID = "preferencesui.execute";
    CommandManager.register(Strings.TITLE_PREFERENCES, PREFUI_COMMAND_ID, handlePreferencesUI);
    var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(PREFUI_COMMAND_ID);
});
