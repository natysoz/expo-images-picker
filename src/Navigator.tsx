import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { NavigatorType } from './Types'

const Navigator = ({
    Texts,
    selected,
    onBack,
    midTextColor,
    onSuccess,
    minSelection,
    buttonTextStyle,
    buttonStyle,
}: NavigatorType) => {
    const handleActionRequest = () => {
        if (!minSelection) return onSuccess()
        if (selected) {
            return selected >= minSelection && onSuccess()
        }
    }
    return (
        <Container>
            <SimpleButton style={buttonStyle} onPress={onBack}>
                <Text style={buttonTextStyle}>{Texts.back}</Text>
            </SimpleButton>

            <Text style={{ color: midTextColor }}>
                {selected} {Texts.selected}
            </Text>

            <SimpleButton style={buttonStyle} onPress={handleActionRequest}>
                <Text style={buttonTextStyle}>{Texts.finish}</Text>
            </SimpleButton>
        </Container>
    )
}

export default Navigator

const SimpleButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 38px;
`

const Container = styled.View`
    width: 98%;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 5px;
`
