import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import {ITopNavProps} from "Sdk/src/AssetsSelectorTypes";

export const DefaultTopNavigator= ({
    finishText,
    backText,
    selected,
    backFunction,
    fontColor,
    bgColor,
    midTextColor,
    onFinish,
}:ITopNavProps) => (
        <Navigator>
            <SimpleButton bgColor={bgColor} onPress={backFunction}>
                <ButtonText fontColor={fontColor}>{backText}</ButtonText>
            </SimpleButton>

            <Text style={{ color: midTextColor }}>{selected} Selected </Text>

            <SimpleButton bgColor={bgColor} onPress={onFinish}>
                <ButtonText fontColor={fontColor}>{finishText}</ButtonText>
            </SimpleButton>
        </Navigator>
    )


const SimpleButton = styled.TouchableOpacity<{
    bgColor: string
}>`
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 38px;
    background-color: ${({ bgColor }) => bgColor};
`

const ButtonText = styled.Text<{ fontColor: string }>`
    color: ${({ fontColor }) => fontColor};
`

const Navigator = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 5px;
`
