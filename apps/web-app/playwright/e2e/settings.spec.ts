import { expect, test } from '@playwright/test'


const navOptions = {
    account: {
        listItem: 'Account',
        path: '/settings/account'
    },
    information: {
        listItem: 'Account information',
        path: '/settings/information'
    },
    deactivate: {
        listItem: 'Delete account',
        path: '/settings/deactivate'
    },
    dietaryPreferences: {
        listItem: 'Dietary preferences',
        path: '/settings/dietaryPreferences'
    }
}

const homeMessage = 'Welcome to the settings page!'

test.describe('settings page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/settings')
    })

    test('should render the home message', async ({ page }) => {
        await expect(page.getByText(homeMessage)).toBeVisible()
    })

    test.describe('Account information', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(navOptions.account.path)
        })

        test('should update the user data', async ({ page }) => {
            await page.getByRole('link', { name: navOptions.information.listItem }).click()
            await page.waitForURL(navOptions.information.path)

            const newUsername = ('test' + new Date().getMilliseconds()).slice(0, 14)
            const newName = ('test_el_lindo' + new Date().getMilliseconds()).slice(0, 19)
            const newLocation = ('con_las_babys' + new Date().getMilliseconds()).slice(0, 29)
            const newDescription = ('10 años contigo, 5 años sin ti' + new Date().getMilliseconds()).slice(0, 70)
    
            await page.getByLabel('Username').fill(newUsername)
            await page.getByLabel(/Name/).fill(newName)
            await page.getByLabel('Description').fill(newDescription)
            await page.getByLabel('Location').fill(newLocation)

            await page.waitForTimeout(10000)
            
            await page.getByRole('button', { name: 'Save' }).click()

            await expect(page.getByText('Data updated')).toBeVisible({ timeout: 10000 })
        })
    })

    test.describe('should navigate between settings options', () => {

        test.describe('account settings should work', () => {
            test('should navigate between settings options', async ({ page }) => {
                await (page.getByRole('tab', { name: navOptions.account.listItem })).click()
                await page.waitForURL(navOptions.account.path)

                await page.getByRole('link', { name: navOptions.information.listItem }).click()
                await page.waitForURL(navOptions.information.path)

                await page.getByRole('link', { name: navOptions.deactivate.listItem }).click()
                await page.waitForURL(navOptions.deactivate.path)
            })
        })

        test('dietary preferences should work', async ({ page }) => {
            await (page.getByRole('tab', { name: navOptions.dietaryPreferences.listItem })).click()

            await page.waitForURL(navOptions.dietaryPreferences.path)
        })
    })
})