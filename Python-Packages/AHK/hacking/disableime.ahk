#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


;;在双语状态下它会直接的把转成Eng 输入法sdsd
DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmDisableIME", DWORD,-1)) ;;它能加载美国英语键盘
DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmDisableTextFrameService", DWORD,-1)) ;;它能加载美国英语键盘


Sleep 55000
