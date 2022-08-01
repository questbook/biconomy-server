//generated file, run 'yarn generate:routes-index' to update

export default {
	add_user: async() => (await import('./add_user')).default,
	add_workspace_owner: async() => (await import('./add_workspace_owner')).default,
	check: async() => (await import('./check')).default,
	authorize_owner: async() => (await import('./authorize_owner')).default,
	refresh_nonce: async() => (await import('./refresh_nonce')).default,
}