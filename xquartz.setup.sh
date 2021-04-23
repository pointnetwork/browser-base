#!/bin/bash

brew install xquartz

launchctl stop com.apple.cfprefsd.xpc.agent
defaults write org.xquartz.X11.plist nolisten_tcp -bool false
launchctl start com.apple.cfprefsd.xpc.agent

xhost +localhost
