<script lang="ts">
	import { onMount } from 'svelte';
	import type { Food } from '../types.js';
	import { loadFoodData, searchFoods } from '../foodData.js';

	let searchQuery = '';
	let foods: Food[] = [];
	let searchResults: Food[] = [];
	let loading = true;

	onMount(async () => {
		try {
			foods = await loadFoodData();
		} catch (error) {
			console.error('食品データの読み込みに失敗しました:', error);
		} finally {
			loading = false;
		}
	});

	$: if (searchQuery && foods.length > 0) {
		searchResults = searchFoods(foods, searchQuery);
	} else {
		searchResults = [];
	}
</script>

<div class="food-search">
	<h1>食品栄養成分検索（食品100gあたり）</h1>
	
	{#if loading}
		<p>データを読み込み中...</p>
	{:else}
		<div class="search-input">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="食品名を入力してください"
				class="search-field"
			/>
		</div>

		{#if searchResults.length > 0}
			<div class="search-results">
				<h2>検索結果 ({searchResults.length}件)</h2>
				<div class="results-table">
					<div class="table-header">
						<div class="col name">食品名</div>
						<div class="col energy">エネルギー<br/>(kcal)</div>
						<div class="col protein">タンパク質<br/>(g)</div>
						<div class="col fat">脂質<br/>(g)</div>
						<div class="col carb">炭水化物<br/>(g)</div>
					</div>
					{#each searchResults as food}
						<div class="table-row">
							<div class="col name">{food.name}</div>
							<div class="col energy">{food.energy}</div>
							<div class="col protein">{food.protein}</div>
							<div class="col fat">{food.fat}</div>
							<div class="col carb">{food.carbohydrate}</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if searchQuery}
			<p>検索結果が見つかりませんでした。</p>
		{/if}
	{/if}
	
	<footer class="data-source">
		<p>※ データの出典：日本食品標準成分表（八訂）増補2023年</p>
	</footer>
</div>

<style>
	.food-search {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		color: #333;
	}

	.search-input {
		margin-bottom: 2rem;
	}

	.search-field {
		width: 100%;
		padding: 1rem;
		font-size: 1.1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		box-sizing: border-box;
	}

	.search-field:focus {
		outline: none;
		border-color: #007bff;
	}

	.search-results h2 {
		margin-bottom: 1rem;
		color: #555;
	}

	.results-table {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
	}

	.table-header,
	.table-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		gap: 1px;
		background-color: #f8f9fa;
	}

	.table-header {
		background-color: #e9ecef;
		font-weight: bold;
	}

	.table-row:nth-child(even) {
		background-color: #f8f9fa;
	}

	.table-row:hover {
		background-color: #e9ecef;
	}

	.col {
		padding: 0.75rem;
		text-align: center;
		background-color: inherit;
	}

	.col.name {
		text-align: left;
	}

	/* デスクトップ（960px以上） */
	@media (min-width: 961px) {
		.food-search {
			padding: 3rem 2rem;
		}
		
		h1 {
			font-size: 2.5rem;
			margin-bottom: 3rem;
		}
		
		.search-field {
			font-size: 1.2rem;
			padding: 1.2rem;
		}
	}

	/* タブレット（960px以下） */
	@media (max-width: 960px) {
		.food-search {
			padding: 2rem 1.5rem;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		.table-header,
		.table-row {
			grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
		}
		
		.col {
			padding: 0.6rem;
			font-size: 0.9rem;
		}
	}

	/* タブレット小（768px以下） */
	@media (max-width: 768px) {
		.food-search {
			padding: 1.5rem 1rem;
		}
		
		h1 {
			font-size: 1.8rem;
			margin-bottom: 1.5rem;
		}
		
		.search-field {
			font-size: 1rem;
			padding: 0.9rem;
		}
		
		.table-header,
		.table-row {
			grid-template-columns: 2fr 1fr 1fr;
			gap: 1px;
		}
		
		.col.protein,
		.col.fat {
			display: none;
		}
		
		.table-header .col.protein,
		.table-header .col.fat,
		.table-row .col.protein,
		.table-row .col.fat {
			display: none;
		}
	}

	/* モバイル（500px以下） */
	@media (max-width: 500px) {
		.food-search {
			padding: 1rem 0.5rem;
		}
		
		h1 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}
		
		.search-field {
			font-size: 0.9rem;
			padding: 0.8rem;
		}
		
		.table-header,
		.table-row {
			grid-template-columns: 1fr;
			gap: 0;
			border: none;
		}
		
		.table-header {
			display: none;
		}
		
		.table-row {
			background-color: white;
			border: 1px solid #ddd;
			border-radius: 8px;
			margin-bottom: 1rem;
			padding: 1rem;
			box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		}
		
		.col {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: left;
			padding: 0.5rem 0;
			border-bottom: 1px solid #eee;
		}
		
		.col:last-child {
			border-bottom: none;
		}
		
		.col.name {
			font-weight: bold;
			font-size: 1.1rem;
			color: #333;
			margin-bottom: 0.5rem;
			border-bottom: 2px solid #007bff;
		}
		
		.col.energy::before {
			content: 'エネルギー: ';
			font-weight: bold;
			color: #666;
		}
		
		.col.protein::before {
			content: 'タンパク質: ';
			font-weight: bold;
			color: #666;
		}
		
		.col.fat::before {
			content: '脂質: ';
			font-weight: bold;
			color: #666;
		}
		
		.col.carb::before {
			content: '炭水化物: ';
			font-weight: bold;
			color: #666;
		}
		
		.col.energy::after {
			content: ' kcal';
			color: #666;
		}
		
		.col.protein::after,
		.col.fat::after,
		.col.carb::after {
			content: ' g';
			color: #666;
		}
		
		/* モバイルでは全ての栄養素を表示 */
		.col.protein,
		.col.fat {
			display: flex;
		}
	}

	.data-source {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #eee;
		text-align: center;
	}

	.data-source p {
		color: #666;
		font-size: 0.9rem;
		margin: 0;
	}
</style>