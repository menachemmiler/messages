import exp, { Request, Response, Router } from "express";

const router: Router = exp.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message:
        "5.1: getPosts(?) (קבלת כל ההודעות שלי או קבלת כל ההודעות שלי האנשים שאני עוקב אחריהם)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "5.3: post (יצירת הודעה חדשה)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

//search quary ?title=...
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    // console.log(req.query);
    res.status(200).json({
      err: false,
      message: "5.4: search (חיפוש הודעה לפי כותרת)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "5.2: post/:id (קבלת הודעה לפי מזהה של ההודעה)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

router.patch(
  "/like/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({
        err: false,
        message: "like to post",
        data: undefined,
      });
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "defoulte eror",
      });
    }
  }
);

export default router;
