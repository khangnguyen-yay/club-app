import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("App header", () => {
  const routes = ["/home", "/explore", "/calendar"];

  test("header is visible on all routed pages", async ({ page }) => {
    for (const path of routes) {
      await page.goto(`${BASE_URL}${path}`);

      const header = page.getByTestId("app-header");
      await expect(header).toBeVisible();

      await expect(header.getByText("Clubfindr")).toBeVisible();
      await expect(
        header.getByText("Discover clubs effortlessly", { exact: false })
      ).toBeVisible();

      await expect(
        header.getByRole("button", { name: /log out/i })
      ).toBeVisible();
    }
  });

  test("clicking Log out calls logout and redirects to login", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/home`);

    // Stub the backend /auth/logout call so the test doesn't depend on real backend
    await page.route("**/auth/logout", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Logged out" }),
      });
    });

    await page.getByRole("button", { name: /log out/i }).click();

    // should land on /login
    await page.waitForURL("**/login");
    await expect(page.getByText("Sign in with Google")).toBeVisible();
  });
});
