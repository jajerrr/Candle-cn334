from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

orders_collection = db["orders"]
products_collection = db["products"]


class ProductOrder(BaseModel):
    product_id: str
    quantity: int


class Address(BaseModel):
    address: str
    city: str
    postal_code: str
    country: str


class Order(BaseModel):
    user_id: str
    products: List[ProductOrder]
    shipping_address: Address
    total_price: float


@router.post("/orders/")
def create_order(order_data: Order):
    # Calculate total price
    total_price = 0
    for product_order in order_data.products:
        product = products_collection.find_one({"_id": ObjectId(product_order.product_id)})
        if product:
            total_price += product["candle_price"] * product_order.quantity
        else:
            raise HTTPException(status_code=404, detail=f"Product with ID {product_order.product_id} not found")

    # Add total price to order data
    order_data.total_price = total_price

    # Insert order into database
    order_id = orders_collection.insert_one(order_data.dict()).inserted_id

    return {"message": "Order created successfully", "order_id": str(order_id)}
