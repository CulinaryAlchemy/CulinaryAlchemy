import { test as setup } from '@playwright/test'

const formName = {
    email: 'Email',
    password: 'Password',
    login: 'Log in'
}

const auth = {
    email: 'test@gmail.com',
    password: 'password123123'
}

const authFile = 'playwright/.auth/user.json';

setup('sign in', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel(formName.email).fill(auth.email)
    await page.getByLabel(formName.password).fill(auth.password)
    await page.getByRole('button', { name: formName.login }).click()

    await page.waitForURL('/home')

    await page.context().storageState({ path: authFile })
})