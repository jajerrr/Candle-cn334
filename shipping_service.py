from typing import Optional

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

shipping_collection = db["shipping"]
products_collection = db["products"]

class Shipping(BaseModel):
    customer_name: str
    customer_email: str
    customer_surname :str
    address: str
    city:  str
    postcode :str
    province :str
    country : str

@router.post("/shipping/")
async def create_shipping(shipping: Shipping):
    # สร้างเอกสาร Shipping ใหม่ในฐานข้อมูล
    shipping_dict = shipping.dict()
    result = shipping_collection.insert_one(shipping_dict)
    
    # ตรวจสอบว่าการบันทึกสำเร็จหรือไม่
    if result.inserted_id:
        return {"message": "Shipping information created successfully", "shipping_id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to create shipping information")

@router.get("/shipping/{shipping_id}")
async def read_shipping(shipping_id: str):
    # ค้นหาข้อมูลการจัดส่งจากฐานข้อมูลด้วย shipping_id
    shipping = shipping_collection.find_one({"_id": ObjectId(shipping_id)})
    
    # ตรวจสอบว่าข้อมูลการจัดส่งพบหรือไม่
    if shipping:
        shipping["_id"] = str(shipping["_id"])  # แปลง ObjectId เป็น string
        return shipping
    else:
        raise HTTPException(status_code=404, detail="Shipping information not found")


@router.put("/shipping/{shipping_id}")
async def update_shipping(shipping_id: str, shipping: Shipping):
    # แปลงข้อมูล Shipping เป็น dictionary
    shipping_dict = shipping.dict()
    
    # อัปเดตข้อมูลการจัดส่งในฐานข้อมูล
    result = shipping_collection.update_one({"_id": ObjectId(shipping_id)}, {"$set": shipping_dict})
    
    # ตรวจสอบว่าอัปเดตสำเร็จหรือไม่
    if result.modified_count == 1:
        return {"message": "Shipping information updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Shipping information not found")


@router.delete("/shipping/{shipping_id}")
async def delete_shipping(shipping_id: str):
    # ลบข้อมูลการจัดส่งจากฐานข้อมูล
    result = shipping_collection.delete_one({"_id": ObjectId(shipping_id)})
    
    # ตรวจสอบว่าการลบสำเร็จหรือไม่
    if result.deleted_count == 1:
        return {"message": "Shipping information deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Shipping information not found")

