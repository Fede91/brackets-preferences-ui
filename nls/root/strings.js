/*
* strings.js
* Author: Fede91
* Github: https://github.com/Fede91
*
* Made available under a MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
* strings.js Copyright Fede91 2014.
*/

// English - root strings

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
define({
    "BRACKETS_MENU_LABEL" : "Preferences...",
    "TITLE_PREFERENCES" : "Preferences",
    "BTT_SAVE" : "Save",
    "BTT_CANC" : "Cancel",
    "BRACKETS" : "Brackets",
    "EXTENSIONS" : "Extensions",
    "EDITOR" : "Editor",
    "CLOSEBRACKETS" : "Close Brackets",
    "DEFAULTEXTENSION" : "Default extension",
    "DRAGDROPTEXT" : "Drag & Drop functionality",
    "HIGHLIGHTMATCHES" : "Automatic highlighting of matching strings",
    "INDENTLINECOMMENT" : "Indent line comment",
    "INSERTHINTONTAB" : "Insert Hint On Tab",
    "LINEWISECOPYCUT" : "*Line wise copy cut",
    "MAXCODEHINTS" : "Max code hints",
    "NODISTRACTIONS" : "No distractions mode",
    "SCROLLPASTEND" : "Scroll past end",
    "SHOWCODEHINTS" : "Show code hints",
    "SHOWCURSORWHENSELECTING" : "Show cursor when selecting",
    "SHOWLINENUMBERS" : "Show line numbers",
    "SMARTINDENT" : "Smart indent",
    "SOFTTABS" : "Soft tabs",
    "SORTDIRECTORIESFIRST" : "Sort directories first",
    "SPACEUNITS" : "Space units",
    "STYLEACTIVELINE" : "Highlight active line",
    "TABSIZE" : "Tab size",
    "UPPERCASECOLORS" : "Uppercase colors",
    "USETABCHAR" : "Use Tab char",
    "WORDWRAP" : "Word wrap",
    "CLOSETAGS" : "Close tags",
    "DONTCLOSETAGS" : "Don't close tags for:",
    "WHENOPENING" : "When opening",
    "WHENCLOSING" : "When closing",
    "INDENTTAGS" : "Indent tags for:",
    "CODE-FOLDING" : "Code folding",
    "CODE-FOLDING.ALWAYSUSEINDENTFOLD" : "Always use indent folding",
    "CODE-FOLDING.ENABLED" : "Enabled",
    "CODE-FOLDING.HIDEUNTILMOUSEOVER" : "Hide until mouse over",
    "CODE-FOLDING.MAKESELECTIONSFOLDABLE" : "Make selection foldable",
    "CODE-FOLDING.MAXFOLDLEVEL" : "Max folding level",
    "CODE-FOLDING.MINFOLDSIZE" : "Min folding size",
    "CODE-FOLDING.SAVEFOLDSTATES" : "Save folding states",
    "CLOSEOTHERS" : "Close others",
    "CLOSEOTHERS.ABOVE" : "Close others above",
    "CLOSEOTHERS.BELOW" : "Close others below",
    "CLOSEOTHERS.OTHERS" : "Close everything else",
    "CODEHINT" : "Code hint",
    "CODEHINT.ATTRHINTS": "HTML attribute hints",
    "CODEHINT.CSSPROPHINTS": "CSS/LESS/SCSS property hints",
    "CODEHINT.JSHINTS": "JavaScript code hints",
    "CODEHINT.PREFHINTS": "Preferences hints",
    "CODEHINT.SVGHINTS": "SVG code hints",
    "CODEHINT.SPECIALCHARHINTS": "HTML entity hints",
    "CODEHINT.TAGHINTS": "HTML tag hints",
    "CODEHINT.URLCODEHINTS": "URL hints in HTML & CSS/LESS/SCSS",
    "FINDINFILES" : "Find in files",
    "FINDINFILES.INSTANTSEARCH": "Instant search",
    "FINDINFILES.NODESEARCH": "Node search",
    "FONTS" : "Fonts",
    "FONTS.FONTFAMILY" : "Font family",
    "FONTS.FONTSIZE" : "Font size",
    "DEBUG" : "Debug",
    "DEBUG.SHOWERRORSINSTATUSBAR": "Show errors in status bar",
    "HEALTHDATA" : "Health data",
    "HEALTHDATA.HEALTHDATATRACKING" : "Health data tracking",
    "JSCODEHINTS" : "JavaScript code hints",
    "JSCODEHINTS.DETECTEDEXCLUSIONS": "Detected exclusions",
    "JSCODEHINTS.INFERENCETIMEOUT": "Inference timeout",
    "JSCODEHINTS.NOHINTSONDOT": "No hints on dot",
    "JSCODEHINTS.TYPEDETAILS": "Type details",
    "JSLINT" : "JavaScript lint",
    "JSLINT.OPTIONS" : "Options:",
    "ASS" : "Assignment expressions",
    "BITWISE" : "Bit wise",
    "BROWSER" : "Browser global variables",
    "CLOSURE" : "Google Closure's idioms",
    "CONTINUE" : "Continue",
    "COUCH" : "CouchDB global variables",
    "DEVEL" : "Development browser global variables",
    "EQEQ" : "Equality and inequality operators",
    "ES6" : "EcmaScript 6 global variables",
    "EVIL" : "Eval function",
    "FORIN" : "For..in statement",
    "INDENT" : "Indentation spaces:",
    "MAXERR" : "Max number of errors:",
    "MAXLEN" : "Max line length:",
    "NEWCAP" : "Lowercase constructors",
    "NODE" : "Node.js global variables",
    "NOMEN" : "Underscore at the start or at the end of the names",
    "PASSFAIL" : "Stop at the first error",
    "PLUSPLUS" : "Increment and decrease operators",
    "REGEXP" : "Special syntax on regular expressions",
    "RHINO" : "Rhino global variables",
    "SLOPPY" : "Omit `use strict`",
    "STUPID" : "Stupid practices",
    "SUB" : "Reference to the elements of objects",
    "TODO" : "TODO comments",
    "UNPARAM" : "Parameters not used",
    "VARS" : "Multiple `var` on functions",
    "WHITE" : "Don't check indentation",
    "LANGUAGE" : "Language",
    "LANGUAGE.FILEEXTENSIONS": "File extensions",
    "LANGUAGE.FILENAMES": "File names",
    "LINTING" : "Linting",
    "LINTING.ASYNCTIMEOUT": "Async timeout",
    "LINTING.COLLAPSED": "Collapsed",
    "LINTING.ENABLED": "Enabled",
    "LINTING.PREFER": "Preference",
    "LINTING.USEPREFERREDONLY": "Use preferred only",
    "LIVEDEV" : "Live development",
    "LIVEDEV.MULTIBROWSER" : "Multibrowser",
    "PANE" : "Pane",
    "PANE.MERGEPANESWHENLASTFILECLOSED": "Merge panes when last file is closed",
    "PANE.SHOWPANEHEADERBUTTONS": "Show pane header buttons",
    "PREFERENCESVIEW" : "Preferences view",
    "PREFERENCESVIEW.OPENPREFSINSPLITVIEW" : "Open preferences in split view",
    "PREFERENCESVIEW.OPENUSERPREFSINSECONDPANE" : "Open user preferences in second pane",
    "PROXY" : "Proxy",
    "QUICKVIEW" : "Quick view",
    "QUICKVIEW.ENABLED" : "Enabled",
    "QUICKVIEW.EXTENSIONLESSIMAGEPREVIEW" : "Extensionless image preview",
    "RECENT-FILES" : "Recent files",
    "RECENT-FILES.NAVIGATION" : "Recent files navigation",
    "STATICSERVER" : "Static server",
    "STATICSERVER.PORT" : "Port",
    "THEMES" : "Themes",
    "THEMES.THEME" : "Theme",
    "THEMES.THEMESCROLLBARS" : "Theme scrollbars"
});