import { createSelector } from "@reduxjs/toolkit"

const productsSelector = state => state.products

export const productsArraySelector = createSelector(
    productsSelector,
    products => products.products
)

export const productsErrorSelector = createSelector(
    productsSelector,
    products => products.error
)

export const productsLoadingSelector = createSelector(
    productsSelector,
    products => products.loading
)

export const productsToEditSelector = createSelector(
    productsSelector,
    products => products.toEditProduct
)