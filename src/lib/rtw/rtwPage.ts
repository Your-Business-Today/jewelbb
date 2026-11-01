export const elementById = (id: string) => document.getElementById(id) as HTMLElement;
export const inputById = (id: string) => elementById(id) as HTMLInputElement;
export const hasValue = (id: string) => inputById(id).value.trim() !== '';
export const isChecked = (id: string) => inputById(id).checked;
export const trimmedValue = (id: string) => inputById(id).value.trim();
