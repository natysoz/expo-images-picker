import React, { JSXElementConstructor } from 'react'
import { Asset, MediaTypeValue } from 'expo-media-library'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface IAssetPickerOptions {
    options: OptionsType
}

type SaveTypes = 'jpeg' | 'png'

declare const AssetsSelector: React.FC<IAssetPickerOptions>

export interface IScreen {
    bgColor: string
}

export interface IWidget {
    widgetWidth: number
    bgColor: string
}

export interface IComponentItem {
    id: string
    cols: number
    screen: number
    image: string
    margin: number
    selectedIndex: number
    mediaType: MediaTypeValue
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
    onClick(id: string): void
}

export type PagedInfo = {
    first: number
    after: string
    endCursor: string
    hasNextPage: boolean
    totalCount: number
}

export type ManipulateOptions = {
    width?: number
    height?: number
    compress?: number
    base64?: boolean
    saveTo?: SaveTypes
}

export type OptionsType = {
    manipulate?: ManipulateOptions
    assetsType: MediaTypeValue[]
    maxSelections: number
    margin: number
    portraitCols: number
    landscapeCols: number
    widgetWidth: number
    widgetBgColor: string
    spinnerColor: string
    videoIcon: VideoIcon
    selectedIcon: SelectedIcon
    defaultTopNavigator?: DefaultTopNavOptions
    CustomTopNavigator?: CustomTopNavigator
    noAssets: NoAssets
    onError?(err: any): void
}

export interface ITopNavProps {
    selected: number
    backText: string
    finishText: string
    midTextColor: string
    selectedText: string
    buttonTextStyle: StyleProp<TextStyle>
    buttonStyle: StyleProp<ViewStyle>
    onFinish(): void
    backFunction?(): void
}

export type CustomTopNavigator = {
    Component: JSXElementConstructor<any> | null
    props?: any
}

export type VideoIcon = {
    Component: JSXElementConstructor<any> | null
    iconName: string
    color: string
    size: number
}

export type NoAssets = JSXElementConstructor<React.FC> | null

export type SelectedIcon = {
    Component: JSXElementConstructor<any> | null
    iconName: string
    color: string
    bg: string
    size: number
}

export type DefaultTopNavOptions = {
    continueText: string
    goBackText: string
    selectedText: string
    buttonBgColor?: string
    buttonTextColor?: string
    midTextColor?: string
    buttonTextStyle: StyleProp<TextStyle>
    buttonStyle: StyleProp<ViewStyle>
    backFunction(): void
    doneFunction(data: any): void
}

export type IComponentItems = {
    data: Asset[]
    margin: number
    cols: number
    screen: number
    selectedItems: string[]
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
    noAssets: NoAssets
    onClick(id: string): void
    getMoreAssets(): void
}

export default AssetsSelector
