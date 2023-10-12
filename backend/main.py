from fastapi import FastAPI, WebSocket, Request
from models.camera_settings_model import camera_settings
import uvicorn
import camera_utils
import configure_settings
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

app = FastAPI()

# Allowing CORS origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
) 

cm = camera_utils.CameraManager()

@app.get("/")
async def root(serial=None):
    return {"message": "Hello World"}

#discover cameras to connect to
@app.get("/discover-cameras")
async def get_discovered_cameras():
    return await cm.get_cameras()

# connect to the camera selected. Pass camera serial number as API query parameter
@app.post("/connect-to-camera")  
async def connectToCamera(request: Request):
    data = await request.json()
    serial = data.get('serial')
    print(serial)
    cm.connectCamera(serial)
    # await camera_utils.start_streaming(serial)
    return {"message": "connected to the camera"}

@app.post("/disconnect-camera")
async def disconnectFromCamera():
    cm.DisconnectCamera()
    return {"message": "Camera disconnected"}
    
# stop streaming from the camera
# @app.post("/stop-camera-stream")  
# async def stopCameraStream(serial: str):
#     await cm.stop_streaming(serial)
#     return {"message": "Stopped camera stream"}
    
# input the settings for the camera stream
@app.post("/camera-settings/{serial_no}")
async def set_configs(serial_no: str, settings: camera_settings):
    configure_settings.set_camera_configuration(serial_no, settings)
    return {"message": "camera configurations are set"}

# Endpoint to stream intensity frames
@app.websocket("/intensity-stream")
async def intensity_websocket(websocket: WebSocket, serial: str):
    await websocket.accept()
    cm.connectCamera(serial)
    await cm.start_streaming()
    frame = await cm.get_intensity_frames(serial)
    frame_array = np.asarray(frame)
    frame_bytes = frame_array.tobytes()
    await websocket.send_bytes(frame_bytes)

# Endpoint to stream XYZ point cloud
@app.websocket("/pointcloud-stream/{serial}")
async def xyz_websocket(websocket: WebSocket, serial: str):
    print("Entered Api")
    await websocket.accept()
    # cm.connectCamera(serial)s
    print(cm.cam.getSerial())
    await cm.start_streaming(True, True)
    frame = await cm.get_xyz_frames(serial)
    
    frame_array = np.asarray(frame)
    print(frame_array)
    image = frame_array[0, :, :, :3]
    print(image)
    img_converted = (image * 255).clip(0, 255).astype(np.uint8)
    pillow_image = Image.fromarray(img_converted)
    pillow_image = pillow_image.transpose(Image.FLIP_TOP_BOTTOM)
    pillow_image = pillow_image.transpose(Image.FLIP_LEFT_RIGHT)
    # Now you can save, display, or manipulate the 'pillow_image' as needed
    pillow_image.save("output_image.png")
    pillow_image.show()
    with open("output_image.png", "rb") as image_file:
        # Read the image data
        image_data = image_file.read()
        print(image_data)
    # Send the image data as binary
    # await websocket.send(image_data)
    # print(frame_array.shape)
    # frame_bytes = frame_array.tobytes()
    # print(len(frame_bytes))
    await websocket.send_bytes(image_data.tobytes())


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)