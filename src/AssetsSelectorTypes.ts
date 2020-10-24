import React, { JSXElementConstructor } from 'react'
import { Asset, MediaTypeValue } from 'expo-media-library'

export interface IAssetSelectorProps {
    options?: OptionsType
}

declare const AssetsSelector:React.FC<IAssetSelectorProps>

export default AssetsSelector

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

export type OptionsType = {
    assetsType: MediaTypeValue[] | MediaTypeValue
    noAssetsText: string
    maxSelections: number
    margin: number
    portraitCols: number
    landscapeCols: number
    widgetWidth: number
    widgetBgColor:string
    videoIcon: VideoIcon
    selectedIcon: SelectedIcon
    defaultTopNavigator?: DefaultTopNavOptions
    CustomTopNavigator?: CustomTopNavigator
    noAssets?:NoAssets
}

export interface ITopNavProps {
    selected: number
    backText: string
    finishText: string
    onFinish: () => void
    fontColor: string
    bgColor: string
    midTextColor: string
    backFunction?: () => void
    doneFunction?: () => void
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
    Component: JSXElementConstructor<any> | null
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
    continueText:string
    goBackText: string
    buttonBgColor:string
    buttonTextColor:string
    midTextColor:string
    backFunction: () => void
    doneFunction: (data: any) => void
}

export type IComponentItems = {
    data: Asset[]
    noAssetsText:string
    margin: number
    cols: number
    screen: number
    selectedItems: string[]
    onClick: (id: string) => void
    getMoreAssets: () => void
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
    noAssets?: NoAssets | null
}
