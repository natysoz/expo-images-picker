import React, { JSXElementConstructor } from 'react'
import { Asset, MediaTypeValue } from 'expo-media-library'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface IAssetSelectorProps {
    options?: OptionsType
}

declare const AssetsSelector: React.FC<IAssetSelectorProps>

export interface IComponentItem {
    id: string
    cols: number
    screen: number
    image: string
    margin: number
    selectedIndex: number
    onClick: (id: string) => void
    mediaType: MediaTypeValue
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
}

export type PagedInfo = {
    first: number
    after: string
    endCursor: string
    hasNextPage: boolean
    totalCount: number
}

type SaveTypes = 'jpeg' | 'png'

/**
 * @param base64 - save manipulation results into base64 String.
 * @param compress - A value in range 0.0 - 1.0 specifying compression level of the result image. 1 means no compression (highest quality) and 0 the highest compression.
 * @param width - max width of the manipulation image.
 * @param height - max height of the manipulation image.
 * @param saveTo - can be "jpeg" or "png".
 */
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
    onError?: (err: any) => void
}

export interface ITopNavProps {
    selected: number
    backText: string
    selectedText: string
    finishText: string
    onFinish: () => void
    backFunction?: () => void
    textStyle: StyleProp<TextStyle>
    buttonStyle: StyleProp<ViewStyle>
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

export type NoAssets = {
    Component: JSXElementConstructor<any>
}

/** @param bg  { string } - Should be a valid Hex color*/
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
    buttonBgColor?: string
    buttonTextColor?: string
    midTextColor?: string
    backFunction: () => void
    doneFunction: (data: any) => void
    textStyle: StyleProp<TextStyle>
    buttonStyle: StyleProp<ViewStyle>
}

export type IComponentItems = {
    data: Asset[]
    margin: number
    cols: number
    screen: number
    selectedItems: string[]
    onClick: (id: string) => void
    getMoreAssets: () => void
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
    noAssets: NoAssets
}

export default AssetsSelector
