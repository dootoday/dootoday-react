import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Plan } from './types';
import { PlanResponse, OrderResponse } from 'utils/datatypes';

// The initial state of the SubscribePage container
export const initialState: ContainerState = {
  plans: [] as Plan[],
  invalidPromo: false,
};

const subscribePageSlice = createSlice({
  name: 'subscribePage',
  initialState,
  reducers: {
    getPlansRequest: {
      reducer: state => state,
      prepare: (code: string) => {
        return { payload: { promo_code: code } };
      },
    },
    getPlansSuccess: {
      reducer: (state, action: PayloadAction<PlanResponse[]>) => {
        const plans = action.payload;
        return {
          plans: plans.length ? plans.map(p => ({ plan: p })) : state.plans,
          invalidPromo: !!!plans.length,
        };
      },
      prepare: (plans: PlanResponse[]) => {
        return { payload: [...plans] };
      },
    },
    getOrderRequest: {
      reducer: state => state,
      prepare: (id: number) => {
        return { payload: { plan_id: id } };
      },
    },
    getOrderSuccess: {
      reducer: (
        state,
        action: PayloadAction<{ planId: number; order: OrderResponse }>,
      ) => {
        const { planId, order } = action.payload;
        return {
          plans: [
            ...state.plans.map(p => {
              if (p.plan.plan_id === planId) {
                return {
                  plan: { ...p.plan },
                  orderDetails: order,
                };
              } else {
                return {
                  plan: { ...p.plan },
                };
              }
            }),
          ],
          invalidPromo: false,
        };
      },
      prepare: (planId: number, order: OrderResponse) => {
        return { payload: { planId, order } };
      },
    },
  },
});

export const { actions, reducer, name: sliceKey } = subscribePageSlice;
