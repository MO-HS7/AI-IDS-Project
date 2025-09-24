<template>
    <Head title="Notifications" />

    <!-- Toast Notifications -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50 max-w-sm">
        <div 
            class="bg-white border rounded-lg shadow-lg p-4 flex items-center space-x-3 transition-all duration-300"
            :class="toastClasses"
        >
            <div class="flex-shrink-0">
                <svg v-if="toastType === 'success'" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else-if="toastType === 'error'" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg v-else-if="toastType === 'warning'" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <svg v-else class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ toastTitle }}</p>
                <p v-if="toastMessage" class="text-sm text-gray-500">{{ toastMessage }}</p>
            </div>
            <button 
                @click="hideToast"
                class="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Notifications
                </h2>
                <div class="flex space-x-3">
                    <button 
                        v-if="hasUnreadNotifications"
                        @click="markAllAsRead"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200"
                    >
                        Mark All as Read
                    </button>
                    <button 
                        @click="clearAllNotifications"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors duration-200"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-bold">{{ unreadCount }}</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Unread</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ unreadCount }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-bold">{{ totalCount }}</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ totalCount }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-bold">{{ criticalCount }}</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Critical</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ criticalCount }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <span class="text-white text-sm font-bold">{{ readCount }}</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Read</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ readCount }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notifications List -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <!-- Empty State -->
                    <div v-if="notifications.data.length === 0" class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                        <p class="mt-1 text-sm text-gray-500">You're all caught up! No new notifications.</p>
                    </div>

                    <!-- Notifications -->
                    <ul v-else class="divide-y divide-gray-200">
                        <li 
                            v-for="notification in notifications.data" 
                            :key="notification.id"
                            class="hover:bg-gray-50 transition-colors duration-150"
                            :class="{ 'bg-blue-50': !notification.read_at }"
                        >
                            <div class="px-4 py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <!-- Icon -->
                                        <div class="flex-shrink-0">
                                            <span 
                                                class="inline-flex items-center justify-center h-10 w-10 rounded-full text-lg"
                                                :class="getSeverityClasses(notification.data.severity || 'medium')"
                                            >
                                                {{ notification.data.icon || '📄' }}
                                            </span>
                                        </div>

                                        <!-- Content -->
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center space-x-2 mb-1">
                                                <h3 class="text-sm font-medium text-gray-900 truncate">
                                                    {{ notification.data.title || 'Notification' }}
                                                </h3>
                                                <span 
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                    :class="getSeverityBadgeClasses(notification.data.severity || 'medium')"
                                                >
                                                    {{ (notification.data.severity || 'medium').toUpperCase() }}
                                                </span>
                                                <span v-if="!notification.read_at" class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                            </div>
                                            <p class="text-sm text-gray-600 mb-2">
                                                {{ notification.data.message || 'No message available' }}
                                            </p>
                                            <div class="flex items-center justify-between">
                                                <p class="text-xs text-gray-500">
                                                    {{ formatDate(notification.created_at) }}
                                                </p>
                                                <div class="flex space-x-2">
                                                    <button 
                                                        v-if="!notification.read_at"
                                                        @click="markAsRead(notification.id)"
                                                        class="text-xs text-blue-600 hover:text-blue-500 transition-colors duration-150"
                                                    >
                                                        Mark as read
                                                    </button>
                                                    <button 
                                                        v-if="notification.data.action_url"
                                                        @click="visitAlert(notification.data.action_url, notification.id)"
                                                        class="text-xs text-green-600 hover:text-green-500 transition-colors duration-150"
                                                    >
                                                        View Alert
                                                    </button>
                                                    <button 
                                                        @click="deleteNotification(notification.id)"
                                                        class="text-xs text-red-600 hover:text-red-500 transition-colors duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <!-- Pagination -->
                    <div v-if="notifications.links && notifications.links.length > 3" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div class="flex-1 flex justify-between sm:hidden">
                            <Link 
                                v-if="notifications.prev_page_url" 
                                :href="notifications.prev_page_url"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link 
                                v-if="notifications.next_page_url"
                                :href="notifications.next_page_url"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Showing {{ notifications.from || 0 }} to {{ notifications.to || 0 }} of {{ notifications.total || 0 }} notifications
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <template v-for="link in notifications.links" :key="link.label">
                                        <Link 
                                            v-if="link.url"
                                            :href="link.url"
                                            v-html="link.label"
                                            :class="[
                                                'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium transition-colors duration-150',
                                                link.active 
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                                                    : 'text-gray-500 hover:bg-gray-50'
                                            ]"
                                        />
                                        <span 
                                            v-else
                                            v-html="link.label"
                                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed"
                                        />
                                    </template>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'

const page = usePage()

const props = defineProps({
    notifications: {
        type: Object,
        required: true,
        default: () => ({ data: [], total: 0 })
    }
})

// Toast state
const showToast = ref(false)
const toastType = ref('success')
const toastTitle = ref('')
const toastMessage = ref('')

// Watch for flash messages
watch(() => page.props.flash, (flash) => {
    if (flash && Object.keys(flash).length > 0) {
        if (flash.success) {
            showSuccessToast('Success', flash.success)
        } else if (flash.error) {
            showErrorToast('Error', flash.error)
        } else if (flash.info) {
            showWarningToast('Info', flash.info)
        }
    }
}, { immediate: true, deep: true })

// Computed properties
const totalCount = computed(() => props.notifications.total || 0)
const unreadCount = computed(() => props.notifications.data.filter(n => !n.read_at).length)
const readCount = computed(() => props.notifications.data.filter(n => n.read_at).length)
const criticalCount = computed(() => props.notifications.data.filter(n => n.data.severity === 'critical').length)
const hasUnreadNotifications = computed(() => unreadCount.value > 0)

const toastClasses = computed(() => {
    const classes = {
        success: 'border-green-200 bg-green-50',
        error: 'border-red-200 bg-red-50',
        warning: 'border-yellow-200 bg-yellow-50',
        info: 'border-blue-200 bg-blue-50'
    }
    return classes[toastType.value] || classes.success
})

// Toast functions
const hideToast = () => {
    showToast.value = false
}

const showSuccessToast = (title, message = '') => {
    toastType.value = 'success'
    toastTitle.value = title
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => hideToast(), 5000)
}

const showErrorToast = (title, message = '') => {
    toastType.value = 'error'
    toastTitle.value = title
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => hideToast(), 5000)
}

const showWarningToast = (title, message = '') => {
    toastType.value = 'warning'
    toastTitle.value = title
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => hideToast(), 5000)
}

// Utility functions
const getSeverityClasses = (severity) => {
    const classes = {
        critical: 'bg-red-100 text-red-600',
        high: 'bg-orange-100 text-orange-600',
        medium: 'bg-yellow-100 text-yellow-600',
        low: 'bg-green-100 text-green-600'
    }
    return classes[severity] || 'bg-gray-100 text-gray-600'
}

const getSeverityBadgeClasses = (severity) => {
    const classes = {
        critical: 'bg-red-100 text-red-800',
        high: 'bg-orange-100 text-orange-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800'
    }
    return classes[severity] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Notification actions - استخدام router مباشرة بدون callbacks
const visitAlert = async (actionUrl, notificationId) => {
    // Mark as read first if unread
    const notification = props.notifications.data.find(n => n.id === notificationId)
    if (notification && !notification.read_at) {
        router.post(`/notifications/${notificationId}/read`, {}, { preserveScroll: true })
    }
    
    // Navigate after a short delay
    setTimeout(() => {
        router.visit(actionUrl)
    }, 200)
}

const markAsRead = (id) => {
    router.post(`/notifications/${id}/read`, {}, { 
        preserveScroll: true,
        only: ['notifications', 'flash']
    })
}

const markAllAsRead = () => {
    if (!hasUnreadNotifications.value) {
        showWarningToast('No Action', 'No unread notifications to mark')
        return
    }

    router.post('/notifications/read-all', {}, { 
        preserveScroll: true,
        only: ['notifications', 'flash']
    })
}

const deleteNotification = (id) => {
    if (!confirm('Are you sure you want to delete this notification?')) {
        return
    }

    router.delete(`/notifications/${id}`, {
        preserveScroll: true,
        only: ['notifications', 'flash']
    })
}

const clearAllNotifications = () => {
    if (!confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
        return
    }

    if (totalCount.value === 0) {
        showWarningToast('No Action', 'No notifications to delete')
        return
    }

    router.delete('/notifications/clear-all', {
        preserveScroll: true,
        only: ['notifications', 'flash']
    })
}
</script>
