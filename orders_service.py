from typing import Optional

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

orders_collection = db["orders"]
products_collection = db["products"]

class Order(BaseModel):
    product_id: str
    quantity: int
    total_price: float
    customer_name: str
    customer_email: str

@router.post("/orders/")
def create_order(order_data: Order):
    # Calculate total price
    product = products_collection.find_one({"_id": ObjectId(order_data.product_id)})
    if product:
        total_price = product["candle_price"] * order_data.quantity
        order_data.total_price = total_price
        order_id = orders_collection.insert_one(order_data.dict()).inserted_id
        return {"message": "Order created successfully", "order_id": str(order_id)}
    else:
        raise HTTPException(status_code=404, detail="Product not found")



@router.get("/orders/{order_id}")
def get_order(order_id: str):
    order = orders_collection.find_one({"_id": ObjectId(order_id)})
    if order:
        order["_id"] = str(order["_id"])  # Convert ObjectId to string
        return order
    else:
        raise HTTPException(status_code=404, detail="Order not found")
    

@router.put("/orders/{order_id}")
def update_order(order_id: str, order_data: dict):
    result = orders_collection.update_one({"_id": ObjectId(order_id)}, {"$set": order_data})
    if result.modified_count == 1:
        return {"message": "Order updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Order not found")

@router.delete("/orders/{order_id}")
def delete_order(order_id: str):
    result = orders_collection.delete_one({"_id": ObjectId(order_id)})
    if result.deleted_count == 1:
        return {"message": "Order deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Order not found")
