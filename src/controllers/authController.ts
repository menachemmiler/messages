import exp, { Request, Response, Router } from "express";

const router: Router = exp.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "defoulte message",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

router.delete("/logout", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "defoulte message",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

export default router;
