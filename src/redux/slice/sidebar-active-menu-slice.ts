import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SidebarActiveMenuSliceProps {
  route: string
}

const initialState: SidebarActiveMenuSliceProps = {
  route: '/',
}

export const SidebarActiveMenuSlice = createSlice({
  name: 'SidebarActiveMenu',
  initialState: initialState,
  reducers: {
    setSidebarActiveMenu: (
      state,
      action: PayloadAction<SidebarActiveMenuSliceProps['route']>,
    ) => {
      state.route = action.payload
    },
  },
})

export const { setSidebarActiveMenu } = SidebarActiveMenuSlice.actions
export default SidebarActiveMenuSlice.reducer
