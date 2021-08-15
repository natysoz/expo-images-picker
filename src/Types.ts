import React, { JSXElementConstructor } from 'react'
import { Asset, MediaTypeValue } from 'expo-media-library'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

declare const AssetsSelector: React.FC<AssetSelectorPropTypes>

export type AssetSelectorPropTypes = {
    Settings: SettingsType
    Errors: ErrorsType
    Styles: StylesType
    Navigator?: NavigatorType
    Resize?: ResizeType
    CustomNavigator?: CustomNavigator
    onChange?: (data?: any) => void
}

export type ResizeType = {
    width?: number
    height?: number
    compress?: number
    base64: boolean
    saveTo?: string
}

export enum SaveType {
    JPG = 'jpeg',
    PNG = 'png',
}

export type SettingsType = {
    initialLoad: number
    assetsType: MediaTypeValue[]
    minSelection: number
    maxSelection: number
    portraitCols: number
    landscapeCols: number
    getImageMetaData: boolean
}

export type ErrorsType = {
    onError?: () => void
    errorTextColor?: string
    errorMessages?: {
        hasErrorWithPermissions?: string
        hasErrorWithLoading?: string
        hasErrorWithResizing?: string
        hasNoAssets?: string
    }
}

export type StylesType = {
    margin: number
    bgColor: string
    spinnerColor: string
    widgetWidth: number
    videoIcon: {
        Component: JSXElementConstructor<any> | null
        iconName: string
        color: string
        size: number
    }
    selectedIcon: {
        Component: JSXElementConstructor<any> | null
        iconName: string
        color: string
        bg: string
        size: number
    }
}

export type NavigatorType = {
    Texts: {
        finish: string
        back: string
        selected: string
    }
    selected?: number
    midTextColor?: string
    minSelection?: number
    buttonTextStyle: StyleProp<TextStyle>
    buttonStyle: StyleProp<ViewStyle>
    onBack(): void
    onSuccess(data?: any): void
}

export interface IScreen {
    bgColor: string
}

export interface IWidget {
    widgetWidth: number
    bgColor: string
}

export type PagedInfo = {
    first: number
    after: string
    endCursor: string
    hasNextPage: boolean
    totalCount: number
}

export type IAssetSelectorError =
    | 'hasErrorWithPermissions'
    | 'hasErrorWithLoading'
    | 'hasErrorWithResizing'
    | 'hasNoAssets'
    | ''

export type CustomNavigator = {
    Component: JSXElementConstructor<any> | null
    props?: any
}

export type VideoIcon = {
    Component: JSXElementConstructor<any> | null
    iconName: string
    color: string
    size: number
}

export type SelectedIcon = {
    Component: JSXElementConstructor<any> | null
    iconName: string
    color: string
    bg: string
    size: number
}

export interface ItemType {
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

export type AssetListPropTypes = {
    data: Asset[]
    margin: number
    cols: number
    screen: number
    selectedItems: string[]
    selectedIcon: SelectedIcon
    videoIcon: VideoIcon
    onClick(id: string): void
    getMoreAssets(): void
}

export type ErrorTypes = {
    errorMessages?: {
        hasErrorWithPermissions?: string
        hasErrorWithLoading?: string
        hasErrorWithResizing?: string
        hasNoAssets?: string
    }
    errorTextColor?: string
    errorType?: string
}

export default AssetsSelector
