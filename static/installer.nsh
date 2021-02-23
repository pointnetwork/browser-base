!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Point" "Software\Clients\StartMenuInternet\Point\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Point" "" "Point HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\Application" "AppUserModelId" "Point"
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\Application" "ApplicationIcon" "$INSTDIR\Point.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\Application" "ApplicationName" "Point"
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\Application" "ApplicationCompany" "Point"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\DefaultIcon" "DefaultIcon" "$INSTDIR\Point.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Point\shell\open\command" "" '"$INSTDIR\Point.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Point" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Point" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point" "" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\DefaultIcon" "" "$INSTDIR\Point.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities" "ApplicationName" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities" "ApplicationIcon" "$INSTDIR\Point.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities\FileAssociations" ".htm" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities\FileAssociations" ".html" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities\URLAssociations" "http" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities\URLAssociations" "https" "Point"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\Capabilities\StartMenu" "StartMenuInternet" "Point"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Point\shell\open\command" "" "$INSTDIR\Point.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Point"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Point"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Point"
!macroend