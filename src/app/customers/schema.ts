import { Static, Type } from "@sinclair/typebox";

export const Customer = Type.Object({
  id: Type.String(),
  email: Type.String(),
});

export type CustomerType = Static<typeof Customer>;

export const CustomerListResponse = Type.Object({
  customers: Type.Array(Customer),
});