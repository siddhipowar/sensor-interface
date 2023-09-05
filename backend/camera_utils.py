import chronoptics.tof as tof
from models.camera_model import camera
from models.camera_settings_model import camera_settings

#discover list of cameras available to connect
async def get_cameras():
    # shows a list of available cameras to connect to
    print("entered")
    cameras = tof.discoverKeaCameras()
    camera_list = []
    print(cameras)
    for cam in cameras:
        cam_serial = cam.serial()
        cam_info = cam.info()
        camera_list.append(camera(cam_serial=cam_serial, cam_info=cam_info))
    print(camera_list)
    if camera_list:
        return camera_list
    else:
        return {"message": "no cameras found"}
    
    
async def start_streaming(serial:str):
    # connects to the selected camera and starts streaming
    cam = tof.KeaCamera(serial=serial)
    cam.start()

    return {"message": "connected to the camera"}

#def stop_streaming(serial:str):



