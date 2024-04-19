from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

router = APIRouter()
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce"]
products_collection = db["products"]

@router.post("/products/")
def create_product(product_data: dict):
    product_id = products_collection.insert_one(product_data).inserted_id
    return {"message": "Product created successfully", "product_id": str(product_id)}

@router.get("/products/{product_id}")
def get_product(product_id: str):
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if product:
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
