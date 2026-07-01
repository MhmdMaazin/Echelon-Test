<?php

declare(strict_types=1);

/**
 * Filters articles by a given category and sorts them by published_date (newest first).
 *
 * @param array<int, array{title: string, category: string, published_date: string}> $articles
 * @param string $category
 * @return array<int, array{title: string, category: string, published_date: string}>
 */
function getFilteredAndSortedArticles(array $articles, string $category): array
{
    // Filter: keep only articles that match the requested category
    $filtered = array_filter(
        $articles,
        static fn(array $article): bool => $article['category'] === $category
    );

    // Sort: newest published_date first (ISO 8601 strings compare correctly lexicographically)
    usort(
        $filtered,
        static fn(array $a, array $b): int => strcmp($b['published_date'], $a['published_date'])
    );

    return array_values($filtered);
}

// ─── Dataset ─────────────────────────────────────────────────────────────────

$articles = [
    ['title' => "Sri Lanka's economy update",          'category' => 'Business',   'published_date' => '2025-02-01'],
    ['title' => 'Stock market trends',                  'category' => 'Finance',    'published_date' => '2025-02-03'],
    ['title' => 'New investment policies',              'category' => 'Business',   'published_date' => '2025-02-02'],
    ['title' => 'Tourism growth in 2025',               'category' => 'Travel',     'published_date' => '2025-02-04'],
    ['title' => 'Real estate market boom',              'category' => 'Business',   'published_date' => '2025-01-28'],
    ['title' => 'Foreign trade agreements',             'category' => 'Economy',    'published_date' => '2025-01-25'],
    ['title' => 'Tech startups in Sri Lanka',           'category' => 'Technology', 'published_date' => '2025-01-30'],
    ['title' => 'Small business tax changes',           'category' => 'Business',   'published_date' => '2025-02-03'],
    ['title' => 'Banking sector reforms',               'category' => 'Finance',    'published_date' => '2025-02-02'],
    ['title' => 'Gold prices fluctuate',                'category' => 'Finance',    'published_date' => '2025-01-29'],
    ['title' => 'Oil price hike impacts economy',       'category' => 'Economy',    'published_date' => '2025-01-31'],
    ['title' => 'Export sector growth',                 'category' => 'Business',   'published_date' => '2025-01-26'],
    ['title' => 'New tax policies for 2025',            'category' => 'Business',   'published_date' => '2025-01-27'],
    ['title' => 'Infrastructure development projects',  'category' => 'Economy',    'published_date' => '2025-02-03'],
    ['title' => 'Tourism boost with new airline routes','category' => 'Travel',     'published_date' => '2025-02-02'],
    ['title' => 'Cryptocurrency regulations in Sri Lanka','category' => 'Finance',  'published_date' => '2025-02-01'],
    ['title' => 'Investment in renewable energy',       'category' => 'Business',   'published_date' => '2025-01-24'],
    ['title' => "Sri Lanka's trade deficit narrows",    'category' => 'Economy',    'published_date' => '2025-01-29'],
    ['title' => 'Tech exports reach new heights',       'category' => 'Technology', 'published_date' => '2025-01-23'],
    ['title' => 'Hotel industry sees record bookings',  'category' => 'Travel',     'published_date' => '2025-01-30'],
];

// ─── Target category: Business ────────────────────────────────────────────────
$targetCategory = 'Business';

$result = getFilteredAndSortedArticles($articles, $targetCategory);

// ─── Output ───────────────────────────────────────────────────────────────────

echo sprintf("Category: %s  |  Total results: %d\n", $targetCategory, count($result));
echo str_repeat('─', 60) . "\n";

foreach ($result as $index => $article) {
    echo sprintf(
        "%d. [%s]  %s\n",
        $index + 1,
        $article['published_date'],
        $article['title']
    );
}
