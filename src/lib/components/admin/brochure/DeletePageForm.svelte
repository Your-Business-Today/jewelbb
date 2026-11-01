<form
	method="POST"
	action="?/delete"
	onsubmit={(e) => {
		if (!confirm('Delete this page?')) e.preventDefault();
	}}
>
	<button class="danger" type="submit">Delete this page</button>
</form>

<style>
	.danger {
		margin-top: 1.2rem;
		font: inherit;
		font-size: 0.88rem;
		color: #a33a2a;
		background: none;
		border: 1px solid #e5b8ae;
		border-radius: 999px;
		padding: 0.45rem 1.1rem;
		cursor: pointer;
	}

	.danger:hover {
		background: #fdf1ee;
	}

</style>
