from bson import ObjectId
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

@router.get("/users/{user_id}")
def get_user(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}")
def update_user(user_id: str, user_data: dict):
    result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": user_data})
    if result.modified_count == 1:
        return {"message": "User updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

@router.delete("/users/{user_id}")
def delete_user(user_id: str):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 1:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")
