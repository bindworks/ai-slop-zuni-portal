import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LocaleProvider } from '@/src/lib/i18n/LocaleProvider'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LocaleProvider>
            <App />
        </LocaleProvider>
    </React.StrictMode>,
)
