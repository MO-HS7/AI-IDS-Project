<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, Link } from '@inertiajs/vue3'

defineProps({
    mlModel: {
        type: Object,
        required: true
    }
})

const getModelTypeIcon = (name) => {
    if (name.toLowerCase().includes('neural')) return '🧠'
    if (name.toLowerCase().includes('random forest')) return '🌳'
    if (name.toLowerCase().includes('svm')) return '📊'
    if (name.toLowerCase().includes('decision tree')) return '🌲'
    if (name.toLowerCase().includes('naive bayes')) return '📈'
    return '🤖'
}
</script>

<template>
    <Head :title="`ML Model: ${mlModel.name}`" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {{ mlModel.name }}
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Machine Learning Model Details</p>
                </div>
                <div class="flex space-x-3">
                    <Link 
                        href="/ml-models"
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Back to Models
                    </Link>
                    <Link 
                        v-if="$page.props.auth.user.role === 'Admin'"
                        :href="`/ml-models/${mlModel.id}/edit`"
                        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Edit Model
                    </Link>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Model Overview Card -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div class="p-6">
                        <div class="flex items-center mb-6">
                            <div class="flex-shrink-0 h-20 w-20">
                                <div class="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                                    <span class="text-3xl">{{ getModelTypeIcon(mlModel.name) }}</span>
                                </div>
                            </div>
                            <div class="ml-6">
                                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ mlModel.name }}</h1>
                                <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">{{ mlModel.description || 'No description available' }}</p>
                                <div class="flex items-center mt-3">
                                    <span class="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Active
                                    </span>
                                    <span class="ml-3 text-sm text-gray-500 dark:text-gray-400">
                                        Model ID: {{ mlModel.id }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Model Information -->
                    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Model Information
                            </h3>
                            
                            <div class="space-y-4">
                                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                                    <span class="text-gray-900 dark:text-gray-100">{{ mlModel.name }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">File Path:</span>
                                    <span class="text-gray-900 dark:text-gray-100 font-mono text-sm">{{ mlModel.filepath || 'Not specified' }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">Created:</span>
                                    <span class="text-gray-900 dark:text-gray-100">{{ new Date(mlModel.created_at).toLocaleString() }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
                                    <span class="text-gray-900 dark:text-gray-100">{{ new Date(mlModel.updated_at).toLocaleString() }}</span>
                                </div>
                                
                                <div class="flex justify-between items-start py-2">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">Training Date:</span>
                                    <span class="text-gray-900 dark:text-gray-100">
                                        {{ mlModel.trained_at ? new Date(mlModel.trained_at).toLocaleString() : 'Not specified' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Model Performance & Statistics -->
                    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                                Performance Metrics
                            </h3>
                            
                            <div class="space-y-4">
                                <!-- Sample metrics - you can replace with real data -->
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium text-blue-800 dark:text-blue-200">Accuracy</span>
                                        <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">94.5%</span>
                                    </div>
                                    <div class="mt-2 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                                        <div class="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" style="width: 94.5%"></div>
                                    </div>
                                </div>

                                <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium text-green-800 dark:text-green-200">Precision</span>
                                        <span class="text-2xl font-bold text-green-600 dark:text-green-400">91.2%</span>
                                    </div>
                                    <div class="mt-2 bg-green-200 dark:bg-green-800 rounded-full h-2">
                                        <div class="bg-green-600 dark:bg-green-400 h-2 rounded-full" style="width: 91.2%"></div>
                                    </div>
                                </div>

                                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium text-yellow-800 dark:text-yellow-200">Recall</span>
                                        <span class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">89.8%</span>
                                    </div>
                                    <div class="mt-2 bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                                        <div class="bg-yellow-600 dark:bg-yellow-400 h-2 rounded-full" style="width: 89.8%"></div>
                                    </div>
                                </div>

                                <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium text-purple-800 dark:text-purple-200">F1-Score</span>
                                        <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">90.5%</span>
                                    </div>
                                    <div class="mt-2 bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                                        <div class="bg-purple-600 dark:bg-purple-400 h-2 rounded-full" style="width: 90.5%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Model Description -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-6" v-if="mlModel.description">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Description</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ mlModel.description }}</p>
                    </div>
                </div>

                <!-- Usage Instructions -->
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-6">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            Usage Instructions
                        </h3>
                        <div class="prose dark:prose-invert max-w-none">
                            <p class="text-gray-700 dark:text-gray-300 mb-4">This model can be used for:</p>
                            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                <li>Analyzing network traffic patterns for anomalies</li>
                                <li>Detecting various types of cyber attacks</li>
                                <li>Processing uploaded network log files</li>
                                <li>Generating security alerts based on threat confidence levels</li>
                            </ul>
                            
                            <p class="text-gray-700 dark:text-gray-300 mt-4">
                                To use this model, upload network log files through the Network Logs section. 
                                The system will automatically process the logs using this model and generate security alerts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
