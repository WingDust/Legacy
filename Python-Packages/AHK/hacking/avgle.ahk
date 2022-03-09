SetTitleMatchMode,2
flag := 0

#IfWinActive , Avgle
Space::
if (flag!=1)
{
MouseMove,800,444
MouseClick,Left
Sleep 200
Send {Space}
}else
{
Send {Space}
}
Return

;~Alt & Tab::
~Alt & Tab::
;ToolTip, 1
flag := 1
Send {Alt down}{Tab}
Return
;;~Ctrl & Tab::
;;;ToolTip, 2
;;flag := 0
;;Send {Ctrl down}{Tab}
;;Return

#IfWinActive

