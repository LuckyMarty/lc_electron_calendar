export const getInput = (element: string): HTMLInputElement => {
    return document.querySelector(element) as HTMLInputElement;
}

export const getValueAsDate = (element: string): Date => {
    return new Date((document.querySelector(element) as HTMLInputElement).value);
}

export const getValueAsString = (element: string): string => {
    return (document.querySelector(element) as HTMLInputElement).value;
}

export const getValueAsNumber = (element:string):number => {
    return parseFloat((document.querySelector(element) as HTMLInputElement).value);
}

export const emptyValue = (element:string) => {
    (document.querySelector(element) as HTMLInputElement).value = "";
}

export const setStringValue = (element: string, content: string) => {
    (document.querySelector(element) as HTMLInputElement).value = content;
}