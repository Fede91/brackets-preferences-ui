define(function (require, exports, module) {
	"use strict";
    
    var _extObjs = {
        "brackets-beautify": {
            "label": "Beautify",
            "description": "",
            "type": "object",
            "initial": {},
            "preference-key": "me.drewh.jsbeautify",
            "keys": {
               "me.drewh.jsbeautify.on_save" : {
                    "label": "Beautify on save",
                    "description": "",
                    "type": "boolean",
                     "initial": "false"
                }
            }
        },
        "ivogabe.icons": {
            "label": "Brackets Icons",
            "description": "",
            "type": "object",
            "initial": {},
            "preference-key": "brackets-icons",
            "keys": {
                "brackets-icons.secondary" : {
                    "label": "Show secondary icons",
                    "description": "",
                    "type": "boolean",
                     "initial": "false"
                },
                "brackets-icons.iconset" : {
                    "label": "Icon set",
                    "description": "",
                    "type": "radio",
                    "initial":[
                        {
                            "label": "Ionicons",
                            "value": "ionicons",
                            "isDefault": true
                        },
                        {
                            "label": "Devicons",
                            "value": "devicons",
                            "isDefault": false
                        }
                    ]
                },
                "brackets-icons.icons" : {
                    "label": "Icons",
                    "description": "",
                    "type": "object",
                    "initial": "{}"
                }
            }
        },
        "zaggino.brackets-git": {
            "label": "Brackets Git",
            "description": "",
            "type": "object",
            "initial": {},
            "preference-key": "brackets-git",
            "keys": {
                "brackets-git.stripWhitespaceFromCommits" : {
                    "label": "Strip trailing whitespace from commits",
                    "description": "",
                    "type": "boolean",
                     "initial": "true"
                },
                "brackets-git.addEndlineToTheEndOfFile" : {
                    "label": "Add endline at the end of file",
                    "description": "",
                    "type": "boolean",
                     "initial": "true"
                },
                "brackets-git.removeByteOrderMark" : {
                    "label": "Remove BOM from files",
                    "description": "",
                    "type": "boolean",
                     "initial": "false"
                },
                "brackets-git.normalizeLineEndings" : {
                    "label": "Normalize line endings (to \\n)",
                    "description": "",
                    "type": "boolean",
                     "initial": "false"
                },
                "brackets-git.useGitGutter" : {
                    "label": "Use Git gutter marks",
                    "description": "",
                    "type": "boolean",
                     "initial": "true"
                },
                "brackets-git.markModifiedInTree" : {
                    "label": "Mark modified files in file tree",
                    "description": "",
                    "type": "boolean",
                     "initial": "true"
                },
                "brackets-git.useCodeInspection" : {
                    "label": "Use Code inspection",
                    "description": "",
                    "type": "boolean",
                     "initial": "true"
                },
                "brackets-git.useGitFtp" : {
                    "label": "Use Git-FTP",
                    "description": "",
                    "type": "boolean",
                     "initial": "false"
                },
                "brackets-git.avatarType" : {
                    "label": "Avatar type",
                    "description": "",
                    "type": "string",
                     "initial": "AVATAR_COLOR"
                },
                "brackets-git.showBashButton" : {
                    "label": "Show Bash/Terminal button in the panel",
                    "description": "",
                    "type": "boolean",
                    "initial": "true"
                },
                "brackets-git.dateMode" : {
                    "label": "Date mode",
                    "description": "",
                    "type": "number",
                   "initial": 1
                },
                "brackets-git.dateFormat" : {
                    "label": "Format of commit dates in history",
                    "description": "",
                    "type": "string",
                   "initial": null,
                },
                "brackets-git.enableAdvancedFeatures" : {
                    "label": "Enable advanced features",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.useVerboseDiff" : {
                    "label": "Show verbose output in diffs",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.useDifftool" : {
                    "label": "Use difftool for diffs",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.clearWhitespaceOnSave" : {
                    "label": "Clear whitespace on file save",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.gerritPushref" : {
                    "label": "Use Gerrit-compatible push ref",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.panelShortcut" : {
                    "label": "Toggle panel shortcut",
                    "description": "",
                    "type": "string",
                    "initial": "Ctrl-Alt-G"
                },
                "brackets-git.panelShortcut" : {
                    "label": "Toggle panel shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.commitCurrentShortcut" : {
                    "label": "Commit current file shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.commitAllShortcut" : {
                    "label": "Commit all files shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.bashShortcut" : {
                    "label": "Bash shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.pushShortcut" : {
                    "label": "Push to remote repository shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.pullShortcut" : {
                    "label": "Pull from remote repository shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.gotoPrevChangeShortcut" : {
                    "label": "Go to previous Git change shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.gotoNextChangeShortcut" : {
                    "label": "Go to next Git change shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.refreshShortcut" : {
                    "label": "Refresh Git shortcut",
                    "description": "",
                    "type": "string",
                    "initial": null
                },
                "brackets-git.showTerminalIcon" : {
                    "label": "Show Terminal icon in toolbar",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.debugMode" : {
                    "label": "DEBUG mode",
                    "description": "",
                    "type": "boolean",
                    "initial": "false"
                },
                "brackets-git.gitTimeout" : {
                    "label": "Default Git operation timeout (in seconds)",
                    "description": "",
                    "type": "number",
                    "initial": "30"
                },
                "brackets-git.gitPath" : {
                    "label": "Path to Git executable",
                    "description": "",
                    "type": "string",
                    "initial": ""
                },
                "brackets-git.terminalCommand" : {
                    "label": "Custom terminal command (sample: gnome-terminal or complete path to executable)",
                    "description": "",
                    "type": "string",
                    "initial": ""
                },
                "brackets-git.terminalCommandArgs" : {
                    "label": "Sample arguments: --window --working-directory=$1<br>$1 in arguments will be replaced by current project directory.",
                    "description": "",
                    "type": "string",
                    "initial": ""
                }
            }
        }
    }
    
    exports.extensions = _extObjs;
});