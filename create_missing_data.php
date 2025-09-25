<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

// إنشاء المستخدمين إذا لم يكونوا موجودين
if (DB::table('users')->count() == 0) {
    DB::table('users')->insert([
        ['name' => 'Admin User', 'email' => 'admin@ids.com', 'password' => Hash::make('password'), 'role' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
        ['name' => 'Analyst User', 'email' => 'analyst@ids.com', 'password' => Hash::make('password'), 'role' => 'Analyst', 'created_at' => now(), 'updated_at' => now()],
        ['name' => 'Viewer User', 'email' => 'viewer@ids.com', 'password' => Hash::make('password'), 'role' => 'Viewer', 'created_at' => now(), 'updated_at' => now()]
    ]);
    echo "تم إنشاء المستخدمين\n";
}

// إنشاء ML Model
if (DB::table('ml_models')->count() == 0) {
    DB::table('ml_models')->insert([
        'name' => 'Default IDS Model',
        'description' => 'Machine Learning model for intrusion detection',
        'file_path' => '/models/ids_model.pkl',
        'trained_at' => now(),
        'created_at' => now(),
        'updated_at' => now()
    ]);
    echo "تم إنشاء ML Model\n";
}

// إنشاء Network Log
if (DB::table('network_logs')->count() == 0) {
    DB::table('network_logs')->insert([
        'user_id' => 1,
        'file_name' => 'network_traffic.log',
        'file_path' => '/logs/network_traffic.log',
        'upload_date' => now(),
        'created_at' => now(),
        'updated_at' => now()
    ]);
    echo "تم إنشاء Network Log\n";
}

echo "عدد المستخدمين: " . DB::table('users')->count() . "\n";
echo "عدد ML Models: " . DB::table('ml_models')->count() . "\n";
echo "عدد Network Logs: " . DB::table('network_logs')->count() . "\n";

// عرض الـ IDs
$mlModel = DB::table('ml_models')->first();
$networkLog = DB::table('network_logs')->first();

echo "ML Model ID: " . ($mlModel ? $mlModel->id : 'None') . "\n";
echo "Network Log ID: " . ($networkLog ? $networkLog->id : 'None') . "\n";
