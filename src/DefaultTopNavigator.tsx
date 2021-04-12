import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { ITopNavProps } from './AssetsSelectorTypes'

export const DefaultTopNavigator = ({
    finishText,
    backText,
    selected,
    backFunction,
    onFinish,
    textStyle,
    buttonStyle,
    selectedText,
}: ITopNavProps) => (
    <Navigator>
        <SimpleButton style={buttonStyle} onPress={backFunction}>
            <Text style={textStyle}>{backText}</Text>
        </SimpleButton>

        <Text style={textStyle}>
            {selected} {selectedText}{' '}
        </Text>

        <SimpleButton style={buttonStyle} onPress={onFinish}>
            <Text style={textStyle}>{finishText}</Text>
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
