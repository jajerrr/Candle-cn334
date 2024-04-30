from fastapi import FastAPI, APIRouter
from pymongo import MongoClient
from bson import json_util, ObjectId
import json

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
        "best_selling_products": convert_objectid(best_selling_products),  # Convert ObjectId to string
        "order_statistics": order_statistics
    }
    # แปลงข้อมูล JSON ด้วย dumps()
    return json.dumps(dashboard_summary, default=json_util.default)

def convert_objectid(doc):
    if isinstance(doc, list):
        return [convert_objectid(item) for item in doc]
    if isinstance(doc, dict):
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)  # Convert ObjectId to string
            elif isinstance(value, (dict, list)):
                doc[key] = convert_objectid(value)
    return doc
