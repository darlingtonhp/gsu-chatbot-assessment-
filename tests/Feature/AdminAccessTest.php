<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_users_cannot_access_admin_pages(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertForbidden();

        $this->actingAs($user)
            ->get(route('admin.faqs'))
            ->assertForbidden();

        $this->actingAs($user)
            ->get(route('admin.logs'))
            ->assertForbidden();
    }

    public function test_admin_users_can_access_admin_pages(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->get(route('dashboard'))
            ->assertOk();

        $this->actingAs($admin)
            ->get(route('admin.faqs'))
            ->assertOk();

        $this->actingAs($admin)
            ->get(route('admin.logs'))
            ->assertOk();
    }

    public function test_non_admin_users_cannot_access_admin_api_routes(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user)
            ->getJson('/api/admin/chat-logs')
            ->assertForbidden()
            ->assertJson([
                'message' => 'Admin access only.',
            ]);

        $this->actingAs($user)
            ->postJson('/api/admin/faqs', [
                'category' => 'Admissions',
                'question' => 'Sample question?',
                'answer' => 'Sample answer',
                'keywords' => 'sample',
            ])
            ->assertForbidden();
    }

    public function test_admin_users_can_access_admin_api_routes(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->getJson('/api/admin/chat-logs')
            ->assertOk();
    }
}
