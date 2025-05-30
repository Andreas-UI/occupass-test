import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { OrderDetail } from '@/features/dtos'

interface OrderDetailsDialogSliceProps {
  open: boolean
  data?: Record<number, Array<OrderDetail>>
  current?: Array<OrderDetail>
}

const initialState: OrderDetailsDialogSliceProps = {
  open: false,
}

export const OrderDetailsDialogSlice = createSlice({
  name: 'OrderDetailsDialog',
  initialState: initialState,
  reducers: {
    createOrderDetailsDialogData: (
      state,
      action: PayloadAction<OrderDetailsDialogSliceProps['data']>,
    ) => {
      state.data = action.payload
    },
    toggleOrderDetailsDialog: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      if (!state.open) {
        // Opening — must have payload
        if ('payload' in action && typeof action.payload === 'number') {
          state.current = state.data?.[action.payload]
          state.open = true
        } else {
          console.warn(
            'toggleOrderDetailsDialog: orderId is required when opening.',
          )
        }
      } else {
        // Closing
        state.current = undefined
        state.open = false
      }
    },
  },
})

export const { createOrderDetailsDialogData, toggleOrderDetailsDialog } =
  OrderDetailsDialogSlice.actions
export default OrderDetailsDialogSlice.reducer
