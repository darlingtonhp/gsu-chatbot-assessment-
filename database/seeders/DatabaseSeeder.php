<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\KnowledgeBase;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@gsu.ac.zw'],
            [
                'name' => 'GSU Administrator',
                'password' => Hash::make('admin123!'),
                'role' => 'admin',
            ]
        );

        // Sample FAQs
        $faqs = [
            [
                'category' => 'Admissions',
                'question' => 'How do I apply for a programme at GSU?',
                'answer' => 'You can apply online through our portal at apply.gsu.ac.zw or download the application form and submit it to the Admissions Office.',
                'keywords' => 'apply, admission, application'
            ],
            [
                'category' => 'Fees',
                'question' => 'What are the current tuition fees?',
                'answer' => 'Fees vary by programme. Please visit out website gsu.ac.zw/fees for the latest fee schedule.',
                'keywords' => 'fees, tuition, payment'
            ],
            [
                'category' => 'Support',
                'question' => 'How do I contact ICTS support?',
                'answer' => 'You can contact ICTS via email at support@gsu.ac.zw or visit our office at the Main Campus, Computing Lab 1.',
                'keywords' => 'icts, tech, help, support'
            ],
            [
                'category' => 'General',
                'question' => 'Where is GSU located?',
                'answer' => 'Gwanda State University has campuses in Gwanda (Main) and Filabusi.',
                'keywords' => 'location, address, campus'
            ],
        ];

        foreach ($faqs as $faq) {
            KnowledgeBase::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
