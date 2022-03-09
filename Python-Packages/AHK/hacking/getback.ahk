#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


#Hotstring EndChars -()[]{}:;'"/\,.?!`n `t
::#*4::####

#Hotstring EndChars -()[]{}:;'"/\,.?!`n `t
::#*5::#####

#Hotstring EndChars -()[]{}:;'"/\,.?!`n `t
::#*6::######



SetTitleMatchMode RegEx
return
 
; Stuff to do when Windows Explorer is open
;
#IfWinActive ahk_class ExploreWClass|CabinetWClass
 
    ; create new text file
    ;
    #t::Send !fwt
 
    ; open 'cmd' in the current directory
    ;
    ;:*:cmd::
    ^m::
        OpenCmdInCurrent()
    return
#IfWinActive
 
 
; Opens the command shell 'cmd' in the directory browsed in Explorer.
; Note: expecting to be run when the active window is Explorer.
;
OpenCmdInCurrent()
{
    ; This is required to get the full path of the file from the address bar
    WinGetText, full_path, A
 
    ; Split on newline (`n)
    StringSplit, word_array, full_path, `n
    ; Take the first element from the array
    full_path = %word_array1%   
 
    ; strip to bare address
    full_path := RegExReplace(full_path, "^地址: ", "")
 
    ; Just in case - remove all carriage returns (`r)
    StringReplace, full_path, full_path, `r, , all
 
 
    IfInString full_path, /
    {
        Run,  cmd /K cd /D "%full_path%"
    }
    else
    {
        Run, cmd /K cd /D "C:/ "
    }
}


!m::	;win+c 键 在任意 位置启动命令行
	WinGetClass, a_class, a
	ToolTip %a_class%,,,1
	if (a_class = "CabinetWClass") {
		ControlGetText, thispath, Edit1, ahk_class CabinetWClass

		ToolTip %thispath%,0,0,2
		if (thispath = "桌面")
			Run, cmd /k, % a_desktop
		else if fileexist(thispath)
			run, cmd /k, % thispath
	}
	else if (a_class = "Progman")
		run, cmd /k, % a_desktop
return



#IfWinActive ahk_class CabinetWClass
^m::
	;ControlGetText, thispath, Edit1, ahk_class CabinetWClass
	ControlGetText, thispath, Edit1, ahk_class CabinetWClass
	ToolTip %thispath%,0,0,2
	Run, cmd /k, % thispath
#IfWinActive


#IfWinActive A
:


