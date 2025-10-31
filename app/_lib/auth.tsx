
export const getUser = () => {
    if (typeof window === "undefined") return null; // SSR защита
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const setUser = (data: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(data));
  };
  
  export const clearUser = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  