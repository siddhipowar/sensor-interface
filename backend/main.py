from fastapi import FastAPI, WebSocket, Request
from models.camera_settings_model import camera_settings
import uvicorn
import camera_utils
import configure_settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allowing CORS origin
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

# connect to the camera selected. Pass camera serial number as API query parameter
@app.post("/connect-to-camera")  
async def connectToCamera(request: Request):
    data = await request.json()
    serial = data.get('serial')
    print(serial)
    await camera_utils.start_streaming(serial)
    return {"message": "connected to the camera"}

# stop streaming from the camera
@app.post("/stop-camera-stream")  
async def stopCameraStream(serial: str):
    await camera_utils.stop_streaming(serial)
    return {"message": "Stopped camera stream"}
    
# input the settings for the camera stream
@app.post("/camera-settings/{serial_no}")
async def set_configs(serial_no: str, settings: camera_settings):
    configure_settings.set_camera_configuration(serial_no, settings)
    return {"message": "camera configurations are set"}

# Endpoint to stream intensity frames
@app.websocket("/intensity-stream")
async def intensity_websocket(websocket: WebSocket, serial: str):
    await websocket.accept()
    frames = await camera_utils.get_intensity_frames(serial)
    for frame in frames:
        frame_bytes = frame.to_bytes()
        await websocket.send_bytes(frame_bytes)

# Endpoint to stream XYZ point cloud
@app.websocket("/pointcloud-stream")
async def xyz_websocket(websocket: WebSocket, serial: str):
    await websocket.accept()
    frames = await camera_utils.get_xyz_frames(serial)
    for frame in frames:
        frame_bytes = frame.to_bytes()
        await websocket.send_bytes(frame_bytes)



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)