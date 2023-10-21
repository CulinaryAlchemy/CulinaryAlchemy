import { expect, test } from '@playwright/test'

test.describe('Home tests', () => {
    test.describe('render', () => {
        test('should render the recipes', async ({ page }) => {
            await page.goto('/home')

            await expect(page.getByRole('article')).not.toHaveCount(0)
        })
    })
})