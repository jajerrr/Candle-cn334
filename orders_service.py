from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]

orders_collection = db["orders"]
products_collection = db["products"]


class ProductOrder(BaseModel):
    productId : str
    productImg : str
    productName : str
    productPrice : str
    productQuantity :int




# class User(BaseModel):
#     contact: str
#     name: str
#     surname: str


class Address(BaseModel):
    contact: str
    name: str
    surname: str
    address: str
    note: str
    city: str
    postcode: str
    province: str
    country: str


class Order(BaseModel):
    # user_detail:User
    products: List[ProductOrder]
    shipping_address: Address
    total_price: float
    Date_time: datetime = datetime.now() 

@router.post("/orders/")
def create_order(order_data: Order):
    # Calculate total price
    total_price = 0
    for product_order in order_data.products:
        product = products_collection.find_one({"_id": ObjectId(product_order.productId)})
        if product:
            total_price += product["candle_price"] * product_order.productQuantity
        else:
            raise HTTPException(status_code=404, detail=f"Product with ID {product_order.productId} not found")

    # Add total price to order data
    order_data.total_price = total_price

    # Insert order into database
    order_id = orders_collection.insert_one(order_data.dict()).inserted_id

    return {"message": "Order created successfully", "order_id": str(order_id)}


@router.get("/orders/{order_id}")
def get_order(order_id: str):
    # Find order by ID
    order = orders_collection.find_one({"_id": ObjectId(order_id)})
    if order:
        order["_id"] = str(order["_id"])
        return order
    else:
        raise HTTPException(status_code=404, detail=f"Order with ID {order_id} not found")


