from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]
users_collection = db["users"]

@router.post("/users/")
def create_user(user_data: dict):
    user_id = users_collection.insert_one(user_data).inserted_id
    return {"message": "User created successfully", "user_id": str(user_id)}

# เพิ่ม API endpoints สำหรับเรียกดู แก้ไข และลบข้อมูลผู้ใช้
