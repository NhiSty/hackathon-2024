/**
 *
 * @param {import('express').Application} app
 */
export function configureRouter(app) {
  app.all("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
}
