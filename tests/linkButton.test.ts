import { expect, test, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import LinkButton from '../components/linkButton.vue'

describe('LinkButton tests', () => {
	test('LinkButton component exists', () => {
		expect(LinkButton).toBeDefined()
	})

	test('Renders with given props', async () => {
		const wrapper = await mount(LinkButton, {
			props: {
				url: '/example',
				title: 'Example',
				target: '_blank',
				style: 'dark',
			},
		})

		expect(wrapper.text()).toContain('Example')
		expect(wrapper.props().url).toBe('/example')
		expect(wrapper.props().target).toBe('_blank')
	})

	test('buttonStyling returns correct classes for different styles', () => {
		const wrapper = mount(LinkButton, {
			props: {
				style: 'dark',
			},
		})
		expect(wrapper.props().style).toBe('dark')

		const renderedHtml = wrapper.html()

		expect(renderedHtml).toContain('bg-um-blue')
		expect(renderedHtml).toContain('text-um-palepink')
		expect(renderedHtml).toContain('border-um-blue')
	})

	test('Renders with default props', async () => {
		const wrapper = await mount(LinkButton)

		expect(wrapper.text()).toContain('')
		expect(wrapper.props().url).toBe('')
		expect(wrapper.props().target).toBe('')
	})

	test('Renders with empty URL', async () => {
		const wrapper = await mount(LinkButton, {
			props: {
				url: '',
				title: 'Empty URL',
				target: '_self',
				style: 'light',
			},
		})

		expect(wrapper.text()).toContain('Empty URL')
		expect(wrapper.props().url).toBe('')
		expect(wrapper.props().target).toBe('_self')
	})

	test('Renders with a different style', async () => {
		const wrapper = await mount(LinkButton, {
			props: {
				url: '/example',
				title: 'Different Style',
				target: '_blank',
				style: 'neutral',
			},
		})

		expect(wrapper.text()).toContain('Different Style')
		expect(wrapper.props().url).toBe('/example')
		expect(wrapper.props().target).toBe('_blank')

		const renderedHtml = wrapper.html()
		expect(renderedHtml).toContain('bg-transparent')
		expect(renderedHtml).toContain('text-um-blue')
		expect(renderedHtml).toContain('border-um-blue')
	})
})
