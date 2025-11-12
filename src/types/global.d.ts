export { }

declare global {
    interface Navigator {
        standalone?: boolean
    }

    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent
    }
}