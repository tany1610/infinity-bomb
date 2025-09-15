export const getCssVar = (varName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

export const getCssVarAsHex = (varName: string): number => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

    if (!value.startsWith("#")) {
        throw new Error(`CSS variable ${varName} is not a hex color (got "${value}")`);
    }

    return parseInt(value.slice(1), 16);
};

export const capitalize = (word: string): string => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
};
