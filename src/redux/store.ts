import { configureStore } from '@reduxjs/toolkit'
import OrderDetailsDialogReducer from './slice/order-details-dialog-slice'
import SidebarActiveMenuReducer from './slice/sidebar-active-menu-slice'
import QueryCustomersTableReducer from './slice/query-customers-table-slice'

export const store = configureStore({
  reducer: {
    OrderDetailsDialog: OrderDetailsDialogReducer,
    SidebarActiveMenu: SidebarActiveMenuReducer,
    QueryCustomersTable: QueryCustomersTableReducer,
  },
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
