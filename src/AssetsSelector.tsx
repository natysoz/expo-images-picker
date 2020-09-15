import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { Set } from 'immutable'
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
    noAssetsText: 'No Assets Found.',
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
    defaultTopNavigator: {
        continueText: 'Continue',
        goBackText: 'Back',
        buttonBgColor: 'black',
        buttonTextColor: 'white',
        midTextColor: 'black',
        backFunction: () => {},
        doneFunction: data => data,
    },
    CustomTopNavigator: {
        Component: null,
        props: {},
    },
}


/** Plugin to loads media from the phone user */
export const AssetsSelector = ({
    options = defaultOptions,
}: IAssetSelectorProps) => {
    const {
        assetsType,
        noAssetsText,
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
    } = options

    const getScreen = () => Dimensions.get('screen')

    const { width, height } = useMemo(() => getScreen(), [])

    const COLUMNS = height >= width ? portraitCols : landscapeCols

    const [selectedItems, setSelectedItems] = useState(Set())

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
                .then(data => {
                    if (availableOptions.after === data.endCursor) return
                    const newAssets = data.assets
                    setAvailableOptions({
                        ...availableOptions,
                        after: data.endCursor,
                        hasNextPage: data.hasNextPage,
                    })
                    return setItems([...assetItems, ...newAssets])
                })
                .catch(err => {
                    console.log('Assets Selector',err)})
        },
        [assetItems, permissions.hasCameraPermission]
    )

    const getCameraPermissions = useCallback(async () => {
        const { status: CAMERA } = await Permissions.askAsync(
            Permissions.CAMERA
        )

        const { status: CAMERA_ROLL } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        )
        setPermissions({
            hasCameraPermission: CAMERA === 'granted',
            hasCameraRollPermission: CAMERA_ROLL === 'granted',
        })
    }, [])

    const onClickUseCallBack = React.useCallback((id: string) => {
        setSelectedItems(selectedItems => {
            if (selectedItems.size < maxSelections || selectedItems.has(id)) {
                return selectedItems.has(id)
                    ? selectedItems.delete(id)
                    : selectedItems.add(id)
            } else return selectedItems
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
                first: 500,
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
        () => assetItems.filter((asset: { id: any }) => selectedItems.includes(asset.id)),
        [selectedItems]
    )

    return (
        <Screen bgColor={widgetBgColor}>
            {CustomTopNavigator && CustomTopNavigator.Component && (
                <CustomTopNavigator.Component
                    {...CustomTopNavigator.props}
                    onFinish={() =>
                        CustomTopNavigator?.props.doneFunction(prepareResponse())
                    }
                />
            )}
            {defaultTopNavigator && (
                <DefaultTopNavigator
                    fontColor={defaultTopNavigator?.buttonTextColor || 'white'}
                    bgColor={defaultTopNavigator?.buttonBgColor || 'black'}
                    midTextColor={defaultTopNavigator?.midTextColor || 'black'}
                    backText={defaultTopNavigator?.goBackText || 'Back'}
                    finishText={defaultTopNavigator?.continueText || 'Done'}
                    selected={selectedItems.size}
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
                    noAssetsText={noAssetsText}
                />
            </Widget>
        </Screen>
    )
}

/** Styles */
const Screen = styled.View<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    flex: 1;
`

const Widget = styled.View<{ widgetWidth: number; bgColor: string }>`
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ bgColor }) => bgColor};
    width: ${({ widgetWidth }) => widgetWidth || 100}%;
    flex: 1;
`