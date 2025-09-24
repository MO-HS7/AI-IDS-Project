<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const fileInput = ref(null)
const dragActive = ref(false)

const form = useForm({
    file: null,
});

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.file = file;
    }
};

const handleDrop = (event) => {
    event.preventDefault();
    dragActive.value = false;
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        form.file = files[0];
    }
};

const handleDragOver = (event) => {
    event.preventDefault();
    dragActive.value = true;
};

const handleDragLeave = () => {
    dragActive.value = false;
};

const submit = () => {
    form.post('/network-logs', {
        onSuccess: () => {
            form.reset()
        },
    });
};

const removeFile = () => {
    form.file = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};
</script>


<template>
    <Head title="Upload Network Log" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Upload Network Log
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <form @submit.prevent="submit">
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Network Log File
                                </label>
                                
                                <!-- File Drop Zone -->
                                <div
                                    @drop="handleDrop"
                                    @dragover="handleDragOver"
                                    @dragleave="handleDragLeave"
                                    :class="[
                                        'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
                                        dragActive 
                                            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                    ]"
                                >
                                    <div v-if="!form.file">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="mt-4">
                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                <button
                                                    type="button"
                                                    @click="fileInput.click()"
                                                    class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    Upload a file
                                                </button>
                                                or drag and drop
                                            </p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                CSV, PCAP up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <!-- Selected File Display -->
                                    <div v-else class="flex items-center justify-center space-x-4">
                                        <div class="flex items-center space-x-2">
                                            <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                            <div>
                                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ form.file.name }}</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">{{ (form.file.size / 1024 / 1024).toFixed(2) }} MB</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            @click="removeFile"
                                            class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Hidden File Input -->
                                <input
                                    ref="fileInput"
                                    type="file"
                                    @change="handleFileSelect"
                                    accept=".csv,.pcap"
                                    class="hidden"
                                />
                                
                                <div v-if="form.errors.file" class="mt-2 text-sm text-red-600 dark:text-red-400">
                                    {{ form.errors.file }}
                                </div>
                            </div>

                            <div class="flex items-center justify-end space-x-4">
                                <Link
                                    :href="route('network-logs.index')"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    :disabled="form.processing || !form.file"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="form.processing">Uploading...</span>
                                    <span v-else>Upload Log</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

