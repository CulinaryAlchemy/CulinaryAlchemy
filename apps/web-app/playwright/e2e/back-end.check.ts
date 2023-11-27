import { test as check, expect } from '@playwright/test'

const status = {
    serverOnline: 'Server is online',
    tryOutTheApp: 'Try out the app :)'
}

check('check back-end server status', async ({ page }) => {

    check.setTimeout(300000)

    await page.goto('/')

    await page.waitForURL('/login')

    await expect(page.getByText(status.tryOutTheApp).or(page.getByText(status.serverOnline))).toBeVisible({ timeout: 200000 })
})