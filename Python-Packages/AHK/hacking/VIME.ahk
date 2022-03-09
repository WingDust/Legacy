GroupAdd , Escheck ,ahk_exe nvim-qt.exe
GroupAdd , Escheck ,ahk_exe Code.exe
GroupAdd , Escheck ,ahk_exe emacs.exe


IME_GetKeyboardLayoutName()
{
    VarSetCapacity(Str, 16)
    DllCall("GetKeyboardLayoutName", "Str", Str)
    Return Str
}

/*
1. 将 Esc 重映射，阻止 Esc 键原来的功能
2. 检测是否正使用中文在输入，检测是否存在输入窗口
  - 存在
    - 表示正在中文输入，只需要 send escape
  - 不存在
    - 表示不知道现在是中英文，但是它是正被使用
      - 获取当前系统的 KeyboardLayoutName 
      - 禁用输入法
      - 重加载 Rime
      - send escape
*/

RemoveToolTip:
ToolTip
return

;ahk_class ATL:00112928
;ahk_class ATL:71C2D8A8
#IfWinActive ahk_group Escheck 
    Esc::
        imewin := WinExist("ahk_class ATL:0414D8A8")
        imewin2 := WinExist("ahk_class ATL:00112928")
        CodeImewin := WinExist("ahk_class ATL:00007FFD916B4A60")
        nimewin := WinExist("ahk_class ATL:71C2D8A8")


        l := StrLen(imewin)
        l2 := StrLen(imewin2)
        Codel := StrLen(CodeImewin)
        nl := StrLen(nimewin)
        sleep 100




        if(l > 3 || l2 > 3|| Codel > 3 || nl > 3)
        {
            Tooltip No\ Need ,1920,1080
            SetTimer ,RemoveToolTip , -5000
            Send {Escape}
        }
        else
        {
            Tooltip Need ,1920,1080
            SetTimer ,RemoveToolTip , -5000
            ;Tooltip 2 %imewin% %imewin2%
            Run,"H:\ime.lnk"

            ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmSetOpenStatus", "Uint",hIMC,"Int",false,"Int"))

            ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmDisableIME", DWORD,0))
            ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
            Send {Escape}
        }
    Return
  ;; ~Alt & Tab::
  ;;  DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
  ;;  Send {Alt down}{Tab}
  ;;  Return

;;   ~Alt & Tab::
;;    ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
;;    Tooltip 9
;;    ;DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("ImmSetOpenStatus", "Uint",hIMC,"Int",true,"Int"))
;;
;;    Send {Alt down}{Tab}
;;    Return
#IfWinActive

;; #IfWinActive , ahk_exe chrome.exe
;; ~^q::
;;     DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
;; Return
;; 
;; ~^t::
;;     DllCall("SendMessage", UInt, WinActive("A"), UInt, 80, UInt, 1, UInt, DllCall("LoadKeyboardLayout", Str, "e0200804", UInt, 1))
;; Return

