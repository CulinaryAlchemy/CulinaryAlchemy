import { expect, test } from '@playwright/test'

test.use({ storageState: { cookies: [], origins: [] } });

const formName = {
    email: 'Email',
    password: 'Password',
    login: 'Log in'
}

const auth = {
    email: 'test@gmail.com',
    password: 'password123123'
}

const pageTitle = {
    home: 'Home'
}

test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })
    test.describe('render', () => {
        test('should render the form', async ({ page }) => {
            await expect(page.getByLabel(formName.email)).toBeVisible()
            await expect(page.getByLabel(formName.password)).toBeVisible()
            await expect(page.getByRole('button', { name: formName.login })).toBeVisible()
        })
    })

    test.describe('test actions', () => {
        test('should log in', async ({ page }) => {
            await page.getByLabel(formName.email).fill(auth.email)
            await page.getByLabel(formName.password).fill(auth.password)
            await page.getByRole('button', { name: formName.login }).click()
            await expect(page).toHaveTitle(pageTitle.home)
        })
    })
})