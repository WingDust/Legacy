GroupAdd , openfileWindow , 打开
GroupAdd , openfileWindow , ahk_class #32770

#IfWinActive ahk_group openfileWindow
m::ControlFocus , DirectUIHWND2
Return

t::ControlFocus , SysTreeView321
Return

o::ControlFocus , ComboBox2
Return

h::Send,!{up}
Return
j::Send {Down}
Return
k::Send {Up}
Return
l::Send {Right}
Return
#IfWinActive

;#IfWinActive ahk_class Progman
#IfWinActive Program Manager
j::Down
Return
k::Up
Return
h::Left
Return
l::Right
Return
#IfWinActive

