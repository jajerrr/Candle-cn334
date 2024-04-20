from bson.json_util import dumps
from fastapi import APIRouter
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

@router.get("/dashboard/")
def get_dashboard_summary():
    # ดึงข้อมูลจากฐานข้อมูล
    sales_data = list(db["sales"].find())
    # ประมวลผลข้อมูลเพื่อหายอดขายรวม
    total_sales = sum(sale["amount"] for sale in sales_data)
    # ประมวลผลข้อมูลเพื่อหาสินค้าขายดี
    best_selling_products = list(db["products"].find().sort("sales", -1).limit(5))
    # ประมวลผลข้อมูลเพื่อหาสถิติการสั่งซื้อ
    order_statistics = list(db["orders"].aggregate([
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]))
    # สร้างข้อมูลสรุป
    dashboard_summary = {
        "total_sales": total_sales,
        "best_selling_products": best_selling_products,
        "order_statistics": order_statistics
    }
    # แปลงข้อมูล JSON ด้วย dumps()
    return dumps(dashboard_summary)
