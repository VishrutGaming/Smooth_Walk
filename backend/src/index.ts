import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db";
import { log } from "console";


dotenv.config();
const app = express();
log(process.env.FRONTEND_URL,"frontend url");
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
     
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json());

// GET all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT id, email, password FROM users"
    );
    res.json({ success: true, users: rows });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.get("/api/shoes", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM shoes");
    res.json({ success: true, shoes: rows });
  } catch (error) {
    console.error("Failed to fetch shoes:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});
app.delete("/api/cart/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const [result] = await db.query("DELETE FROM cart WHERE id = ?", [id]);

   
     
    

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Failed to delete cart:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.get("/api/cart/:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  console.log(email);

  try {
    const [rows]: any = await db.query("SELECT * FROM cart WHERE user_id = ?", [
      email,
    ]);

    const totalItems = rows.length;

    const totalPrice = rows.reduce((sum: number, item: any) => {
      return sum + parseFloat(item.price);
    }, 0);

    res.json({
      success: true,
      cart: rows,
      totalItems,
      totalPrice,
    });

    console.log(rows, "rows");

  } catch (error) {
    console.error("Failed to fetch cart:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});


app.post("/api/cart", async (req: Request, res: Response) => {
  const { user_id, name, brand, price, color, image_url, categories, size } =
    req.body;
  try {
    await db.query(
      "INSERT INTO cart (user_id,name,brand,price,color,image_url,categories,size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [user_id, name, brand, price, color, image_url, categories, size]
    );
    res.json({ success: true, message: "cart insert successfully" });
  } catch (error) {
    console.error("Failed to insert cart:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.post("/api/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // @ts-ignore
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Insert new user
    await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
