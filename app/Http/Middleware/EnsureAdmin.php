<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Ensure only admin users can access admin routes and endpoints.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== 'admin') {
            if ($request->expectsJson()) {
                return new JsonResponse([
                    'message' => 'Admin access only.',
                ], 403);
            }

            abort(403, 'Admin access only.');
        }

        return $next($request);
    }
}
