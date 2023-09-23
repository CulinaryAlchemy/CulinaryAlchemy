import { expect, test } from '@playwright/test'

test.use({ storageState: { cookies: [], origins: [] } });

const inputName = {
    username: 'Username',
    email: 'Email',
    password: 'Password',
    signup: 'Sign up'
}

const auth = {
    username: ('new' + Math.random() * new Date().getMinutes()).slice(0, 14),
    email: ('new' + Math.random() * new Date().getMilliseconds()).slice(0, 14) + '@gmail.com',
    password: 'password123123'
}

const pageTitle = {
    home: 'Home'
}

test.describe('Sign up tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/register')
    })

    test.describe('render', () => {
        test('should render the form', async ({ page }) => {
            await expect(page.getByLabel(inputName.username)).toBeVisible()
            await expect(page.getByLabel(inputName.email)).toBeVisible()
            await expect(page.getByLabel(inputName.password)).toBeVisible()
            await expect(page.getByRole('button', { name: inputName.signup })).toBeVisible()
        })
    })

    test.describe('test actions', () => {
        test('should log in', async ({ page }) => {
            await page.getByLabel(inputName.username).fill(auth.username)
            await page.getByLabel(inputName.email).fill(auth.email)
            await page.getByLabel(inputName.password).fill(auth.password)
            await page.getByRole('button', { name: inputName.signup }).click()
            await expect(page).toHaveTitle(pageTitle.home)
        })
    })
})