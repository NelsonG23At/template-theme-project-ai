import { test, expect } from '@playwright/test'

const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } },
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' },
}

test.describe('Role assignment with permission diff', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/users/1', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ json: mockUser })
      } else {
        await route.fulfill({ json: mockUser })
      }
    })
    await page.route('**/users', async (route) => {
      await route.fulfill({ json: [mockUser] })
    })

    await page.goto('/')
    await page.getByTestId('role-switcher').click()
    await page.getByText('Admin').click()
  })

  test('role assign page shows current role pre-selected', async ({ page }) => {
    await page.goto('/users/1/roles')
    const adminRadio = page.getByTestId('role-option-admin')
    await expect(adminRadio).toBeChecked()
  })

  test('selecting a less-privileged role shows losses in diff', async ({ page }) => {
    await page.goto('/users/1/roles')
    await page.getByTestId('role-option-viewer').click()
    await expect(page.getByTestId('diff-users:delete')).toBeVisible()
    await expect(page.getByTestId('diff-users:write')).toBeVisible()
    await expect(page.getByTestId('diff-roles:assign')).toBeVisible()
  })

  test('selecting the same role shows no diff', async ({ page }) => {
    await page.goto('/users/1/roles')
    await page.getByTestId('role-option-admin').click()
    await expect(page.getByText('No changes')).toBeVisible()
  })

  test('confirming role change redirects to profile', async ({ page }) => {
    await page.goto('/users/1/roles')
    await page.getByTestId('role-option-editor').click()
    await page.getByTestId('btn-confirm-role').click()
    await expect(page).toHaveURL(/\/users\/1$/)
  })
})
