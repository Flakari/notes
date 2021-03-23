export const updateLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
