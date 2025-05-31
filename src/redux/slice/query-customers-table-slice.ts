import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PaginationState } from '@tanstack/react-table'

interface QueryCustomersTableSliceProps {
  queryParams: any
  pagination: PaginationState
}

const initialState: QueryCustomersTableSliceProps = {
  queryParams: {
    skip: 0,
    take: 10,
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
}

export const QueryCustomersTableSlice = createSlice({
  name: 'QueryCustomersTable',
  initialState: initialState,
  reducers: {
    setQueryCustomersParams: (
      state,
      action: PayloadAction<QueryCustomersTableSliceProps['queryParams']>,
    ) => {
      state.queryParams = action.payload
    },
    setQueryCustomersPagination: (
      state,
      action: PayloadAction<QueryCustomersTableSliceProps['pagination']>,
    ) => {
      state.pagination = action.payload
    },
  },
})

export const { setQueryCustomersParams, setQueryCustomersPagination } =
  QueryCustomersTableSlice.actions
export default QueryCustomersTableSlice.reducer
