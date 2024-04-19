from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]
orders_collection = db["orders"]

@router.post("/orders/")
def create_order(order_data: dict):
    order_id = orders_collection.insert_one(order_data).inserted_id
    return {"message": "Order created successfully", "order_id": str(order_id)}

# เพิ่ม API endpoints สำหรับเรียกดู แก้ไข และลบข้อมูลการสั่งซื้อ
