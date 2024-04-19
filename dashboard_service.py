from fastapi import APIRouter
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

@router.get("/dashboard/")
def get_dashboard_summary():
    # ประมวลผลข้อมูลสรุปจากฐานข้อมูล เช่น ยอดขายรวม สินค้าขายดี สถิติการสั่งซื้อ เป็นต้น
    return {"dashboard_summary": "Dashboard data here"}
