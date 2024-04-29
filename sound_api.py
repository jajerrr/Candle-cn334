from fastapi import FastAPI, HTTPException,APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests
import os

app = FastAPI()
router = APIRouter()

class SoundRequest(BaseModel):
    description: str
    

@router.post("/create_sound/")
async def create_sound(sound_request: SoundRequest):
    try:
        api_key = 'd9Lqve8DbtLqLAe9C8mHZgq3cSbpM9BD'
        url = 'https://api.aiforthai.in.th/vaja9/synth_audiovisual'
        headers = {'Apikey': api_key, 'Content-Type': 'application/json'}
        data = {
            'input_text': sound_request.description,
            'speaker': 1,
            'phrase_break': 0,
            'audiovisual': 0
        }
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200:
            wav_url = response.json()['wav_url']
            sound_response = requests.get(wav_url, headers={'Apikey': api_key})
            if sound_response.status_code == 200:
                file_path = "sound.wav"
                with open(file_path, 'wb') as audio_file:
                    audio_file.write(sound_response.content)
                return FileResponse(file_path)
            else:
                raise HTTPException(status_code=500, detail="Failed to download sound file")
        else:
            raise HTTPException(status_code=500, detail="Failed to synthesize sound")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
