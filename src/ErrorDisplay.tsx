import React from 'react'
import styled from 'styled-components/native'
import { ErrorTypes } from './Types'

const ErrorDisplay = ({
    errorType,
    errorMessages,
    errorTextColor,
}: ErrorTypes) => {
    if (!errorType) return <Container />
    return (
        <Container>
            {errorType === 'hasNoAssets' && (
                <PermissionsError>
                    <Text color={errorTextColor || 'black'}>
                        {errorMessages?.hasNoAssets ||
                            'There are no assets to display.'}
                    </Text>
                </PermissionsError>
            )}

            {errorType === 'hasErrorWithPermissions' && (
                <PermissionsError>
                    <Text color={errorTextColor || 'black'}>
                        {errorMessages?.hasErrorWithPermissions ||
                            'Please Allow media permissions and try again.'}
                    </Text>
                </PermissionsError>
            )}
            {errorType === 'hasErrorWithLoading' && (
                <LoadingAssetsError>
                    <Text color={errorTextColor || 'black'}>
                        {errorMessages?.hasErrorWithLoading ||
                            'There was error loading assets.'}
                    </Text>
                </LoadingAssetsError>
            )}
            {errorType === 'hasErrorWithResizing' && (
                <ResizeImagesError>
                    <Text color={errorTextColor || 'black'}>
                        {errorMessages?.hasErrorWithResizing ||
                            'There was error loading assets.'}
                    </Text>
                </ResizeImagesError>
            )}
        </Container>
    )
}

const Text = styled.Text<{ color: string }>`
    color: ${({ color }) => color || 'black'};
`
const PermissionsError = styled.View`
    width: 90%;
`
const LoadingAssetsError = styled.View``
const ResizeImagesError = styled.View``
const Container = styled.View`
    justify-content: center;
    align-items: center;
`

export default ErrorDisplay
