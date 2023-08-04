// ************************
// INPUTS
// ************************
export const getInput = (element: string): HTMLInputElement => {
    return document.querySelector(element) as HTMLInputElement;
}

export const getValueAsDate = (element: string): Date => {
    return new Date(getInput(element).value);
}

export const getValueAsString = (element: string): string => {
    return getInput(element).value;
}

export const getValueAsNumber = (element: string): number => {
    return parseFloat(getInput(element).value);
}

export const emptyValue = (element: string) => {
    getInput(element).value = "";
}

export const setStringValue = (element: string, content: string) => {
    getInput(element).value = content;
}