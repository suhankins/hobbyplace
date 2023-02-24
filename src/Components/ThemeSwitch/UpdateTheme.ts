export function UpdateTheme() {
    if (typeof window !== undefined) {
        document.documentElement.setAttribute("data-theme",  localStorage.theme ?? "light");
    }
}