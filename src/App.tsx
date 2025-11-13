import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showInstallModal, setShowInstallModal] = useState(false)

    useEffect(() => {
        const isInStandaloneMode = () =>
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true

        if (isInStandaloneMode()) {
            window.location.href = '/'
        }
    }, [])

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowInstallModal(true)
        }

        window.addEventListener('beforeinstallprompt', handler)
        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const installPWA = async () => {
        if (!deferredPrompt) return
        deferredPrompt.prompt()
        const choiceResult = await deferredPrompt.userChoice
        console.log('User choice:', choiceResult.outcome)
        setDeferredPrompt(null)
        setShowInstallModal(false)
    }

    return (
        <>
            {/* Модалка PWA */}
            {showInstallModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Установите наше приложение для лучшего опыта!</p>
                        <button onClick={installPWA}>Установить</button>
                    </div>
                </div>
            )}

            {/* Логотипы и остальной контент */}
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React</h1>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App