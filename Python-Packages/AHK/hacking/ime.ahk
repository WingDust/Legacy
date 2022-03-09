GroupAdd , Escheck ,ahk_exe nvim-qt.exe

IME_GetKeyboardLayoutName()
{
    VarSetCapacity(Str, 16)
    DllCall("GetKeyboardLayoutName", "Str", Str)
    Return Str
}

currentIme := IME_GetKeyboardLayoutName()
;Tooltip %currentIme%

#IfWinActive ahk_group Escheck 
    Esc::
        imewin := WinExist("ahk_class ATL:0414D8A8")
        l := StrLen(imewin)
        ;Tooltip %l%
        ;imewin := WinActive(ahk_class ATL:0414D8A8)
        ;WinGetActiveStats, Title, Width, Height, X, Y
        ;WinGetPos,x,y,w,h,"ahk_class ATL:0414D8A8"
        ;ControlGetPos,x1,y1,w1,h1,"ahk_class ATL:0414D8A8" ;它不是一个控件
        ;IfWinExist,ahk_class ATL:0414D8A8
        
        ;Tooltip %currentIme% %imewin% %imewin2% %x% %y% %w% %h%`n%x1%`t%y1%`n%w1%`t%h1%`n%Title%`t%Width%`nX:%X%`tY:%Y%
        ;Tooltip %imwwin%
        if(l > 3)
        {
            ;Tooltip %currentIme%
            Send {Escape}
            Tooltip 2
        }
        else
        {
            Tooltip 3
            
            currentIme := IME_GetKeyboardLayoutName()
            StringRight , Layout ,currentIme ,4
            Tooltip %Layout%
            if(Layout = "0804")
            {
                ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "00000409", UInt, 1)) ;;它能加载美国英语键盘

                DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmDisableIME", DWORD,-1))
                DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
            }else
            {
            }
            Send {Escape}
            ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ActivateKeyboardLayout", UInt, 1, UInt, 256))
            
        }
        
    Return
    
    
    ;; IME_GetKeyboardLayout(WinTitle="A")
    ;; {
    ;; 	ControlGet,hwnd,HWND,,,%WinTitle%
    ;; 	ThreadID := DllCall("GetWindowThreadProcessId", "Ptr", hwnd, "Ptr", 0 )
    ;; 	; ThreadID 指定线程id，0 表示本进程
    ;; 	HKL := DllCall("GetKeyboardLayout", "UInt", ThreadID, "UPtr") ; UPtr 改为 Ptr 得到不一样的值
    ;; 	;HKL := dec2hex(HKL)
    ;; 
    ;; Return HKL
    ;; }
    ;; ToBase(n,b){ 
    ;; return (n < b ? "" : ToBase(n//b,b)) . ((d:=Mod(n,b)) < 10 ? d : Chr(d+55)) 
    ;; } 
    ;; hkl := IME_GetKeyboardLayout()
    ;; to := ToBase(hkl,16)
    ;; Tooltip %hkl%,%to%
    
    
