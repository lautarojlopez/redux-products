import { createSelector } from "@reduxjs/toolkit"

const authSelector = state => state.auth

export const authLoadingSelector = createSelector(
    authSelector,
    auth => auth.loading
)

export const authErrorSelector = createSelector(
    authSelector,
    auth => auth.error
)

export const authMessageSelector = createSelector(
    authSelector,
    auth => auth.message
)