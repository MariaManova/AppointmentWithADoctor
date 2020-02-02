import React, { PureComponent, useState, useEffect } from 'react';
import {
  ScrollView, View, Text,
} from 'react-native';
import { Header } from '..';
import { Background } from '../../constants';
import { Icon } from 'react-native-elements';


interface Props { }
interface State { }

class IconsElement extends PureComponent<any, State, Props> {

  render() {
    const { navigation } = this.props
    const backArrow = 'arrow-back';
    return (
      <View >
        <Header title={'Иконки Element'}
          leftIcon={backArrow}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>{Background}</View>
        <ScrollView>
          <Text> "3d-rotation"</Text>
          <Icon name="3d-rotation" />
          <Text> "ac-unit"</Text>
          <Icon name="ac-unit" />
          <Text> "access-alarm"</Text>
          <Icon name="access-alarm" />
          <Text> "access-alarms"</Text>
          <Icon name="access-alarms" />
          <Text> "access-time"</Text>
          <Icon name="access-time" />
          <Text> "accessibility"</Text>
          <Icon name="accessibility" />
          <Text> "accessible"</Text>
          <Icon name="accessible" />
          <Text> "account-balance"</Text>
          <Icon name="account-balance" />
          <Text> "account-balance-wallet"</Text>
          <Icon name="account-balance-wallet" />
          <Text> "account-box"</Text>
          <Icon name="account-box" />
          <Text> "account-circle"</Text>
          <Icon name="account-circle" />
          <Text> "adb"</Text>
          <Icon name="adb" />
          <Text> "add"</Text>
          <Icon name="add" />
          <Text> "add-a-photo"</Text>
          <Icon name="add-a-photo" />
          <Text> "add-alarm"</Text>
          <Icon name="add-alarm" />
          <Text> "add-alert"</Text>
          <Icon name="add-alert" />
          <Text> "add-box"</Text>
          <Icon name="add-box" />
          <Text> "add-circle"</Text>
          <Icon name="add-circle" />
          <Text> "add-circle-outline"</Text>
          <Icon name="add-circle-outline" />
          <Text> "add-location"</Text>
          <Icon name="add-location" />
          <Text> "add-shopping-cart"</Text>
          <Icon name="add-shopping-cart" />
          <Text> "add-to-photos"</Text>
          <Icon name="add-to-photos" />
          <Text> "add-to-queue"</Text>
          <Icon name="add-to-queue" />
          <Text> "adjust"</Text>
          <Icon name="adjust" />
          <Text> "airline-seat-flat"</Text>
          <Icon name="airline-seat-flat" />
          <Text> "airline-seat-flat-angled"</Text>
          <Icon name="airline-seat-flat-angled" />
          <Text> "airline-seat-individual-suite"</Text>
          <Icon name="airline-seat-individual-suite" />
          <Text> "airline-seat-legroom-extra"</Text>
          <Icon name="airline-seat-legroom-extra" />
          <Text> "airline-seat-legroom-normal"</Text>
          <Icon name="airline-seat-legroom-normal" />
          <Text> "airline-seat-legroom-reduced"</Text>
          <Icon name="airline-seat-legroom-reduced" />
          <Text> "airline-seat-recline-extra"</Text>
          <Icon name="airline-seat-recline-extra" />
          <Text> "airline-seat-recline-normal"</Text>
          <Icon name="airline-seat-recline-normal" />
          <Text> "airplanemode-active"</Text>
          <Icon name="airplanemode-active" />
          <Text> "airplanemode-inactive"</Text>
          <Icon name="airplanemode-inactive" />
          <Text> "airplay"</Text>
          <Icon name="airplay" />
          <Text> "airport-shuttle"</Text>
          <Icon name="airport-shuttle" />
          <Text> "alarm"</Text>
          <Icon name="alarm" />
          <Text> "alarm-add"</Text>
          <Icon name="alarm-add" />
          <Text> "alarm-off"</Text>
          <Icon name="alarm-off" />
          <Text> "alarm-on"</Text>
          <Icon name="alarm-on" />
          <Text> "album"</Text>
          <Icon name="album" />
          <Text> "all-inclusive"</Text>
          <Icon name="all-inclusive" />
          <Text> "all-out"</Text>
          <Icon name="all-out" />
          <Text> "android"</Text>
          <Icon name="android" />
          <Text> "announcement"</Text>
          <Icon name="announcement" />
          <Text> "apps"</Text>
          <Icon name="apps" />
          <Text> "archive"</Text>
          <Icon name="archive" />
          <Text> "arrow-back"</Text>
          <Icon name="arrow-back" />
          <Text> "arrow-downward"</Text>
          <Icon name="arrow-downward" />
          <Text> "arrow-drop-down"</Text>
          <Icon name="arrow-drop-down" />
          <Text> "arrow-drop-down-circle"</Text>
          <Icon name="arrow-drop-down-circle" />
          <Text> "arrow-drop-up"</Text>
          <Icon name="arrow-drop-up" />
          <Text> "arrow-forward"</Text>
          <Icon name="arrow-forward" />
          <Text> "arrow-upward"</Text>
          <Icon name="arrow-upward" />
          <Text> "art-track"</Text>
          <Icon name="art-track" />
          <Text> "aspect-ratio"</Text>
          <Icon name="aspect-ratio" />
          <Text> "assessment"</Text>
          <Icon name="assessment" />
          <Text> "assignment"</Text>
          <Icon name="assignment" />
          <Text> "assignment-ind"</Text>
          <Icon name="assignment-ind" />
          <Text> "assignment-late"</Text>
          <Icon name="assignment-late" />
          <Text> "assignment-return"</Text>
          <Icon name="assignment-return" />
          <Text> "assignment-returned"</Text>
          <Icon name="assignment-returned" />
          <Text> "assignment-turned-in"</Text>
          <Icon name="assignment-turned-in" />
          <Text> "assistant"</Text>
          <Icon name="assistant" />
          <Text> "assistant-photo"</Text>
          <Icon name="assistant-photo" />
          <Text> "attach-file"</Text>
          <Icon name="attach-file" />
          <Text> "attach-money"</Text>
          <Icon name="attach-money" />
          <Text> "attachment"</Text>
          <Icon name="attachment" />
          <Text> "audiotrack"</Text>
          <Icon name="audiotrack" />
          <Text> "autorenew"</Text>
          <Icon name="autorenew" />
          <Text> "av-timer"</Text>
          <Icon name="av-timer" />
          <Text> "backspace"</Text>
          <Icon name="backspace" />
          <Text> "backup"</Text>
          <Icon name="backup" />
          <Text> "battery-alert"</Text>
          <Icon name="battery-alert" />
          <Text> "battery-charging-full"</Text>
          <Icon name="battery-charging-full" />
          <Text> "battery-full"</Text>
          <Icon name="battery-full" />
          <Text> "battery-std"</Text>
          <Icon name="battery-std" />
          <Text> "battery-unknown"</Text>
          <Icon name="battery-unknown" />
          <Text> "beach-access"</Text>
          <Icon name="beach-access" />
          <Text> "beenhere"</Text>
          <Icon name="beenhere" />
          <Text> "block"</Text>
          <Icon name="block" />
          <Text> "bluetooth"</Text>
          <Icon name="bluetooth" />
          <Text> "bluetooth-audio"</Text>
          <Icon name="bluetooth-audio" />
          <Text> "bluetooth-connected"</Text>
          <Icon name="bluetooth-connected" />
          <Text> "bluetooth-disabled"</Text>
          <Icon name="bluetooth-disabled" />
          <Text> "bluetooth-searching"</Text>
          <Icon name="bluetooth-searching" />
          <Text> "blur-circular"</Text>
          <Icon name="blur-circular" />
          <Text> "blur-linear"</Text>
          <Icon name="blur-linear" />
          <Text> "blur-off"</Text>
          <Icon name="blur-off" />
          <Text> "blur-on"</Text>
          <Icon name="blur-on" />
          <Text> "book"</Text>
          <Icon name="book" />
          <Text> "bookmark"</Text>
          <Icon name="bookmark" />
          <Text> "bookmark-border"</Text>
          <Icon name="bookmark-border" />
          <Text> "border-all"</Text>
          <Icon name="border-all" />
          <Text> "border-bottom"</Text>
          <Icon name="border-bottom" />
          <Text> "border-clear"</Text>
          <Icon name="border-clear" />
          <Text> "border-color"</Text>
          <Icon name="border-color" />
          <Text> "border-horizontal"</Text>
          <Icon name="border-horizontal" />
          <Text> "border-inner"</Text>
          <Icon name="border-inner" />
          <Text> "border-left"</Text>
          <Icon name="border-left" />
          <Text> "border-outer"</Text>
          <Icon name="border-outer" />
          <Text> "border-right"</Text>
          <Icon name="border-right" />
          <Text> "border-style"</Text>
          <Icon name="border-style" />
          <Text> "border-top"</Text>
          <Icon name="border-top" />
          <Text> "border-vertical"</Text>
          <Icon name="border-vertical" />
          <Text> "branding-watermark"</Text>
          <Icon name="branding-watermark" />
          <Text> "brightness-1"</Text>
          <Icon name="brightness-1" />
          <Text> "brightness-2"</Text>
          <Icon name="brightness-2" />
          <Text> "brightness-3"</Text>
          <Icon name="brightness-3" />
          <Text> "brightness-4"</Text>
          <Icon name="brightness-4" />
          <Text> "brightness-5"</Text>
          <Icon name="brightness-5" />
          <Text> "brightness-6"</Text>
          <Icon name="brightness-6" />
          <Text> "brightness-7"</Text>
          <Icon name="brightness-7" />
          <Text> "brightness-auto"</Text>
          <Icon name="brightness-auto" />
          <Text> "brightness-high"</Text>
          <Icon name="brightness-high" />
          <Text> "brightness-low"</Text>
          <Icon name="brightness-low" />
          <Text> "brightness-medium"</Text>
          <Icon name="brightness-medium" />
          <Text> "broken-image"</Text>
          <Icon name="broken-image" />
          <Text> "brush"</Text>
          <Icon name="brush" />
          <Text> "bubble-chart"</Text>
          <Icon name="bubble-chart" />
          <Text> "bug-report"</Text>
          <Icon name="bug-report" />
          <Text> "build"</Text>
          <Icon name="build" />
          <Text> "burst-mode"</Text>
          <Icon name="burst-mode" />
          <Text> "business"</Text>
          <Icon name="business" />
          <Text> "business-center"</Text>
          <Icon name="business-center" />
          <Text> "cached"</Text>
          <Icon name="cached" />
          <Text> "cake"</Text>
          <Icon name="cake" />
          <Text> "call"</Text>
          <Icon name="call" />
          <Text> "call-end"</Text>
          <Icon name="call-end" />
          <Text> "call-made"</Text>
          <Icon name="call-made" />
          <Text> "call-merge"</Text>
          <Icon name="call-merge" />
          <Text> "call-missed"</Text>
          <Icon name="call-missed" />
          <Text> "call-missed-outgoing"</Text>
          <Icon name="call-missed-outgoing" />
          <Text> "call-received"</Text>
          <Icon name="call-received" />
          <Text> "call-split"</Text>
          <Icon name="call-split" />
          <Text> "call-to-action"</Text>
          <Icon name="call-to-action" />
          <Text> "camera"</Text>
          <Icon name="camera" />
          <Text> "camera-alt"</Text>
          <Icon name="camera-alt" />
          <Text> "camera-enhance"</Text>
          <Icon name="camera-enhance" />
          <Text> "camera-front"</Text>
          <Icon name="camera-front" />
          <Text> "camera-rear"</Text>
          <Icon name="camera-rear" />
          <Text> "camera-roll"</Text>
          <Icon name="camera-roll" />
          <Text> "cancel"</Text>
          <Icon name="cancel" />
          <Text> "card-giftcard"</Text>
          <Icon name="card-giftcard" />
          <Text> "card-membership"</Text>
          <Icon name="card-membership" />
          <Text> "card-travel"</Text>
          <Icon name="card-travel" />
          <Text> "casino"</Text>
          <Icon name="casino" />
          <Text> "cast"</Text>
          <Icon name="cast" />
          <Text> "cast-connected"</Text>
          <Icon name="cast-connected" />
          <Text> "center-focus-strong"</Text>
          <Icon name="center-focus-strong" />
          <Text> "center-focus-weak"</Text>
          <Icon name="center-focus-weak" />
          <Text> "change-history"</Text>
          <Icon name="change-history" />
          <Text> "chat"</Text>
          <Icon name="chat" />
          <Text> "chat-bubble"</Text>
          <Icon name="chat-bubble" />
          <Text> "chat-bubble-outline"</Text>
          <Icon name="chat-bubble-outline" />
          <Text> "check"</Text>
          <Icon name="check" />
          <Text> "check-box"</Text>
          <Icon name="check-box" />
          <Text> "check-box-outline-blank"</Text>
          <Icon name="check-box-outline-blank" />
          <Text> "check-circle"</Text>
          <Icon name="check-circle" />
          <Text> "chevron-left"</Text>
          <Icon name="chevron-left" />
          <Text> "chevron-right"</Text>
          <Icon name="chevron-right" />
          <Text> "child-care"</Text>
          <Icon name="child-care" />
          <Text> "child-friendly"</Text>
          <Icon name="child-friendly" />
          <Text> "chrome-reader-mode"</Text>
          <Icon name="chrome-reader-mode" />
          <Text> "class"</Text>
          <Icon name="class" />
          <Text> "clear"</Text>
          <Icon name="clear" />
          <Text> "clear-all"</Text>
          <Icon name="clear-all" />
          <Text> "close"</Text>
          <Icon name="close" />
          <Text> "closed-caption"</Text>
          <Icon name="closed-caption" />
          <Text> "cloud"</Text>
          <Icon name="cloud" />
          <Text> "cloud-circle"</Text>
          <Icon name="cloud-circle" />
          <Text> "cloud-done"</Text>
          <Icon name="cloud-done" />
          <Text> "cloud-download"</Text>
          <Icon name="cloud-download" />
          <Text> "cloud-off"</Text>
          <Icon name="cloud-off" />
          <Text> "cloud-queue"</Text>
          <Icon name="cloud-queue" />
          <Text> "cloud-upload"</Text>
          <Icon name="cloud-upload" />
          <Text> "code"</Text>
          <Icon name="code" />
          <Text> "collections"</Text>
          <Icon name="collections" />
          <Text> "collections-bookmark"</Text>
          <Icon name="collections-bookmark" />
          <Text> "color-lens"</Text>
          <Icon name="color-lens" />
          <Text> "colorize"</Text>
          <Icon name="colorize" />
          <Text> "comment"</Text>
          <Icon name="comment" />
          <Text> "compare"</Text>
          <Icon name="compare" />
          <Text> "compare-arrows"</Text>
          <Icon name="compare-arrows" />
          <Text> "computer"</Text>
          <Icon name="computer" />
          <Text> "confirmation-number"</Text>
          <Icon name="confirmation-number" />
          <Text> "contact-mail"</Text>
          <Icon name="contact-mail" />
          <Text> "contact-phone"</Text>
          <Icon name="contact-phone" />
          <Text> "contacts"</Text>
          <Icon name="contacts" />
          <Text> "content-copy"</Text>
          <Icon name="content-copy" />
          <Text> "content-cut"</Text>
          <Icon name="content-cut" />
          <Text> "content-paste"</Text>
          <Icon name="content-paste" />
          <Text> "control-point"</Text>
          <Icon name="control-point" />
          <Text> "control-point-duplicate"</Text>
          <Icon name="control-point-duplicate" />
          <Text> "copyright"</Text>
          <Icon name="copyright" />
          <Text> "create"</Text>
          <Icon name="create" />
          <Text> "create-new-folder"</Text>
          <Icon name="create-new-folder" />
          <Text> "credit-card"</Text>
          <Icon name="credit-card" />
          <Text> "crop"</Text>
          <Icon name="crop" />
          <Text> "crop-16-9"</Text>
          <Icon name="crop-16-9" />
          <Text> "crop-3-2"</Text>
          <Icon name="crop-3-2" />
          <Text> "crop-5-4"</Text>
          <Icon name="crop-5-4" />
          <Text> "crop-7-5"</Text>
          <Icon name="crop-7-5" />
          <Text> "crop-din"</Text>
          <Icon name="crop-din" />
          <Text> "crop-free"</Text>
          <Icon name="crop-free" />
          <Text> "crop-landscape"</Text>
          <Icon name="crop-landscape" />
          <Text> "crop-original"</Text>
          <Icon name="crop-original" />
          <Text> "crop-portrait"</Text>
          <Icon name="crop-portrait" />
          <Text> "crop-rotate"</Text>
          <Icon name="crop-rotate" />
          <Text> "crop-square"</Text>
          <Icon name="crop-square" />
          <Text> "dashboard"</Text>
          <Icon name="dashboard" />
          <Text> "data-usage"</Text>
          <Icon name="data-usage" />
          <Text> "date-range"</Text>
          <Icon name="date-range" />
          <Text> "dehaze"</Text>
          <Icon name="dehaze" />
          <Text> "delete"</Text>
          <Icon name="delete" />
          <Text> "delete-forever"</Text>
          <Icon name="delete-forever" />
          <Text> "delete-sweep"</Text>
          <Icon name="delete-sweep" />
          <Text> "description"</Text>
          <Icon name="description" />
          <Text> "desktop-mac"</Text>
          <Icon name="desktop-mac" />
          <Text> "desktop-windows"</Text>
          <Icon name="desktop-windows" />
          <Text> "details"</Text>
          <Icon name="details" />
          <Text> "developer-board"</Text>
          <Icon name="developer-board" />
          <Text> "developer-mode"</Text>
          <Icon name="developer-mode" />
          <Text> "device-hub"</Text>
          <Icon name="device-hub" />
          <Text> "devices"</Text>
          <Icon name="devices" />
          <Text> "devices-other"</Text>
          <Icon name="devices-other" />
          <Text> "dialer-sip"</Text>
          <Icon name="dialer-sip" />
          <Text> "dialpad"</Text>
          <Icon name="dialpad" />
          <Text> "directions"</Text>
          <Icon name="directions" />
          <Text> "directions-bike"</Text>
          <Icon name="directions-bike" />
          <Text> "directions-boat"</Text>
          <Icon name="directions-boat" />
          <Text> "directions-bus"</Text>
          <Icon name="directions-bus" />
          <Text> "directions-car"</Text>
          <Icon name="directions-car" />
          <Text> "directions-railway"</Text>
          <Icon name="directions-railway" />
          <Text> "directions-run"</Text>
          <Icon name="directions-run" />
          <Text> "directions-subway"</Text>
          <Icon name="directions-subway" />
          <Text> "directions-transit"</Text>
          <Icon name="directions-transit" />
          <Text> "directions-walk"</Text>
          <Icon name="directions-walk" />
          <Text> "disc-full"</Text>
          <Icon name="disc-full" />
          <Text> "dns"</Text>
          <Icon name="dns" />
          <Text> "do-not-disturb"</Text>
          <Icon name="do-not-disturb" />
          <Text> "do-not-disturb-alt"</Text>
          <Icon name="do-not-disturb-alt" />
          <Text> "do-not-disturb-off"</Text>
          <Icon name="do-not-disturb-off" />
          <Text> "do-not-disturb-on"</Text>
          <Icon name="do-not-disturb-on" />
          <Text> "dock"</Text>
          <Icon name="dock" />
          <Text> "domain"</Text>
          <Icon name="domain" />
          <Text> "done"</Text>
          <Icon name="done" />
          <Text> "done-all"</Text>
          <Icon name="done-all" />
          <Text> "donut-large"</Text>
          <Icon name="donut-large" />
          <Text> "donut-small"</Text>
          <Icon name="donut-small" />
          <Text> "drafts"</Text>
          <Icon name="drafts" />
          <Text> "drag-handle"</Text>
          <Icon name="drag-handle" />
          <Text> "drive-eta"</Text>
          <Icon name="drive-eta" />
          <Text> "dvr"</Text>
          <Icon name="dvr" />
          <Text> "edit"</Text>
          <Icon name="edit" />
          <Text> "edit-location"</Text>
          <Icon name="edit-location" />
          <Text> "eject"</Text>
          <Icon name="eject" />
          <Text> "email"</Text>
          <Icon name="email" />
          <Text> "enhanced-encryption"</Text>
          <Icon name="enhanced-encryption" />
          <Text> "equalizer"</Text>
          <Icon name="equalizer" />
          <Text> "error"</Text>
          <Icon name="error" />
          <Text> "error-outline"</Text>
          <Icon name="error-outline" />
          <Text> "euro-symbol"</Text>
          <Icon name="euro-symbol" />
          <Text> "ev-station"</Text>
          <Icon name="ev-station" />
          <Text> "event"</Text>
          <Icon name="event" />
          <Text> "event-available"</Text>
          <Icon name="event-available" />
          <Text> "event-busy"</Text>
          <Icon name="event-busy" />
          <Text> "event-note"</Text>
          <Icon name="event-note" />
          <Text> "event-seat"</Text>
          <Icon name="event-seat" />
          <Text> "exit-to-app"</Text>
          <Icon name="exit-to-app" />
          <Text> "expand-less"</Text>
          <Icon name="expand-less" />
          <Text> "expand-more"</Text>
          <Icon name="expand-more" />
          <Text> "explicit"</Text>
          <Icon name="explicit" />
          <Text> "explore"</Text>
          <Icon name="explore" />
          <Text> "exposure"</Text>
          <Icon name="exposure" />
          <Text> "exposure-neg-1"</Text>
          <Icon name="exposure-neg-1" />
          <Text> "exposure-neg-2"</Text>
          <Icon name="exposure-neg-2" />
          <Text> "exposure-plus-1"</Text>
          <Icon name="exposure-plus-1" />
          <Text> "exposure-plus-2"</Text>
          <Icon name="exposure-plus-2" />
          <Text> "exposure-zero"</Text>
          <Icon name="exposure-zero" />
          <Text> "extension"</Text>
          <Icon name="extension" />
          <Text> "face"</Text>
          <Icon name="face" />
          <Text> "fast-forward"</Text>
          <Icon name="fast-forward" />
          <Text> "fast-rewind"</Text>
          <Icon name="fast-rewind" />
          <Text> "favorite"</Text>
          <Icon name="favorite" />
          <Text> "favorite-border"</Text>
          <Icon name="favorite-border" />
          <Text> "featured-play-list"</Text>
          <Icon name="featured-play-list" />
          <Text> "featured-video"</Text>
          <Icon name="featured-video" />
          <Text> "feedback"</Text>
          <Icon name="feedback" />
          <Text> "fiber-dvr"</Text>
          <Icon name="fiber-dvr" />
          <Text> "fiber-manual-record"</Text>
          <Icon name="fiber-manual-record" />
          <Text> "fiber-new"</Text>
          <Icon name="fiber-new" />
          <Text> "fiber-pin"</Text>
          <Icon name="fiber-pin" />
          <Text> "fiber-smart-record"</Text>
          <Icon name="fiber-smart-record" />
          <Text> "file-download"</Text>
          <Icon name="file-download" />
          <Text> "file-upload"</Text>
          <Icon name="file-upload" />
          <Text> "filter"</Text>
          <Icon name="filter" />
          <Text> "filter-1"</Text>
          <Icon name="filter-1" />
          <Text> "filter-2"</Text>
          <Icon name="filter-2" />
          <Text> "filter-3"</Text>
          <Icon name="filter-3" />
          <Text> "filter-4"</Text>
          <Icon name="filter-4" />
          <Text> "filter-5"</Text>
          <Icon name="filter-5" />
          <Text> "filter-6"</Text>
          <Icon name="filter-6" />
          <Text> "filter-7"</Text>
          <Icon name="filter-7" />
          <Text> "filter-8"</Text>
          <Icon name="filter-8" />
          <Text> "filter-9"</Text>
          <Icon name="filter-9" />
          <Text> "filter-9-plus"</Text>
          <Icon name="filter-9-plus" />
          <Text> "filter-b-and-w"</Text>
          <Icon name="filter-b-and-w" />
          <Text> "filter-center-focus"</Text>
          <Icon name="filter-center-focus" />
          <Text> "filter-drama"</Text>
          <Icon name="filter-drama" />
          <Text> "filter-frames"</Text>
          <Icon name="filter-frames" />
          <Text> "filter-hdr"</Text>
          <Icon name="filter-hdr" />
          <Text> "filter-list"</Text>
          <Icon name="filter-list" />
          <Text> "filter-none"</Text>
          <Icon name="filter-none" />
          <Text> "filter-tilt-shift"</Text>
          <Icon name="filter-tilt-shift" />
          <Text> "filter-vintage"</Text>
          <Icon name="filter-vintage" />
          <Text> "find-in-page"</Text>
          <Icon name="find-in-page" />
          <Text> "find-replace"</Text>
          <Icon name="find-replace" />
          <Text> "fingerprint"</Text>
          <Icon name="fingerprint" />
          <Text> "first-page"</Text>
          <Icon name="first-page" />
          <Text> "fitness-center"</Text>
          <Icon name="fitness-center" />
          <Text> "flag"</Text>
          <Icon name="flag" />
          <Text> "flare"</Text>
          <Icon name="flare" />
          <Text> "flash-auto"</Text>
          <Icon name="flash-auto" />
          <Text> "flash-off"</Text>
          <Icon name="flash-off" />
          <Text> "flash-on"</Text>
          <Icon name="flash-on" />
          <Text> "flight"</Text>
          <Icon name="flight" />
          <Text> "flight-land"</Text>
          <Icon name="flight-land" />
          <Text> "flight-takeoff"</Text>
          <Icon name="flight-takeoff" />
          <Text> "flip"</Text>
          <Icon name="flip" />
          <Text> "flip-to-back"</Text>
          <Icon name="flip-to-back" />
          <Text> "flip-to-front"</Text>
          <Icon name="flip-to-front" />
          <Text> "folder"</Text>
          <Icon name="folder" />
          <Text> "folder-open"</Text>
          <Icon name="folder-open" />
          <Text> "folder-shared"</Text>
          <Icon name="folder-shared" />
          <Text> "folder-special"</Text>
          <Icon name="folder-special" />
          <Text> "font-download"</Text>
          <Icon name="font-download" />
          <Text> "format-align-center"</Text>
          <Icon name="format-align-center" />
          <Text> "format-align-justify"</Text>
          <Icon name="format-align-justify" />
          <Text> "format-align-left"</Text>
          <Icon name="format-align-left" />
          <Text> "format-align-right"</Text>
          <Icon name="format-align-right" />
          <Text> "format-bold"</Text>
          <Icon name="format-bold" />
          <Text> "format-clear"</Text>
          <Icon name="format-clear" />
          <Text> "format-color-fill"</Text>
          <Icon name="format-color-fill" />
          <Text> "format-color-reset"</Text>
          <Icon name="format-color-reset" />
          <Text> "format-color-text"</Text>
          <Icon name="format-color-text" />
          <Text> "format-indent-decrease"</Text>
          <Icon name="format-indent-decrease" />
          <Text> "format-indent-increase"</Text>
          <Icon name="format-indent-increase" />
          <Text> "format-italic"</Text>
          <Icon name="format-italic" />
          <Text> "format-line-spacing"</Text>
          <Icon name="format-line-spacing" />
          <Text> "format-list-bulleted"</Text>
          <Icon name="format-list-bulleted" />
          <Text> "format-list-numbered"</Text>
          <Icon name="format-list-numbered" />
          <Text> "format-paint"</Text>
          <Icon name="format-paint" />
          <Text> "format-quote"</Text>
          <Icon name="format-quote" />
          <Text> "format-shapes"</Text>
          <Icon name="format-shapes" />
          <Text> "format-size"</Text>
          <Icon name="format-size" />
          <Text> "format-strikethrough"</Text>
          <Icon name="format-strikethrough" />
          <Text> "format-textdirection-l-to-r"</Text>
          <Icon name="format-textdirection-l-to-r" />
          <Text> "format-textdirection-r-to-l"</Text>
          <Icon name="format-textdirection-r-to-l" />
          <Text> "format-underlined"</Text>
          <Icon name="format-underlined" />
          <Text> "forum"</Text>
          <Icon name="forum" />
          <Text> "forward"</Text>
          <Icon name="forward" />
          <Text> "forward-10"</Text>
          <Icon name="forward-10" />
          <Text> "forward-30"</Text>
          <Icon name="forward-30" />
          <Text> "forward-5"</Text>
          <Icon name="forward-5" />
          <Text> "free-breakfast"</Text>
          <Icon name="free-breakfast" />
          <Text> "fullscreen"</Text>
          <Icon name="fullscreen" />
          <Text> "fullscreen-exit"</Text>
          <Icon name="fullscreen-exit" />
          <Text> "functions"</Text>
          <Icon name="functions" />
          <Text> "g-translate"</Text>
          <Icon name="g-translate" />
          <Text> "gamepad"</Text>
          <Icon name="gamepad" />
          <Text> "games"</Text>
          <Icon name="games" />
          <Text> "gavel"</Text>
          <Icon name="gavel" />
          <Text> "gesture"</Text>
          <Icon name="gesture" />
          <Text> "get-app"</Text>
          <Icon name="get-app" />
          <Text> "gif"</Text>
          <Icon name="gif" />
          <Text> "golf-course"</Text>
          <Icon name="golf-course" />
          <Text> "gps-fixed"</Text>
          <Icon name="gps-fixed" />
          <Text> "gps-not-fixed"</Text>
          <Icon name="gps-not-fixed" />
          <Text> "gps-off"</Text>
          <Icon name="gps-off" />
          <Text> "grade"</Text>
          <Icon name="grade" />
          <Text> "gradient"</Text>
          <Icon name="gradient" />
          <Text> "grain"</Text>
          <Icon name="grain" />
          <Text> "graphic-eq"</Text>
          <Icon name="graphic-eq" />
          <Text> "grid-off"</Text>
          <Icon name="grid-off" />
          <Text> "grid-on"</Text>
          <Icon name="grid-on" />
          <Text> "group"</Text>
          <Icon name="group" />
          <Text> "group-add"</Text>
          <Icon name="group-add" />
          <Text> "group-work"</Text>
          <Icon name="group-work" />
          <Text> "hd"</Text>
          <Icon name="hd" />
          <Text> "hdr-off"</Text>
          <Icon name="hdr-off" />
          <Text> "hdr-on"</Text>
          <Icon name="hdr-on" />
          <Text> "hdr-strong"</Text>
          <Icon name="hdr-strong" />
          <Text> "hdr-weak"</Text>
          <Icon name="hdr-weak" />
          <Text> "headset"</Text>
          <Icon name="headset" />
          <Text> "headset-mic"</Text>
          <Icon name="headset-mic" />
          <Text> "healing"</Text>
          <Icon name="healing" />
          <Text> "hearing"</Text>
          <Icon name="hearing" />
          <Text> "help"</Text>
          <Icon name="help" />
          <Text> "help-outline"</Text>
          <Icon name="help-outline" />
          <Text> "high-quality"</Text>
          <Icon name="high-quality" />
          <Text> "highlight"</Text>
          <Icon name="highlight" />
          <Text> "highlight-off"</Text>
          <Icon name="highlight-off" />
          <Text> "history"</Text>
          <Icon name="history" />
          <Text> "home"</Text>
          <Icon name="home" />
          <Text> "hot-tub"</Text>
          <Icon name="hot-tub" />
          <Text> "hotel"</Text>
          <Icon name="hotel" />
          <Text> "hourglass-empty"</Text>
          <Icon name="hourglass-empty" />
          <Text> "hourglass-full"</Text>
          <Icon name="hourglass-full" />
          <Text> "http"</Text>
          <Icon name="http" />
          <Text> "https"</Text>
          <Icon name="https" />
          <Text> "image"</Text>
          <Icon name="image" />
          <Text> "image-aspect-ratio"</Text>
          <Icon name="image-aspect-ratio" />
          <Text> "import-contacts"</Text>
          <Icon name="import-contacts" />
          <Text> "import-export"</Text>
          <Icon name="import-export" />
          <Text> "important-devices"</Text>
          <Icon name="important-devices" />
          <Text> "inbox"</Text>
          <Icon name="inbox" />
          <Text> "indeterminate-check-box"</Text>
          <Icon name="indeterminate-check-box" />
          <Text> "info"</Text>
          <Icon name="info" />
          <Text> "info-outline"</Text>
          <Icon name="info-outline" />
          <Text> "input"</Text>
          <Icon name="input" />
          <Text> "insert-chart"</Text>
          <Icon name="insert-chart" />
          <Text> "insert-comment"</Text>
          <Icon name="insert-comment" />
          <Text> "insert-drive-file"</Text>
          <Icon name="insert-drive-file" />
          <Text> "insert-emoticon"</Text>
          <Icon name="insert-emoticon" />
          <Text> "insert-invitation"</Text>
          <Icon name="insert-invitation" />
          <Text> "insert-link"</Text>
          <Icon name="insert-link" />
          <Text> "insert-photo"</Text>
          <Icon name="insert-photo" />
          <Text> "invert-colors"</Text>
          <Icon name="invert-colors" />
          <Text> "invert-colors-off"</Text>
          <Icon name="invert-colors-off" />
          <Text> "iso"</Text>
          <Icon name="iso" />
          <Text> "keyboard"</Text>
          <Icon name="keyboard" />
          <Text> "keyboard-arrow-down"</Text>
          <Icon name="keyboard-arrow-down" />
          <Text> "keyboard-arrow-left"</Text>
          <Icon name="keyboard-arrow-left" />
          <Text> "keyboard-arrow-right"</Text>
          <Icon name="keyboard-arrow-right" />
          <Text> "keyboard-arrow-up"</Text>
          <Icon name="keyboard-arrow-up" />
          <Text> "keyboard-backspace"</Text>
          <Icon name="keyboard-backspace" />
          <Text> "keyboard-capslock"</Text>
          <Icon name="keyboard-capslock" />
          <Text> "keyboard-hide"</Text>
          <Icon name="keyboard-hide" />
          <Text> "keyboard-return"</Text>
          <Icon name="keyboard-return" />
          <Text> "keyboard-tab"</Text>
          <Icon name="keyboard-tab" />
          <Text> "keyboard-voice"</Text>
          <Icon name="keyboard-voice" />
          <Text> "kitchen"</Text>
          <Icon name="kitchen" />
          <Text> "label"</Text>
          <Icon name="label" />
          <Text> "label-outline"</Text>
          <Icon name="label-outline" />
          <Text> "landscape"</Text>
          <Icon name="landscape" />
          <Text> "language"</Text>
          <Icon name="language" />
          <Text> "laptop"</Text>
          <Icon name="laptop" />
          <Text> "laptop-chromebook"</Text>
          <Icon name="laptop-chromebook" />
          <Text> "laptop-mac"</Text>
          <Icon name="laptop-mac" />
          <Text> "laptop-windows"</Text>
          <Icon name="laptop-windows" />
          <Text> "last-page"</Text>
          <Icon name="last-page" />
          <Text> "launch"</Text>
          <Icon name="launch" />
          <Text> "layers"</Text>
          <Icon name="layers" />
          <Text> "layers-clear"</Text>
          <Icon name="layers-clear" />
          <Text> "leak-add"</Text>
          <Icon name="leak-add" />
          <Text> "leak-remove"</Text>
          <Icon name="leak-remove" />
          <Text> "lens"</Text>
          <Icon name="lens" />
          <Text> "library-add"</Text>
          <Icon name="library-add" />
          <Text> "library-books"</Text>
          <Icon name="library-books" />
          <Text> "library-music"</Text>
          <Icon name="library-music" />
          <Text> "lightbulb-outline"</Text>
          <Icon name="lightbulb-outline" />
          <Text> "line-style"</Text>
          <Icon name="line-style" />
          <Text> "line-weight"</Text>
          <Icon name="line-weight" />
          <Text> "linear-scale"</Text>
          <Icon name="linear-scale" />
          <Text> "link"</Text>
          <Icon name="link" />
          <Text> "linked-camera"</Text>
          <Icon name="linked-camera" />
          <Text> "list"</Text>
          <Icon name="list" />
          <Text> "live-help"</Text>
          <Icon name="live-help" />
          <Text> "live-tv"</Text>
          <Icon name="live-tv" />
          <Text> "local-activity"</Text>
          <Icon name="local-activity" />
          <Text> "local-airport"</Text>
          <Icon name="local-airport" />
          <Text> "local-atm"</Text>
          <Icon name="local-atm" />
          <Text> "local-bar"</Text>
          <Icon name="local-bar" />
          <Text> "local-cafe"</Text>
          <Icon name="local-cafe" />
          <Text> "local-car-wash"</Text>
          <Icon name="local-car-wash" />
          <Text> "local-convenience-store"</Text>
          <Icon name="local-convenience-store" />
          <Text> "local-dining"</Text>
          <Icon name="local-dining" />
          <Text> "local-drink"</Text>
          <Icon name="local-drink" />
          <Text> "local-florist"</Text>
          <Icon name="local-florist" />
          <Text> "local-gas-station"</Text>
          <Icon name="local-gas-station" />
          <Text> "local-grocery-store"</Text>
          <Icon name="local-grocery-store" />
          <Text> "local-hospital"</Text>
          <Icon name="local-hospital" />
          <Text> "local-hotel"</Text>
          <Icon name="local-hotel" />
          <Text> "local-laundry-service"</Text>
          <Icon name="local-laundry-service" />
          <Text> "local-library"</Text>
          <Icon name="local-library" />
          <Text> "local-mall"</Text>
          <Icon name="local-mall" />
          <Text> "local-movies"</Text>
          <Icon name="local-movies" />
          <Text> "local-offer"</Text>
          <Icon name="local-offer" />
          <Text> "local-parking"</Text>
          <Icon name="local-parking" />
          <Text> "local-pharmacy"</Text>
          <Icon name="local-pharmacy" />
          <Text> "local-phone"</Text>
          <Icon name="local-phone" />
          <Text> "local-pizza"</Text>
          <Icon name="local-pizza" />
          <Text> "local-play"</Text>
          <Icon name="local-play" />
          <Text> "local-post-office"</Text>
          <Icon name="local-post-office" />
          <Text> "local-printshop"</Text>
          <Icon name="local-printshop" />
          <Text> "local-see"</Text>
          <Icon name="local-see" />
          <Text> "local-shipping"</Text>
          <Icon name="local-shipping" />
          <Text> "local-taxi"</Text>
          <Icon name="local-taxi" />
          <Text> "location-city"</Text>
          <Icon name="location-city" />
          <Text> "location-disabled"</Text>
          <Icon name="location-disabled" />
          <Text> "location-off"</Text>
          <Icon name="location-off" />
          <Text> "location-on"</Text>
          <Icon name="location-on" />
          <Text> "location-searching"</Text>
          <Icon name="location-searching" />
          <Text> "lock"</Text>
          <Icon name="lock" />
          <Text> "lock-open"</Text>
          <Icon name="lock-open" />
          <Text> "lock-outline"</Text>
          <Icon name="lock-outline" />
          <Text> "looks"</Text>
          <Icon name="looks" />
          <Text> "looks-3"</Text>
          <Icon name="looks-3" />
          <Text> "looks-4"</Text>
          <Icon name="looks-4" />
          <Text> "looks-5"</Text>
          <Icon name="looks-5" />
          <Text> "looks-6"</Text>
          <Icon name="looks-6" />
          <Text> "looks-one"</Text>
          <Icon name="looks-one" />
          <Text> "looks-two"</Text>
          <Icon name="looks-two" />
          <Text> "loop"</Text>
          <Icon name="loop" />
          <Text> "loupe"</Text>
          <Icon name="loupe" />
          <Text> "low-priority"</Text>
          <Icon name="low-priority" />
          <Text> "loyalty"</Text>
          <Icon name="loyalty" />
          <Text> "mail"</Text>
          <Icon name="mail" />
          <Text> "mail-outline"</Text>
          <Icon name="mail-outline" />
          <Text> "map"</Text>
          <Icon name="map" />
          <Text> "markunread"</Text>
          <Icon name="markunread" />
          <Text> "markunread-mailbox"</Text>
          <Icon name="markunread-mailbox" />
          <Text> "memory"</Text>
          <Icon name="memory" />
          <Text> "menu"</Text>
          <Icon name="menu" />
          <Text> "merge-type"</Text>
          <Icon name="merge-type" />
          <Text> "message"</Text>
          <Icon name="message" />
          <Text> "mic"</Text>
          <Icon name="mic" />
          <Text> "mic-none"</Text>
          <Icon name="mic-none" />
          <Text> "mic-off"</Text>
          <Icon name="mic-off" />
          <Text> "mms"</Text>
          <Icon name="mms" />
          <Text> "mode-comment"</Text>
          <Icon name="mode-comment" />
          <Text> "mode-edit"</Text>
          <Icon name="mode-edit" />
          <Text> "monetization-on"</Text>
          <Icon name="monetization-on" />
          <Text> "money-off"</Text>
          <Icon name="money-off" />
          <Text> "monochrome-photos"</Text>
          <Icon name="monochrome-photos" />
          <Text> "mood"</Text>
          <Icon name="mood" />
          <Text> "mood-bad"</Text>
          <Icon name="mood-bad" />
          <Text> "more"</Text>
          <Icon name="more" />
          <Text> "more-horiz"</Text>
          <Icon name="more-horiz" />
          <Text> "more-vert"</Text>
          <Icon name="more-vert" />
          <Text> "motorcycle"</Text>
          <Icon name="motorcycle" />
          <Text> "mouse"</Text>
          <Icon name="mouse" />
          <Text> "move-to-inbox"</Text>
          <Icon name="move-to-inbox" />
          <Text> "movie"</Text>
          <Icon name="movie" />
          <Text> "movie-creation"</Text>
          <Icon name="movie-creation" />
          <Text> "movie-filter"</Text>
          <Icon name="movie-filter" />
          <Text> "multiline-chart"</Text>
          <Icon name="multiline-chart" />
          <Text> "music-note"</Text>
          <Icon name="music-note" />
          <Text> "music-video"</Text>
          <Icon name="music-video" />
          <Text> "my-location"</Text>
          <Icon name="my-location" />
          <Text> "nature"</Text>
          <Icon name="nature" />
          <Text> "nature-people"</Text>
          <Icon name="nature-people" />
          <Text> "navigate-before"</Text>
          <Icon name="navigate-before" />
          <Text> "navigate-next"</Text>
          <Icon name="navigate-next" />
          <Text> "navigation"</Text>
          <Icon name="navigation" />
          <Text> "near-me"</Text>
          <Icon name="near-me" />
          <Text> "network-cell"</Text>
          <Icon name="network-cell" />
          <Text> "network-check"</Text>
          <Icon name="network-check" />
          <Text> "network-locked"</Text>
          <Icon name="network-locked" />
          <Text> "network-wifi"</Text>
          <Icon name="network-wifi" />
          <Text> "new-releases"</Text>
          <Icon name="new-releases" />
          <Text> "next-week"</Text>
          <Icon name="next-week" />
          <Text> "nfc"</Text>
          <Icon name="nfc" />
          <Text> "no-encryption"</Text>
          <Icon name="no-encryption" />
          <Text> "no-sim"</Text>
          <Icon name="no-sim" />
          <Text> "not-interested"</Text>
          <Icon name="not-interested" />
          <Text> "note"</Text>
          <Icon name="note" />
          <Text> "note-add"</Text>
          <Icon name="note-add" />
          <Text> "notifications"</Text>
          <Icon name="notifications" />
          <Text> "notifications-active"</Text>
          <Icon name="notifications-active" />
          <Text> "notifications-none"</Text>
          <Icon name="notifications-none" />
          <Text> "notifications-off"</Text>
          <Icon name="notifications-off" />
          <Text> "notifications-paused"</Text>
          <Icon name="notifications-paused" />
          <Text> "offline-pin"</Text>
          <Icon name="offline-pin" />
          <Text> "ondemand-video"</Text>
          <Icon name="ondemand-video" />
          <Text> "opacity"</Text>
          <Icon name="opacity" />
          <Text> "open-in-browser"</Text>
          <Icon name="open-in-browser" />
          <Text> "open-in-new"</Text>
          <Icon name="open-in-new" />
          <Text> "open-with"</Text>
          <Icon name="open-with" />
          <Text> "pages"</Text>
          <Icon name="pages" />
          <Text> "pageview"</Text>
          <Icon name="pageview" />
          <Text> "palette"</Text>
          <Icon name="palette" />
          <Text> "pan-tool"</Text>
          <Icon name="pan-tool" />
          <Text> "panorama"</Text>
          <Icon name="panorama" />
          <Text> "panorama-fish-eye"</Text>
          <Icon name="panorama-fish-eye" />
          <Text> "panorama-horizontal"</Text>
          <Icon name="panorama-horizontal" />
          <Text> "panorama-vertical"</Text>
          <Icon name="panorama-vertical" />
          <Text> "panorama-wide-angle"</Text>
          <Icon name="panorama-wide-angle" />
          <Text> "party-mode"</Text>
          <Icon name="party-mode" />
          <Text> "pause"</Text>
          <Icon name="pause" />
          <Text> "pause-circle-filled"</Text>
          <Icon name="pause-circle-filled" />
          <Text> "pause-circle-outline"</Text>
          <Icon name="pause-circle-outline" />
          <Text> "payment"</Text>
          <Icon name="payment" />
          <Text> "people"</Text>
          <Icon name="people" />
          <Text> "people-outline"</Text>
          <Icon name="people-outline" />
          <Text> "perm-camera-mic"</Text>
          <Icon name="perm-camera-mic" />
          <Text> "perm-contact-calendar"</Text>
          <Icon name="perm-contact-calendar" />
          <Text> "perm-data-setting"</Text>
          <Icon name="perm-data-setting" />
          <Text> "perm-device-information"</Text>
          <Icon name="perm-device-information" />
          <Text> "perm-identity"</Text>
          <Icon name="perm-identity" />
          <Text> "perm-media"</Text>
          <Icon name="perm-media" />
          <Text> "perm-phone-msg"</Text>
          <Icon name="perm-phone-msg" />
          <Text> "perm-scan-wifi"</Text>
          <Icon name="perm-scan-wifi" />
          <Text> "person"</Text>
          <Icon name="person" />
          <Text> "person-add"</Text>
          <Icon name="person-add" />
          <Text> "person-outline"</Text>
          <Icon name="person-outline" />
          <Text> "person-pin"</Text>
          <Icon name="person-pin" />
          <Text> "person-pin-circle"</Text>
          <Icon name="person-pin-circle" />
          <Text> "personal-video"</Text>
          <Icon name="personal-video" />
          <Text> "pets"</Text>
          <Icon name="pets" />
          <Text> "phone"</Text>
          <Icon name="phone" />
          <Text> "phone-android"</Text>
          <Icon name="phone-android" />
          <Text> "phone-bluetooth-speaker"</Text>
          <Icon name="phone-bluetooth-speaker" />
          <Text> "phone-forwarded"</Text>
          <Icon name="phone-forwarded" />
          <Text> "phone-in-talk"</Text>
          <Icon name="phone-in-talk" />
          <Text> "phone-iphone"</Text>
          <Icon name="phone-iphone" />
          <Text> "phone-locked"</Text>
          <Icon name="phone-locked" />
          <Text> "phone-missed"</Text>
          <Icon name="phone-missed" />
          <Text> "phone-paused"</Text>
          <Icon name="phone-paused" />
          <Text> "phonelink"</Text>
          <Icon name="phonelink" />
          <Text> "phonelink-erase"</Text>
          <Icon name="phonelink-erase" />
          <Text> "phonelink-lock"</Text>
          <Icon name="phonelink-lock" />
          <Text> "phonelink-off"</Text>
          <Icon name="phonelink-off" />
          <Text> "phonelink-ring"</Text>
          <Icon name="phonelink-ring" />
          <Text> "phonelink-setup"</Text>
          <Icon name="phonelink-setup" />
          <Text> "photo"</Text>
          <Icon name="photo" />
          <Text> "photo-album"</Text>
          <Icon name="photo-album" />
          <Text> "photo-camera"</Text>
          <Icon name="photo-camera" />
          <Text> "photo-filter"</Text>
          <Icon name="photo-filter" />
          <Text> "photo-library"</Text>
          <Icon name="photo-library" />
          <Text> "photo-size-select-actual"</Text>
          <Icon name="photo-size-select-actual" />
          <Text> "photo-size-select-large"</Text>
          <Icon name="photo-size-select-large" />
          <Text> "photo-size-select-small"</Text>
          <Icon name="photo-size-select-small" />
          <Text> "picture-as-pdf"</Text>
          <Icon name="picture-as-pdf" />
          <Text> "picture-in-picture"</Text>
          <Icon name="picture-in-picture" />
          <Text> "picture-in-picture-alt"</Text>
          <Icon name="picture-in-picture-alt" />
          <Text> "pie-chart"</Text>
          <Icon name="pie-chart" />
          <Text> "pie-chart-outlined"</Text>
          <Icon name="pie-chart-outlined" />
          <Text> "pin-drop"</Text>
          <Icon name="pin-drop" />
          <Text> "place"</Text>
          <Icon name="place" />
          <Text> "play-arrow"</Text>
          <Icon name="play-arrow" />
          <Text> "play-circle-filled"</Text>
          <Icon name="play-circle-filled" />
          <Text> "play-circle-outline"</Text>
          <Icon name="play-circle-outline" />
          <Text> "play-for-work"</Text>
          <Icon name="play-for-work" />
          <Text> "playlist-add"</Text>
          <Icon name="playlist-add" />
          <Text> "playlist-add-check"</Text>
          <Icon name="playlist-add-check" />
          <Text> "playlist-play"</Text>
          <Icon name="playlist-play" />
          <Text> "plus-one"</Text>
          <Icon name="plus-one" />
          <Text> "poll"</Text>
          <Icon name="poll" />
          <Text> "polymer"</Text>
          <Icon name="polymer" />
          <Text> "pool"</Text>
          <Icon name="pool" />
          <Text> "portable-wifi-off"</Text>
          <Icon name="portable-wifi-off" />
          <Text> "portrait"</Text>
          <Icon name="portrait" />
          <Text> "power"</Text>
          <Icon name="power" />
          <Text> "power-input"</Text>
          <Icon name="power-input" />
          <Text> "power-settings-new"</Text>
          <Icon name="power-settings-new" />
          <Text> "pregnant-woman"</Text>
          <Icon name="pregnant-woman" />
          <Text> "present-to-all"</Text>
          <Icon name="present-to-all" />
          <Text> "print"</Text>
          <Icon name="print" />
          <Text> "priority-high"</Text>
          <Icon name="priority-high" />
          <Text> "public"</Text>
          <Icon name="public" />
          <Text> "publish"</Text>
          <Icon name="publish" />
          <Text> "query-builder"</Text>
          <Icon name="query-builder" />
          <Text> "question-answer"</Text>
          <Icon name="question-answer" />
          <Text> "queue"</Text>
          <Icon name="queue" />
          <Text> "queue-music"</Text>
          <Icon name="queue-music" />
          <Text> "queue-play-next"</Text>
          <Icon name="queue-play-next" />
          <Text> "radio"</Text>
          <Icon name="radio" />
          <Text> "radio-button-checked"</Text>
          <Icon name="radio-button-checked" />
          <Text> "radio-button-unchecked"</Text>
          <Icon name="radio-button-unchecked" />
          <Text> "rate-review"</Text>
          <Icon name="rate-review" />
          <Text> "receipt"</Text>
          <Icon name="receipt" />
          <Text> "recent-actors"</Text>
          <Icon name="recent-actors" />
          <Text> "record-voice-over"</Text>
          <Icon name="record-voice-over" />
          <Text> "redeem"</Text>
          <Icon name="redeem" />
          <Text> "redo"</Text>
          <Icon name="redo" />
          <Text> "refresh"</Text>
          <Icon name="refresh" />
          <Text> "remove"</Text>
          <Icon name="remove" />
          <Text> "remove-circle"</Text>
          <Icon name="remove-circle" />
          <Text> "remove-circle-outline"</Text>
          <Icon name="remove-circle-outline" />
          <Text> "remove-from-queue"</Text>
          <Icon name="remove-from-queue" />
          <Text> "remove-red-eye"</Text>
          <Icon name="remove-red-eye" />
          <Text> "remove-shopping-cart"</Text>
          <Icon name="remove-shopping-cart" />
          <Text> "reorder"</Text>
          <Icon name="reorder" />
          <Text> "repeat"</Text>
          <Icon name="repeat" />
          <Text> "repeat-one"</Text>
          <Icon name="repeat-one" />
          <Text> "replay"</Text>
          <Icon name="replay" />
          <Text> "replay-10"</Text>
          <Icon name="replay-10" />
          <Text> "replay-30"</Text>
          <Icon name="replay-30" />
          <Text> "replay-5"</Text>
          <Icon name="replay-5" />
          <Text> "reply"</Text>
          <Icon name="reply" />
          <Text> "reply-all"</Text>
          <Icon name="reply-all" />
          <Text> "report"</Text>
          <Icon name="report" />
          <Text> "report-problem"</Text>
          <Icon name="report-problem" />
          <Text> "restaurant"</Text>
          <Icon name="restaurant" />
          <Text> "restaurant-menu"</Text>
          <Icon name="restaurant-menu" />
          <Text> "restore"</Text>
          <Icon name="restore" />
          <Text> "restore-page"</Text>
          <Icon name="restore-page" />
          <Text> "ring-volume"</Text>
          <Icon name="ring-volume" />
          <Text> "room"</Text>
          <Icon name="room" />
          <Text> "room-service"</Text>
          <Icon name="room-service" />
          <Text> "rotate-90-degrees-ccw"</Text>
          <Icon name="rotate-90-degrees-ccw" />
          <Text> "rotate-left"</Text>
          <Icon name="rotate-left" />
          <Text> "rotate-right"</Text>
          <Icon name="rotate-right" />
          <Text> "rounded-corner"</Text>
          <Icon name="rounded-corner" />
          <Text> "router"</Text>
          <Icon name="router" />
          <Text> "rowing"</Text>
          <Icon name="rowing" />
          <Text> "rss-feed"</Text>
          <Icon name="rss-feed" />
          <Text> "rv-hookup"</Text>
          <Icon name="rv-hookup" />
          <Text> "satellite"</Text>
          <Icon name="satellite" />
          <Text> "save"</Text>
          <Icon name="save" />
          <Text> "scanner"</Text>
          <Icon name="scanner" />
          <Text> "schedule"</Text>
          <Icon name="schedule" />
          <Text> "school"</Text>
          <Icon name="school" />
          <Text> "screen-lock-landscape"</Text>
          <Icon name="screen-lock-landscape" />
          <Text> "screen-lock-portrait"</Text>
          <Icon name="screen-lock-portrait" />
          <Text> "screen-lock-rotation"</Text>
          <Icon name="screen-lock-rotation" />
          <Text> "screen-rotation"</Text>
          <Icon name="screen-rotation" />
          <Text> "screen-share"</Text>
          <Icon name="screen-share" />
          <Text> "sd-card"</Text>
          <Icon name="sd-card" />
          <Text> "sd-storage"</Text>
          <Icon name="sd-storage" />
          <Text> "search"</Text>
          <Icon name="search" />
          <Text> "security"</Text>
          <Icon name="security" />
          <Text> "select-all"</Text>
          <Icon name="select-all" />
          <Text> "send"</Text>
          <Icon name="send" />
          <Text> "sentiment-dissatisfied"</Text>
          <Icon name="sentiment-dissatisfied" />
          <Text> "sentiment-neutral"</Text>
          <Icon name="sentiment-neutral" />
          <Text> "sentiment-satisfied"</Text>
          <Icon name="sentiment-satisfied" />
          <Text> "sentiment-very-dissatisfied"</Text>
          <Icon name="sentiment-very-dissatisfied" />
          <Text> "sentiment-very-satisfied"</Text>
          <Icon name="sentiment-very-satisfied" />
          <Text> "settings"</Text>
          <Icon name="settings" />
          <Text> "settings-applications"</Text>
          <Icon name="settings-applications" />
          <Text> "settings-backup-restore"</Text>
          <Icon name="settings-backup-restore" />
          <Text> "settings-bluetooth"</Text>
          <Icon name="settings-bluetooth" />
          <Text> "settings-brightness"</Text>
          <Icon name="settings-brightness" />
          <Text> "settings-cell"</Text>
          <Icon name="settings-cell" />
          <Text> "settings-ethernet"</Text>
          <Icon name="settings-ethernet" />
          <Text> "settings-input-antenna"</Text>
          <Icon name="settings-input-antenna" />
          <Text> "settings-input-component"</Text>
          <Icon name="settings-input-component" />
          <Text> "settings-input-composite"</Text>
          <Icon name="settings-input-composite" />
          <Text> "settings-input-hdmi"</Text>
          <Icon name="settings-input-hdmi" />
          <Text> "settings-input-svideo"</Text>
          <Icon name="settings-input-svideo" />
          <Text> "settings-overscan"</Text>
          <Icon name="settings-overscan" />
          <Text> "settings-phone"</Text>
          <Icon name="settings-phone" />
          <Text> "settings-power"</Text>
          <Icon name="settings-power" />
          <Text> "settings-remote"</Text>
          <Icon name="settings-remote" />
          <Text> "settings-system-daydream"</Text>
          <Icon name="settings-system-daydream" />
          <Text> "settings-voice"</Text>
          <Icon name="settings-voice" />
          <Text> "share"</Text>
          <Icon name="share" />
          <Text> "shop"</Text>
          <Icon name="shop" />
          <Text> "shop-two"</Text>
          <Icon name="shop-two" />
          <Text> "shopping-basket"</Text>
          <Icon name="shopping-basket" />
          <Text> "shopping-cart"</Text>
          <Icon name="shopping-cart" />
          <Text> "short-text"</Text>
          <Icon name="short-text" />
          <Text> "show-chart"</Text>
          <Icon name="show-chart" />
          <Text> "shuffle"</Text>
          <Icon name="shuffle" />
          <Text> "signal-cellular-4-bar"</Text>
          <Icon name="signal-cellular-4-bar" />
          <Text> "signal-cellular-connected-no-internet-4-bar"</Text>
          <Icon name="signal-cellular-connected-no-internet-4-bar" />
          <Text> "signal-cellular-no-sim"</Text>
          <Icon name="signal-cellular-no-sim" />
          <Text> "signal-cellular-null"</Text>
          <Icon name="signal-cellular-null" />
          <Text> "signal-cellular-off"</Text>
          <Icon name="signal-cellular-off" />
          <Text> "signal-wifi-4-bar"</Text>
          <Icon name="signal-wifi-4-bar" />
          <Text> "signal-wifi-4-bar-lock"</Text>
          <Icon name="signal-wifi-4-bar-lock" />
          <Text> "signal-wifi-off"</Text>
          <Icon name="signal-wifi-off" />
          <Text> "sim-card"</Text>
          <Icon name="sim-card" />
          <Text> "sim-card-alert"</Text>
          <Icon name="sim-card-alert" />
          <Text> "skip-next"</Text>
          <Icon name="skip-next" />
          <Text> "skip-previous"</Text>
          <Icon name="skip-previous" />
          <Text> "slideshow"</Text>
          <Icon name="slideshow" />
          <Text> "slow-motion-video"</Text>
          <Icon name="slow-motion-video" />
          <Text> "smartphone"</Text>
          <Icon name="smartphone" />
          <Text> "smoke-free"</Text>
          <Icon name="smoke-free" />
          <Text> "smoking-rooms"</Text>
          <Icon name="smoking-rooms" />
          <Text> "sms"</Text>
          <Icon name="sms" />
          <Text> "sms-failed"</Text>
          <Icon name="sms-failed" />
          <Text> "snooze"</Text>
          <Icon name="snooze" />
          <Text> "sort"</Text>
          <Icon name="sort" />
          <Text> "sort-by-alpha"</Text>
          <Icon name="sort-by-alpha" />
          <Text> "spa"</Text>
          <Icon name="spa" />
          <Text> "space-bar"</Text>
          <Icon name="space-bar" />
          <Text> "speaker"</Text>
          <Icon name="speaker" />
          <Text> "speaker-group"</Text>
          <Icon name="speaker-group" />
          <Text> "speaker-notes"</Text>
          <Icon name="speaker-notes" />
          <Text> "speaker-notes-off"</Text>
          <Icon name="speaker-notes-off" />
          <Text> "speaker-phone"</Text>
          <Icon name="speaker-phone" />
          <Text> "spellcheck"</Text>
          <Icon name="spellcheck" />
          <Text> "star"</Text>
          <Icon name="star" />
          <Text> "star-border"</Text>
          <Icon name="star-border" />
          <Text> "star-half"</Text>
          <Icon name="star-half" />
          <Text> "stars"</Text>
          <Icon name="stars" />
          <Text> "stay-current-landscape"</Text>
          <Icon name="stay-current-landscape" />
          <Text> "stay-current-portrait"</Text>
          <Icon name="stay-current-portrait" />
          <Text> "stay-primary-landscape"</Text>
          <Icon name="stay-primary-landscape" />
          <Text> "stay-primary-portrait"</Text>
          <Icon name="stay-primary-portrait" />
          <Text> "stop"</Text>
          <Icon name="stop" />
          <Text> "stop-screen-share"</Text>
          <Icon name="stop-screen-share" />
          <Text> "storage"</Text>
          <Icon name="storage" />
          <Text> "store"</Text>
          <Icon name="store" />
          <Text> "store-mall-directory"</Text>
          <Icon name="store-mall-directory" />
          <Text> "straighten"</Text>
          <Icon name="straighten" />
          <Text> "streetview"</Text>
          <Icon name="streetview" />
          <Text> "strikethrough-s"</Text>
          <Icon name="strikethrough-s" />
          <Text> "style"</Text>
          <Icon name="style" />
          <Text> "subdirectory-arrow-left"</Text>
          <Icon name="subdirectory-arrow-left" />
          <Text> "subdirectory-arrow-right"</Text>
          <Icon name="subdirectory-arrow-right" />
          <Text> "subject"</Text>
          <Icon name="subject" />
          <Text> "subscriptions"</Text>
          <Icon name="subscriptions" />
          <Text> "subtitles"</Text>
          <Icon name="subtitles" />
          <Text> "subway"</Text>
          <Icon name="subway" />
          <Text> "supervisor-account"</Text>
          <Icon name="supervisor-account" />
          <Text> "surround-sound"</Text>
          <Icon name="surround-sound" />
          <Text> "swap-calls"</Text>
          <Icon name="swap-calls" />
          <Text> "swap-horiz"</Text>
          <Icon name="swap-horiz" />
          <Text> "swap-vert"</Text>
          <Icon name="swap-vert" />
          <Text> "swap-vertical-circle"</Text>
          <Icon name="swap-vertical-circle" />
          <Text> "switch-camera"</Text>
          <Icon name="switch-camera" />
          <Text> "switch-video"</Text>
          <Icon name="switch-video" />
          <Text> "sync"</Text>
          <Icon name="sync" />
          <Text> "sync-disabled"</Text>
          <Icon name="sync-disabled" />
          <Text> "sync-problem"</Text>
          <Icon name="sync-problem" />
          <Text> "system-update"</Text>
          <Icon name="system-update" />
          <Text> "system-update-alt"</Text>
          <Icon name="system-update-alt" />
          <Text> "tab"</Text>
          <Icon name="tab" />
          <Text> "tab-unselected"</Text>
          <Icon name="tab-unselected" />
          <Text> "tablet"</Text>
          <Icon name="tablet" />
          <Text> "tablet-android"</Text>
          <Icon name="tablet-android" />
          <Text> "tablet-mac"</Text>
          <Icon name="tablet-mac" />
          <Text> "tag-faces"</Text>
          <Icon name="tag-faces" />
          <Text> "tap-and-play"</Text>
          <Icon name="tap-and-play" />
          <Text> "terrain"</Text>
          <Icon name="terrain" />
          <Text> "text-fields"</Text>
          <Icon name="text-fields" />
          <Text> "text-format"</Text>
          <Icon name="text-format" />
          <Text> "textsms"</Text>
          <Icon name="textsms" />
          <Text> "texture"</Text>
          <Icon name="texture" />
          <Text> "theaters"</Text>
          <Icon name="theaters" />
          <Text> "thumb-down"</Text>
          <Icon name="thumb-down" />
          <Text> "thumb-up"</Text>
          <Icon name="thumb-up" />
          <Text> "thumbs-up-down"</Text>
          <Icon name="thumbs-up-down" />
          <Text> "time-to-leave"</Text>
          <Icon name="time-to-leave" />
          <Text> "timelapse"</Text>
          <Icon name="timelapse" />
          <Text> "timeline"</Text>
          <Icon name="timeline" />
          <Text> "timer"</Text>
          <Icon name="timer" />
          <Text> "timer-10"</Text>
          <Icon name="timer-10" />
          <Text> "timer-3"</Text>
          <Icon name="timer-3" />
          <Text> "timer-off"</Text>
          <Icon name="timer-off" />
          <Text> "title"</Text>
          <Icon name="title" />
          <Text> "toc"</Text>
          <Icon name="toc" />
          <Text> "today"</Text>
          <Icon name="today" />
          <Text> "toll"</Text>
          <Icon name="toll" />
          <Text> "tonality"</Text>
          <Icon name="tonality" />
          <Text> "touch-app"</Text>
          <Icon name="touch-app" />
          <Text> "toys"</Text>
          <Icon name="toys" />
          <Text> "track-changes"</Text>
          <Icon name="track-changes" />
          <Text> "traffic"</Text>
          <Icon name="traffic" />
          <Text> "train"</Text>
          <Icon name="train" />
          <Text> "tram"</Text>
          <Icon name="tram" />
          <Text> "transfer-within-a-station"</Text>
          <Icon name="transfer-within-a-station" />
          <Text> "transform"</Text>
          <Icon name="transform" />
          <Text> "translate"</Text>
          <Icon name="translate" />
          <Text> "trending-down"</Text>
          <Icon name="trending-down" />
          <Text> "trending-flat"</Text>
          <Icon name="trending-flat" />
          <Text> "trending-up"</Text>
          <Icon name="trending-up" />
          <Text> "tune"</Text>
          <Icon name="tune" />
          <Text> "turned-in"</Text>
          <Icon name="turned-in" />
          <Text> "turned-in-not"</Text>
          <Icon name="turned-in-not" />
          <Text> "tv"</Text>
          <Icon name="tv" />
          <Text> "unarchive"</Text>
          <Icon name="unarchive" />
          <Text> "undo"</Text>
          <Icon name="undo" />
          <Text> "unfold-less"</Text>
          <Icon name="unfold-less" />
          <Text> "unfold-more"</Text>
          <Icon name="unfold-more" />
          <Text> "update"</Text>
          <Icon name="update" />
          <Text> "usb"</Text>
          <Icon name="usb" />
          <Text> "verified-user"</Text>
          <Icon name="verified-user" />
          <Text> "vertical-align-bottom"</Text>
          <Icon name="vertical-align-bottom" />
          <Text> "vertical-align-center"</Text>
          <Icon name="vertical-align-center" />
          <Text> "vertical-align-top"</Text>
          <Icon name="vertical-align-top" />
          <Text> "vibration"</Text>
          <Icon name="vibration" />
          <Text> "video-call"</Text>
          <Icon name="video-call" />
          <Text> "video-label"</Text>
          <Icon name="video-label" />
          <Text> "video-library"</Text>
          <Icon name="video-library" />
          <Text> "videocam"</Text>
          <Icon name="videocam" />
          <Text> "videocam-off"</Text>
          <Icon name="videocam-off" />
          <Text> "videogame-asset"</Text>
          <Icon name="videogame-asset" />
          <Text> "view-agenda"</Text>
          <Icon name="view-agenda" />
          <Text> "view-array"</Text>
          <Icon name="view-array" />
          <Text> "view-carousel"</Text>
          <Icon name="view-carousel" />
          <Text> "view-column"</Text>
          <Icon name="view-column" />
          <Text> "view-comfy"</Text>
          <Icon name="view-comfy" />
          <Text> "view-compact"</Text>
          <Icon name="view-compact" />
          <Text> "view-day"</Text>
          <Icon name="view-day" />
          <Text> "view-headline"</Text>
          <Icon name="view-headline" />
          <Text> "view-list"</Text>
          <Icon name="view-list" />
          <Text> "view-module"</Text>
          <Icon name="view-module" />
          <Text> "view-quilt"</Text>
          <Icon name="view-quilt" />
          <Text> "view-stream"</Text>
          <Icon name="view-stream" />
          <Text> "view-week"</Text>
          <Icon name="view-week" />
          <Text> "vignette"</Text>
          <Icon name="vignette" />
          <Text> "visibility"</Text>
          <Icon name="visibility" />
          <Text> "visibility-off"</Text>
          <Icon name="visibility-off" />
          <Text> "voice-chat"</Text>
          <Icon name="voice-chat" />
          <Text> "voicemail"</Text>
          <Icon name="voicemail" />
          <Text> "volume-down"</Text>
          <Icon name="volume-down" />
          <Text> "volume-mute"</Text>
          <Icon name="volume-mute" />
          <Text> "volume-off"</Text>
          <Icon name="volume-off" />
          <Text> "volume-up"</Text>
          <Icon name="volume-up" />
          <Text> "vpn-key"</Text>
          <Icon name="vpn-key" />
          <Text> "vpn-lock"</Text>
          <Icon name="vpn-lock" />
          <Text> "wallpaper"</Text>
          <Icon name="wallpaper" />
          <Text> "warning"</Text>
          <Icon name="warning" />
          <Text> "watch"</Text>
          <Icon name="watch" />
          <Text> "watch-later"</Text>
          <Icon name="watch-later" />
          <Text> "wb-auto"</Text>
          <Icon name="wb-auto" />
          <Text> "wb-cloudy"</Text>
          <Icon name="wb-cloudy" />
          <Text> "wb-incandescent"</Text>
          <Icon name="wb-incandescent" />
          <Text> "wb-iridescent"</Text>
          <Icon name="wb-iridescent" />
          <Text> "wb-sunny"</Text>
          <Icon name="wb-sunny" />
          <Text> "wc"</Text>
          <Icon name="wc" />
          <Text> "web"</Text>
          <Icon name="web" />
          <Text> "web-asset"</Text>
          <Icon name="web-asset" />
          <Text> "weekend"</Text>
          <Icon name="weekend" />
          <Text> "whatshot"</Text>
          <Icon name="whatshot" />
          <Text> "widgets"</Text>
          <Icon name="widgets" />
          <Text> "wifi"</Text>
          <Icon name="wifi" />
          <Text> "wifi-lock"</Text>
          <Icon name="wifi-lock" />
          <Text> "wifi-tethering"</Text>
          <Icon name="wifi-tethering" />
          <Text> "work"</Text>
          <Icon name="work" />
          <Text> "wrap-text"</Text>
          <Icon name="wrap-text" />
          <Text> "youtube-searched-for"</Text>
          <Icon name="youtube-searched-for" />
          <Text> "zoom-in"</Text>
          <Icon name="zoom-in" />
          <Text> "zoom-out"</Text>
          <Icon name="zoom-out" />
          <Text> "zoom-out-map"</Text>
          <Icon name="zoom-out-map" />
          <View style={{ margin: 50 }}><Text> </Text></View>
        </ScrollView>
      </View>
    );
  }
}
export { IconsElement };