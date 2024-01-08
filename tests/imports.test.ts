import { expect, test, describe } from 'vitest'
import linkButtonVue from '../components/linkButton.vue'
describe('import component', () => {
	// eslint-disable-next-line require-await
	test('should import a component', async () => {
		expect(linkButtonVue).toBeDefined()
	})
})
