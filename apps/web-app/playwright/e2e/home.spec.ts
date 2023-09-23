import { expect, test } from '@playwright/test'

test.describe('Home tests', () => {
    test.describe('render', () => {
        test.only('should render the recipes', async ({ page }) => {
            await page.goto('/home')

            await expect(page.getByRole('article')).toHaveCount(5)
        })
    })
})