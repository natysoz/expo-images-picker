import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, View, ActivityIndicator, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import * as Permissions from 'expo-permissions'
import { Asset, AssetsOptions, getAssetsAsync } from 'expo-media-library'
import { AssetsSelectorList } from './AssetsSelectorList'
import { DefaultTopNavigator } from './DefaultTopNavigator'
import * as ImageManipulator from 'expo-image-manipulator'
import {
    IAssetPickerOptions,
    IScreen,
    IWidget,
    ManipulateOptions,
    PagedInfo,
} from './AssetsSelectorTypes'
import { ImageResult } from 'expo-image-manipulator'

const AssetsSelector = ({ options }: IAssetPickerOptions): JSX.Element => {
    const {
        manipulate,
        assetsType,
        maxSelections,
        margin,
        portraitCols,
        landscapeCols,
        widgetWidth,
        widgetBgColor,
        videoIcon,
        selectedIcon,
        spinnerColor,
        defaultTopNavigator,
        CustomTopNavigator,
        noAssets,
        onError,
    } = options

    const getScreen = () => Dimensions.get('screen')

    const { width, height } = useMemo(() => getScreen(), [])

    const COLUMNS = height >= width ? portraitCols : landscapeCols

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const [permissions, setPermissions] = useState({
        hasCameraPermission: false,
        hasCameraRollPermission: false,
    })

    const [availableOptions, setAvailableOptions] = useState<PagedInfo>({
        first: 500,
        totalCount: 0,
        after: '',
        endCursor: '',
        hasNextPage: true,
    })

    const [assetItems, setItems] = useState<Asset[]>([])

    const [isLoading, setLoading] = useState(false)

    // todo add state for errors and render error msg.

    const loadAssets = useCallback(
        (params: AssetsOptions) => {
            getAssetsAsync(params)
                .then(({ endCursor, assets, hasNextPage }) => {
                    if (availableOptions.after === endCursor) return
                    const newAssets = assets
                    setAvailableOptions({
                        ...availableOptions,
                        after: endCursor,
                        hasNextPage: hasNextPage,
                    })
                    return setItems([...assetItems, ...newAssets])
                })
                .catch((err) => onError && onError(err))
        },
        [assetItems, permissions.hasCameraPermission]
    )

    const getCameraPermissions = useCallback(async () => {
        const { status: CAMERA }: any = await Permissions.askAsync(
            Permissions.CAMERA
        )

        const { status: MEDIA_LIBRARY }: any = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
        )

        setPermissions({
            hasCameraPermission: CAMERA === 'granted',
            hasCameraRollPermission: MEDIA_LIBRARY === 'granted',
        })
    }, [])

    const onClickUseCallBack = useCallback((id: string) => {
        setSelectedItems((selectedItems) => {
            const alreadySelected = selectedItems.indexOf(id) >= 0
            if (selectedItems.length >= maxSelections && !alreadySelected)
                return selectedItems
            if (alreadySelected)
                return selectedItems.filter((item) => item !== id)
            else return [...selectedItems, id]
        })
    }, [])

    useEffect(() => {
        getAssets()
    }, [
        assetsType,
        permissions.hasCameraPermission,
        permissions.hasCameraRollPermission,
    ])

    const getAssets = () => {
        try {
            if (availableOptions.hasNextPage) {
                const params: AssetsOptions = {
                    first: 200,
                    mediaType: assetsType,
                    sortBy: ['creationTime'],
                }
                if (availableOptions.after)
                    params.after = availableOptions.after
                if (!availableOptions.hasNextPage) return

                return permissions.hasCameraRollPermission
                    ? loadAssets(params)
                    : getCameraPermissions()
            }
        } catch (err) {
            // need to add component that display where there is an error
            // show it when any error happen and wrap any place that can have
            // err with try and catch block
        }
    }

    const resizeImages = async (
        image: Asset,
        manipulate: ManipulateOptions
    ) => {
        const { base64, width, height, saveTo, compress } = manipulate
        const saveFormat =
            saveTo === 'jpeg'
                ? ImageManipulator.SaveFormat.JPEG
                : ImageManipulator.SaveFormat.PNG

        let sizeOptions: any = {}

        if (width && !height) {
            sizeOptions.width = width
        }

        if (height && !width) {
            sizeOptions.height = height
        }

        if (width && height) {
            sizeOptions.width = width
            sizeOptions.height = height
        }

        if (!width && !height) {
            sizeOptions.width = image.width
            sizeOptions.height = image.height
        }

        const options = [
            {
                resize: sizeOptions,
            },
        ]
        const format = {
            base64,
            compress,
            format: saveFormat,
        }
        // todo add try and catch block
        return await ImageManipulator.manipulateAsync(
            image.uri,
            options,
            format
        )
    }

    const prepareResponse = useCallback(
        () =>
            assetItems
                .filter(
                    (asset: { id: any }) =>
                        selectedItems.indexOf(asset.id) !== -1
                )
                .sort(
                    (a, b) =>
                        selectedItems.indexOf(a.id) -
                        selectedItems.indexOf(b.id)
                ),
        [selectedItems]
    )

    const manipulateResults = async (source: string) => {
        setLoading(true)
        const selectedAssets = prepareResponse()
        try {
            if (manipulate) {
                let modAssets: ImageManipulator.ImageResult[] = []
                await asyncForEach(selectedAssets, async (asset: Asset) => {
                    if (asset.mediaType === 'photo') {
                        const resizedImage = await resizeImages(
                            asset,
                            manipulate
                        )
                        modAssets.push(resizedImage)
                    } else modAssets.push(asset)
                })
                return responseWithResults(source, modAssets)
            }
            return responseWithResults(source, selectedAssets)
        } catch (err) {
            return responseWithResults(source, selectedAssets)
        } finally {
            setLoading(false)
        }
    }

    const responseWithResults = (
        navigation: string,
        assets: Asset[] | ImageResult[]
    ) => {
        const _default = navigation === 'default'
        return _default
            ? defaultTopNavigator?.doneFunction(assets)
            : CustomTopNavigator?.props.doneFunction(assets)
    }

    return (
        <Screen bgColor={widgetBgColor}>
            {CustomTopNavigator && CustomTopNavigator.Component && (
                <CustomTopNavigator.Component
                    {...CustomTopNavigator.props}
                    onFinish={() => manipulateResults('custom')}
                />
            )}
            {defaultTopNavigator && (
                <DefaultTopNavigator
                    selectedText={defaultTopNavigator.selectedText}
                    buttonTextStyle={defaultTopNavigator.buttonTextStyle}
                    buttonStyle={defaultTopNavigator.buttonStyle}
                    midTextColor={defaultTopNavigator.midTextColor || 'black'}
                    backText={defaultTopNavigator.goBackText}
                    finishText={defaultTopNavigator.continueText}
                    selected={selectedItems.length}
                    backFunction={() => defaultTopNavigator.backFunction()}
                    onFinish={() => manipulateResults('default')}
                />
            )}
            {isLoading ? (
                <Spinner color={spinnerColor} />
            ) : (
                <Widget widgetWidth={widgetWidth} bgColor={widgetBgColor}>
                    <AssetsSelectorList
                        cols={COLUMNS}
                        margin={margin}
                        data={assetItems}
                        getMoreAssets={getAssets}
                        onClick={onClickUseCallBack}
                        selectedItems={selectedItems}
                        screen={(width * widgetWidth) / 100}
                        selectedIcon={selectedIcon}
                        videoIcon={videoIcon}
                        noAssets={noAssets}
                    />
                </Widget>
            )}
        </Screen>
    )
}

async function asyncForEach(array: Asset[], callback: any) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const SpinnerStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

const Spinner: FC<{ color: string }> = ({ color }) => {
    return (
        <View style={[SpinnerStyle.container, SpinnerStyle.horizontal]}>
            <ActivityIndicator size="large" color={color} />
        </View>
    )
}

const Screen = styled.View<IScreen>`
    background-color: ${({ bgColor }) => bgColor};
    flex: 1;
`

const Widget = styled.View<IWidget>`
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ bgColor }) => bgColor};
    width: ${({ widgetWidth }) => widgetWidth || 100}%;
    flex: 1;
`

export default AssetsSelector
