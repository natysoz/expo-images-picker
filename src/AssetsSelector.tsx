import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, View } from 'react-native'
import styled from 'styled-components/native'
import * as Permissions from 'expo-permissions'
import { Asset, AssetsOptions, getAssetsAsync } from 'expo-media-library'
import { AssetsSelectorList } from './AssetsSelectorList'
import { DefaultTopNavigator } from './DefaultTopNavigator'

import {
    IAssetSelectorProps,
    OptionsType,
    PagedInfo,
} from './AssetsSelectorTypes'

const defaultOptions: OptionsType = {
    assetsType: ['video', 'photo'],
    maxSelections: 5,
    margin: 2,
    portraitCols: 4,
    landscapeCols: 6,
    widgetWidth: 100,
    widgetBgColor: 'white',
    videoIcon: {
        Component: null,
        iconName: '',
        color: 'white',
        size: 20,
    },
    selectedIcon: {
        Component: null,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#ffffff50',
        size: 28,
    },
    CustomTopNavigator: {
        Component: null,
        props: {},
    },
    noAssets: {
        Component: () => <View />,
    },
    onError: () => {},
}

const AssetsSelector = ({
    options = defaultOptions,
}: IAssetSelectorProps): JSX.Element => {
    const {
        assetsType,
        maxSelections,
        margin,
        portraitCols,
        landscapeCols,
        widgetWidth,
        widgetBgColor,
        videoIcon,
        selectedIcon,
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
                .catch( err => onError && onError(err) )
        },
        [assetItems, permissions.hasCameraPermission]
    )

    const getCameraPermissions = useCallback(async () => {
        const { status: CAMERA }: any = await Permissions.askAsync(
            Permissions.CAMERA
        )

        const { status: CAMERA_ROLL }: any = await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
        )

        setPermissions({
            hasCameraPermission: CAMERA === 'granted',
            hasCameraRollPermission: CAMERA_ROLL === 'granted',
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
        if (availableOptions.hasNextPage) {
            const params: AssetsOptions = {
                first: 200,
                mediaType: assetsType,
                sortBy: ['creationTime'],
            }
            if (availableOptions.after) params.after = availableOptions.after
            if (!availableOptions.hasNextPage) return

            return permissions.hasCameraRollPermission
                ? loadAssets(params)
                : getCameraPermissions()
        }
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

    return (
        <Screen bgColor={widgetBgColor}>
            {CustomTopNavigator && CustomTopNavigator.Component && (
                <CustomTopNavigator.Component
                    {...CustomTopNavigator.props}
                    onFinish={() =>
                        CustomTopNavigator?.props.doneFunction(
                            prepareResponse()
                        )
                    }
                />
            )}
            {defaultTopNavigator && (
                <DefaultTopNavigator
                    textStyle={defaultTopNavigator.textStyle}
                    buttonStyle={defaultTopNavigator.buttonStyle}
                    backText={defaultTopNavigator.goBackText}
                    finishText={defaultTopNavigator.continueText}
                    selected={selectedItems.length}
                    backFunction={() => defaultTopNavigator.backFunction()}
                    onFinish={() =>
                        defaultTopNavigator.doneFunction(prepareResponse())
                    }
                />
            )}
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
        </Screen>
    )
}

const Screen = styled.View<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    flex: 1;
`

const Widget = styled.View<{ widgetWidth: number; bgColor: string }>`
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ bgColor }) => bgColor};
    width: ${({ widgetWidth }) => widgetWidth || 100}%;
    flex: 1;
`

export default AssetsSelector
