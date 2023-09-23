import { expect, test as setup } from '@playwright/test'

const status = {
    serverOnline: 'Server is online',
    tryOutTheApp: 'Try out the app :)'
}

setup('check back-end server status', async ({ page }) => {
    await page.goto('/')

    await page.waitForURL('/login')

    await expect(page.getByText(status.tryOutTheApp).or(page.getByText(status.serverOnline))).toBeVisible({ timeout: 200000 })
})