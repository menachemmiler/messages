import NewUserDTO from "DTO/NewUserDTO";
import exp, { query, Request, Response, Router } from "express";
import UserService from "../services/userService";

const router: Router = exp.Router();


// 4.1: register (אימות נתונים (משתמש בפונקציות של auth כנראה)) = ?
router.post("/register", async (
  req: Request<any, any, NewUserDTO>, 
  res: Response
): Promise<void> => {
  try {
    const resulte:boolean = await UserService.createNewUser(req.body);
    if(resulte){
      res.status(201).json({
        err: false,
        message: "המשתמש נרשם בהצלחה",
        data: undefined,
      });
    }else{
      res.json({
        err: true,
        message: "המשמש לא נשמר",
      });
    }

  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "שגיאה ב-הרשמה",
    });
  }
});




// 4.2: follow (הוספת משתמש נוסף לרשימת המשתמשים שאני עוקב אחריו)
router.post("/follow", async (
  req: Request<any, any, any>, 
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "4.2: follow (הוספת משתמש נוסף לרשימת המשתמשים שאני עוקב אחריו)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

//search quary ?title=...  4.3: search (חיפוש משתמש)
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.query);
    res.status(200).json({
      err: false,
      message: "4.3: search (חיפוש משתמש)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

//my profile or else profile 
router.get("/profile", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.query);
    res.status(200).json({
      err: false,
      message: "4.4: profile (קבלת הפרופיל שלי)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

// 4.5: קבלת רשימת המעקבים שלי (משתמשים שאני עוקב אחריהם)
router.get("/following", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.query);
    res.status(200).json({
      err: false,
      message: "// 4.5: קבלת רשימת המעקבים שלי (משתמשים שאני עוקב אחריהם)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

// 5.6: קבלת רשימת כל מי שאני עוקב אחריו
router.get("/followers", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.query);
    res.status(200).json({
      err: false,
      message: "5.6: קבלת רשימת כל מי שאני עוקב אחריו",
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
