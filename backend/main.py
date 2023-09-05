from fastapi import FastAPI
import chronoptics.tof as tof
from models.camera_settings_model import camera_settings
from models.camera_model import camera
from typing import List
import uvicorn
import camera_utils
import configure_settings
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
) 

@app.get("/")
async def root(serial=None):
    return {"message": "Hello World"}

#discover cameras to connect to
@app.get("/discover-cameras")
async def get_discovered_cameras():
    return await camera_utils.get_cameras()

# connect to the camera selected
@app.post("/connect-to-camera/{serial_no}")  
async def connectToCamera(serial: str):
    camera_utils.start_streaming(serial)
    return {"message": "connected to the camera"}
    
# input the settings for the camera stream
@app.post("/camera-settings/{serial_no}")
async def set_configs(serial_no: str, settings: camera_settings):
    configure_settings.set_camera_configuration(serial_no, settings)
    return {"message": "camera configurations are set"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)