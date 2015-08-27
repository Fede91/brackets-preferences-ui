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
  
    var proxyURLHelper = {
        regExp: /^(?:(https?):\/\/)?(?:([^\s:@]+):([^\s:@]+)@)?([^\s:@]+)(?::([0-9]+))?$/i,
        
        dataFromString: function(str) {
            var matches = this.regExp.exec(str);

            if (matches)
                return {
                    protocol: matches[1],
                    username: matches[2],
                    password: matches[3],
                    server:   matches[4],
                    port:     matches[5],
                };
            return null;
        },
        
        dataToString: function(data) {
            var str = '';
            
            if (data.protocol)                  str += data.protocol + '://';
            if (data.username && data.password) str += data.username + ':' + data.password + '@';
            /* if true */                       str += data.server;
            if (data.port)                      str += ':' + data.port;
            
            return this.regExp.test(str)? str : '';
        },
    };

    function loadPreferences() {
        var _proxyString = PreferencesManager.get("proxy");
        if (_proxyString == null || _proxyString == undefined) {
            _proxyString = prefs.get("proxy-string");
        }
      
        var _proxyData;
        if (_proxyString) {
            _proxyData = proxyURLHelper.dataFromString(_proxyString);
        }
        
        /* Code Inspection */
        $('#prefUI-cI').prop('checked', (PreferencesManager.get("linting.enabled")));
        /* useTabChar */
        $('#prefUI-tabChar').prop('checked', (PreferencesManager.get("useTabChar")));
        /* tabSize */
        $("#prefUI-tabSize").val(PreferencesManager.get("tabSize"));
        /* spaceUnits */
        $("#prefUI-spaceUnit").val(PreferencesManager.get("spaceUnits"));
        /* wordWrap */
        $('#prefUI-wordWrap').prop('checked', (PreferencesManager.get("wordWrap")));
        /* proxy */
        $('#prefUI-proxyEnabled').prop('checked', (prefs.get("proxy-enabled")));
        
        if (_proxyData) {
            $('input[name=prefUI-proxyProtocol][value='+(_proxyData.protocol || 'none')+']').attr('checked', true);
            $('#prefUI-proxyUsername').val(_proxyData.username || '');
            $('#prefUI-proxyPsw').val(_proxyData.password || '');
            $('#prefUI-proxyServer').val(_proxyData.server || '');
            $('#prefUI-proxyPort').val(_proxyData.port || '');
        }
        $("#prefUI-proxy").val(PreferencesManager.get("proxy"));
        /* smartIndent */
        $('#prefUI-smartIndent').prop('checked', (PreferencesManager.get("smartIndent")));
        /* closeTags */
        /* insertHintOnTab */
        $('#prefUI-insertHint').prop('checked', (PreferencesManager.get("insertHintOnTab")));
        /* sortDirectoriesFirst */
        $('#prefUI-sortDir').prop('checked', (PreferencesManager.get("sortDirectoriesFirst")));
        /* staticserver.port */
        $("#prefUI-serverPort").val(PreferencesManager.get("staticserver.port"));
        /* scrollPastEnd */
        $('#prefUI-scrollPastEnd').prop('checked', (PreferencesManager.get("scrollPastEnd")));
        /* softTabs */
        $('#prefUI-softTabs').prop('checked', (PreferencesManager.get("softTabs")));
        /* closeBrackets */
        $('#prefUI-closeBrackets').prop('checked', (PreferencesManager.get("closeBrackets")));
        /* dragDropText */
        $('#prefUI-dragDropText').prop('checked', (PreferencesManager.get("dragDropText")));
        /* showCursorWhenSelecting */
        $('#prefUI-showCursorWhenSelecting').prop('checked', (PreferencesManager.get("showCursorWhenSelecting")));
        /* uppercaseColors */
        $('#prefUI-uppercaseColors').prop('checked', (PreferencesManager.get("uppercaseColors")));
        /* highlightMatches */
        $('#prefUI-highlightMatches').prop('checked', (PreferencesManager.get("highlightMatches")));
        /* showCodeHints */
        $('#prefUI-showCodeHints').prop('checked', (PreferencesManager.get("showCodeHints")));
        /* maxCodeHints */
        $("#prefUI-maxCodeHints").val(PreferencesManager.get("maxCodeHints"));
        /* codehint.TagHints */
        $('#prefUI-TagHints').prop('checked', (PreferencesManager.get("codehint.TagHints")));
        /* codehint.SpecialCharHints */
        $('#prefUI-SpecialCharHints').prop('checked', (PreferencesManager.get("codehint.SpecialCharHints")));
        /* codehint.AttrHints */
        $('#prefUI-AttrHints').prop('checked', (PreferencesManager.get("codehint.AttrHints")));
        /* codehint.CssPropHints */
        $('#prefUI-CssPropHints').prop('checked', (PreferencesManager.get("codehint.CssPropHints")));
        /* codehint.JSHints */
        $('#prefUI-JSHints').prop('checked', (PreferencesManager.get("codehint.JSHints")));
        /* codehint.SVGHints */
        $('#prefUI-SVGHints').prop('checked', (PreferencesManager.get("codehint.SVGHints")));
        /* codehint.UrlCodeHints */
        $('#prefUI-UrlCodeHints').prop('checked', (PreferencesManager.get("codehint.UrlCodeHints")));
        /* jscodehints.noHintsOnDot */
        $('#prefUI-noHintsOnDot').prop('checked', (PreferencesManager.get("jscodehints.noHintsOnDot")));

        /* CodeFolding */
        /* code-folding​.alwaysUseIndentFold */
        $('#prefUI-CFIndentFold').prop('checked', (PreferencesManager.get("code-folding.alwaysUseIndentFold")));
        /* code-folding.enabled */
        $('#prefUI-CFEnabled').prop('checked', (PreferencesManager.get("code-folding.enabled")));
        /* code-folding.hideUntilMouseover */
        $('#prefUI-CFHideMouseOver').prop('checked', (PreferencesManager.get("code-folding.hideUntilMouseover")));
        /* code-folding.saveFoldStates */
        $('#prefUI-CFSaveFoldState').prop('checked', (PreferencesManager.get("code-folding.saveFoldStates")));
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
            PreferencesManager.set("linting.enabled", ($('#prefUI-cI').is(':checked')));
            /* useTabChar */
            PreferencesManager.set("useTabChar", ($('#prefUI-tabChar').is(':checked')));
            /* tabSize */
            PreferencesManager.set("tabSize", $("#prefUI-tabSize").val());
            /* spaceUnits */
            PreferencesManager.set("spaceUnits", $("#prefUI-spaceUnit").val());
            /* wordWrap */
            PreferencesManager.set("wordWrap", ($('#prefUI-wordWrap').is(':checked')));
            /* proxy */
            prefs.set("proxy-enabled", $('#prefUI-proxyEnabled').is(':checked'));
            
            var _protocol = $('input[name=prefUI-proxyProtocol]:checked').val();
            if (_protocol == 'none')
                _protocol = undefined;
            
            var _proxyString = proxyURLHelper.dataToString({
                protocol: _protocol,
                username: $("#prefUI-proxyUsername").val(),
                password: $("#prefUI-proxyPsw").val(),
                server:   $("#prefUI-proxyServer").val(),
                port:     $("#prefUI-proxyPort").val(),
            });
            
            PreferencesManager.set("proxy", ($('#prefUI-proxyEnabled').is(':checked')) ? _proxyString : undefined);
            prefs.set("proxy-string", _proxyString);
            /* smartIndent */
            PreferencesManager.set("smartIndent", ($('#prefUI-smartIndent').is(':checked')));
            /* closeTags */
            /* insertHintOnTab */
            PreferencesManager.set("insertHintOnTab", ($('#prefUI-insertHint').is(':checked')));
            /* sortDirectoriesFirst */
            PreferencesManager.set("sortDirectoriesFirst", ($('#prefUI-sortDir').is(':checked')));
            /* staticserver.port */
            PreferencesManager.set("staticserver.port", $("#prefUI-serverPort").val());
            /* scrollPastEnd */
            PreferencesManager.set("scrollPastEnd", ($('#prefUI-scrollPastEnd').is(':checked')));
            /* softTabs */
            PreferencesManager.set("softTabs", ($('#prefUI-softTabs').is(':checked')));
            /* closeBrackets */
            PreferencesManager.set("closeBrackets", ($('#prefUI-closeBrackets').is(':checked')));
            /* dragDropText */
            PreferencesManager.set("dragDropText", ($('#prefUI-dragDropText').is(':checked')));
            /* showCursorWhenSelecting */
            PreferencesManager.set("showCursorWhenSelecting", ($('#prefUI-showCursorWhenSelecting').is(':checked')));
            /* uppercaseColors */
            PreferencesManager.set("uppercaseColors", ($('#prefUI-uppercaseColors').is(':checked')));
            /* highlightMatches */
            PreferencesManager.set("highlightMatches", ($('#prefUI-highlightMatches').is(':checked')));
            /* showCodeHints */
            PreferencesManager.set("showCodeHints", ($('#prefUI-showCodeHints').is(':checked')));
            /* maxCodeHints */
            PreferencesManager.set("maxCodeHints", $("#prefUI-maxCodeHints").val());
            /* codehint.TagHints */
            PreferencesManager.set("codehint.TagHints", ($('#prefUI-TagHints').is(':checked')));
            /* codehint.SpecialCharHints */
            PreferencesManager.set("codehint.SpecialCharHints", ($('#prefUI-SpecialCharHints').is(':checked')));
            /* codehint.AttrHints */
            PreferencesManager.set("codehint.AttrHints", ($('#prefUI-AttrHints').is(':checked')));
            /* codehint.CssPropHints */
            PreferencesManager.set("codehint.CssPropHints", ($('#prefUI-CssPropHints').is(':checked')));
            /* codehint.JSHints */
            PreferencesManager.set("codehint.JSHints", ($('#prefUI-JSHints').is(':checked')));
            /* codehint.SVGHints */
            PreferencesManager.set("codehint.SVGHints", ($('#prefUI-SVGHints').is(':checked')));
            /* codehint.UrlCodeHints */
            PreferencesManager.set("codehint.UrlCodeHints", ($('#prefUI-UrlCodeHints').is(':checked')));
            /* jscodehints.noHintsOnDot */
            PreferencesManager.set("jscodehints.noHintsOnDot", ($('#prefUI-noHintsOnDot').is(':checked')));

            /* CodeFolding */
            /* code-folding.alwaysUseIndentFold */
            PreferencesManager.set("code-folding.alwaysUseIndentFold", ($('#prefUI-CFIndentFold').is(':checked')));
            /* code-folding.enabled */
            PreferencesManager.set("code-folding.enabled", ($('#prefUI-CFEnabled').is(':checked')));
            /* code-folding​.hideUntilMouseover */
            PreferencesManager.set("code-folding.hideUntilMouseover", ($('#prefUI-CFHideMouseOver').is(':checked')));
            /* code-folding.saveFoldStates */
            PreferencesManager.set("code-folding.saveFoldStates", ($('#prefUI-CFSaveFoldState').is(':checked')));
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
