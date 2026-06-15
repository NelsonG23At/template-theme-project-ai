import { test, expect } from '@playwright/test'

test.describe('User list → profile → edit flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/users', async (route) => {
      await route.fulfill({
        json: [
          { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031', website: 'hildegard.org', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } }, company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } },
        ],
      })
    })
    await page.route('**/users/1', async (route) => {
      if (route.request().method() === 'PUT') {
        const body = await route.request().postDataJSON() as Record<string, unknown>
        await route.fulfill({ json: { id: 1, name: body['name'] ?? 'Leanne Graham', username: 'Bret', email: body['email'] ?? 'Sincere@april.biz', phone: '1-770-736-8031', website: 'hildegard.org', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } }, company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } } })
      } else {
        await route.fulfill({ json: { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031', website: 'hildegard.org', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } }, company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } } })
      }
    })
  })

  test('navigates from user list to profile page', async ({ page }) => {
    await page.goto('/users')
    await expect(page.getByText('Leanne Graham')).toBeVisible()
    await page.getByTestId('action-view').first().click()
    await expect(page).toHaveURL(/\/users\/1$/)
    await expect(page.getByText('Leanne Graham')).toBeVisible()
  })

  test('switches to admin role and can see Edit button', async ({ page }) => {
    await page.goto('/users')
    await page.getByTestId('role-switcher').click()
    await page.getByText('Admin').click()
    await expect(page.getByTestId('action-edit').first()).toBeVisible()
  })

  test('edit form is pre-populated and submits successfully', async ({ page }) => {
    await page.goto('/users')
    await page.getByTestId('role-switcher').click()
    await page.getByText('Admin').click()
    await page.getByTestId('action-edit').first().click()
    await expect(page).toHaveURL(/\/users\/1\/edit$/)

    const nameField = page.getByTestId('field-name')
    await expect(nameField).toHaveValue('Leanne Graham')

    await nameField.fill('Leanne G. Updated')
    await page.getByTestId('btn-save').click()
    await expect(page).toHaveURL(/\/users\/1$/)
  })

  test('edit form shows validation error on empty email', async ({ page }) => {
    await page.goto('/users/1/edit')
    await page.getByTestId('role-switcher').click()
    await page.getByText('Admin').click()
    await page.getByTestId('field-email').fill('')
    await page.getByTestId('btn-save').click()
    await expect(page.getByText('Must be a valid email')).toBeVisible()
  })
})
