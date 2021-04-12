import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { ITopNavProps } from './AssetsSelectorTypes'

export const DefaultTopNavigator = ({
    finishText,
    backText,
    selected,
    backFunction,
    midTextColor,
    onFinish,
    buttonTextStyle,
    buttonStyle,
    selectedText,
}: ITopNavProps) => (
    <Navigator>
        <SimpleButton style={buttonStyle} onPress={backFunction}>
            <Text style={buttonTextStyle}>{backText}</Text>
        </SimpleButton>

        <Text style={{ color: midTextColor }}>
            {selected} {selectedText}
        </Text>

        <SimpleButton style={buttonStyle} onPress={onFinish}>
            <Text style={buttonTextStyle}>{finishText}</Text>
        </SimpleButton>
    </Navigator>
)

const SimpleButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 38px;
`

const Navigator = styled.View`
    width: 98%;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 5px;
`
