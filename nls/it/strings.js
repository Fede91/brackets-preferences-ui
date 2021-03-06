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

// Italian - it strings

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */
define({
    "BRACKETS_MENU_LABEL" : "Preferenze...",
    "TITLE_PREFERENCES" : "Preferenze",
    "BTT_SAVE" : "Salva",
    "BTT_CANC" : "Cancella",
    "BRACKETS" : "Brackets",
    "EXTENSIONS" : "Estensioni",
    "EDITOR" : "Editor",
    "CLOSEBRACKETS" : "Chiudi le parentesi",
    "DEFAULTEXTENSION" : "Estensioni di default",
    "DRAGDROPTEXT" : "Funzionalita` Drag & Drop",
    "HIGHLIGHTMATCHES" : "Evidenzia automaticamente le stringhe uguali",
    "INDENTLINECOMMENT" : "Indenta commenti",
    "INSERTHINTONTAB" : "Inserisci suggerimenti con Tab",
    "LINEWISECOPYCUT": "Copia/taglia intera linea",
    "MAXCODEHINTS" : "Numero massimo di suggerimenti",
    "NODISTRACTIONS" : "Modalita` No distrazioni",
    "SCROLLPASTEND" : "Scrolla oltre la fine del file",
    "SHOWCODEHINTS" : "Visualizza suggerimenti del codice",
    "SHOWCURSORWHENSELECTING" : "Visualizza cursore durante la selezione",
    "SHOWLINENUMBERS" : "Visualizza numeri di linea",
    "SMARTINDENT" : "Indentazione intelligente",
    "SOFTTABS" : "Soft tabs",
    "SORTDIRECTORIESFIRST" : "Ordina cartelle per prime",
    "SPACEUNITS" : "Spazi d'indentazione",
    "STYLEACTIVELINE" : "Evidenzia linea attiva",
    "TABSIZE" : "Ampiezza tabulazione",
    "UPPERCASECOLORS" : "Colori in maiuscolo",
    "USETABCHAR" : "Usa il carattere Tab",
    "WORDWRAP" : "A capo automaticamente",
    "CLOSETAGS" : "Chiudi tags",
    "DONTCLOSETAGS" : "Non chiudere i tags per:",
    "WHENOPENING" : "All'apertura",
    "WHENCLOSING" : "Alla chiusura",
    "INDENTTAGS" : "Indenta i tags per:",
    "CODE-FOLDING" : "Compressione del codice",
    "CODE-FOLDING.ALWAYSUSEINDENTFOLD": "Genera compressione del codice al cambio dell'indentazione",
    "CODE-FOLDING.ENABLED" : "Abilitato",
    "CODE-FOLDING.HIDEUNTILMOUSEOVER" : "Espandi al passaggio del mouse",
    "CODE-FOLDING.MAKESELECTIONSFOLDABLE" : "Genera compressione del codice al cambio dell'indentazione",
    "CODE-FOLDING.MAXFOLDLEVEL" : "Livello massimo di compressione",
    "CODE-FOLDING.MINFOLDSIZE" : "Livello minimo di compressione",
    "CODE-FOLDING.SAVEFOLDSTATES" : "Memorizza la compressione del codice",
    "CLOSEOTHERS" : "Chiudi",
    "CLOSEOTHERS.ABOVE" : "Al di sopra",
    "CLOSEOTHERS.BELOW" : "Al di sotto",
    "CLOSEOTHERS.OTHERS" : "Tutto il resto",
    "CODEHINT" : "Suggerimenti codice",
    "CODEHINT.ATTRHINTS": "Attributi HTML",
    "CODEHINT.CSSPROPHINTS": "Proprieta` CSS/LESS/SCSS",
    "CODEHINT.JSHINTS": "JavaScript",
    "CODEHINT.PREFHINTS": "Preferenze",
    "CODEHINT.SVGHINTS": "Codice SVG",
    "CODEHINT.SPECIALCHARHINTS": "Entità HTML",
    "CODEHINT.TAGHINTS": "Tag HTML",
    "CODEHINT.URLCODEHINTS": "URL in HTML & CSS/LESS/SCSS",
    "FINDINFILES" : "Cerca nei files",
    "FINDINFILES.INSTANTSEARCH": "Ricerca immediata",
    "FINDINFILES.NODESEARCH": "Ricerca basata su Node",
    "FONTS" : "Fonts",
    "FONTS.FONTFAMILY" : "Font family",
    "FONTS.FONTSIZE" : "Font size",
    "DEBUG" : "Debug",
    "DEBUG.SHOWERRORSINSTATUSBAR": "Visualizza errori nella barra di stato",
    "HEALTHDATA" : "Health data",
    "HEALTHDATA.HEALTHDATATRACKING" : "Tracciatura Health data",
    "JSCODEHINTS" : "Suggerimenti JavaScript",
    "JSCODEHINTS.DETECTEDEXCLUSIONS": "File da escludere",
    "JSCODEHINTS.INFERENCETIMEOUT": "Timeout lettura del file",
    "JSCODEHINTS.NOHINTSONDOT": "Nessun suggerimento dopo il punto",
    "JSCODEHINTS.TYPEDETAILS": "Dettagli sui tipi",
    "JSLINT" : "Validatore JavaScript",
    "JSLINT.OPTIONS" : "Opzioni:",
    "ASS" : "Espressioni di assegnazione",
    "BITWISE" : "Operatori bit a bit",
    "BROWSER" : "Variabili globali del browser",
    "CLOSURE" : "Idiomi Google Closure",
    "CONTINUE" : "Continue",
    "COUCH" : "Variabili globali CouchDB",
    "DEVEL" : "Variabili globali di sviluppo del broser",
    "EQEQ" : "Operatore di uguaglianza e disuguaglianza",
    "ES6" : "Variabili globali EcmaScript 6",
    "EVIL" : "Funzione Eval",
    "FORIN" : "Istruzione For..in",
    "INDENT" : "Spazi d'indentazione:",
    "MAXERR" : "Numero massimo di errori:",
    "MAXLEN" : "Lunghezza massima linea:",
    "NEWCAP" : "Costruttori in minuscolo",
    "NODE" : "Variabili globali Node.js",
    "NOMEN" : "Underscore all'inizio o alla fine dei nomi",
    "PASSFAIL" : "Stop al primo errore",
    "PLUSPLUS" : "Operatori di incrementazione e decrementazione",
    "REGEXP" : "Sintassi speciale nelle espressioni regolari",
    "RHINO" : "Variabili globali Rhino",
    "SLOPPY" : "Omissione `use strict`",
    "STUPID" : "Pratiche 'stupide'",
    "SUB" : "Riferimento agli elementi degli oggetti",
    "TODO" : "Commenti TODO",
    "UNPARAM" : "Parametri non usati",
    "VARS" : "Multipli `var` nelle funzioni",
    "WHITE" : "Non controllare l'indentazione",
    "LANGUAGE" : "Linguaggio",
    "LANGUAGE.FILEEXTENSIONS": "Estensione dei file",
    "LANGUAGE.FILENAMES": "Nomi dei file",
    "LINTING" : "Validazione",
    "LINTING.ASYNCTIMEOUT": "Timeout asincrono",
    "LINTING.COLLAPSED": "Collassato",
    "LINTING.ENABLED": "Abilitato",
    "LINTING.PREFER": "Preferenze",
    "LINTING.USEPREFERREDONLY": "Usa solamente il preferito",
    "LIVEDEV" : "Sviluppo in tempo reale",
    "LIVEDEV.MULTIBROWSER" : "Multibrowser",
    "PANE" : "Pannelli",
    "PANE.MERGEPANESWHENLASTFILECLOSED" : "Fondi i pannelli quando l'ultimo file viene chiuso",
    "PANE.SHOWPANEHEADERBUTTONS" : "Visualizza i bottoni nelle intestazioni dei pannelli",
    "PREFERENCESVIEW" : "Visualizzazione preferenze",
    "PREFERENCESVIEW.OPENPREFSINSPLITVIEW" : "Apri le preferenze in visualizzazione separata",
    "PREFERENCESVIEW.OPENUSERPREFSINSECONDPANE" : "Apri le preferenze dell'utente nel secondo pannello",
    "PROXY" : "Proxy",
    "QUICKVIEW" : "Visualizzazione rapida",
    "QUICKVIEW.ENABLED" : "Abilitata",
    "QUICKVIEW.EXTENSIONLESSIMAGEPREVIEW" : "Anteprima immagini senza estensione",
    "RECENT-FILES" : "File recenti",
    "RECENT-FILES.NAVIGATION" : "Navigazione file recenti",
    "STATICSERVER" : "Server statico",
    "STATICSERVER.PORT" : "Porta",
    "THEMES" : "Temi",
    "THEMES.THEME" : "Tema",
    "THEMES.THEMESCROLLBARS" : "Barre di scorrimento a tema",
    "PREFUI.PROXY-ENABLED" : "Abilitato",
    "PREFUI.PROXY-PORT" : "Porta"
});
