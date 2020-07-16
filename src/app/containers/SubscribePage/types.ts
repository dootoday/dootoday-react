import { PlanResponse, OrderResponse } from 'utils/datatypes';

/* --- STATE --- */
export interface Plan {
  plan: PlanResponse;
  orderDetails?: OrderResponse;
}
export interface SubscribePageState {
  plans: Plan[];
  invalidPromo: boolean;
}

export type ContainerState = SubscribePageState;
