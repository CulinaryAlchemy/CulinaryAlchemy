import { expect, test } from '@playwright/test'

test.describe('User page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/home')

        await page.getByRole('menuitem').locator('div').first().hover()

        await page.getByText('My profile').click()
    })

    test.only('should render the user recipes', async ({ page }) => {
        await expect(page.getByRole('article')).toHaveCount(5)
    })
})