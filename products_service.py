import json
from typing import Optional

from bson import ObjectId, json_util
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

# สร้าง collection
products_collection = db["products"]

# กำหนดการกำหนดสิทธิ CORS


class Product(BaseModel):
    candle_id: str
    candle_name: str
    candle_scent : str
    candle_price: float
    #detail: str
    image_url: str
    time : str
    dimension: str
    weight : str



@router.post("/products/")
def create_product(product_data: Product):
    product_id = products_collection.insert_one(product_data.dict()).inserted_id
    return {"message": "Product created successfully", "product_id": str(product_id)}



@router.get("/products/")
def get_all():
    product = products_collection.find()
    #print(product,type(product))
    return {"candle": json.loads(json_util.dumps(product))}



@router.get("/products/{product_id}")
def get_product(product_id: str):
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if product:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string
        return product
    else:
        raise HTTPException(status_code=404, detail="Product not found")

@router.put("/products/{product_id}")
def update_product(product_id: str, product_data: dict):
    result = products_collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})
    if result.modified_count == 1:
        return {"message": "Product updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/products/{product_id}")
def delete_product(product_id: str):
    result = products_collection.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 1:
        return {"message": "Product deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")
