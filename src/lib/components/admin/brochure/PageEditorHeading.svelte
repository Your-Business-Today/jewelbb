<script lang="ts">
	type Props = { name: string; description: string; form: { saved?: boolean; error?: string } | null };
	let { name, description, form }: Props = $props();
</script>

<h1>{name}</h1>
<p class="hint">{description}</p>

{#if form?.saved}
	<p class="ok" role="status">Saved.</p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

<style>
	h1 {
		margin: 0 0 0.2rem;
		font-size: 1.6rem;
	}

	.hint {
		color: var(--ink-600);
		margin: 0 0 1rem;
	}

	.ok {
		background: #eef7ee;
		border: 1px solid #cfe6cf;
		border-radius: var(--radius);
		padding: 0.6rem 1rem;
	}

	.err {
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		color: #a33a2a;
		border-radius: var(--radius);
		padding: 0.6rem 1rem;
	}

</style>
