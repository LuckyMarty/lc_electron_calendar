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






export function rangeDate(from: Date, to: Date): string {
    return `${formatDateToFR(from)} ${formatTime12to24(from)} - ${formatDateToFR(to)} ${formatTime12to24(to)}`
}

export function formatTime12to24(time: Date): string {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

export function formatDateToFR(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}