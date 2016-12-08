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
require.config({
    paths: {
        "text" : "lib/text",
        "i18n" : "lib/i18n"
    },
    locale: brackets.getLocale()
});

define(function (require, exports, module) {
    "use strict";

    var CommandManager     = brackets.getModule("command/CommandManager"),
        Menus              = brackets.getModule("command/Menus"),
        Dialogs            = brackets.getModule("widgets/Dialogs"),
        ExtensionUtils     = brackets.getModule("utils/ExtensionUtils"),
        Mustache           = brackets.getModule("thirdparty/mustache/mustache"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    
    var PanelTemplate = require("text!panel.html");
    var Strings       = require("strings");
    
    var PREFUI_COMMAND_ID = "preferencesui.execute";
    var STD_MESSAGE = "Please try to update the version of 'Preferences setup UI' extension. If this problem has not been solved, write us a message with this Warning on Github: https://goo.gl/OLym9g";
    
    var extensionsPreferences = [];
    
    var _SYSTEM_CUSTOM_OVERRIDE_MAP = { proxy: "prefUI.proxy" }
    
    var CUSTOM_SETTINGS = 
        { 
        "prefUI.proxy": {
            label: "Proxy",
            description: "Proxy settings",
            type: "object",
            initial: {
                "prefUI.proxy-enabled" : false,
                "prefUI.proxy-protocol" : [
                    { value: "none", isDefault: "true" },
                    { value: "http", isDefault: "false" },
                    { value: "https", isDefault: "false" }
                ],
                "prefUI.proxy-username" : "",
                "prefUI.proxy-password" : "",
                "prefUI.proxy-server" : "",
                "prefUI.proxy-port" : 0,
                "prefUI.proxy-string": ""
            },
            keys: {
                "prefUI.proxy-enabled" : {
                    label: "Enabled",
                    description: "Proxy enabled",
                    type: "boolean",
                    initial: false
                },
                "prefUI.proxy-protocol" : {
                    label: "Protocol",
                    description : "Proxy protocol",
                    type : "radio",
                    initial:[
                        { label: "None", value: "none", isDefault: true },
                        { label: "HTTP", value: "http", isDefault: false },
                        { label: "HTTPS", value: "https", isDefault: false }
                    ]
                },
                "prefUI.proxy-username": {
                    label: "Username",
                    description : "Proxy username",
                    initial: "",
                    type : "string"
                },
                "prefUI.proxy-password": {
                    label: "Password",
                    description : "Proxy password",
                    initial: "",
                    type : "string"
                },
                "prefUI.proxy-server": {
                    label: "Server",
                    description : "Proxy server address",
                    initial: "",
                    type : "string"
                },
                "prefUI.proxy-port": {
                    label: "Port",
                    description : "Proxy server port",
                    initial: "",
                    type : "number"
                },
                "prefUI.proxy-string": {
                    type: "hidden",
                    description: "",
                    initial: ""
                }
            },
            actions: {
                set: function() {
                    var _proxyString = "";
                    
                    if (PreferencesManager.get("prefUI.proxy-protocol") && PreferencesManager.get("prefUI.proxy-protocol") !== 'none')
                        _proxyString += PreferencesManager.get("prefUI.proxy-protocol") + '://';
                    if (PreferencesManager.get("prefUI.proxy-username") && PreferencesManager.get("prefUI.proxy-password"))
                        _proxyString += PreferencesManager.get("prefUI.proxy-username") + ':' + PreferencesManager.get("prefUI.proxy-password") + '@';
                    
                    _proxyString += PreferencesManager.get("prefUI.proxy-server");
                    
                    if (PreferencesManager.get("prefUI.proxy-port"))
                        _proxyString += ':' + PreferencesManager.get("prefUI.proxy-port");
                    
                    var pattern = new RegExp(/^(?:(https?):\/\/)?(?:([^\s:@]+):([^\s:@]+)@)?([^\s:@]+)(?::([0-9]+))?$/i, 'g');
                    
                    if( pattern.test(_proxyString) ) {
                        PreferencesManager.set("prefUI.proxy-string", _proxyString);
                    }
                    
                    if( PreferencesManager.get("prefUI.proxy-enabled") )
                        PreferencesManager.set("proxy", _proxyString);
                    else 
                        PreferencesManager.set("proxy", "");
                    
                }
            }
        }
    };

    function printConsoleWarning(functionName, applMessage) {
        console.warn("[" + PREFUI_COMMAND_ID + "." + functionName + "] WARNING: " + applMessage + ". " + STD_MESSAGE);
    }
    
    function _getLabelText(key, obj) {
        var _lbl = '[' + key + ']'; // Default value
        
        if( typeof Strings[key.toUpperCase()] !== 'undefined' )
            _lbl = Strings[key.toUpperCase()];
        else if( typeof Strings[key.toUpperCase()] == 'undefined' && typeof obj !== 'undefined' && typeof obj.label !== 'undefined' )
            _lbl = obj.label;
        
        return _lbl;
    }// _getLabelText
    
    function _getFormValue(key, type) {
        
        var _objPref = PreferencesManager.getAllPreferences()[key];
        
        var _newVal;
        switch(type) {
            case "boolean":
                _newVal = $('[data-pref-id="' + key + '"]').is(':checked');
                break;
                
            case "hidden":
            case "string":
                _newVal = $('[data-pref-id="' + key + '"]').val();
                break;

            case "number":
                _newVal = Number($('[data-pref-id="' + key + '"]').val());
                break;

            case "array":
                _newVal = $('[data-pref-id="' + key + '"]').val().trim();

                if(_newVal.length > 0) {
                    _newVal = _newVal.split(',');
                } else {
                    _newVal = [];
                }

                break;
            case "object":
                _newVal = {};
                
                if (typeof _objPref == 'undefined' || ( typeof _objPref !== 'undefined' && typeof _objPref.keys == 'undefined') ) {
                    _newVal = JSON.parse( $('[data-pref-id="' + key + '"]').val());
                } else {
                
                    Object.keys(_objPref.keys).sort().forEach(function (keyChild) {
                        _newVal[keyChild] = _getFormValue(keyChild, _objPref.keys[keyChild].type);

                    });
                }
                
                break;
            
            case "radio":
                _newVal = $('input[name^="' + key + '"]:checked').val();
                
                break;
                
            default:
                printConsoleWarning("_getFormValue", "Type " + type + " is not managed"); //warning message
        }
        return _newVal;
    }
    
    function _saveCustomPreferences() {
        Object.keys(_SYSTEM_CUSTOM_OVERRIDE_MAP).sort().forEach(function (sysKey) {
            var _customKey = _SYSTEM_CUSTOM_OVERRIDE_MAP[sysKey];
            Object.keys(CUSTOM_SETTINGS[_customKey].keys).sort().forEach(function (cK) {
                var _currentVal = PreferencesManager.get(cK);
                var _newVal = _getFormValue(cK, CUSTOM_SETTINGS[_customKey].keys[cK].type);
                
                if( _newVal !== _currentVal ) {
                    PreferencesManager.set(cK, _newVal);
                }
                
            });
            
            if(typeof CUSTOM_SETTINGS[_customKey].actions !== 'undefined' && typeof CUSTOM_SETTINGS[_customKey].actions.set !== 'undefined')
                CUSTOM_SETTINGS[_customKey].actions.set();
        });
        
    }
    
    function _saveExtensionsPreferences() {
        for (var i=0; i < extensionsPreferences.length; i++) {
            var _obj = extensionsPreferences[i][Object.keys(extensionsPreferences[i])[0]];
            
            Object.keys(_obj.keys).sort().forEach(function (cK) {
                var _currentVal = PreferencesManager.get(cK);
                var _newVal = _getFormValue(cK, _obj.keys[cK].type);
                if( _newVal !== _currentVal ) {
                    PreferencesManager.set(cK, _newVal);
                }
                
            });
            
        }
    }
    
    function _savePreferences() {
        
        var allPrefs = PreferencesManager.getAllPreferences();
        
        Object.keys(allPrefs).sort().forEach(function (key) {
            
            if(typeof _SYSTEM_CUSTOM_OVERRIDE_MAP[key] == 'undefined' ) {
            
                var _objPref = allPrefs[key];
                var _type = _objPref.type;
                var _currentVal = PreferencesManager.get(key);

                var _newVal = _getFormValue(key, _type);

                // TO FIX: With Array and Object, this condition is always true
                if( _newVal !== _currentVal ) {

                    PreferencesManager.set(key, _newVal);
                }
            } 
        });
        
        _saveCustomPreferences();
        _saveExtensionsPreferences();
        
    }// _savePreferences
    
    function _getElementDOM(key, obj, userValue) {
        
        var _DOM = "";
        var _lblText = _getLabelText(key, obj);
        
        switch(obj.type) {
            case "boolean":
                var _checked = "";
                if(typeof userValue !== 'undefined') {
                    _checked = (userValue) ? "checked" : "";
                } else if(typeof obj.initial !==  'undefined') {
                    _checked = (obj.initial) ? "checked" : "";
                }
                
                _DOM = '<label>' +
                           '<input type="checkbox" data-pref-id="' + key + '" data-pref-type="'+obj.type+'" value="true" title="' + obj.description + '" '+_checked+'/>' +
                           _lblText +
                       '</label>';
                
                break;
            case "string":
                _DOM = '<div><label>'+_lblText+'</label><input type="text" data-pref-id="' + key + '" data-pref-type="'+obj.type+'" title="' + obj.description + '" value="' + ((typeof userValue !== 'undefined') ? userValue : '' ) + '"></div>'
                break;
            case "number":
                _DOM = '<div><label>'+_lblText+'</label><input type="number" data-pref-id="' + key + '" data-pref-type="'+obj.type+'" title="' + obj.description + '" value="' + ((typeof userValue !== 'undefined') ? userValue : '' ) + '" placeholder="Default: ' + ((typeof obj.initial !== 'undefined')? obj.initial : '0') +'"></div>'
                break;
            case "array":
                _DOM = '<div><label>'+_lblText+'</label><input type="text" data-pref-id="' + key + '" data-pref-type="'+obj.type+'" title="' + obj.description + '" value="'+((typeof userValue !== 'undefined') ? userValue.toString() : '' )+'" placeholder="Default: ' + ((typeof obj.initial !== 'undefined')? obj.initial : '[]') +'"></div>'
                break;
            case "object":
                var _v = userValue;
                
                if(typeof _v !== 'undefined') {
                    _v = JSON.stringify(userValue);
                }
                else if(typeof obj.initial !==  'undefined') {
                    _v = JSON.stringify(obj.initial);
                }
                
                _DOM = '<div><label>'+_lblText+'</label><textarea rows="2" data-pref-id="' + key + '" data-pref-type="'+obj.type+'">' + _v + '</textarea></div>'
                break;
                
            // EXTRA TYPES
            case "radio":
                _DOM = '<div class="prefUI-radio-wrapper"><label>'+ _lblText +'</label>';
                
                if( typeof obj.initial !== 'undefined' ) {
                    var _useDefaultValue = false;
                    if(typeof userValue == 'undefined') {
                        _useDefaultValue = true;
                    }
                    
                    for(var i=0; i<obj.initial.length; i++ ) {
                        if(_useDefaultValue)
                            _DOM += '<label><input type="radio" name="'+key+'" value="' + obj.initial[i].value + '" ' + ((obj.initial[i].isDefault) ? "checked" : "" ) + '>' + _getLabelText(obj.initial[i].value, obj.initial[i]) +'</label>'
                        else
                            _DOM += '<label><input type="radio" name="'+key+'" value="' + obj.initial[i].value + '" ' + (( userValue == obj.initial[i].value ) ? "checked" : "" ) + '>' + _getLabelText(obj.initial[i].value, obj.initial[i]) +'</label>'
                    }
                }
                
                _DOM += '</div>';
                
                break;
            case "hidden":
                _DOM = '<div><input type="hidden" name="' + key + '" data-pref-id="' + key + '" value="' + userValue + '"></div>';
                break;
            default:
                _DOM = '<p>' + key + ' [' + obj.type + ' ] '+ PreferencesManager.get(key) +'</p>';
                printConsoleWarning("_getElementDOM", "Type " + obj.type + " is not managed"); //warning message
        }
        
        return _DOM;
    }
    
    function _createElement(prefKey) {
       
        var _DOM = "";
        if(typeof PreferencesManager.getAllPreferences()[prefKey] == 'undefined' ) {
            _DOM = '<div>' + prefKey + ' [undefined] !!!! </div>'
        } else {
            
            var _prefData = PreferencesManager.getAllPreferences()[prefKey];
            
            if(typeof _SYSTEM_CUSTOM_OVERRIDE_MAP[prefKey] !== 'undefined' ) {
                _prefData = CUSTOM_SETTINGS[ _SYSTEM_CUSTOM_OVERRIDE_MAP[prefKey] ];
            }
            
            // retrieving the value of the preference key
            var _val = PreferencesManager.get(prefKey) ;
            
            // get label value
            var _lblText = _getLabelText(prefKey);
            
            switch(_prefData.type) {
                case "boolean":
                case "string":
                case "number":
                case "array":
                    _DOM += _getElementDOM(prefKey, _prefData, PreferencesManager.get(prefKey))
                    break;
                case "object":
                    var _keysObj = _prefData.keys;
                    
                    if(typeof _keysObj !== 'undefined') {
                        
                        _DOM = '<div><h4 data-pref-id="'+prefKey+'"  data-pref-type="'+_prefData.type+'">' + _getLabelText(prefKey, _prefData) + '</h4>'
                        
                        for(var i=0; i<  Object.keys( _keysObj ).length; i++ ) {
                            try {
                                var _currKey = Object.keys( _keysObj )[i];

                                var _actualVal = PreferencesManager.get(prefKey)[_currKey];

                                if(typeof _actualVal == 'undefined')
                                    _actualVal = PreferencesManager.get(_currKey);

                                _DOM += _getElementDOM(_currKey, _keysObj[_currKey], _actualVal)
                            } catch(e) {
                                console.warn("[PREFERENCES_UI] Key: " + prefKey );
                                console.warn(_prefData);
                                printConsoleWarning("_createElement", "EXCEPTION on type " + _prefData.type + ". Master key: " + prefKey +"; Index:" + i); //warning message
                            }
                        }
                        
                         _DOM += '</div>';
                        
                    } else {
                        _DOM = '<div><label>'+_getLabelText(prefKey, _prefData)+'</label><textarea rows="2" data-pref-id="' + prefKey + '" data-pref-type="'+_prefData.type+'">' + JSON.stringify(PreferencesManager.get(prefKey)); + '</textarea></div>'
                    }
                   
                    
                    break;
                default:
                    _DOM = '<p>' + prefKey + ' [' + _prefData.type + ' ] '+ PreferencesManager.get(prefKey) +'</p>';
                    printConsoleWarning("_createElement", "Type " + _prefData.type + " is not managed"); //warning message
            }
        }
        return _DOM;
    }
    
    
    // ============== FORM VALIDATION ================================================================================
    
    function _checkInputValue(type, value) {
        var _result = true;
        switch(type) {
            case "object":
                var _obj;
                try {
                    _obj = JSON.parse(value);
                    if( typeof _obj == 'number' || Array.isArray(_obj) ) {
                        _result = false;
                    }
                }
                catch(err) {
                    _result = false;
                }

                break;
            default: 
                printConsoleWarning("_checkInputValue", "Type " + _prefData.type + " is not managed");
        }
        return _result;
    }
    
    function _validateInput($jQElm) {
        
        var _isCorrect = _checkInputValue($jQElm.data('pref-type'), $jQElm.val());
        
        if( !_isCorrect && !$jQElm.hasClass("prefUI-input-error") ) {
            $jQElm.addClass("prefUI-input-error")
            $jQElm.parent().append("<div class='prefUI-inputErrorMsg'>The value of this field must be a "+ $jQElm.data('pref-type') +"</div>")
            $("#prefUISubmit").prop("disabled",true);
            
        } else if( _isCorrect && $jQElm.hasClass("prefUI-input-error") ) {
            $jQElm.removeClass("prefUI-input-error")
            $jQElm.parent().find(".prefUI-inputErrorMsg").remove();
            $("#prefUISubmit").prop("disabled",false);
        }
    }
    
    function _addListeners() {
        // Listener scroll
        $(".prefUI-sideBar a").click(function() {
            $('.prefUI-container').animate({
                scrollTop: $('.prefUI-container').scrollTop() + $("[data-hook='"+ $(this).data('anchor-to') +"']").offset().top - $('.prefUI-container').offset().top
                }, 500);
        })
        
        // Listener input text
        $('.prefUI-container input:text').on('input', function() { 
            _validateInput($(this))
        });
        
        $('.prefUI-container textarea').on('input', function() { 
            _validateInput($(this))
        });
        
        // Save Form
        $("#prefUISubmit").on("click", function (e) {
            _savePreferences();
        });
    }
    
    function _buildUI(skeletonUI) {
        // For each Root sections
        for(var i=0; i< Object.keys(skeletonUI).length; i++) {
            var _currMenuKey = Object.keys(skeletonUI)[i];
            
            var $menuItm = $("<ul data-wrapper='"+ _currMenuKey +"'></ul>"),
                $prefPanel = $("<section data-panel-wrapper='"+ _currMenuKey +"'></section>");
            
            // main sections [BRACKETS, EXTENSION]
            $menuItm.append("<li><h3><a href='#' data-anchor-to='" + _currMenuKey + "'>" + _getLabelText(_currMenuKey) + "</a></h3></li>")
            $prefPanel.append("<h2 data-hook='"+ _currMenuKey +"'>" + _currMenuKey + "</h2>")
            
            var $subMenuItm = $("<ul></ul>");
            for(var j=0; j< skeletonUI[ _currMenuKey ].length; j++ ) {
                if( typeof skeletonUI[_currMenuKey][j] === 'object' ) {
                    var _currSubMenuKey = Object.keys( skeletonUI[_currMenuKey][j] )[0];
                    
                    var _lbl = _getLabelText(_currSubMenuKey);
                    $subMenuItm.append("<li><a href='#' data-anchor-to='" + _currSubMenuKey + "'>" + _lbl + "</a></li>");
                    
                    $prefPanel.append("<h3 data-hook='"+ _currSubMenuKey +"'>" + _lbl + "</h3>");
                    
                    for(var k=0; k< skeletonUI[_currMenuKey][j][ _currSubMenuKey ].length; k++ ) {
                        
                        if( typeof skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k] === 'object' ) {
                            var _currSubElmKey = Object.keys( skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k] )[0];
                            
                            $prefPanel.append("<h4>" + _getLabelText(_currSubElmKey) + "</h4>");
                            
                            for(var z=0; z< skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k][_currSubElmKey].length; z++ ) {
                                $prefPanel.append( _createElement( _currSubElmKey + '.' + skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k][_currSubElmKey][z] ) );
                            }
                            
                        } else {
                            if(_currSubMenuKey =="EDITOR")
                                $prefPanel.append(_createElement(skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k]));
                                
                            else
                                $prefPanel.append(_createElement( _currSubMenuKey + '.' + skeletonUI[_currMenuKey][j][ _currSubMenuKey ][k]));
                        }
                    }
                    
                } else {
                    var _lbl = _getLabelText(skeletonUI[_currMenuKey][j]);
                    var _k = skeletonUI[_currMenuKey][j];
                    
                    if(typeof _SYSTEM_CUSTOM_OVERRIDE_MAP[_k] !== 'undefined' ) {
                        var _newKey = _SYSTEM_CUSTOM_OVERRIDE_MAP[_k];
                        
                        _lbl = CUSTOM_SETTINGS[_newKey].label;
                        
                        $subMenuItm.append("<li><a href='#' data-anchor-to='"+_newKey+"'>" + _lbl + "</a></li>");
                        $prefPanel.append("<h3 data-hook='"+ _newKey +"'>" + _lbl + "</h3>");
                    } else {
                        $subMenuItm.append("<li><a href='#' data-anchor-to='"+skeletonUI[_currMenuKey][j]+"'>" + _lbl + "</a></li>");
                        $prefPanel.append("<h3 data-hook='"+ skeletonUI[_currMenuKey][j] +"'>" + _lbl + "</h3>");
                    }
                    
                    $prefPanel.append(_createElement(skeletonUI[_currMenuKey][j]));
                }
            }
            
            var $subMenuItmWrapper = $("<li></li>");
            $subMenuItmWrapper.append($subMenuItm)
            $menuItm.append($subMenuItmWrapper);
            
            $(".prefUI-sideBar").append($menuItm);
            $(".prefUI-container").append($prefPanel);
        }
        
        _addListeners();
        
    }// _buildUI
    
    
    function handlePreferencesUI() {
        ExtensionUtils.loadStyleSheet(module, "panel.css");
        var localizedTemplate = Mustache.render(PanelTemplate, Strings);
        Dialogs.showModalDialogUsingTemplate(localizedTemplate);
        
        var CHILD_EDITOR = ["closeOthers", "code-folding", "findInFiles", "fonts"];
        var _MENU_BRACKETS_CHILDS = ["proxy"];

        var PREFERENCES_STRUCTURE = {
            "BRACKETS" : [
                {
                    "EDITOR": []
                }
            ],
            "EXTENSIONS" : []
        }

        var _rootMenuKey = Object.keys(PREFERENCES_STRUCTURE)[0];
        
        // Brackets settings management
        var allPrefs = PreferencesManager.getAllPreferences();
        
        Object.keys(allPrefs).sort().forEach(function (property) {
            if (allPrefs.hasOwnProperty(property)) {

                var pref = allPrefs[property];
                var _arrPref = property.split(".");

                // IF element to EDITOR Sub-menu
                if ( _arrPref.length === 1 && _MENU_BRACKETS_CHILDS.indexOf(_arrPref[0]) == -1 ) {
                    PREFERENCES_STRUCTURE[_rootMenuKey][0]["EDITOR"].push(_arrPref[0]) ;
                } else if ( _arrPref.length === 1 && _MENU_BRACKETS_CHILDS.indexOf(_arrPref[0]) > -1 ) {
                    PREFERENCES_STRUCTURE[_rootMenuKey].push(_arrPref[0])
                }
                else if ( CHILD_EDITOR.indexOf(_arrPref[0]) > -1) {

                    var _added = false;
                    for (var i=0; i< PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"].length; i++ ) {


                        if( Object.keys(PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"][i])[0] === _arrPref[0] ) { 

                            if (_arrPref.length > 1)
                                PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"][i][_arrPref[0]].push( _arrPref[1] )
                            else
                                PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"].push(_arrPref[0]) ;

                            _added = true;
                        }
                    }

                    if(!_added) {

                        if (_arrPref.length > 1) {
                            var _obj = {};
                            _obj[_arrPref[0]] = [];

                            PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"].push(_obj)

                            var _size = PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"].length;

                            PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"][_size-1][_arrPref[0]].push( _arrPref[1] )

                        } else {
                            PREFERENCES_STRUCTURE[ _rootMenuKey ][0]["EDITOR"].push(_arrPref[1])

                        }

                    }

                } else {
                    var _added = false;
                    for (var i=0; i< PREFERENCES_STRUCTURE[ _rootMenuKey ].length; i++ ) {
                    
                        if( Object.keys(PREFERENCES_STRUCTURE[ _rootMenuKey ][i])[0] === _arrPref[0] ) { 
                            PREFERENCES_STRUCTURE[ _rootMenuKey ][i][_arrPref[0]].push( _arrPref[1] )
                            _added = true;
                        }
                    }

                    if(!_added) {
                        var _obj = {};
                        _obj[_arrPref[0]] = [];

                        PREFERENCES_STRUCTURE[ _rootMenuKey ].push(_obj)

                        var _size = PREFERENCES_STRUCTURE[ _rootMenuKey ].length;

                        PREFERENCES_STRUCTURE[ _rootMenuKey ][_size-1][_arrPref[0]].push( _arrPref[1] )
                    }

                }

            }
        });
        
        // == BUILD UI SIDEBAR ========
        _buildUI(PREFERENCES_STRUCTURE)
        // == END BUILD UI SIDEBAR ====
        
        // Load Extensions preferences files
        var $extWrapper = $('[data-wrapper="EXTENSIONS"] li:nth-child(2) ul'),
            $extContentWrapper = $('[data-panel-wrapper="EXTENSIONS"]');
        
        // LOAD EXTERNAL FILES PREFERENCES ===
        var ExtensionLoader =  brackets.getModule("utils/ExtensionLoader");

        var FileSystem = brackets.getModule("filesystem/FileSystem");
        var Directory = brackets.getModule("filesystem/Directory");
        var FileUtils = brackets.getModule("file/FileUtils");

        Directory = FileSystem.getDirectoryForPath( ExtensionLoader.getUserExtensionPath() );

        Directory.getContents( function(err, contents, contentsStats, contentsStatsErrors) {

            for(var i=0; i<contents.length; i++) {

                var file = FileSystem.getFileForPath(contents[i].fullPath + 'preferences.json');

                var promise = FileUtils.readAsText(file);  // completes asynchronously
                promise.done(function (text) {
                    try {
						var _json = JSON.parse(text);
						
						extensionsPreferences.push(_json);
						
						$extWrapper.append("<li><a href='#' data-anchor-to='" + Object.keys(_json)[0] + "'>" +  _getLabelText(Object.keys(_json)[0], _json[Object.keys(_json)[0]]) + "</a></li>");
						$extContentWrapper.append("<h3 data-hook='"+  Object.keys(_json)[0] +"'>" + _getLabelText(Object.keys(_json)[0], _json[Object.keys(_json)[0]]) + "</h3>");
						
						 Object.keys(_json[Object.keys(_json)[0]].keys).sort().forEach(function (property) {
							
							$extContentWrapper.append(_getElementDOM( property , _json[Object.keys(_json)[0]].keys[property], PreferencesManager.get(property)));
							 
						 });
						_addListeners()
					} catch (e){
						;
					}	 
                })
                .fail(function (errorCode) {
                    ///console.log("Error: " + errorCode);
                });

            }
        } )
        
    }
    
    CommandManager.register(Strings.BRACKETS_MENU_LABEL, PREFUI_COMMAND_ID, handlePreferencesUI);
    var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(PREFUI_COMMAND_ID);
    
});
