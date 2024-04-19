from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from dashboard_service import router as dashboard_router
from orders_service import router as orders_router
from products_service import router as products_router
from users_service import router as users_router

# เรียกใช้ FastAPI
app = FastAPI()

# เพิ่ม Middleware เพื่ออนุญาตให้เข้าถึง API จากต่างๆ โดยที่ไม่ต้องรับสิทธิ์เพิ่มเติม
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# เชื่อมต่อ MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

# เรียกใช้งาน Microservices APIs
app.include_router(products_router, prefix="/api/products", tags=["Products"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(orders_router, prefix="/api/orders", tags=["Orders"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
