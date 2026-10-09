import { useState } from "react";

export function useRegister() {
  const [userData, setUserData] = useState({ name: "" });

  return { userData, setUserData };
}
