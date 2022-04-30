import * as React from "react";

import { CustomerlyContextValues } from "./types";

const CustomerlyContext = React.createContext<
  CustomerlyContextValues | undefined
>(undefined);

export default CustomerlyContext;
