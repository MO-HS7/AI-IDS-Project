import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

window.route = function(name, params = {}) {
    const routes = {
        'dashboard': '/dashboard',
        'login': '/login',
        'register': '/register',
        
        // Alerts routes
        'alerts.index': '/alerts',
        'alerts.create': '/alerts/create',
        'alerts.store': '/alerts',          // POST to /alerts
        'alerts.show': (id) => `/alerts/${id}`,
        'alerts.edit': (id) => `/alerts/${id}/edit`,
        'alerts.update': (id) => `/alerts/${id}`,    // PUT to /alerts/{id}
        'alerts.destroy': (id) => `/alerts/${id}`,   // DELETE to /alerts/{id}
        
        // Network Logs routes  
        'network-logs.index': '/network-logs',
        'network-logs.create': '/network-logs/create',
        'network-logs.store': '/network-logs',       // POST to /network-logs
        'network-logs.show': (id) => `/network-logs/${id}`,
        'network-logs.edit': (id) => `/network-logs/${id}/edit`,
        'network-logs.update': (id) => `/network-logs/${id}`, // PUT to /network-logs/{id}
        'network-logs.destroy': (id) => `/network-logs/${id}`,
        
        // ML Models routes
        'ml-models.index': '/ml-models',
        'ml-models.create': '/ml-models/create',
        'ml-models.store': '/ml-models',             // POST to /ml-models
        'ml-models.show': (id) => `/ml-models/${id}`,
        'ml-models.edit': (id) => `/ml-models/${id}/edit`,
        'ml-models.update': (id) => `/ml-models/${id}`,      // PUT to /ml-models/{id}
        'ml-models.destroy': (id) => `/ml-models/${id}`,
        
        // Notifications routes
        'notifications.index': '/notifications',
        'notifications.read': (id) => `/notifications/${id}/read`,
        'notifications.read-all': '/notifications/read-all',
        'notifications.destroy': (id) => `/notifications/${id}`,
        'notifications.destroy-all': '/notifications/clear-all',
        'notifications.api': '/api/notifications',
        
        // Profile routes
        'profile.edit': '/profile',
        'profile.update': '/profile',     
        'profile.destroy': '/profile',  
        'password.update': '/password',
    }

    if (typeof routes[name] === 'function') {
        return routes[name](params.id || params)
    }
    
    return routes[name] || '#'
}

// Route current checker
window.route.current = function(pattern) {
    const currentPath = window.location.pathname
    
    if (typeof pattern === 'string') {
        if (pattern.includes('*')) {
            const basePattern = pattern.replace('.*', '')
            return currentPath.startsWith('/' + basePattern.replace('.', '/'))
        }
        
        const routePath = window.route(pattern)
        return currentPath === routePath
    }
    
    return false
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)

        // Make route function available globally
        app.config.globalProperties.route = window.route

        return app.mount(el)
    },
    progress: {
        color: '#4F46E5',
    },
})
